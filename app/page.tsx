"use client";

import { AuthGuard } from "@/components/AuthGuard";
import { EmployeeForm } from "@/components/EmployeeForm";
import { EmployeeTable } from "@/components/EmployeeTable";
import { useAuth } from "@/lib/auth/context";

export default function Home() {
  const { auth, logout } = useAuth();

  return (
    <AuthGuard>
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-6 py-16">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Colaboradores</h1>
          <div className="flex items-center gap-3 text-sm opacity-60">
            <span>{auth?.email}</span>
            <button onClick={logout} className="underline hover:opacity-100">
              Sair
            </button>
          </div>
        </div>
        <EmployeeForm />
        <EmployeeTable />
      </div>
    </AuthGuard>
  );
}
