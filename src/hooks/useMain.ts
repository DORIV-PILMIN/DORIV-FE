"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getMainUser,
  getMainNotion,
  getMainQuestion,
  getMainStats,
} from "@/lib/api/main";

export const mainKeys = {
  all: ["main"] as const,
  user: () => [...mainKeys.all, "user"] as const,
  notion: () => [...mainKeys.all, "notion"] as const,
  question: () => [...mainKeys.all, "question"] as const,
  stats: () => [...mainKeys.all, "stats"] as const,
};

export function useMainUser() {
  return useQuery({
    queryKey: mainKeys.user(),
    queryFn: getMainUser,
  });
}

export function useMainNotion() {
  return useQuery({
    queryKey: mainKeys.notion(),
    queryFn: getMainNotion,
  });
}

export function useMainQuestion() {
  return useQuery({
    queryKey: mainKeys.question(),
    queryFn: getMainQuestion,
  });
}

export function useMainStats() {
  return useQuery({
    queryKey: mainKeys.stats(),
    queryFn: getMainStats,
  });
}
