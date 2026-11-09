import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/session";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin — kirish",
  robots: { index: false },
};

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-slate-900 px-6 py-6 text-white">
          <p className="text-sm text-slate-300">Admin panel</p>
          <h1 className="mt-1 text-2xl font-bold">Kirish</h1>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
