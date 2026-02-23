export interface GenerateQuestionsRequest {
  snapshotId: string;
  questionsCount: number;
}

export interface GeneratedQuestion {
  questionId: string;
  prompt: string;
}

export interface GenerateQuestionsResponse {
  questions: GeneratedQuestion[];
}

export interface SubmitQuestionAttemptRequest {
  answer: string;
}

export interface QuestionAttempt {
  attemptId: string;
  questionId: string;
  result: "PASS" | "FAIL";
  score: number;
  feedback: string;
}

export interface SubmitQuestionAttemptResponse {
  attempt: QuestionAttempt;
}
