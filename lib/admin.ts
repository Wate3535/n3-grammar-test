import "server-only";

import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/session";
import { getTest } from "@/lib/tests";
import { LEVELS, isLevelId } from "@/lib/levels";
import type { AttemptRow } from "@/lib/supabase";

// Har bir admin sahifasi va ma'lumot o'qishdan oldin chaqiriladi.
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}

const dateFormat = new Intl.DateTimeFormat("ru-RU", {
  timeZone: "Asia/Tashkent",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export function formatDate(value: string) {
  return dateFormat.format(new Date(value));
}

export function daysAgoIso(days: number) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
}

export function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return `${minutes} daq ${String(seconds % 60).padStart(2, "0")} s`;
}

export function levelLabel(level: string) {
  return isLevelId(level) ? LEVELS[level].label : level;
}

export function percent(part: number, total: number) {
  return total > 0 ? Math.round((part / total) * 100) : 0;
}

export const FINISH_REASONS: Record<string, string> = {
  manual: "O‘zi yakunladi",
  timeout: "Vaqt tugadi",
  warnings: "3 ta warning",
};

// Bir nechta urinish bo'yicha savol turlari (語の意味, 文法, ...) va
// bo'limlar kesimida to'g'ri javoblar ulushini hisoblaydi.
export type Breakdown = { key: string; label: string; correct: number; total: number };

export function analyseAttempts(attempts: Pick<AttemptRow, "test_slug" | "level" | "answers">[]) {
  const byType = new Map<string, Breakdown>();
  const bySection = new Map<string, Breakdown>();

  for (const attempt of attempts) {
    const test = getTest(attempt.test_slug);
    if (!test || !isLevelId(attempt.level)) continue;
    const config = LEVELS[attempt.level];

    for (const q of test.questions) {
      const ok = attempt.answers?.[String(q.id)] === q.answer;

      const typeKey = `${attempt.level}:${q.type}`;
      const type = byType.get(typeKey) ?? {
        key: typeKey,
        label: `${q.type} · ${config.label}`,
        correct: 0,
        total: 0,
      };
      type.total += 1;
      if (ok) type.correct += 1;
      byType.set(typeKey, type);

      const meta = config.sections.find((section) => section.id === q.section);
      const sectionKey = `${attempt.level}:${q.section}`;
      const section = bySection.get(sectionKey) ?? {
        key: sectionKey,
        label: `${meta?.title ?? q.section} (${meta?.subtitle ?? ""}) · ${config.label}`,
        correct: 0,
        total: 0,
      };
      section.total += 1;
      if (ok) section.correct += 1;
      bySection.set(sectionKey, section);
    }
  }

  const sortWeakFirst = (items: Breakdown[]) =>
    items.sort((a, b) => a.correct / a.total - b.correct / b.total);

  return {
    types: sortWeakFirst([...byType.values()]),
    sections: sortWeakFirst([...bySection.values()]),
  };
}
