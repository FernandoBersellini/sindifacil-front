"use client";

import { useState } from "react";
import { useEmployees } from "@/hooks/useEmployees";
import { useRemoveEmployee } from "@/hooks/useEmployeeMutations";
import { EmployeeForm } from "@/components/EmployeeForm";
import { Modal } from "@/components/Modal";
import { formatDateBr } from "@/lib/format";
import type { Employee } from "@/types/employee";

export function EmployeeTable() {
  const { data: employees, isLoading, error } = useEmployees();
  const removeEmployee = useRemoveEmployee();
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  if (isLoading) return <p className="text-base text-text/60">Carregando…</p>;
  if (error)
    return (
      <p className="text-base font-medium text-primary">
        Erro ao carregar colaboradores.
      </p>
    );
  if (!employees?.length)
    return (
      <p className="text-base text-text/60">Nenhum colaborador cadastrado.</p>
    );

  return (
    <>
      <table className="w-full text-left text-base">
        <thead>
          <tr className="rounded-md bg-accent/50">
            <th className="rounded-l-md px-3 py-3 font-semibold">Nome</th>
            <th className="px-3 py-3 font-semibold">CPF</th>
            <th className="px-3 py-3 font-semibold">Data de nascimento</th>
            <th className="rounded-r-md px-3 py-3" />
          </tr>
        </thead>
        <tbody>
          {employees.map((employee: Employee) => (
            <tr key={employee.id} className="border-b border-text/10">
              <td className="px-3 py-3">{employee.name}</td>
              <td className="px-3 py-3">{employee.cpf}</td>
              <td className="px-3 py-3">{formatDateBr(employee.birthDate)}</td>
              <td className="px-3 py-3">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setEditingEmployee(employee)}
                    className="rounded-md bg-secondary px-3 py-1.5 text-sm font-medium text-text transition-colors hover:bg-secondary/70"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => removeEmployee.mutate(employee.id)}
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
        open={editingEmployee !== null}
        onClose={() => setEditingEmployee(null)}
        title="Editar colaborador"
      >
        {editingEmployee && (
          <EmployeeForm
            key={editingEmployee.id}
            employee={editingEmployee}
            onDone={() => setEditingEmployee(null)}
          />
        )}
      </Modal>
    </>
  );
}
