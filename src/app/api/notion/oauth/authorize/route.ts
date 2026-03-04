import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function getFallbackRedirectUri(request: NextRequest) {
  return new URL("/notion/oauth/callback", request.nextUrl.origin).toString();
}

function normalizeNotionAuthorizeUrl(rawUrl: string, request: NextRequest) {
  try {
    const parsed = new URL(rawUrl);
    const isNotionAuthorize =
      parsed.hostname.includes("notion.com") &&
      (parsed.pathname.includes("/oauth2/v2.0/authorize") ||
        parsed.pathname.includes("/v1/oauth/authorize"));

    if (!isNotionAuthorize) {
      return rawUrl;
    }

    const fallbackRedirectUri = getFallbackRedirectUri(request);
    if (!fallbackRedirectUri) {
      return rawUrl;
    }

    const redirectUri = parsed.searchParams.get("redirect_uri");
    // 백엔드가 잘못된 redirect_uri를 내려줘도 프론트 프록시에서 강제 보정
    if (redirectUri !== fallbackRedirectUri) {
      parsed.searchParams.set("redirect_uri", fallbackRedirectUri);
      return parsed.toString();
    }

    return rawUrl;
  } catch {
    return rawUrl;
  }
}

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
      return NextResponse.json(
        { url: normalizeNotionAuthorizeUrl(location, request) },
        { status: 200 }
      );
    }

    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const data = await response.json();
      const url = data?.url || data?.redirectUrl || data?.authorizationUrl;

      if (url) {
        return NextResponse.json(
          { url: normalizeNotionAuthorizeUrl(url, request) },
          { status: 200 }
        );
      }

      return NextResponse.json(data, { status: response.status });
    }

    if (response.ok && response.url) {
      return NextResponse.json(
        { url: normalizeNotionAuthorizeUrl(response.url, request) },
        { status: 200 }
      );
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
