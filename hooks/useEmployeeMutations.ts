"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { employeesApi } from "@/lib/api/employees";
import { employeesKeys } from "@/hooks/useEmployees";
import type { CreateEmployeeDTO, UpdateEmployeeDTO } from "@/types/employee";

export function useCreateEmployee() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateEmployeeDTO) => employeesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: employeesKeys.all });
    },
  });
}

export function useUpdateEmployee() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateEmployeeDTO }) =>
      employeesApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: employeesKeys.all });
      queryClient.invalidateQueries({ queryKey: employeesKeys.detail(id) });
    },
  });
}

export function useRemoveEmployee() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => employeesApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: employeesKeys.all });
    },
  });
}
