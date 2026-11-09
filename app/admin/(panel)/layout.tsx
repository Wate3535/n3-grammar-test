import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { adminLogout } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin";

export const metadata: Metadata = {
  title: "Admin panel",
  robots: { index: false },
};

const NAV = [
  { href: "/admin", label: "Umumiy" },
  { href: "/admin/students", label: "O‘quvchilar" },
  { href: "/admin/analysis", label: "Xatolar tahlili" },
  { href: "/admin/codes", label: "Kodlar" },
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await requireAdmin();

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <Link href="/admin" className="font-bold text-slate-900">
            日本語 Admin
          </Link>
          <nav className="flex flex-wrap items-center gap-1 text-sm">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-1.5 font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                {item.label}
              </Link>
            ))}
            <form action={adminLogout}>
              <button className="rounded-lg px-3 py-1.5 font-semibold text-red-600 hover:bg-red-50">
                Chiqish
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
