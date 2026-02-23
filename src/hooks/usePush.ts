"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getVapidKey,
  registerPushToken,
  deletePushToken,
  sendPushNotification,
  getPushLogs,
} from "@/lib/api/push";
import {
  RegisterPushTokenRequest,
  DeletePushTokenRequest,
  SendPushNotificationRequest,
  PushLogsParams,
} from "@/types/push";

// Query Key Factory
export const pushKeys = {
  all: ["push"] as const,
  vapidKey: () => [...pushKeys.all, "vapid-key"] as const,
  logs: (params: PushLogsParams) => [...pushKeys.all, "logs", params] as const,
};

/**
 * VAPID 공개키 조회
 */
export function useVapidKey() {
  return useQuery({
    queryKey: pushKeys.vapidKey(),
    queryFn: getVapidKey,
    staleTime: Infinity, // VAPID 키는 자주 바뀌지 않으므로 캐시 유지
  });
}

/**
 * FCM 토큰 등록
 */
export function useRegisterPushToken() {
  return useMutation({
    mutationFn: (request: RegisterPushTokenRequest) =>
      registerPushToken(request),
  });
}

/**
 * FCM 토큰 삭제
 */
export function useDeletePushToken() {
  return useMutation({
    mutationFn: (request: DeletePushTokenRequest) => deletePushToken(request),
  });
}

/**
 * 푸시 알림 발송
 */
export function useSendPushNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: SendPushNotificationRequest) =>
      sendPushNotification(request),
    onSuccess: () => {
      // 발송 성공 시 로그 목록 갱신
      queryClient.invalidateQueries({ queryKey: pushKeys.all });
    },
  });
}

/**
 * 푸시 발송 로그 조회
 */
export function usePushLogs(params: PushLogsParams = {}) {
  return useQuery({
    queryKey: pushKeys.logs(params),
    queryFn: () => getPushLogs(params),
  });
}
