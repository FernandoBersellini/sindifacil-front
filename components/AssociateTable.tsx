"use client";

import { useState } from "react";
import { useAssociates } from "@/hooks/useAssociates";
import { useRemoveAssociate } from "@/hooks/useAssociateMutations";
import { AssociateForm } from "@/components/AssociateForm";
import { Modal } from "@/components/Modal";
import { formatDateBr } from "@/lib/format";
import type { Associate } from "@/types/associate";

export function AssociateTable() {
  const { data: associates, isLoading, error } = useAssociates();
  const removeAssociate = useRemoveAssociate();
  const [editingAssociate, setEditingAssociate] = useState<Associate | null>(
    null
  );

  if (isLoading) return <p className="text-base text-text/60">Carregando…</p>;
  if (error)
    return (
      <p className="text-base font-medium text-primary">
        Erro ao carregar associados.
      </p>
    );
  if (!associates?.length)
    return (
      <p className="text-base text-text/60">Nenhum associado cadastrado.</p>
    );

  return (
    <>
      <table className="w-full text-left text-base">
        <thead>
          <tr className="rounded-md bg-accent/50">
            <th className="rounded-l-md px-3 py-3 font-semibold">Nome</th>
            <th className="px-3 py-3 font-semibold">Data de nascimento</th>
            <th className="px-3 py-3 font-semibold">Nome da mãe</th>
            <th className="px-3 py-3 font-semibold">Nome do pai</th>
            <th className="px-3 py-3 font-semibold">Matrícula</th>
            <th className="rounded-r-md px-3 py-3" />
          </tr>
        </thead>
        <tbody>
          {associates.map((associate: Associate) => (
            <tr key={associate.id} className="border-b border-text/10">
              <td className="px-3 py-3">{associate.name}</td>
              <td className="px-3 py-3">{formatDateBr(associate.birthDate)}</td>
              <td className="px-3 py-3">{associate.mothersName}</td>
              <td className="px-3 py-3">{associate.fathersName}</td>
              <td className="px-3 py-3">{associate.registrationNumber ?? "—"}</td>
              <td className="px-3 py-3">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setEditingAssociate(associate)}
                    className="rounded-md bg-secondary px-3 py-1.5 text-sm font-medium text-text transition-colors hover:bg-secondary/70"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => removeAssociate.mutate(associate.id)}
                    className="rounded-md border border-primary px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white"
                  >
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        open={editingAssociate !== null}
        onClose={() => setEditingAssociate(null)}
        title="Editar associado"
      >
        {editingAssociate && (
          <AssociateForm
            key={editingAssociate.id}
            associate={editingAssociate}
            onDone={() => setEditingAssociate(null)}
          />
        )}
      </Modal>
    </>
  );
}
