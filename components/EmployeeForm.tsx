"use client";

import { useState } from "react";
import { useCreateEmployee, useUpdateEmployee } from "@/hooks/useEmployeeMutations";
import { PasswordField } from "@/components/PasswordField";
import { formatCpf } from "@/lib/format";
import type { Employee } from "@/types/employee";

function toDateInputValue(date: Date) {
  return new Date(date).toISOString().slice(0, 10);
}

const inputClass =
  "rounded-md border border-text/20 bg-background px-3 py-2 text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";
const labelClass = "flex flex-col gap-1 text-base font-medium";

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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className={labelClass}>
        Nome
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
      </label>
      <label className={labelClass}>
        CPF
        <input
          required
          value={cpf}
          onChange={(e) => setCpf(formatCpf(e.target.value))}
          placeholder="000.000.000-00"
          maxLength={14}
          className={inputClass}
        />
      </label>
      {!employee && (
        <>
          <label className={labelClass}>
            Email
            <input
              required
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </label>
          <PasswordField
            label="Senha"
            value={password}
            onChange={setPassword}
            autoComplete="new-password"
          />
        </>
      )}
      <label className={labelClass}>
        Data de nascimento
        <input
          required
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className={inputClass}
        />
      </label>
      <div className="mt-2 flex justify-end gap-2">
        {onDone && (
          <button
            type="button"
            onClick={onDone}
            className="rounded-md border border-text/20 px-5 py-2.5 text-base font-medium transition-colors hover:bg-text/10"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          disabled={isSaving}
          className="rounded-md bg-secondary px-5 py-2.5 text-base font-semibold text-text transition-colors hover:bg-secondary/70 disabled:opacity-50"
        >
          {employee ? "Salvar" : "Adicionar"}
        </button>
      </div>
    </form>
  );
}
