"use client";

import { useMutation } from "@tanstack/react-query";
import { createStudyPlan } from "@/lib/api/study";
import { CreateStudyPlanRequest } from "@/types/study";

export function useCreateStudyPlan() {
  return useMutation({
    mutationFn: (request: CreateStudyPlanRequest) => createStudyPlan(request),
  });
}
