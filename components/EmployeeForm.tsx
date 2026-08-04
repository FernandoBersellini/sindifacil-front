"use client";

import { useState } from "react";
import { useCreateEmployee, useUpdateEmployee } from "@/hooks/useEmployeeMutations";
import { formatCpf } from "@/lib/format";
import type { Employee } from "@/types/employee";

function toDateInputValue(date: Date) {
  return new Date(date).toISOString().slice(0, 10);
}

// Render with `key={employee?.id ?? "new"}` from the parent so local state
// resets automatically when switching between create and edit targets.
export function EmployeeForm({
  employee,
  onDone,
}: {
  employee?: Employee;
  onDone?: () => void;
}) {
  const [name, setName] = useState(employee?.name ?? "");
  const [cpf, setCpf] = useState(employee?.cpf ?? "");
  const [email, setEmail] = useState(employee?.email ?? "");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState(
    employee ? toDateInputValue(employee.birthDate) : ""
  );

  const createEmployee = useCreateEmployee();
  const updateEmployee = useUpdateEmployee();
  const isSaving = createEmployee.isPending || updateEmployee.isPending;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsedBirthDate = new Date(`${birthDate}T00:00:00`);

    if (employee) {
      updateEmployee.mutate(
        { id: employee.id, data: { name, cpf, birthDate: parsedBirthDate } },
        { onSuccess: onDone }
      );
    } else {
      createEmployee.mutate(
        { name, cpf, email, password, birthDate: parsedBirthDate },
        {
          onSuccess: () => {
            setName("");
            setCpf("");
            setEmail("");
            setPassword("");
            setBirthDate("");
            onDone?.();
          },
        }
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-3">
      <label className="flex flex-col gap-1 text-sm">
        Nome
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded border border-black/15 px-2 py-1 text-sm dark:border-white/15"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        CPF
        <input
          required
          value={cpf}
          onChange={(e) => setCpf(formatCpf(e.target.value))}
          placeholder="000.000.000-00"
          maxLength={14}
          className="rounded border border-black/15 px-2 py-1 text-sm dark:border-white/15"
        />
      </label>
      {!employee && (
        <>
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
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded border border-black/15 px-2 py-1 text-sm dark:border-white/15"
            />
          </label>
        </>
      )}
      <label className="flex flex-col gap-1 text-sm">
        Data de nascimento
        <input
          required
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="rounded border border-black/15 px-2 py-1 text-sm dark:border-white/15"
        />
      </label>
      <button
        type="submit"
        disabled={isSaving}
        className="rounded bg-foreground px-4 py-1.5 text-sm text-background disabled:opacity-50"
      >
        {employee ? "Salvar" : "Adicionar"}
      </button>
      {employee && (
        <button
          type="button"
          onClick={onDone}
          className="rounded border border-black/15 px-4 py-1.5 text-sm dark:border-white/15"
        >
          Cancelar
        </button>
      )}
    </form>
  );
}
