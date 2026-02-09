import {
  OAuthLoginRequest,
  OAuthLoginResponse,
  OAuthErrorResponse,
  OAuthProvider,
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
 * 토큰 가져오기
 */
export function getAccessToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("access_token");
  }
  return null;
}

/**
 * 로그아웃 (토큰 삭제)
 */
export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("token_type");
    localStorage.removeItem("expires_in");
    localStorage.removeItem("expires_at");
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
