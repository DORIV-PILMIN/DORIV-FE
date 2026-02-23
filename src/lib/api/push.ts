import apiClient from "@/lib/api/instance";
import {
  VapidKeyResponse,
  RegisterPushTokenRequest,
  RegisterPushTokenResponse,
  DeletePushTokenRequest,
  SendPushNotificationRequest,
  SendPushNotificationResponse,
  PushLogsResponse,
  PushLogsParams,
} from "@/types/push";

/**
 * VAPID 공개키 조회
 * GET /push/vapid-key
 */
export async function getVapidKey(): Promise<VapidKeyResponse> {
  const { data } = await apiClient.get<VapidKeyResponse>("/push/vapid-key");
  return data;
}

/**
 * FCM 토큰 등록
 * POST /push/tokens
 */
export async function registerPushToken(
  request: RegisterPushTokenRequest
): Promise<RegisterPushTokenResponse> {
  const { data } = await apiClient.post<RegisterPushTokenResponse>(
    "/push/tokens",
    request
  );
  return data;
}

/**
 * FCM 토큰 삭제
 * DELETE /push/tokens
 */
export async function deletePushToken(
  request: DeletePushTokenRequest
): Promise<void> {
  await apiClient.delete("/push/tokens", { data: request });
}

/**
 * 내 푸시 알림 발송
 * POST /push/send
 */
export async function sendPushNotification(
  request: SendPushNotificationRequest
): Promise<SendPushNotificationResponse> {
  const { data } = await apiClient.post<SendPushNotificationResponse>(
    "/push/send",
    request
  );
  return data;
}

/**
 * 내 푸시 발송 로그 조회
 * GET /push/logs
 */
export async function getPushLogs(
  params: PushLogsParams = {}
): Promise<PushLogsResponse> {
  const { page = 1, pageSize = 20 } = params;
  const { data } = await apiClient.get<PushLogsResponse>("/push/logs", {
    params: { page, pageSize },
  });
  return data;
}
