import apiClient from "@/lib/api/instance";
import { getValidAccessToken } from "@/lib/api/auth";
import {
  NotionSearchPagesRequest,
  NotionSearchPagesResponse,
  CreateNotionPageRequest,
  CreateNotionPageResponse,
} from "@/types/notion";

/**
 * 노션 페이지 검색
 * POST /notion/search/pages
 */
export async function searchNotionPages(
  request: NotionSearchPagesRequest
): Promise<NotionSearchPagesResponse> {
  const { data } = await apiClient.post<NotionSearchPagesResponse>(
    "/notion/search/pages",
    request
  );
  return data;
}

/**
 * 노션 페이지 연결
 * POST /notion/pages
 */
export async function createNotionPage(
  request: CreateNotionPageRequest
): Promise<CreateNotionPageResponse> {
  const { data } = await apiClient.post<CreateNotionPageResponse>(
    "/notion/pages",
    request
  );
  return data;
}

/**
 * 노션 OAuth 시작
 * GET /api/notion/oauth/authorize
 */
export async function startNotionOAuth() {
  if (typeof window === "undefined") {
    return;
  }

  const accessToken = await getValidAccessToken();
  if (!accessToken) {
    throw new Error("로그인이 필요합니다.");
  }

  const response = await fetch("/api/notion/oauth/authorize", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(
      data?.message || "노션 권한 연결 요청에 실패했습니다."
    );
  }

  if (!data?.url) {
    throw new Error("노션 인증 URL을 받아오지 못했습니다.");
  }

  window.location.href = data.url;
}
