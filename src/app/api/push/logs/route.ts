import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * 내 푸시 발송 로그 조회 프록시
 * GET /api/push/logs
 */
export async function GET(request: NextRequest) {
  try {
    if (!BACKEND_URL) {
      return NextResponse.json(
        { error: "backend_not_configured", message: "백엔드 URL이 설정되지 않았습니다." },
        { status: 503 }
      );
    }

    const authorization = request.headers.get("Authorization");
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const pageSize = searchParams.get("pageSize") || "20";

    const query = new URLSearchParams({ page, pageSize });

    const response = await fetch(`${BACKEND_URL}/push/logs?${query}`, {
      method: "GET",
      headers: {
        ...(authorization && { Authorization: authorization }),
      },
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Push logs fetch error:", error);
    return NextResponse.json(
      {
        error: "push_logs_error",
        message:
          error instanceof Error
            ? error.message
            : "푸시 발송 로그 조회 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
