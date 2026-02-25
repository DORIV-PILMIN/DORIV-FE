"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function InterviewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-[#5B7FE8] via-[#5574E5] to-[#6B5CE7]" />}>
      <InterviewPageContent />
    </Suspense>
  );
}

function InterviewPageContent() {
  const searchParams = useSearchParams();
  const questionId = searchParams.get("questionId") ?? "";
  const title = searchParams.get("title") ?? "면접 질문";

  const quizHref = questionId
    ? `/quiz?${new URLSearchParams({ questionId, title }).toString()}`
    : "/quiz";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#5B7FE8] via-[#5574E5] to-[#6B5CE7] relative overflow-hidden">
      {/* Dotted Pattern Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, white 2px, transparent 2px)`,
          backgroundSize: "32px 32px",
        }}
      ></div>

      {/* Top Left Star */}
      <div className="absolute top-16 left-16">
        <div className="relative w-20 h-20">
          <div
            className="absolute inset-0 bg-[#C8FF6D] border-[5px] border-black"
            style={{
              clipPath:
                "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            }}
          ></div>
        </div>
      </div>

      {/* Bottom Left Square */}
      <div className="absolute bottom-20 left-16">
        <div className="w-16 h-16 bg-white border-[5px] border-black"></div>
      </div>

      {/* Right Side Wavy Line */}
      <div className="absolute top-[28%] right-16">
        <svg width="80" height="160" viewBox="0 0 80 160">
          <path
            d="M 30 10 Q 50 40, 30 70 Q 10 100, 30 130"
            stroke="black"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Main Card */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="bg-white border-[8px] border-black rounded-none p-14 shadow-[12px_12px_0px_rgba(0,0,0,1)] max-w-[680px] w-full relative">
          {/* Active Recall Badge */}
          <div className="flex justify-center mb-10">
            <div className="bg-black text-white px-8 py-2.5 text-[13px] font-bold tracking-[0.15em]">
              ACTIVE RECALL
            </div>
          </div>

          {/* Title */}
          <h1 className="text-[48px] font-bold text-center mb-5 text-black leading-tight">
            깜짝 미니 면접!
          </h1>

          {/* Subtitle */}
          <p className="text-center text-gray-700 mb-12 text-[17px]">
            기억력을 테스트할 시간입니다.
          </p>

          {/* Question Box */}
          <div className="border-[4px] border-black rounded-none p-8 mb-12 bg-[#FFFACD]">
            <p className="text-[19px] text-center text-black leading-relaxed font-medium">
              <span className="bg-[#C8FF6D] px-2 py-1 font-bold">
                [{title}]
              </span>{" "}
              에 대해 설명할
              <br />
              준비가 되셨나요?
            </p>
          </div>

          {/* Start Button */}
          <Link
            href={quizHref}
            className="w-full py-5 bg-[#C8FF6D] text-black border-[4px] border-black rounded-none font-bold text-[18px] shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-2"
          >
            <span className="text-xl">▶</span>
            지금 바로 도전
          </Link>

          {/* Footer Text */}
          <div className="flex items-center justify-center gap-3 mt-10 text-[11px] text-gray-500">
            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
            <span className="font-semibold tracking-[0.15em]">
              DORIV LEARNING SYSTEM
            </span>
            <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
