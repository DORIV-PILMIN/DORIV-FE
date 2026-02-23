import apiClient from "@/lib/api/instance";
import {
  GenerateQuestionsRequest,
  GenerateQuestionsResponse,
  SubmitQuestionAttemptRequest,
  SubmitQuestionAttemptResponse,
} from "@/types/questions";

/**
 * 질문 생성
 * POST /questions/generate
 */
export async function generateQuestions(
  request: GenerateQuestionsRequest
): Promise<GenerateQuestionsResponse> {
  const { data } = await apiClient.post<GenerateQuestionsResponse>(
    "/questions/generate",
    request
  );
  return data;
}

/**
 * 질문 풀이 제출 및 평가
 * POST /questions/{questionId}/attempts
 */
export async function submitQuestionAttempt(
  questionId: string,
  request: SubmitQuestionAttemptRequest
): Promise<SubmitQuestionAttemptResponse> {
  const { data } = await apiClient.post<SubmitQuestionAttemptResponse>(
    `/questions/${questionId}/attempts`,
    request
  );
  return data;
}
