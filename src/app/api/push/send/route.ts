import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * 내 푸시 알림 발송 프록시
 * POST /api/push/send
 */
export async function POST(request: NextRequest) {
  try {
    if (!BACKEND_URL) {
      return NextResponse.json(
        { error: "backend_not_configured", message: "백엔드 URL이 설정되지 않았습니다." },
        { status: 503 }
      );
    }

    const authorization = request.headers.get("Authorization");
    const body = await request.json();

    const response = await fetch(`${BACKEND_URL}/push/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authorization && { Authorization: authorization }),
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Push send error:", error);
    return NextResponse.json(
      {
        error: "push_send_error",
        message:
          error instanceof Error
            ? error.message
            : "푸시 알림 발송 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
