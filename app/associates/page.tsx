"use client";

import { useState } from "react";
import { AuthGuard } from "@/components/AuthGuard";
import { AssociateForm } from "@/components/AssociateForm";
import { AssociateTable } from "@/components/AssociateTable";
import { Modal } from "@/components/Modal";
import { useAuth } from "@/lib/auth/context";

export default function AssociatesPage() {
  const { auth, logout } = useAuth();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <AuthGuard>
      <div className="mx-auto flex w-[80%] flex-1 flex-col gap-8 px-6 py-12">
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-text/10 bg-accent/50 px-5 py-4">
          <h1 className="text-2xl font-semibold">Associados</h1>
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
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Associados cadastrados</h2>
            <button
              onClick={() => setIsCreateOpen(true)}
              className="rounded-md bg-secondary px-4 py-2 text-base font-semibold text-text transition-colors hover:bg-secondary/70"
            >
              Novo associado
            </button>
          </div>
          <AssociateTable />
        </section>
      </div>

      <Modal
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Novo associado"
      >
        <AssociateForm onDone={() => setIsCreateOpen(false)} />
      </Modal>
    </AuthGuard>
  );
}
