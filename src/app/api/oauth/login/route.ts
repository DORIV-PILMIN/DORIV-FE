import { NextRequest, NextResponse } from "next/server";

interface GoogleTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
  token_type: string;
}

interface GoogleUserInfo {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

interface KakaoTokenResponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  refresh_token_expires_in: number;
}

interface KakaoUserInfo {
  id: number;
  connected_at: string;
  properties: {
    nickname: string;
    profile_image?: string;
    thumbnail_image?: string;
  };
  kakao_account: {
    profile_nickname_needs_agreement: boolean;
    profile_image_needs_agreement: boolean;
    profile: {
      nickname: string;
      thumbnail_image_url?: string;
      profile_image_url?: string;
    };
    has_email: boolean;
    email_needs_agreement: boolean;
    is_email_valid: boolean;
    is_email_verified: boolean;
    email?: string;
  };
}

/**
 * Google OAuth: code를 token으로 교환
 */
async function exchangeGoogleCode(
  code: string,
  redirectUri: string,
  codeVerifier: string
): Promise<GoogleTokenResponse> {
  const tokenUrl = "https://oauth2.googleapis.com/token";

  const params = new URLSearchParams({
    code,
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
    client_secret: process.env.GOOGLE_CLIENT_SECRET || "",
    redirect_uri: redirectUri,
    grant_type: "authorization_code",
    code_verifier: codeVerifier,
  });

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Google token exchange error:", error);
    throw new Error("Google 토큰 교환에 실패했습니다.");
  }

  return response.json();
}

/**
 * Google OAuth: 사용자 정보 가져오기
 */
async function getGoogleUserInfo(
  accessToken: string
): Promise<GoogleUserInfo> {
  const userInfoUrl = "https://www.googleapis.com/oauth2/v2/userinfo";

  const response = await fetch(userInfoUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Google 사용자 정보를 가져올 수 없습니다.");
  }

  return response.json();
}

/**
 * Kakao OAuth: code를 token으로 교환
 */
async function exchangeKakaoCode(
  code: string,
  redirectUri: string
): Promise<KakaoTokenResponse> {
  const tokenUrl = "https://kauth.kakao.com/oauth/token";

  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID || "",
    client_secret: process.env.KAKAO_CLIENT_SECRET || "",
    redirect_uri: redirectUri,
    code,
  });

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Kakao token exchange error:", error);
    throw new Error("카카오 토큰 교환에 실패했습니다.");
  }

  return response.json();
}

/**
 * Kakao OAuth: 사용자 정보 가져오기
 */
async function getKakaoUserInfo(accessToken: string): Promise<KakaoUserInfo> {
  const userInfoUrl = "https://kapi.kakao.com/v2/user/me";

  const response = await fetch(userInfoUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("카카오 사용자 정보를 가져올 수 없습니다.");
  }

  return response.json();
}

/**
 * OAuth 로그인 API Route
 * POST /api/oauth/login
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { provider, code, redirectUri, codeVerifier } = body;

    console.log("OAuth login request:", { provider, redirectUri });

    if (provider === "google") {
      // Google OAuth 처리
      const tokenResponse = await exchangeGoogleCode(
        code,
        redirectUri,
        codeVerifier
      );
      const userInfo = await getGoogleUserInfo(tokenResponse.access_token);

      const response = {
        tokens: {
          accessToken: tokenResponse.access_token,
          refreshToken: tokenResponse.refresh_token || "",
          tokenType: tokenResponse.token_type,
          expiresIn: tokenResponse.expires_in,
          refreshTokenExpiresIn: 0,
        },
        user: {
          userId: userInfo.id,
          email: userInfo.email,
          name: userInfo.name,
          profileImage: userInfo.picture,
        },
        isNewUser: false,
      };

      return NextResponse.json(response, { status: 200 });
    } else if (provider === "kakao") {
      // Kakao OAuth 처리
      const tokenResponse = await exchangeKakaoCode(code, redirectUri);
      const userInfo = await getKakaoUserInfo(tokenResponse.access_token);

      const response = {
        tokens: {
          accessToken: tokenResponse.access_token,
          refreshToken: tokenResponse.refresh_token,
          tokenType: tokenResponse.token_type,
          expiresIn: tokenResponse.expires_in,
          refreshTokenExpiresIn: tokenResponse.refresh_token_expires_in,
        },
        user: {
          userId: userInfo.id.toString(),
          email: userInfo.kakao_account.email || "",
          name:
            userInfo.kakao_account.profile.nickname ||
            userInfo.properties.nickname,
          profileImage:
            userInfo.kakao_account.profile.profile_image_url ||
            userInfo.properties.profile_image ||
            "",
        },
        isNewUser: false,
      };

      return NextResponse.json(response, { status: 200 });
    }

    throw new Error("지원하지 않는 OAuth provider입니다.");
  } catch (error) {
    console.error("OAuth login error:", error);
    return NextResponse.json(
      {
        error: "oauth_error",
        message:
          error instanceof Error
            ? error.message
            : "로그인 처리 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
