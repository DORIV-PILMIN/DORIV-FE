import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * VAPID 공개키 조회 프록시
 * GET /api/push/vapid-key
 */
export async function GET() {
  try {
    if (!BACKEND_URL) {
      return NextResponse.json(
        { error: "backend_not_configured", message: "백엔드 URL이 설정되지 않았습니다." },
        { status: 503 }
      );
    }

    const response = await fetch(`${BACKEND_URL}/push/vapid-key`, {
      method: "GET",
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("VAPID key fetch error:", error);
    return NextResponse.json(
      {
        error: "vapid_key_error",
        message:
          error instanceof Error
            ? error.message
            : "VAPID 공개키 조회 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
