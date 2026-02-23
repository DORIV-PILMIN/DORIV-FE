"use client";

import Image from "next/image";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getOAuthLoginUrl, saveOAuthState } from "@/lib/utils/oauth";
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";

function HomeContent() {
  const searchParams = useSearchParams();
  const oauthFailed = searchParams.get("error") === "oauth_failed";
  const [runtimeErrorMessage, setRuntimeErrorMessage] = useState("");
  const [dismissedOAuthError, setDismissedOAuthError] = useState(false);

  const errorMessage =
    runtimeErrorMessage ||
    (oauthFailed && !dismissedOAuthError
      ? "로그인에 실패했습니다.\n다시 시도해주세요."
      : "");
  const showError = Boolean(errorMessage);

  const handleGoogleLogin = async () => {
    try {
      saveOAuthState("google");
      const loginUrl = await getOAuthLoginUrl("google");
      window.location.href = loginUrl;
    } catch (error) {
      console.error("Google login error:", error);
      setRuntimeErrorMessage("Google 로그인을 시작할 수 없습니다.");
    }
  };

  const handleKakaoLogin = async () => {
    try {
      saveOAuthState("kakao");
      const loginUrl = await getOAuthLoginUrl("kakao");
      window.location.href = loginUrl;
    } catch (error) {
      console.error("Kakao login error:", error);
      setRuntimeErrorMessage("카카오 로그인을 시작할 수 없습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-[#E8C547] flex flex-col items-center justify-center p-5 relative">
      <div className="flex flex-col lg:flex-row w-full max-w-[900px] min-h-[550px] bg-white border-4 border-black rounded-lg overflow-hidden shadow-[8px_8px_0px_rgba(0,0,0,1)]">
        {/* Left Section */}
        <div className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col bg-white min-h-[500px] lg:min-h-[550px]">
          <div className="bg-black text-white px-3 py-1 text-[11px] font-bold tracking-wider w-fit mb-5">
            EST. 2026
          </div>

          <Image
            src="/icons/DORIV.png"
            alt="DORIV Logo"
            width={280}
            height={80}
            className="mb-4 sm:mb-5 w-auto h-auto max-w-[200px] sm:max-w-[280px]"
            priority
          />

          <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-black">
            노트에서 기억으로
          </h1>

          <p className="text-sm text-gray-600 mb-6 sm:mb-8 leading-relaxed border-l-[3px] border-black pl-3">
            그저 적지 마세요.
            <br />
            생각을 시작하세요.
          </p>

          <div className="flex flex-col gap-3 mb-6 sm:mb-8">
            <button
              onClick={handleGoogleLogin}
              className="w-full py-3 sm:py-3.5 px-4 sm:px-5 border-2 border-black rounded bg-white text-black text-sm font-semibold flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 transition-transform"
            >
              <FcGoogle className="w-5 h-5" />
              Google로 계속하기
            </button>

            <button
              onClick={handleKakaoLogin}
              className="w-full py-3 sm:py-3.5 px-4 sm:px-5 border-2 border-black rounded bg-[#FEE500] text-black text-sm font-semibold flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 transition-transform"
            >
              <RiKakaoTalkFill className="w-5 h-5" />
              카카오로 계속하기
            </button>
          </div>

          <div className="flex gap-3 sm:gap-4 mt-auto pt-4">
            <a
              href="https://www.notion.so/DORIV-2fdc4c86c5d780ae8737d5782a3bf784"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-black underline hover:no-underline cursor-pointer whitespace-nowrap"
            >
              이용약관
            </a>
            <a
              href="https://www.notion.so/DORIV-2fdc4c86c5d780ae8737d5782a3bf784"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-black underline hover:no-underline cursor-pointer whitespace-nowrap"
            >
              개인정보처리방침
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden lg:flex flex-1 bg-[#E8E8E8] relative items-center justify-center border-l-[3px] border-black min-h-[400px]">
          {/* Background decorations */}
          <div className="absolute top-[30px] right-[30px] w-5 h-5 bg-black rounded-sm"></div>
          <div className="absolute top-[140px] left-[20px] w-5 h-5 bg-[#FF6B6B] border-2 border-black rounded-sm rotate-12"></div>
          <div className="absolute bottom-[60px] left-[50px] w-4 h-4 border-[3px] border-black rounded-full bg-white"></div>

          {/* Plate (outer circle) */}
          <div className="relative w-[300px] h-[300px] bg-white rounded-full border-[5px] border-black flex items-center justify-center shadow-[6px_6px_0px_rgba(0,0,0,0.3)]">
            <div className="relative w-[260px] h-[260px] flex items-center justify-center">

              {/* Egg White - irregular shape */}
              <div className="absolute w-[220px] h-[200px] bg-[#D8E5F0] border-[4px] border-black z-[2]"
                   style={{
                     borderRadius: '48% 52% 45% 55% / 52% 48% 52% 48%',
                     transform: 'rotate(-8deg)'
                   }}>
                {/* Small decorative circles on egg white */}
                <div className="absolute top-[25px] left-[20px] w-2 h-2 bg-white border-2 border-black rounded-full"></div>
                <div className="absolute bottom-[35px] right-[25px] w-2 h-2 bg-white border-2 border-black rounded-full"></div>
              </div>

              {/* Egg Yolk */}
              <div className="absolute w-[85px] h-[85px] bg-[#FFD93D] rounded-full border-[3px] border-black z-[4] flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* Eyes */}
                  <div className="absolute w-[7px] h-[7px] bg-black rounded-full left-[23px] top-[28px]"></div>
                  <div className="absolute w-[7px] h-[7px] bg-black rounded-full right-[23px] top-[28px]"></div>
                  {/* Smile */}
                  <div className="absolute left-1/2 bottom-[22px] -translate-x-1/2 w-[32px] h-[16px] border-[3px] border-black border-t-0 rounded-b-[32px]"></div>
                </div>
              </div>

              {/* Heart - top right - Pure CSS */}
              <div className="absolute top-[15px] right-[15px] z-[5]">
                <div className="relative w-[26px] h-[26px]">
                  {/* Left half of heart */}
                  <div className="absolute left-0 top-0 w-[13px] h-[20px] bg-[#FF6B6B] border-[3px] border-black rounded-tl-full rounded-bl-full"></div>
                  {/* Right half of heart */}
                  <div className="absolute right-0 top-0 w-[13px] h-[20px] bg-[#FF6B6B] border-[3px] border-black rounded-tr-full rounded-br-full border-l-0"></div>
                  {/* Bottom point */}
                  <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-[18px] h-[18px] bg-[#FF6B6B] border-[3px] border-black border-t-0 border-l-0 rotate-45"></div>
                </div>
              </div>

              {/* Green Pencil - right side */}
              <div className="absolute bottom-[25px] right-[5px] z-[5] rotate-[-25deg]">
                {/* Pencil body */}
                <div className="w-[12px] h-[45px] bg-[#90EE90] border-[3px] border-black rounded-t-sm relative">
                  {/* Pencil tip */}
                  <div className="absolute -bottom-[10px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[9px] border-r-[9px] border-t-[12px] border-l-transparent border-r-transparent border-t-[#90EE90]"></div>
                  <div className="absolute -bottom-[11px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[11px] border-r-[11px] border-t-[14px] border-l-transparent border-r-transparent border-t-black z-[-1]"></div>
                </div>
              </div>

              {/* Blue Square - left bottom */}
              <div className="absolute bottom-[30px] left-[15px] w-[28px] h-[28px] bg-[#4A90E2] border-[3px] border-black rounded-sm z-[5] rotate-[-15deg]"></div>

            </div>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {showError && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-[#FF4444] border-4 border-black rounded-md p-4 flex items-center gap-3 shadow-[4px_4px_0px_rgba(0,0,0,1)] min-w-[320px]">
          {/* Warning Icon - Pure CSS */}
          <div className="relative w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-black">
            <div className="flex flex-col items-center gap-[2px]">
              <div className="w-[3px] h-[10px] bg-black rounded-full"></div>
              <div className="w-[3px] h-[3px] bg-black rounded-full"></div>
            </div>
          </div>
          <div className="flex-1 text-white text-sm font-semibold leading-snug whitespace-pre-line">
            {errorMessage}
          </div>
          <button
            onClick={() => {
              if (runtimeErrorMessage) {
                setRuntimeErrorMessage("");
                return;
              }
              setDismissedOAuthError(true);
            }}
            className="bg-transparent border-0 text-white text-2xl cursor-pointer p-0 w-6 h-6 flex items-center justify-center font-bold hover:opacity-80"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}
