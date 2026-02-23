import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Notion OAuth 시작 프록시
 * GET /api/notion/oauth/authorize
 */
export async function GET(request: NextRequest) {
  try {
    if (!BACKEND_URL) {
      return NextResponse.json(
        {
          error: "backend_not_configured",
          message: "백엔드 URL이 설정되지 않았습니다.",
        },
        { status: 503 }
      );
    }

    const authorization = request.headers.get("Authorization");
    if (!authorization) {
      return NextResponse.json(
        {
          error: "unauthorized",
          message: "Authorization header is missing.",
        },
        { status: 401 }
      );
    }

    const response = await fetch(`${BACKEND_URL}/notion/oauth/authorize`, {
      method: "GET",
      headers: {
        Authorization: authorization,
      },
      redirect: "manual",
    });

    const location = response.headers.get("location");
    if (location) {
      return NextResponse.json({ url: location }, { status: 200 });
    }

    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const data = await response.json();
      const url = data?.url || data?.redirectUrl || data?.authorizationUrl;

      if (url) {
        return NextResponse.json({ url }, { status: 200 });
      }

      return NextResponse.json(data, { status: response.status });
    }

    if (response.ok && response.url) {
      return NextResponse.json({ url: response.url }, { status: 200 });
    }

    const message = await response.text();
    return NextResponse.json(
      {
        error: "notion_oauth_error",
        message: message || "노션 OAuth 요청에 실패했습니다.",
      },
      { status: response.status || 500 }
    );
  } catch (error) {
    console.error("Notion oauth authorize error:", error);
    return NextResponse.json(
      {
        error: "notion_oauth_error",
        message:
          error instanceof Error
            ? error.message
            : "노션 OAuth 요청 중 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
