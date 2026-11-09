"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isLevelId, LEVEL_IDS } from "@/lib/levels";
import {
  checkAdminPassword,
  clearAdminSession,
  isAdmin,
  setAdminSession,
} from "@/lib/session";
import { getSupabase } from "@/lib/supabase";

export type FormState = { error: string | null; message?: string | null };

export async function adminLogin(_prev: FormState, formData: FormData): Promise<FormState> {
  if (!process.env.ADMIN_PASSWORD) {
    return { error: "ADMIN_PASSWORD sozlanmagan (.env.local yoki Vercel)." };
  }

  const password = String(formData.get("password") ?? "");
  if (!checkAdminPassword(password)) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { error: "Parol noto‘g‘ri." };
  }

  await setAdminSession();
  redirect("/admin");
}

export async function adminLogout() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function updateCodes(_prev: FormState, formData: FormData): Promise<FormState> {
  if (!(await isAdmin())) {
    return { error: "Ruxsat yo‘q. Qayta kiring." };
  }

  const supabase = getSupabase();
  if (!supabase) {
    return { error: "Supabase ulanmagan." };
  }

  const rows = LEVEL_IDS.map((level) => ({
    level,
    code: String(formData.get(level) ?? "").trim(),
  }));

  for (const row of rows) {
    if (!isLevelId(row.level) || !/^\d{4}$/.test(row.code)) {
      return { error: "Har bir kod aynan 4 ta raqamdan iborat bo‘lishi kerak." };
    }
  }

  if (new Set(rows.map((row) => row.code)).size !== rows.length) {
    return { error: "Kodlar bir-biridan farq qilishi kerak." };
  }

  // Bitta so'rovda yoziladi; code ustunidagi unique cheklov DEFERRABLE,
  // shuning uchun ikki darajaning kodini almashtirish ham ishlaydi.
  const now = new Date().toISOString();
  const { error } = await supabase
    .from("access_codes")
    .upsert(rows.map((row) => ({ ...row, updated_at: now })));
  if (error) {
    console.error("access_codes:", error);
    return { error: "Saqlab bo‘lmadi." };
  }

  revalidatePath("/admin/codes");
  return { error: null, message: "Kodlar saqlandi." };
}
