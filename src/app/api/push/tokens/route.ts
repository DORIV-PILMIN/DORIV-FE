import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * FCM 토큰 등록 프록시
 * POST /api/push/tokens
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

    const response = await fetch(`${BACKEND_URL}/push/tokens`, {
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
    console.error("FCM token register error:", error);
    return NextResponse.json(
      {
        error: "token_register_error",
        message:
          error instanceof Error
            ? error.message
            : "FCM 토큰 등록 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}

/**
 * FCM 토큰 삭제 프록시
 * DELETE /api/push/tokens
 */
export async function DELETE(request: NextRequest) {
  try {
    if (!BACKEND_URL) {
      return NextResponse.json(
        { error: "backend_not_configured", message: "백엔드 URL이 설정되지 않았습니다." },
        { status: 503 }
      );
    }

    const authorization = request.headers.get("Authorization");
    const body = await request.json();

    const response = await fetch(`${BACKEND_URL}/push/tokens`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(authorization && { Authorization: authorization }),
      },
      body: JSON.stringify(body),
    });

    if (response.status === 200) {
      return NextResponse.json({ message: "삭제 완료" }, { status: 200 });
    }

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("FCM token delete error:", error);
    return NextResponse.json(
      {
        error: "token_delete_error",
        message:
          error instanceof Error
            ? error.message
            : "FCM 토큰 삭제 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
