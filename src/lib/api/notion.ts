import apiClient from "@/lib/api/instance";
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
 * GET /notion/oauth/authorize
 */
export function startNotionOAuth() {
  if (typeof window === "undefined") {
    return;
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  window.location.href = `${baseUrl}/notion/oauth/authorize`;
}
