import apiClient from "@/lib/api/instance";
import {
  MainUserResponse,
  MainNotionResponse,
  MainQuestionResponse,
  MainRecentSession,
  MainStatsResponse,
  MainWaitingQuestion,
} from "@/types/main";

interface MainQuestionResponseRaw {
  waitingQuestion?: MainWaitingQuestion | null;
  watingQuestion?: MainWaitingQuestion | null;
  recentSessions?: MainRecentSession[];
  recentQuestions?: MainRecentSession[];
  recentQuestion?: MainRecentSession | null;
}

/**
 * 메인 사용자 정보 조회
 * GET /main/user
 */
export async function getMainUser(): Promise<MainUserResponse> {
  const { data } = await apiClient.get<MainUserResponse>("/main/user");
  return data;
}

/**
 * 메인 노션 요약 조회
 * GET /main/notion
 */
export async function getMainNotion(): Promise<MainNotionResponse> {
  const { data } = await apiClient.get<MainNotionResponse>("/main/notion");
  return data;
}

/**
 * 메인 질문 요약 조회
 * GET /main/question
 */
export async function getMainQuestion(): Promise<MainQuestionResponse> {
  const { data } = await apiClient.get<MainQuestionResponseRaw>("/main/question");

  const waitingQuestion = data.waitingQuestion ?? data.watingQuestion ?? null;
  const recentSessions =
    data.recentSessions ??
    data.recentQuestions ??
    (data.recentQuestion ? [data.recentQuestion] : []);

  return {
    waitingQuestion,
    recentSessions,
  };
}

/**
 * 메인 학습 통계 조회
 * GET /main/stats
 */
export async function getMainStats(): Promise<MainStatsResponse> {
  const { data } = await apiClient.get<MainStatsResponse>("/main/stats");
  return data;
}
