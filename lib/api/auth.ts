import { apiClient } from "@/lib/api/client";
import type { LoginDTO, LoginResponse } from "@/types/auth";

export const authApi = {
  loginAdmin: (data: LoginDTO) =>
    apiClient.post<LoginResponse>("/auth/login/admin", data),
  loginEmployee: (data: LoginDTO) =>
    apiClient.post<LoginResponse>("/auth/login/employee", data),
};
