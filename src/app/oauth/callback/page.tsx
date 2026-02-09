"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loginWithOAuth, saveTokens } from "@/lib/api/auth";
import { clearOAuthState, getOAuthState } from "@/lib/utils/oauth";
import { OAuthProvider } from "@/types/auth";

export default function OAuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function handleCallback() {
      try {
        // URL에서 code와 error 파라미터 추출
        const code = searchParams.get("code");
        const errorParam = searchParams.get("error");

        if (errorParam) {
          throw new Error("OAuth 인증에 실패했습니다.");
        }

        if (!code) {
          throw new Error("인증 코드가 없습니다.");
        }

        // localStorage에서 저장된 정보 가져오기
        const provider = getOAuthState();
        const codeVerifier = localStorage.getItem("oauth_code_verifier") || "";

        if (!provider) {
          throw new Error("OAuth 상태 정보가 없습니다.");
        }

        const redirectUri =
          typeof window !== "undefined"
            ? `${window.location.origin}/oauth/callback`
            : "";

        // API 호출
        // codeVerifier가 빈 문자열이어도 백엔드에서 처리하도록 전송
        const response = await loginWithOAuth({
          provider: provider as OAuthProvider,
          code,
          redirectUri,
          codeVerifier,
        });

        // 토큰 저장
        saveTokens(response.tokens);

        // 상태 정리
        clearOAuthState();

        // 신규 사용자면 온보딩, 기존 사용자면 메인 페이지로
        if (response.isNewUser) {
          router.push("/onboarding");
        } else {
          router.push("/main");
        }
      } catch (err) {
        console.error("OAuth callback error:", err);
        setError(
          err instanceof Error ? err.message : "로그인에 실패했습니다."
        );

        // 3초 후 로그인 페이지로 리다이렉트
        setTimeout(() => {
          clearOAuthState();
          router.push("/?error=oauth_failed");
        }, 3000);
      }
    }

    handleCallback();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-[#E8C547] flex items-center justify-center p-5">
      <div className="bg-white border-4 border-black rounded-lg p-10 max-w-md w-full shadow-[8px_8px_0px_rgba(0,0,0,1)]">
        {error ? (
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="relative w-16 h-16 bg-[#FF4444] rounded-full flex items-center justify-center border-4 border-black">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-1 h-6 bg-white rounded-full"></div>
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
            <h2 className="text-xl font-bold mb-2 text-black">로그인 실패</h2>
            <p className="text-sm text-gray-600 mb-4">{error}</p>
            <p className="text-xs text-gray-500">
              잠시 후 로그인 페이지로 이동합니다...
            </p>
          </div>
        ) : (
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h2 className="text-xl font-bold mb-2 text-black">
              로그인 처리중
            </h2>
            <p className="text-sm text-gray-600">잠시만 기다려주세요...</p>
          </div>
        )}
      </div>
    </div>
  );
}
