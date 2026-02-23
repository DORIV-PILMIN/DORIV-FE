// Push 플랫폼 타입
export type PushPlatform = "WEB" | "ANDROID" | "IOS";

// Push 디바이스 타입
export type PushDeviceType = "ANDROID_WEB" | "IOS_WEB" | "DESKTOP_WEB" | "ANDROID" | "IOS";

// VAPID 공개키 조회 응답
export interface VapidKeyResponse {
  vapidPublicKey: string;
}

// FCM 토큰 등록 요청
export interface RegisterPushTokenRequest {
  token: string;
  platform: PushPlatform;
  device: string;
  deviceType: PushDeviceType;
}

// FCM 토큰 등록 응답
export interface RegisterPushTokenResponse {
  pushTokenId: string;
  token: string;
  platform: PushPlatform;
  deviceType: PushDeviceType;
}

// FCM 토큰 삭제 요청
export interface DeletePushTokenRequest {
  token: string;
}

// 푸시 알림 발송 요청
export interface SendPushNotificationRequest {
  title: string;
  body: string;
  data?: Record<string, string>;
}

// 푸시 알림 발송 응답
export interface SendPushNotificationResponse {
  successCount: number;
  failureCount: number;
  invalidTokenRemoved: number;
}

// 푸시 발송 로그 상태
export type PushLogStatus = "OK" | "FAILED" | "INVALID_TOKEN";

// 푸시 발송 로그 단건
export interface PushLog {
  logId: string;
  pushTokenId: string;
  title: string;
  body: string;
  status: PushLogStatus;
  errorCode?: string;
  createdAt: string;
}

// 푸시 발송 로그 목록 응답
export interface PushLogsResponse {
  logs: PushLog[];
  page: number;
  pageSize: number;
  total: number;
}

// 푸시 로그 조회 파라미터
export interface PushLogsParams {
  page?: number;
  pageSize?: number;
}
