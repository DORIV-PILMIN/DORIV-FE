"use client";

import { useMutation } from "@tanstack/react-query";
import { generateQuestions, submitQuestionAttempt } from "@/lib/api/questions";
import {
  GenerateQuestionsRequest,
  SubmitQuestionAttemptRequest,
} from "@/types/questions";

export function useGenerateQuestions() {
  return useMutation({
    mutationFn: (request: GenerateQuestionsRequest) => generateQuestions(request),
  });
}

export function useSubmitQuestionAttempt() {
  return useMutation({
    mutationFn: ({
      questionId,
      request,
    }: {
      questionId: string;
      request: SubmitQuestionAttemptRequest;
    }) => submitQuestionAttempt(questionId, request),
  });
}
