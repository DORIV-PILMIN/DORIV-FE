export interface CreateStudyPlanRequest {
  pageId: string;
  days: number;
  questionsPerDay: number;
}

export interface StudyPlan {
  planId: string;
  pageId: string;
  days: number;
  questionsPerDay: number;
  totalQuestions: number;
  startsAt: string;
  timezone: string;
}

export interface CreateStudyPlanResponse {
  plan: StudyPlan;
}
