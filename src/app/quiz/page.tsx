"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import { useSubmitQuestionAttempt } from "@/hooks/useQuestions";

export default function QuizPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFAFA]" />}>
      <QuizPageContent />
    </Suspense>
  );
}

function QuizPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [answer, setAnswer] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const questionId = searchParams.get("questionId") ?? "";
  const questionTitle =
    searchParams.get("title") ?? "운영체제에서 데드락(Deadlock)의 4가지 발생 조건은 무엇인가요?";

  const submitAttemptMutation = useSubmitQuestionAttempt();

  const handleSubmit = async () => {
    const trimmedAnswer = answer.trim();

    if (!questionId) {
      setErrorMessage("질문 정보가 없습니다. 메인에서 다시 시작해 주세요.");
      return;
    }

    if (!trimmedAnswer) {
      setErrorMessage("답변을 입력해 주세요.");
      return;
    }

    setErrorMessage(null);

    try {
      const response = await submitAttemptMutation.mutateAsync({
        questionId,
        request: {
          answer: trimmedAnswer,
        },
      });

      const { attempt } = response;
      router.push(
        `/result?${new URLSearchParams({
          title: questionTitle,
          result: attempt.result,
          score: String(attempt.score),
          feedback: attempt.feedback,
        }).toString()}`
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "답변 제출 중 오류가 발생했습니다. 다시 시도해 주세요."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <Header variant="close" closeLink="/main" />

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
              {questionTitle}
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

          {errorMessage && (
            <p className="mt-3 text-sm font-semibold text-[#C0392B]">{errorMessage}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitAttemptMutation.isPending}
            className="px-8 py-4 bg-[#C8FF6D] text-black border-[4px] border-black font-bold text-[16px] shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-0 transition-all flex items-center gap-2"
          >
            {submitAttemptMutation.isPending ? "제출 중..." : "답변 완료"}
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
          </button>
        </div>
      </main>
    </div>
  );
}
