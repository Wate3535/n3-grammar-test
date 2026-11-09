import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Supabase faqat serverda, service_role kaliti bilan ishlatiladi.
// Jadvallarda RLS yoqilgan va policy yo'q — brauzerdan to'g'ridan-to'g'ri
// kirib bo'lmaydi, barcha o'qish/yozish shu server kodi orqali.

let client: SupabaseClient | null = null;

export function isSupabaseConfigured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;

  client ??= createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );

  return client;
}

export type AccessCodeRow = {
  level: string;
  code: string;
  updated_at: string;
};

export type StudentRow = {
  id: string;
  name: string;
  // Ustun nomi "phone", lekin unda Telegram nik saqlanadi ("@ali_valiyev").
  phone: string;
  created_at: string;
  last_seen_at: string;
};

export type SectionScore = { correct: number; total: number };

export type AttemptRow = {
  id: string;
  student_id: string;
  student_name: string;
  level: string;
  test_slug: string;
  test_name: string;
  correct: number;
  total: number;
  scaled_score: number;
  max_score: number;
  passed: boolean;
  section_scores: Record<string, SectionScore>;
  answers: Record<string, number>;
  warnings: number;
  duration_sec: number;
  finish_reason: string;
  created_at: string;
};
