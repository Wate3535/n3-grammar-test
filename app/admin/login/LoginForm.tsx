"use client";

import { useActionState } from "react";
import { adminLogin, type FormState } from "@/app/admin/actions";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState<FormState, FormData>(adminLogin, {
    error: null,
  });

  return (
    <form action={formAction} className="p-6">
      <label htmlFor="password" className="mb-2 block text-sm font-semibold text-slate-700">
        Parol
      </label>
      <input
        id="password"
        name="password"
        type="password"
        required
        autoFocus
        autoComplete="current-password"
        className="h-12 w-full rounded-xl border border-slate-300 px-4 text-slate-900 outline-none focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10"
      />
      <p aria-live="polite" className="mt-3 min-h-5 text-sm text-red-600">
        {pending ? "" : state.error}
      </p>
      <button
        disabled={pending}
        className="mt-2 h-12 w-full rounded-xl bg-slate-900 font-bold text-white hover:bg-slate-800 disabled:opacity-50"
      >
        {pending ? "Tekshirilmoqda…" : "Kirish"}
      </button>
    </form>
  );
}
