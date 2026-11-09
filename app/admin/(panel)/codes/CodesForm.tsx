"use client";

import { useActionState } from "react";
import { updateCodes, type FormState } from "@/app/admin/actions";

type LevelCode = { id: string; label: string; code: string; updatedAt: string | null };

export default function CodesForm({ levels }: { levels: LevelCode[] }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(updateCodes, {
    error: null,
  });

  return (
    <form action={formAction}>
      <div className="space-y-4">
        {levels.map((level) => (
          <div key={level.id} className="flex flex-wrap items-center gap-3">
            <label htmlFor={`code-${level.id}`} className="w-32 font-bold text-slate-900">
              {level.label}
            </label>
            <input
              id={`code-${level.id}`}
              name={level.id}
              defaultValue={level.code}
              required
              inputMode="numeric"
              pattern="\d{4}"
              maxLength={4}
              title="4 ta raqam"
              className="h-11 w-28 rounded-xl border border-slate-300 px-3 text-center font-mono text-xl font-bold tracking-[0.3em] outline-none focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10"
            />
            {level.updatedAt && (
              <span className="text-xs text-slate-400">o‘zgartirilgan: {level.updatedAt}</span>
            )}
          </div>
        ))}
      </div>

      <p
        aria-live="polite"
        className={`mt-4 min-h-5 text-sm ${state.error ? "text-red-600" : "text-green-700"}`}
      >
        {pending ? "" : (state.error ?? state.message)}
      </p>

      <button
        disabled={pending}
        className="mt-2 h-11 rounded-xl bg-slate-900 px-6 font-bold text-white hover:bg-slate-800 disabled:opacity-50"
      >
        {pending ? "Saqlanmoqda…" : "Saqlash"}
      </button>
    </form>
  );
}
