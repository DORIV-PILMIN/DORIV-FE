"use client";

import Link from "next/link";
import { useState } from "react";

export default function QuizPage() {
  const [answer, setAnswer] = useState("");

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 bg-white border-b-2 border-black">
        <div className="flex items-center gap-1">
          <span className="text-2xl font-bold text-black">DORIV</span>
          <span className="text-2xl font-bold text-[#C8FF6D]">.</span>
        </div>

        <Link
          href="/main"
          className="w-12 h-12 border-[3px] border-black bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <span className="text-2xl font-bold">×</span>
        </Link>
      </header>

      {/* Large Question Mark - Left Side */}
      <div className="fixed left-8 top-64 text-[200px] font-bold text-[#E8E8E8] select-none pointer-events-none leading-none z-0">
        ?
      </div>

      {/* Main Content */}
      <main className="max-w-[900px] mx-auto px-8 py-12 relative z-10">
        {/* Question Card */}
        <div className="relative mb-8">
          <div className="bg-white border-[4px] border-black p-8 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
            {/* Active Recall Badge */}
            <div className="inline-block bg-black text-white px-4 py-1.5 text-[11px] font-bold tracking-wider mb-4">
              ACTIVE RECALL
            </div>

            {/* Question Label */}
            <div className="text-[11px] font-bold text-gray-500 tracking-wider mb-3">
              QUESTION
            </div>

            {/* Question Text */}
            <h1 className="text-[28px] font-bold text-black leading-tight">
              운영체제에서 데드락(Deadlock)의 4가지 발생 조건은
              <br />
              무엇인가요?
            </h1>
          </div>
        </div>

        {/* Answer Section */}
        <div className="mb-8">
          <div className="text-[11px] font-bold text-gray-500 tracking-wider mb-3">
            YOUR EXPLANATION
          </div>

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="여기에 답변을 작성해주세요. 키워드를 중심으로 설명해보세요..."
            className="w-full h-[240px] border-[4px] border-black p-6 text-[15px] resize-none outline-none focus:ring-0"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Link
            href="/result"
            className="px-8 py-4 bg-[#C8FF6D] text-black border-[4px] border-black font-bold text-[16px] shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-0 transition-all flex items-center gap-2"
          >
            답변 완료
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </Link>
        </div>
      </main>
    </div>
  );
}
