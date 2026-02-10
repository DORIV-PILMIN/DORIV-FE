import { NextRequest, NextResponse } from "next/server";

/**
 * Access Token 갱신 API Route
 * POST /api/oauth/refresh
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { refreshToken } = body;

    if (!refreshToken) {
      return NextResponse.json(
        {
          error: "invalid_request",
          message: "Refresh Token이 필요합니다.",
        },
        { status: 400 }
      );
    }

    // TODO: 실제 백엔드 API 호출 또는 토큰 검증 로직
    // 현재는 Mock 응답을 반환합니다
    // 실제 구현 시 백엔드 API를 호출하거나
    // JWT 토큰을 검증하고 새로운 Access Token을 발급해야 합니다

    const response = {
      tokens: {
        accessToken: "new.access.token.jwt",
        refreshToken: refreshToken, // 또는 새로운 refresh token
        tokenType: "bearer",
        expiresIn: 3600,
        refreshTokenExpiresIn: 604800,
      },
      user: {
        userId: "user-id",
        email: "user@example.com",
        name: "User Name",
        profileImage: "https://example.com/profile.png",
      },
      isNewUser: false,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Token refresh error:", error);
    return NextResponse.json(
      {
        error: "token_refresh_failed",
        message:
          error instanceof Error
            ? error.message
            : "토큰 갱신 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
