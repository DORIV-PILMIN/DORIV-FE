"use client";

import Link from "next/link";

export default function InterviewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A90E2] to-[#6B5CE7] relative overflow-hidden">
      {/* Dotted Pattern Background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle, white 1.5px, transparent 1.5px)`,
          backgroundSize: "30px 30px",
        }}
      ></div>

      {/* Top Left Star */}
      <div className="absolute top-12 left-12">
        <div className="relative w-16 h-16">
          <div
            className="absolute inset-0"
            style={{
              clipPath:
                "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            }}
          >
            <div className="w-full h-full bg-[#90EE90] border-[3px] border-black"></div>
          </div>
        </div>
      </div>

      {/* Bottom Left Square */}
      <div className="absolute bottom-12 left-12">
        <div className="w-12 h-12 bg-white border-[3px] border-black"></div>
      </div>

      {/* Right Side Wavy Line */}
      <div className="absolute top-1/4 right-12">
        <svg width="100" height="200" viewBox="0 0 100 200">
          <path
            d="M 20 0 Q 60 50, 20 100 T 20 200"
            stroke="black"
            strokeWidth="3"
            fill="none"
          />
        </svg>
      </div>

      {/* Main Card */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="bg-white border-[6px] border-black rounded-lg p-12 shadow-[8px_8px_0px_rgba(0,0,0,1)] max-w-[600px] w-full relative">
          {/* Active Recall Badge */}
          <div className="flex justify-center mb-8">
            <div className="bg-black text-white px-6 py-2 text-sm font-bold tracking-wider">
              ACTIVE RECALL
            </div>
          </div>

          {/* Title */}
          <h1 className="text-[42px] font-bold text-center mb-4 text-black">
            깜짝 미니 면접!
          </h1>

          {/* Subtitle */}
          <p className="text-center text-gray-600 mb-10 text-lg">
            기억력을 테스트할 시간입니다.
          </p>

          {/* Question Box */}
          <div className="border-[3px] border-black rounded-lg p-8 mb-10 bg-white">
            <p className="text-lg text-center text-black leading-relaxed">
              <span className="bg-[#90EE90] px-2 py-1 font-semibold">
                [은영체제: 레드락]
              </span>{" "}
              에 대해 설명할
              <br />
              준비가 되셨나요?
            </p>
          </div>

          {/* Start Button */}
          <button className="w-full py-4 bg-[#90EE90] text-black border-[3px] border-black rounded-lg font-bold text-lg shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-2">
            <span className="text-xl">▶</span>
            지금 바로 도전
          </button>

          {/* Footer Text */}
          <div className="flex items-center justify-center gap-2 mt-8 text-xs text-gray-600">
            <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
            <span className="font-semibold tracking-wider">
              DORIV LEARNING SYSTEM
            </span>
            <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
