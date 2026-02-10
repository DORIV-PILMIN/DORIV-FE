import {
  OAuthLoginRequest,
  OAuthLoginResponse,
  OAuthErrorResponse,
  OAuthProvider,
  RefreshTokenRequest,
  RefreshTokenResponse,
  User,
} from "@/types/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "/api";

/**
 * 백엔드에서 OAuth 로그인 URL 가져오기
 * 백엔드에 해당 API가 있는 경우 사용
 */
export async function getOAuthUrlFromBackend(
  provider: OAuthProvider
): Promise<string> {
  try {
    const redirectUri =
      typeof window !== "undefined"
        ? `${window.location.origin}/oauth/callback`
        : "";

    const response = await fetch(
      `${API_BASE_URL}/oauth/url?provider=${provider}&redirectUri=${encodeURIComponent(redirectUri)}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("OAuth URL을 가져올 수 없습니다.");
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error("Get OAuth URL error:", error);
    throw error;
  }
}

/**
 * OAuth 로그인 API 호출
 */
export async function loginWithOAuth(
  request: OAuthLoginRequest
): Promise<OAuthLoginResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/oauth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error: OAuthErrorResponse = await response.json();
      throw new Error(error.message || "로그인에 실패했습니다.");
    }

    const data: OAuthLoginResponse = await response.json();
    return data;
  } catch (error) {
    console.error("OAuth login error:", error);
    throw error;
  }
}

/**
 * 토큰을 localStorage에 저장
 */
export function saveTokens(tokens: OAuthLoginResponse["tokens"]) {
  if (typeof window !== "undefined") {
    localStorage.setItem("access_token", tokens.accessToken);
    localStorage.setItem("refresh_token", tokens.refreshToken);
    localStorage.setItem("token_type", tokens.tokenType);
    localStorage.setItem("expires_in", tokens.expiresIn.toString());
    localStorage.setItem(
      "expires_at",
      (Date.now() + tokens.expiresIn * 1000).toString()
    );
  }
}

/**
 * 사용자 정보를 localStorage에 저장
 */
export function saveUser(user: OAuthLoginResponse["user"]) {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user));
  }
}

/**
 * 사용자 정보 가져오기
 */
export function getUser(): OAuthLoginResponse["user"] | null {
  if (typeof window !== "undefined") {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
  }
  return null;
}

/**
 * 토큰 가져오기
 */
export function getAccessToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token");
  }
  return null;
}

/**
 * Refresh Token 가져오기
 */
export function getRefreshToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("refresh_token");
  }
  return null;
}

/**
 * 로그아웃 (토큰 및 사용자 정보 삭제)
 */
export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("token_type");
    localStorage.removeItem("expires_in");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("user");
  }
}

/**
 * 토큰 만료 확인
 */
export function isTokenExpired(): boolean {
  if (typeof window !== "undefined") {
    const expiresAt = localStorage.getItem("expires_at");
    if (!expiresAt) return true;
    return Date.now() >= parseInt(expiresAt);
  }
  return true;
}

/**
 * Access Token 갱신 API 호출
 */
export async function refreshAccessToken(): Promise<RefreshTokenResponse> {
  try {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      throw new Error("Refresh Token이 없습니다.");
    }

    const request: RefreshTokenRequest = {
      refreshToken,
    };

    const response = await fetch(`${API_BASE_URL}/oauth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error: OAuthErrorResponse = await response.json();
      throw new Error(error.message || "토큰 갱신에 실패했습니다.");
    }

    const data: RefreshTokenResponse = await response.json();

    // 갱신된 토큰 및 사용자 정보 저장
    saveTokens(data.tokens);
    saveUser(data.user);

    return data;
  } catch (error) {
    console.error("Refresh token error:", error);
    throw error;
  }
}

/**
 * 유효한 Access Token 가져오기 (만료 시 자동 갱신)
 */
export async function getValidAccessToken(): Promise<string | null> {
  try {
    const accessToken = getAccessToken();

    if (!accessToken) {
      return null;
    }

    // 토큰이 만료되었는지 확인
    if (isTokenExpired()) {
      // 토큰 갱신 시도
      const response = await refreshAccessToken();
      return response.tokens.accessToken;
    }

    return accessToken;
  } catch (error) {
    console.error("Get valid access token error:", error);
    // 토큰 갱신 실패 시 로그아웃 처리
    logout();
    return null;
  }
}

/**
 * 현재 로그인한 사용자 정보 가져오기 (서버에서)
 */
export async function fetchCurrentUser(): Promise<User> {
  try {
    const token = await getValidAccessToken();

    if (!token) {
      throw new Error("인증 토큰이 없습니다.");
    }

    const response = await fetch(`${API_BASE_URL}/oauth/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error: OAuthErrorResponse = await response.json();
      throw new Error(error.message || "사용자 정보를 가져올 수 없습니다.");
    }

    const user: User = await response.json();

    // 최신 사용자 정보로 업데이트
    saveUser(user);

    return user;
  } catch (error) {
    console.error("Fetch current user error:", error);
    throw error;
  }
}
