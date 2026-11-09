"use server";

import { redirect } from "next/navigation";
import { findLevelByCode } from "@/lib/access";
import { LEVELS } from "@/lib/levels";
import { scoreAttempt } from "@/lib/scoring";
import { normalizeTelegram } from "@/lib/telegram";
import { clearStudentAccess, getStudentLevel, setStudentAccess } from "@/lib/session";
import { getSupabase } from "@/lib/supabase";
import { getTest } from "@/lib/tests";

// =========================================================
// 1. Kirish kodi
// =========================================================

export type CodeState = { error: string | null };

export async function enterCode(_prev: CodeState, formData: FormData): Promise<CodeState> {
  const code = String(formData.get("code") ?? "").trim();

  if (!/^\d{4}$/.test(code)) {
    return { error: "4 xonali kodni kiriting." };
  }

  const level = await findLevelByCode(code);

  if (level === "unavailable") {
    return { error: "Server vaqtincha ishlamayapti. O‘qituvchingizga xabar bering." };
  }

  if (!level) {
    // Kodni tanlab topishni sekinlashtirish uchun kichik kutish.
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { error: "Kod noto‘g‘ri. Qaytadan urinib ko‘ring." };
  }

  await setStudentAccess(level);
  redirect(`/exam/${level}`);
}

export async function leaveExam() {
  await clearStudentAccess();
  redirect("/");
}

// =========================================================
// 2. Natijani saqlash
// Ball serverda qayta hisoblanadi — brauzerdan kelgan ballga ishonilmaydi.
// =========================================================

export type AttemptInput = {
  testSlug: string;
  name: string;
  telegram: string;
  answers: Record<number, number>;
  warnings: number;
  durationSec: number;
  finishReason: "manual" | "timeout" | "warnings";
};

export type SaveResult = { ok: true } | { ok: false; error: string };

export async function saveAttempt(input: AttemptInput): Promise<SaveResult> {
  const level = await getStudentLevel();
  if (!level) {
    return { ok: false, error: "Sessiya tugagan. Kodni qayta kiriting." };
  }

  const test = getTest(String(input?.testSlug));
  if (!test || test.level !== level) {
    return { ok: false, error: "Test topilmadi." };
  }

  const name = String(input.name ?? "").trim().replace(/\s+/g, " ");
  const telegram = normalizeTelegram(String(input.telegram ?? ""));
  if (name.length < 2 || name.length > 80) {
    return { ok: false, error: "Ism noto‘g‘ri." };
  }
  if (!telegram) {
    return { ok: false, error: "Telegram nik noto‘g‘ri." };
  }

  const config = LEVELS[level];

  // Faqat shu testdagi savollar va 0–3 oralig'idagi javoblar qabul qilinadi.
  const answers: Record<string, number> = {};
  for (const q of test.questions) {
    const value = input.answers?.[q.id];
    if (Number.isInteger(value) && value >= 0 && value < q.options.length) {
      answers[String(q.id)] = value;
    }
  }

  const result = scoreAttempt(level, test.questions, answers);
  // JLPT'da 聴解 vaqti audioga bog'liq — zaxira bilan.
  const maxDuration = config.examMinutes * 60 + 1200;
  const durationSec = Math.min(Math.max(Math.round(Number(input.durationSec) || 0), 0), maxDuration);
  const warnings = Math.min(Math.max(Math.round(Number(input.warnings) || 0), 0), 10);
  const finishReason = ["manual", "timeout", "warnings"].includes(input.finishReason)
    ? input.finishReason
    : "manual";

  const supabase = getSupabase();
  if (!supabase) {
    return { ok: false, error: "Ma’lumotlar bazasi ulanmagan." };
  }

  const { data: student, error: studentError } = await supabase
    .from("students")
    // "phone" ustunida o'quvchining Telegram niki saqlanadi (masalan, "@ali_valiyev").
    .upsert({ name, phone: telegram, last_seen_at: new Date().toISOString() }, { onConflict: "phone" })
    .select("id")
    .single();

  if (studentError || !student) {
    console.error("students upsert:", studentError);
    return { ok: false, error: "Natijani saqlab bo‘lmadi. Qayta urinib ko‘ring." };
  }

  const { error: attemptError } = await supabase.from("attempts").insert({
    student_id: student.id,
    student_name: name,
    level,
    test_slug: test.slug,
    test_name: test.name,
    correct: result.correct,
    total: result.total,
    scaled_score: result.scaled,
    max_score: result.maxScore,
    passed: result.passed,
    section_scores: result.sectionScores,
    answers,
    warnings,
    duration_sec: durationSec,
    finish_reason: finishReason,
  });

  if (attemptError) {
    console.error("attempts insert:", attemptError);
    return { ok: false, error: "Natijani saqlab bo‘lmadi. Qayta urinib ko‘ring." };
  }

  return { ok: true };
}
