import { OAuthProvider } from "@/types/auth";

/**
 * PKCE Code Verifier 생성
 * @returns 랜덤 code verifier (43-128자)
 */
export function generateCodeVerifier(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return base64URLEncode(array);
}

/**
 * Code Verifier로부터 Code Challenge 생성
 * @param verifier - code verifier
 * @returns SHA-256 해시된 code challenge
 */
export async function generateCodeChallenge(
  verifier: string
): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return base64URLEncode(new Uint8Array(digest));
}

/**
 * Base64 URL 인코딩
 */
function base64URLEncode(buffer: Uint8Array): string {
  const base64 = btoa(String.fromCharCode(...buffer));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

/**
 * Provider별 리다이렉트 URI 가져오기
 */
export function getRedirectUri(provider: OAuthProvider): string {
  if (provider === "google") {
    return (
      process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI ||
      "http://localhost:3000/oauth/google/callback"
    );
  } else if (provider === "kakao") {
    return (
      process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI ||
      "http://localhost:3000/oauth/kakao/callback"
    );
  }
  throw new Error(`Unknown OAuth provider: ${provider}`);
}

/**
 * OAuth 로그인 URL 생성
 */
export async function getOAuthLoginUrl(
  provider: OAuthProvider
): Promise<string> {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  // localStorage에 code verifier 저장 (콜백에서 사용)
  if (typeof window !== "undefined") {
    localStorage.setItem("oauth_code_verifier", codeVerifier);
  }

  const redirectUri = getRedirectUri(provider);

  if (provider === "google") {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: "openid email profile",
      code_challenge: codeChallenge,
      code_challenge_method: "S256",
    });
    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  } else if (provider === "kakao") {
    const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID || "";
    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
    });
    return `https://kauth.kakao.com/oauth/authorize?${params.toString()}`;
  }

  throw new Error(`Unknown OAuth provider: ${provider}`);
}

/**
 * OAuth 상태 관리
 */
export function saveOAuthState(provider: OAuthProvider) {
  if (typeof window !== "undefined") {
    localStorage.setItem("oauth_provider", provider);
  }
}

export function getOAuthState(): OAuthProvider | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("oauth_provider") as OAuthProvider | null;
  }
  return null;
}

export function clearOAuthState() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("oauth_provider");
    localStorage.removeItem("oauth_code_verifier");
  }
}
