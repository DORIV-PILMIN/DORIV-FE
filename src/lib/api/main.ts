import apiClient from "@/lib/api/instance";
import {
  MainUserResponse,
  MainNotionResponse,
  MainQuestionResponse,
  MainStatsResponse,
} from "@/types/main";

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
  const { data } = await apiClient.get<MainQuestionResponse>("/main/question");
  return data;
}

/**
 * 메인 학습 통계 조회
 * GET /main/stats
 */
export async function getMainStats(): Promise<MainStatsResponse> {
  const { data } = await apiClient.get<MainStatsResponse>("/main/stats");
  return data;
}
