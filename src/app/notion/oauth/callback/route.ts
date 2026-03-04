import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(
  /\/$/,
  ""
);

function getBackendCallbackUrl(request: NextRequest): string {
  if (!BACKEND_URL) {
    return "";
  }

  try {
    return new URL("/notion/oauth/callback", BACKEND_URL).toString();
  } catch {
    try {
      return new URL(
        `${BACKEND_URL}/notion/oauth/callback`,
        request.nextUrl.origin
      ).toString();
    } catch {
      return "";
    }
  }
}

function getImportRedirectUrl(
  request: NextRequest,
  status: "success" | "cancelled" | "failed",
  detail?: string
) {
  const redirectUrl = new URL("/import", request.nextUrl.origin);
  redirectUrl.searchParams.set("notion_oauth", status);
  if (detail) {
    redirectUrl.searchParams.set("notion_oauth_detail", detail);
  }
  return redirectUrl;
}

export async function GET(request: NextRequest) {
  const error = request.nextUrl.searchParams.get("error");
  const code = request.nextUrl.searchParams.get("code");

  if (error === "access_denied") {
    return NextResponse.redirect(getImportRedirectUrl(request, "cancelled"));
  }

  if (!code) {
    return NextResponse.redirect(
      getImportRedirectUrl(request, "failed", error || "missing_code")
    );
  }

  const backendCallbackUrl = getBackendCallbackUrl(request);
  if (!backendCallbackUrl) {
    return NextResponse.redirect(
      getImportRedirectUrl(request, "failed", "backend_not_configured")
    );
  }

  try {
    const callbackUrl = new URL(backendCallbackUrl);
    request.nextUrl.searchParams.forEach((value, key) => {
      callbackUrl.searchParams.set(key, value);
    });

    const response = await fetch(callbackUrl.toString(), {
      method: "GET",
      redirect: "manual",
    });

    const isSuccessful =
      response.ok || (response.status >= 300 && response.status < 400);

    if (!isSuccessful) {
      return NextResponse.redirect(
        getImportRedirectUrl(request, "failed", "backend_callback_failed")
      );
    }

    return NextResponse.redirect(getImportRedirectUrl(request, "success"));
  } catch (error) {
    console.error("Notion oauth callback proxy error:", error);
    return NextResponse.redirect(
      getImportRedirectUrl(request, "failed", "callback_exception")
    );
  }
}
