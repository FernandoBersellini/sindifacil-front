"use client";

import { useId, useState } from "react";

const inputClass =
  "rounded-md border border-text/20 bg-background px-3 py-2 text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";

export function PasswordField({
  label,
  value,
  onChange,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: "new-password" | "current-password";
}) {
  const [visible, setVisible] = useState(false);
  const id = useId();

  return (
    <div className="flex flex-col gap-1 text-base font-medium">
      <label htmlFor={id}>{label}</label>
      <div className="flex items-center gap-2">
        <input
          id={id}
          required
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="rounded-md border border-text/20 px-3 py-2 text-sm font-medium transition-colors hover:bg-text/10"
        >
          {visible ? "Ocultar" : "Mostrar"}
        </button>
      </div>
    </div>
  );
}
