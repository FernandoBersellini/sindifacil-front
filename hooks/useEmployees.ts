"use client";

import { useQuery } from "@tanstack/react-query";
import { employeesApi } from "@/lib/api/employees";

export const employeesKeys = {
  all: ["employees"] as const,
  detail: (id: string) => ["employees", id] as const,
};

export function useEmployees() {
  return useQuery({
    queryKey: employeesKeys.all,
    queryFn: employeesApi.list,
  });
}

export function useEmployee(id: string) {
  return useQuery({
    queryKey: employeesKeys.detail(id),
    queryFn: () => employeesApi.detail(id),
    enabled: !!id,
  });
}
