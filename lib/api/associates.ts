import { apiClient } from "@/lib/api/client";
import type {
  Associate,
  CreateAssociateDTO,
  UpdateAssociateDTO,
} from "@/types/associate";

export const associatesApi = {
  list: () => apiClient.get<Associate[]>("/associate"),
  detail: (id: number) => apiClient.get<Associate>(`/associate/${id}`),
  create: (data: CreateAssociateDTO) =>
    apiClient.post<Associate>("/associate", data),
  update: (id: number, data: UpdateAssociateDTO) =>
    apiClient.patch<Associate>(`/associate/${id}`, data),
  remove: (id: number) =>
    apiClient.delete<{ raw: unknown[]; affected: number }>(`/associate/${id}`),
};
