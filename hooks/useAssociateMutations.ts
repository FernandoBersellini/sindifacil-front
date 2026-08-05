"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { associatesApi } from "@/lib/api/associates";
import { associatesKeys } from "@/hooks/useAssociates";
import type { CreateAssociateDTO, UpdateAssociateDTO } from "@/types/associate";

export function useCreateAssociate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateAssociateDTO) => associatesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: associatesKeys.all });
    },
  });
}

export function useUpdateAssociate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateAssociateDTO }) =>
      associatesApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: associatesKeys.all });
      queryClient.invalidateQueries({ queryKey: associatesKeys.detail(id) });
    },
  });
}

export function useRemoveAssociate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => associatesApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: associatesKeys.all });
    },
  });
}
