"use client";

import Link from "next/link";
import Header from "@/components/Header";
import { useMainUser, useMainQuestion, useMainStats } from "@/hooks/useMain";

function formatBadge(result: "PASS" | "FAIL") {
  if (result === "PASS") {
    return {
      label: "통과",
      className: "bg-[#90EE90] text-black",
    };
  }

  return {
    label: "실패",
    className: "bg-[#FF6B6B] text-white",
  };
}

export default function MainPage() {
  const { data: userData } = useMainUser();
  const { data: questionData, isLoading: isQuestionLoading } = useMainQuestion();
  const { data: statsData } = useMainStats();

  const userName = userData?.name ?? "사용자";
  const waitingQuestion = questionData?.waitingQuestion;
  const recentSessions = questionData?.recentSessions ?? [];
  const flashcardCount = statsData?.flashcardCount ?? 1240;
  const retentionRate = statsData?.retentionRate ?? 84;

  const interviewHref = waitingQuestion
    ? `/interview?${new URLSearchParams({
        questionId: waitingQuestion.questionId,
        title: waitingQuestion.title,
      }).toString()}`
    : "/interview";

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header variant="main" showSearch showProfile />

      <main className="px-10 py-10 max-w-[1400px] mx-auto">
        <div className="mb-8">
          <h1 className="text-[32px] font-bold mb-2 text-black">
            반가워요, {userName}님!
          </h1>
          <p className="text-sm text-black py-2 px-4 border-2 border-black rounded inline-block m-0">
            기억력을 향상시킬 준비가 되셨나요?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          <div className="flex flex-col gap-5">
            <div className="bg-white border-[3px] border-black rounded-lg p-6 shadow-[4px_4px_0px_rgba(0,0,0,1)] relative">
              <div className="mb-4">
                <span className="bg-black text-white px-3 py-1 text-xs rounded font-semibold inline-flex items-center gap-2">
                  <div className="w-3 h-3 border-2 border-white rounded-sm"></div>
                  방문
                </span>
              </div>
              <div className="mb-5 pr-36">
                <p className="text-sm text-gray-600 m-0">
                  <span className="text-black font-semibold">
                    {waitingQuestion?.title ?? "대기 중인 질문이 없습니다."}
                  </span>
                </p>
              </div>
              <Link
                href={interviewHref}
                className="absolute bottom-6 right-6 bg-[#FEE500] text-black border-2 border-black rounded px-6 py-3 text-sm font-bold cursor-pointer hover:-translate-y-0.5 transition-transform"
              >
                지금 시작하기 →
              </Link>
            </div>

            <Link href="/import" className="block">
              <div className="bg-white border-[3px] border-black rounded-lg p-10 shadow-[4px_4px_0px_rgba(0,0,0,1)] relative flex flex-col items-center text-center min-h-[280px] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all cursor-pointer">
                <div className="absolute top-6 left-6 w-4 h-4 bg-[#4A90E2] border-2 border-black rounded-sm"></div>
                <div className="absolute top-6 right-6 w-4 h-4 bg-[#90EE90] rounded-full border-2 border-black"></div>
                <div className="absolute bottom-6 left-6 w-4 h-4 bg-[#FF4444] rounded-full border-2 border-black"></div>
                <div className="absolute bottom-6 right-6 w-4 h-4 bg-[#FEE500] border-2 border-black rounded-sm"></div>

                <div className="flex flex-col items-center gap-4">
                  <div className="relative w-20 h-20 border-4 border-black rounded-full flex items-center justify-center text-5xl font-light text-black group">
                    <div className="absolute inset-0 rounded-full bg-[#FEE500] scale-0 group-hover:scale-110 transition-transform duration-300 ease-out -z-10"></div>
                    <span className="relative z-10">+</span>
                  </div>
                  <h2 className="text-[22px] font-bold m-0 text-black">
                    노션 페이지 불러오기
                  </h2>
                  <p className="text-[13px] text-gray-600 leading-relaxed m-0">
                    최신 노트를 동기화하여 즉시 플래시카드를 생성하세요. 표, 목록,
                    <br />
                    토글을 지원합니다.
                  </p>
                </div>
              </div>
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-[#4A90E2] border-[3px] border-black rounded-lg p-8 text-center shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                <div className="text-sm mb-2 font-semibold text-white">
                  플래시카드
                </div>
                <div className="text-5xl font-bold text-white">
                  {flashcardCount.toLocaleString()}
                </div>
              </div>

              <div className="bg-white border-[3px] border-black rounded-lg p-8 text-center shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                <div className="text-sm mb-2 font-semibold text-black">
                  기억 유지율
                </div>
                <div className="text-5xl font-bold text-black">{retentionRate}%</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="bg-white border-[3px] border-black rounded-lg p-6 shadow-[4px_4px_0px_rgba(0,0,0,1)] h-fit">
              <h3 className="text-lg font-bold mb-5 text-black flex items-center gap-2">
                <div className="w-4 h-5 border-2 border-black rounded-sm bg-white relative">
                  <div className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-2 h-1.5 bg-black rounded-t-sm"></div>
                </div>
                최근 문제
              </h3>

              <div className="flex flex-col gap-4 mb-5">
                {isQuestionLoading && (
                  <div className="p-4 border-2 border-black rounded-md bg-[#FAFAFA] text-sm text-gray-600">
                    최근 문제를 불러오는 중입니다.
                  </div>
                )}

                {!isQuestionLoading && recentSessions.length === 0 && (
                  <div className="p-4 border-2 border-black rounded-md bg-[#FAFAFA] text-sm text-gray-600">
                    최근 문제 이력이 없습니다.
                  </div>
                )}

                {recentSessions.map((session) => {
                  const badge = formatBadge(session.result);
                  return (
                    <div
                      key={session.attemptId}
                      className="flex justify-between items-center p-4 border-2 border-black rounded-md bg-[#FAFAFA]"
                    >
                      <div>
                        <div className="text-sm font-bold text-black">{session.title}</div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded text-[11px] font-bold border-2 border-black ${badge.className}`}
                      >
                        {badge.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              <Link
                href="/problems"
                className="block text-center text-black text-[13px] font-semibold no-underline py-3 border-2 border-black rounded hover:bg-[#FEE500] transition-colors"
              >
                전체 문제 리스트 보기 →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
