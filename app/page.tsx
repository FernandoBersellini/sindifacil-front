"use client";

import { AuthGuard } from "@/components/AuthGuard";
import { EmployeeForm } from "@/components/EmployeeForm";
import { EmployeeTable } from "@/components/EmployeeTable";
import { useAuth } from "@/lib/auth/context";

export default function Home() {
  const { auth, logout } = useAuth();

  return (
    <AuthGuard>
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-12">
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-text/10 bg-accent/50 px-5 py-4">
          <h1 className="text-2xl font-semibold">Colaboradores</h1>
          <div className="flex items-center gap-4">
            <span className="text-base text-text/70">{auth?.email}</span>
            <button
              onClick={logout}
              className="rounded-md border border-primary px-4 py-2 text-base font-medium text-primary transition-colors hover:bg-primary hover:text-white"
            >
              Sair
            </button>
          </div>
        </header>

        <section className="rounded-lg border border-text/10 bg-background p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Novo colaborador</h2>
          <EmployeeForm />
        </section>

        <section className="rounded-lg border border-text/10 bg-background p-5 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Colaboradores cadastrados</h2>
          <EmployeeTable />
        </section>
      </div>
    </AuthGuard>
  );
}
