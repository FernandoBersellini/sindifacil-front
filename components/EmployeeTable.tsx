"use client";

import { useState } from "react";
import { useEmployees } from "@/hooks/useEmployees";
import { useRemoveEmployee } from "@/hooks/useEmployeeMutations";
import { EmployeeForm } from "@/components/EmployeeForm";
import { formatDateBr } from "@/lib/format";
import type { Employee } from "@/types/employee";

export function EmployeeTable() {
  const { data: employees, isLoading, error } = useEmployees();
  const removeEmployee = useRemoveEmployee();
  const [editingId, setEditingId] = useState<string | null>(null);

  if (isLoading) return <p className="text-sm opacity-60">Carregando…</p>;
  if (error) return <p className="text-sm text-red-600">Erro ao carregar colaboradores.</p>;
  if (!employees?.length) return <p className="text-sm opacity-60">Nenhum colaborador cadastrado.</p>;

  return (
    <table className="w-full text-left text-sm">
      <thead>
        <tr className="border-b border-black/10 dark:border-white/10">
          <th className="py-2 font-medium opacity-60">Nome</th>
          <th className="py-2 font-medium opacity-60">CPF</th>
          <th className="py-2 font-medium opacity-60">Data de nascimento</th>
          <th className="py-2" />
        </tr>
      </thead>
      <tbody>
        {employees.map((employee: Employee) =>
          editingId === employee.id ? (
            <tr key={employee.id} className="border-b border-black/10 dark:border-white/10">
              <td colSpan={4} className="py-2">
                <EmployeeForm
                  key={employee.id}
                  employee={employee}
                  onDone={() => setEditingId(null)}
                />
              </td>
            </tr>
          ) : (
            <tr key={employee.id} className="border-b border-black/10 dark:border-white/10">
              <td className="py-2">{employee.name}</td>
              <td className="py-2">{employee.cpf}</td>
              <td className="py-2">{formatDateBr(employee.birthDate)}</td>
              <td className="py-2 text-right">
                <button
                  onClick={() => setEditingId(employee.id)}
                  className="mr-3 opacity-60 hover:opacity-100"
                >
                  Editar
                </button>
                <button
                  onClick={() => removeEmployee.mutate(employee.id)}
                  className="text-red-600 opacity-60 hover:opacity-100"
                >
                  Excluir
                </button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}
