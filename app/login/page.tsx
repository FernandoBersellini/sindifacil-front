"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/useLogin";
import { useAuth } from "@/lib/auth/context";
import { ApiError } from "@/lib/api/client";

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
    <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center gap-6 px-6 py-16">
      <h1 className="text-xl font-semibold">Entrar</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="flex flex-col gap-1 text-sm">
          Email
          <input
            required
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded border border-black/15 px-2 py-1 text-sm dark:border-white/15"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Senha
          <input
            required
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded border border-black/15 px-2 py-1 text-sm dark:border-white/15"
          />
        </label>
        {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
        <button
          type="submit"
          disabled={login.isPending}
          className="rounded bg-foreground px-4 py-1.5 text-sm text-background disabled:opacity-50"
        >
          {login.isPending ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </div>
  );
}
