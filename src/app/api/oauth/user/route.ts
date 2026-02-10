import { NextRequest, NextResponse } from "next/server";

/**
 * 현재 로그인한 사용자 정보 조회 API Route
 * GET /api/oauth/user
 */
export async function GET(request: NextRequest) {
  try {
    // Authorization 헤더에서 토큰 추출
    const authorization = request.headers.get("Authorization");

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          error: "unauthorized",
          message: "인증 토큰이 필요합니다.",
        },
        { status: 401 }
      );
    }

    const token = authorization.substring(7); // "Bearer " 제거

    // TODO: 실제 백엔드 API 호출 또는 토큰 검증 로직
    // 현재는 Mock 응답을 반환합니다
    // 실제 구현 시:
    // 1. JWT 토큰을 검증하고
    // 2. 토큰에서 사용자 ID를 추출하여
    // 3. 데이터베이스에서 사용자 정보를 조회해야 합니다

    if (!token || token === "invalid") {
      return NextResponse.json(
        {
          error: "invalid_token",
          message: "유효하지 않은 토큰입니다.",
        },
        { status: 401 }
      );
    }

    const user = {
      userId: "user-id",
      email: "user@example.com",
      name: "User Name",
      profileImage: "https://example.com/profile.png",
    };

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Get user info error:", error);
    return NextResponse.json(
      {
        error: "server_error",
        message:
          error instanceof Error
            ? error.message
            : "사용자 정보 조회 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
