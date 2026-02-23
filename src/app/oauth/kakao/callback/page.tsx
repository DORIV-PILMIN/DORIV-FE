"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loginWithOAuth, saveTokens, saveUser } from "@/lib/api/auth";
import { clearOAuthState, getRedirectUri } from "@/lib/utils/oauth";

function KakaoCallbackContent() {
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
          throw new Error("카카오 인증에 실패했습니다.");
        }

        if (!code) {
          throw new Error("인증 코드가 없습니다.");
        }

        // localStorage에서 저장된 정보 가져오기
        const codeVerifier = localStorage.getItem("oauth_code_verifier") || "";
        const redirectUri = getRedirectUri("kakao");

        // API 호출
        const response = await loginWithOAuth({
          provider: "kakao",
          code,
          redirectUri,
          codeVerifier,
        });

        // 토큰 및 사용자 정보 저장
        saveTokens(response.tokens);
        saveUser(response.user);

        // 상태 정리
        clearOAuthState();

        // 로그인 성공 시 메인 페이지로 이동
        router.push("/main");
      } catch (err) {
        console.error("Kakao OAuth callback error:", err);
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
              카카오 로그인 처리중
            </h2>
            <p className="text-sm text-gray-600">잠시만 기다려주세요...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function KakaoCallbackPage() {
  return (
    <Suspense>
      <KakaoCallbackContent />
    </Suspense>
  );
}
