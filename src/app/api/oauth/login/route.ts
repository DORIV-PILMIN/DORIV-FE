import { NextRequest, NextResponse } from "next/server";

/**
 * OAuth 로그인 API Route
 * POST /api/oauth/login
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { provider, code, redirectUri, codeVerifier } = body;

    console.log("OAuth login request:", { provider, code, redirectUri });

    // TODO: 실제 구현 시 다음을 수행:
    // 1. Google/Kakao에 code를 보내 access_token 교환
    // 2. access_token으로 사용자 정보 가져오기
    // 3. 데이터베이스에 사용자 저장/조회
    // 4. JWT 토큰 생성

    // 개발용 Mock 응답
    const mockResponse = {
      tokens: {
        accessToken: `mock_access_token_${Date.now()}`,
        refreshToken: `mock_refresh_token_${Date.now()}`,
        tokenType: "Bearer",
        expiresIn: 3600,
        refreshTokenExpiresIn: 86400,
      },
      user: {
        userId: `user_${Date.now()}`,
        email: "user@example.com",
        name: provider === "google" ? "Google 사용자" : "카카오 사용자",
        profileImage: "https://via.placeholder.com/150",
      },
      isNewUser: false,
    };

    return NextResponse.json(mockResponse, { status: 200 });
  } catch (error) {
    console.error("OAuth login error:", error);
    return NextResponse.json(
      {
        error: "oauth_error",
        message: "로그인 처리 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
