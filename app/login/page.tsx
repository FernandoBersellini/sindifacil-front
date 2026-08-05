"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/useLogin";
import { useAuth } from "@/lib/auth/context";
import { ApiError } from "@/lib/api/client";
import { PasswordField } from "@/components/PasswordField";

export default function LoginPage() {
  const [mode, setMode] = useState<"employee" | "admin">("employee");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { auth, isReady } = useAuth();
  const login = useLogin(mode);

  useEffect(() => {
    if (isReady && auth) {
      router.replace(auth.userRole === "ADMIN" ? "/" : "/associates");
    }
  }, [isReady, auth, router]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login.mutate({ email, password });
  }

  function toggleMode() {
    setMode((m) => (m === "employee" ? "admin" : "employee"));
    login.reset();
  }

  const errorMessage = login.isError
    ? login.error instanceof ApiError
      ? login.error.message
      : "Erro ao entrar."
    : null;

  return (
    <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-6 py-16">
      <div className="rounded-lg border border-text/10 bg-background p-6 shadow-sm">
        <h1 className="mb-6 text-2xl font-semibold">
          {mode === "employee" ? "Entrar" : "Entrar como administrador"}
        </h1>
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
        <button
          type="button"
          onClick={toggleMode}
          className="mt-4 w-full text-center text-sm text-text/60 underline-offset-2 hover:text-text/80 hover:underline"
        >
          {mode === "employee"
            ? "Sou administrador"
            : "Entrar como funcionário"}
        </button>
      </div>
    </div>
  );
}
