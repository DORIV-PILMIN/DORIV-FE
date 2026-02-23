export interface MainUserResponse {
  userId: string;
  name: string;
  profileImage: string;
  badge: string;
}

export interface MainNotionPage {
  pageId: string;
  notionPageId: string;
  title: string;
  url: string;
  isConnected: boolean;
  syncStatus: string;
}

export interface MainNotionResponse {
  pages: MainNotionPage[];
}

export interface MainWaitingQuestion {
  questionId: string;
  title: string;
}

export interface MainRecentSession {
  attemptId: string;
  questionId: string;
  title: string;
  result: "PASS" | "FAIL";
  score: number;
  createdAt: string;
}

export interface MainQuestionResponse {
  waitingQuestion: MainWaitingQuestion | null;
  recentSessions: MainRecentSession[];
}

export interface MainStatsResponse {
  flashcardCount: number;
  retentionRate: number;
}
