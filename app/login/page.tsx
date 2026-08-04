"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/useLogin";
import { useAuth } from "@/lib/auth/context";
import { ApiError } from "@/lib/api/client";
import { PasswordField } from "@/components/PasswordField";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { auth, isReady } = useAuth();
  const login = useLogin();

  useEffect(() => {
    if (isReady && auth) router.replace("/");
  }, [isReady, auth, router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login.mutate({ email, password });
  }

  const errorMessage = login.isError
    ? login.error instanceof ApiError
      ? login.error.message
      : "Erro ao entrar."
    : null;

  return (
    <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-6 py-16">
      <div className="rounded-lg border border-text/10 bg-background p-6 shadow-sm">
        <h1 className="mb-6 text-2xl font-semibold">Entrar</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-base font-medium">
            Email
            <input
              required
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md border border-text/20 bg-background px-3 py-2 text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </label>
          <PasswordField
            label="Senha"
            value={password}
            onChange={setPassword}
            autoComplete="current-password"
          />
          {errorMessage && (
            <p className="text-base font-medium text-primary">{errorMessage}</p>
          )}
          <button
            type="submit"
            disabled={login.isPending}
            className="mt-2 rounded-md bg-secondary px-4 py-2.5 text-base font-semibold text-text transition-colors hover:bg-secondary/70 disabled:opacity-50"
          >
            {login.isPending ? "Entrando…" : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
