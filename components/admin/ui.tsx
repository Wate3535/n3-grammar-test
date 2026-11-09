import Link from "next/link";
import type { ReactNode } from "react";
import { LEVEL_IDS, LEVELS } from "@/lib/levels";

export function PageTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function StatCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <Card>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </Card>
  );
}

export function NotConfigured() {
  return (
    <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
      <b>Supabase ulanmagan.</b> SUPABASE_URL va SUPABASE_SERVICE_ROLE_KEY ni .env.local va
      Vercel → Settings → Environment Variables ga qo‘shing, so‘ng supabase/schema.sql ni SQL
      Editor’da ishga tushiring.
    </div>
  );
}

export function ErrorBox({ message }: { message: string }) {
  return (
    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
      {message}
    </div>
  );
}

export function Bar({ value, tone = "auto" }: { value: number; tone?: "auto" | "blue" }) {
  const color =
    tone === "blue"
      ? "bg-blue-600"
      : value >= 70
        ? "bg-green-500"
        : value >= 50
          ? "bg-amber-500"
          : "bg-red-500";

  return (
    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
      <div className={`h-full ${color}`} style={{ width: `${Math.min(value, 100)}%` }} />
    </div>
  );
}

export function PassBadge({ passed }: { passed: boolean }) {
  return (
    <span
      className={`inline-block rounded-md px-2 py-0.5 text-xs font-bold ${
        passed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
      }`}
    >
      {passed ? "合格" : "不合格"}
    </span>
  );
}

// ?level=n3 kabi filtr tugmalari.
export function LevelFilter({
  basePath,
  active,
  extra = {},
}: {
  basePath: string;
  active?: string;
  extra?: Record<string, string>;
}) {
  const href = (level?: string) => {
    const params = new URLSearchParams(extra);
    if (level) params.set("level", level);
    const query = params.toString();
    return query ? `${basePath}?${query}` : basePath;
  };

  const items = [{ id: undefined, label: "Hammasi" }, ...LEVEL_IDS.map((id) => ({ id, label: LEVELS[id].label }))];

  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {items.map((item) => {
        const selected = (item.id ?? "") === (active ?? "");
        return (
          <Link
            key={item.label}
            href={href(item.id)}
            className={`rounded-lg border px-3 py-1.5 text-sm font-semibold ${
              selected
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
