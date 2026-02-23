import apiClient from "@/lib/api/instance";
import {
  CreateStudyPlanRequest,
  CreateStudyPlanResponse,
} from "@/types/study";

/**
 * 학습 계획 생성
 * POST /study/plans
 */
export async function createStudyPlan(
  request: CreateStudyPlanRequest
): Promise<CreateStudyPlanResponse> {
  const { data } = await apiClient.post<CreateStudyPlanResponse>(
    "/study/plans",
    request
  );
  return data;
}
