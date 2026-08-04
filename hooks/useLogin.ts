"use client";

import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth";
import { useAuth } from "@/lib/auth/context";
import type { LoginDTO } from "@/types/auth";

export function useLogin() {
  const { login } = useAuth();
  return useMutation({
    mutationFn: (data: LoginDTO) => authApi.loginAdmin(data),
    onSuccess: (data) => login(data),
  });
}
