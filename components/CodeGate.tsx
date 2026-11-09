"use client";

import { useActionState, useRef, useState, type ClipboardEvent, type KeyboardEvent } from "react";
import { enterCode, type CodeState } from "@/app/actions";

const LENGTH = 4;

export default function CodeGate() {
  const [state, formAction, pending] = useActionState<CodeState, FormData>(enterCode, {
    error: null,
  });
  const [digits, setDigits] = useState<string[]>(Array(LENGTH).fill(""));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const code = digits.join("");

  // Yuborilgach katakchalar tozalanadi: kod noto'g'ri bo'lsa, darrov qaytadan terish mumkin.
  const submit = (formData: FormData) => {
    setDigits(Array(LENGTH).fill(""));
    formAction(formData);
    requestAnimationFrame(() => inputs.current[0]?.focus());
  };

  const update = (next: string[]) => {
    setDigits(next);
    // 4 ta raqam to'lishi bilan avtomatik yuboriladi.
    if (next.every(Boolean)) {
      requestAnimationFrame(() => formRef.current?.requestSubmit());
    }
  };

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = digit;
    update(next);
    if (digit && index < LENGTH - 1) inputs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, LENGTH);
    if (!pasted) return;
    event.preventDefault();
    const next = Array.from({ length: LENGTH }, (_, i) => pasted[i] ?? "");
    update(next);
    inputs.current[Math.min(pasted.length, LENGTH - 1)]?.focus();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="code-title"
        className="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <div className="bg-blue-600 px-6 py-6 text-white">
          <p className="text-sm font-semibold opacity-90">日本語 模擬テスト</p>
          <h1 id="code-title" className="mt-1 text-2xl font-bold">
            Kirish kodi
          </h1>
          <p className="mt-1 text-sm text-blue-100">
            O‘qituvchingiz bergan 4 xonali kodni kiriting.
          </p>
        </div>

        <form ref={formRef} action={submit} className="p-6">
          <input type="hidden" name="code" value={code} />

          <div className="flex justify-center gap-3">
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(element) => {
                  inputs.current[index] = element;
                }}
                value={digit}
                onChange={(event) => handleChange(index, event.target.value)}
                onKeyDown={(event) => handleKeyDown(index, event)}
                onPaste={handlePaste}
                onFocus={(event) => event.target.select()}
                inputMode="numeric"
                autoComplete="one-time-code"
                autoFocus={index === 0}
                maxLength={1}
                aria-label={`${index + 1}-raqam`}
                readOnly={pending}
                className="h-16 w-14 rounded-xl border-2 border-slate-300 text-center text-3xl font-bold text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/15 disabled:opacity-60"
              />
            ))}
          </div>

          <p aria-live="polite" className="mt-4 min-h-5 text-center text-sm text-red-600">
            {pending ? "" : state.error}
          </p>

          <button
            type="submit"
            disabled={pending || code.length !== LENGTH}
            className="mt-2 h-12 w-full rounded-xl bg-blue-600 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {pending ? "Tekshirilmoqda…" : "Kirish"}
          </button>
        </form>
      </div>
    </div>
  );
}
