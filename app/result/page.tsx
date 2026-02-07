"use client";

import Link from "next/link";

export default function ResultPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#7ED957] to-[#8FE66D] relative overflow-hidden">
      {/* Decorative Elements */}
      {/* Star - Top Left */}
      <div className="absolute top-14 left-14">
        <div
          className="w-14 h-14 bg-black"
          style={{
            clipPath:
              "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
          }}
        ></div>
      </div>

      {/* Pentagon - Top Right */}
      <div className="absolute top-16 right-20">
        <div
          className="w-20 h-20 bg-black"
          style={{
            clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
          }}
        ></div>
      </div>

      {/* Lightning - Left Middle */}
      <div className="absolute top-[45%] left-16">
        <svg width="50" height="70" viewBox="0 0 50 70" fill="black">
          <path d="M30 0 L12 30 L25 30 L15 70 L45 25 L30 25 Z" />
        </svg>
      </div>

      {/* Checkmark Circle - Bottom Right */}
      <div className="absolute bottom-24 right-24">
        <div className="w-32 h-32 bg-black rounded-full flex items-center justify-center">
          <svg
            className="w-20 h-20 text-[#7ED957]"
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      {/* Main Card */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="bg-white border-[8px] border-black rounded-none p-14 shadow-[12px_12px_0px_rgba(0,0,0,1)] max-w-[650px] w-full">
          {/* Trophy Icon */}
          <div className="flex justify-center mb-10">
            <div className="relative">
              <div className="w-32 h-32 bg-[#FFD93D] border-[5px] border-black rounded-xl flex items-center justify-center">
                {/* Trophy */}
                <svg width="60" height="60" viewBox="0 0 60 60" fill="black">
                  {/* Cup body */}
                  <path d="M20 15 L20 30 Q20 38 30 38 Q40 38 40 30 L40 15 Z" />
                  {/* Left handle */}
                  <path
                    d="M18 18 Q12 18 12 24 Q12 30 18 30"
                    fill="none"
                    stroke="black"
                    strokeWidth="4"
                  />
                  {/* Right handle */}
                  <path
                    d="M42 18 Q48 18 48 24 Q48 30 42 30"
                    fill="none"
                    stroke="black"
                    strokeWidth="4"
                  />
                  {/* Base */}
                  <rect x="26" y="38" width="8" height="6" />
                  <rect x="22" y="44" width="16" height="4" />
                </svg>
              </div>
              {/* Small Star Decoration */}
              <div className="absolute -top-3 -right-3 w-7 h-7 bg-black transform rotate-45"></div>
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center mb-7">
            <h1 className="text-[36px] font-bold text-black leading-tight">
              🎉 학습 성공!
              <br />
              완전히 이해하셨네요!
            </h1>
          </div>

          {/* Session Info */}
          <div className="text-center mb-10">
            <p className="text-[17px] text-black border-b-[3px] border-black inline-block pb-1 font-medium">
              운영체제: 데드락 세션을 마스터했습니다.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6 mb-10">
            {/* Time */}
            <div className="bg-white border-[4px] border-black p-7 text-center shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              <div className="text-[15px] font-bold text-black mb-3 flex items-center justify-center gap-2">
                <span className="text-lg">⏱️</span>
                답변 시간
              </div>
              <div className="text-[44px] font-bold text-black">45초</div>
            </div>

            {/* Accuracy */}
            <div className="bg-white border-[4px] border-black p-7 text-center shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              <div className="text-[15px] font-bold text-black mb-3 flex items-center justify-center gap-2">
                <span className="text-lg">🧠</span>
                기억 정확도
              </div>
              <div className="text-[44px] font-bold text-black">95%</div>
            </div>
          </div>

          {/* Dashboard Button */}
          <Link
            href="/main"
            className="w-full py-5 bg-black text-white border-[4px] border-black rounded-none font-bold text-[18px] shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-2"
          >
            대시보드로 돌아가기 →
          </Link>
        </div>
      </div>
    </div>
  );
}
