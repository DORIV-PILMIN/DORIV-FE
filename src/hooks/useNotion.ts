"use client";

import { useMutation } from "@tanstack/react-query";
import {
  searchNotionPages,
  createNotionPage,
  startNotionOAuth,
} from "@/lib/api/notion";
import {
  NotionSearchPagesRequest,
  CreateNotionPageRequest,
} from "@/types/notion";

export function useSearchNotionPages() {
  return useMutation({
    mutationFn: (request: NotionSearchPagesRequest) => searchNotionPages(request),
  });
}

export function useCreateNotionPage() {
  return useMutation({
    mutationFn: (request: CreateNotionPageRequest) => createNotionPage(request),
  });
}

export function useStartNotionOAuth() {
  return {
    start: startNotionOAuth,
  };
}
