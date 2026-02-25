"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Header from "@/components/Header";
import { useMainQuestion } from "@/hooks/useMain";
import type { MainRecentSession } from "@/types/main";

type ProblemFilter = "ALL" | "PASS" | "FAIL";

const FILTER_OPTIONS: Array<{ key: ProblemFilter; label: string }> = [
  { key: "ALL", label: "전체" },
  { key: "PASS", label: "통과" },
  { key: "FAIL", label: "실패" },
];

function getStatusStyle(result: MainRecentSession["result"]) {
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

function buildDescription(session: MainRecentSession) {
  const date = new Date(session.createdAt);
  const dateLabel = Number.isNaN(date.getTime())
    ? "날짜 미확인"
    : date.toLocaleDateString("ko-KR");

  return `${dateLabel} · 점수 ${session.score}점`;
}

export default function ProblemsPage() {
  const { data: questionData, isLoading, isError, error } = useMainQuestion();
  const [filter, setFilter] = useState<ProblemFilter>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const recentSessions = questionData?.recentSessions;

  const filteredProblems = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const sessions = recentSessions ?? [];

    return sessions.filter((session) => {
      const matchesFilter = filter === "ALL" || session.result === filter;
      const matchesSearch =
        normalizedQuery.length === 0 ||
        session.title.toLowerCase().includes(normalizedQuery);

      return matchesFilter && matchesSearch;
    });
  }, [recentSessions, filter, searchQuery]);

  const emptyMessage =
    (recentSessions?.length ?? 0) === 0
      ? "아직 풀이한 문제가 없습니다. 메인에서 문제를 시작해 보세요."
      : "검색/필터 조건에 맞는 문제가 없습니다.";

  return (
    <div className="min-h-screen bg-[#FAFAFA] relative">
      <Header variant="simple" />

      <div className="flex">
        <aside className="w-20 min-h-screen bg-white border-r-2 border-black flex flex-col items-center py-10 gap-8">
          <div className="w-10 h-10 flex items-center justify-center">
            <div className="relative w-6 h-6">
              <div
                className="absolute inset-0"
                style={{
                  clipPath:
                    "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                }}
              >
                <div className="w-full h-full bg-black"></div>
              </div>
            </div>
          </div>

          <div className="w-10 h-10 flex items-center justify-center">
            <div className="w-5 h-5 bg-black rotate-45"></div>
          </div>
        </aside>

        <main className="flex-1 px-10 py-10 max-w-[1200px]">
          <h1 className="text-[32px] font-bold mb-8 text-black">전체 문제 리스트</h1>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex gap-3 flex-wrap">
              {FILTER_OPTIONS.map((option) => {
                const isActive = filter === option.key;
                return (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setFilter(option.key)}
                    className={`px-5 py-2 border-2 border-black rounded font-semibold text-sm hover:-translate-y-0.5 transition-transform ${
                      isActive
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center border-2 border-black rounded overflow-hidden w-full md:w-64 bg-white">
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="기록 검색..."
                className="flex-1 px-4 py-2 border-0 outline-none text-sm"
              />
              <div className="px-4 py-2 bg-[#FEE500] border-l-2 border-black flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-black rounded-full relative">
                  <div className="absolute -bottom-[6px] -right-[6px] w-[2px] h-[6px] bg-black rotate-45"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 mb-8">
            {isLoading && (
              <div className="bg-white border-[3px] border-black rounded-lg p-6 shadow-[4px_4px_0px_rgba(0,0,0,1)] text-sm text-gray-700">
                문제 리스트를 불러오는 중입니다.
              </div>
            )}

            {!isLoading && isError && (
              <div className="bg-white border-[3px] border-black rounded-lg p-6 shadow-[4px_4px_0px_rgba(0,0,0,1)] text-sm font-semibold text-[#C0392B]">
                {error instanceof Error
                  ? error.message
                  : "문제 리스트를 불러오지 못했습니다."}
              </div>
            )}

            {!isLoading && !isError && filteredProblems.length === 0 && (
              <div className="bg-white border-[3px] border-black rounded-lg p-6 shadow-[4px_4px_0px_rgba(0,0,0,1)] text-sm text-gray-700">
                {emptyMessage}
              </div>
            )}

            {!isLoading &&
              !isError &&
              filteredProblems.map((session) => {
                const badge = getStatusStyle(session.result);
                const interviewHref = session.questionId
                  ? `/interview?${new URLSearchParams({
                      questionId: session.questionId,
                      title: session.title,
                    }).toString()}`
                  : "/interview";
                return (
                  <Link
                    key={session.attemptId}
                    href={interviewHref}
                    className="block bg-white border-[3px] border-black rounded-lg p-6 shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2 text-black">{session.title}</h3>
                        <p className="text-sm text-gray-600">{buildDescription(session)}</p>
                      </div>

                      <div className="shrink-0">
                        <span
                          className={`px-4 py-2 rounded text-sm font-bold border-2 border-black ${badge.className}`}
                        >
                          {badge.label}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </main>
      </div>

      <div className="fixed bottom-10 right-10">
        <div className="relative w-12 h-12">
          <div
            className="absolute inset-0"
            style={{
              clipPath:
                "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            }}
          >
            <div className="w-full h-full bg-black"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
