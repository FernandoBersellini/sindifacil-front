"use client";

import { useState } from "react";
import { useCreateAssociate, useUpdateAssociate } from "@/hooks/useAssociateMutations";
import type { Associate } from "@/types/associate";

function toDateInputValue(date: Date) {
  return new Date(date).toISOString().slice(0, 10);
}

const inputClass =
  "rounded-md border border-text/20 bg-background px-3 py-2 text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";
const labelClass = "flex flex-col gap-1 text-base font-medium";

// Render with `key={associate?.id ?? "new"}` from the parent so local state
// resets automatically when switching between create and edit targets.
export function AssociateForm({
  associate,
  onDone,
}: {
  associate?: Associate;
  onDone?: () => void;
}) {
  const [name, setName] = useState(associate?.name ?? "");
  const [mothersName, setMothersName] = useState(associate?.mothersName ?? "");
  const [fathersName, setFathersName] = useState(associate?.fathersName ?? "");
  const [registrationNumber, setRegistrationNumber] = useState(
    associate?.registrationNumber ?? ""
  );
  const [birthDate, setBirthDate] = useState(
    associate ? toDateInputValue(associate.birthDate) : ""
  );

  const createAssociate = useCreateAssociate();
  const updateAssociate = useUpdateAssociate();
  const isSaving = createAssociate.isPending || updateAssociate.isPending;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsedBirthDate = new Date(`${birthDate}T00:00:00`);

    if (associate) {
      updateAssociate.mutate(
        {
          id: associate.id,
          data: {
            name,
            mothersName,
            fathersName,
            birthDate: parsedBirthDate,
            registrationNumber,
          },
        },
        { onSuccess: onDone }
      );
    } else {
      createAssociate.mutate(
        { name, mothersName, fathersName, birthDate: parsedBirthDate },
        {
          onSuccess: () => {
            setName("");
            setMothersName("");
            setFathersName("");
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
        Nome da mãe
        <input
          required
          value={mothersName}
          onChange={(e) => setMothersName(e.target.value)}
          className={inputClass}
        />
      </label>
      <label className={labelClass}>
        Nome do pai
        <input
          required
          value={fathersName}
          onChange={(e) => setFathersName(e.target.value)}
          className={inputClass}
        />
      </label>
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
      {associate && (
        <label className={labelClass}>
          Nº de matrícula
          <input
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            className={inputClass}
          />
        </label>
      )}
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
          {associate ? "Salvar" : "Adicionar"}
        </button>
      </div>
    </form>
  );
}
