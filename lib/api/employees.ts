import { apiClient } from "@/lib/api/client";
import type { CreateEmployeeDTO, Employee, UpdateEmployeeDTO } from "@/types/employee";

export const employeesApi = {
  list: () => apiClient.get<Employee[]>("/employees/list"),
  detail: (id: string) => apiClient.get<Employee>(`/employees/detail/${id}`),
  create: (data: CreateEmployeeDTO) =>
    apiClient.post<Employee>("/employees/create", data),
  update: (id: string, data: UpdateEmployeeDTO) =>
    apiClient.patch<Employee>(`/employees/update/${id}`, data),
  remove: (id: string) => apiClient.delete<void>(`/employees/remove/${id}`),
};
