"use client";

import { useQuery } from "@tanstack/react-query";
import { associatesApi } from "@/lib/api/associates";

export const associatesKeys = {
  all: ["associates"] as const,
  detail: (id: number) => ["associates", id] as const,
};

export function useAssociates() {
  return useQuery({
    queryKey: associatesKeys.all,
    queryFn: associatesApi.list,
  });
}

export function useAssociate(id: number) {
  return useQuery({
    queryKey: associatesKeys.detail(id),
    queryFn: () => associatesApi.detail(id),
    enabled: !!id,
  });
}
