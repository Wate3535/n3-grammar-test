// Natijani hisoblash — server (saqlash) va client (natija ekrani) bir xil
// funksiyadan foydalanadi, shuning uchun ekrandagi ball va bazadagi ball mos keladi.
//
// JFT-Basic: 10–250, chiziqli, 200 dan o'tadi.
// JLPT: har bir ball guruhi (得点区分) alohida hisoblanadi; o'tish uchun
// umumiy ball 合格点 dan va har bir guruh 基準点 dan past bo'lmasligi kerak.

import { LEVELS, toScaledScore, type LevelId } from "@/lib/levels";
import type { Question } from "@/questions";

export type SectionScore = { correct: number; total: number };

export type GroupResult = {
  id: string;
  title: string;
  subtitle: string;
  correct: number;
  total: number;
  score: number;
  max: number;
  min: number;
  passed: boolean;
};

export type AttemptScore = {
  correct: number;
  total: number;
  scaled: number;
  maxScore: number;
  passed: boolean;
  sectionScores: Record<string, SectionScore>;
  groups: GroupResult[];
};

export function scoreAttempt(
  levelId: LevelId,
  questions: Question[],
  answers: Record<string | number, number | undefined>
): AttemptScore {
  const config = LEVELS[levelId];
  const sectionScores: Record<string, SectionScore> = {};
  let correct = 0;

  for (const q of questions) {
    const key = String(q.section);
    sectionScores[key] ??= { correct: 0, total: 0 };
    sectionScores[key].total += 1;
    if (answers[q.id] === q.answer) {
      sectionScores[key].correct += 1;
      correct += 1;
    }
  }

  const total = questions.length;

  if (!config.jlpt) {
    const scaled = toScaledScore(config, correct, total);
    return {
      correct,
      total,
      scaled,
      maxScore: config.maxScore,
      passed: scaled >= config.passScore,
      sectionScores,
      groups: [],
    };
  }

  const groups = config.jlpt.groups.map((group) => {
    let groupCorrect = 0;
    let groupTotal = 0;
    for (const section of group.sections) {
      groupCorrect += sectionScores[String(section)]?.correct ?? 0;
      groupTotal += sectionScores[String(section)]?.total ?? 0;
    }
    const score = groupTotal > 0 ? Math.round((group.max * groupCorrect) / groupTotal) : 0;
    return {
      id: group.id,
      title: group.title,
      subtitle: group.subtitle,
      correct: groupCorrect,
      total: groupTotal,
      score,
      max: group.max,
      min: group.min,
      passed: score >= group.min,
    };
  });

  const scaled = groups.reduce((sum, group) => sum + group.score, 0);

  return {
    correct,
    total,
    scaled,
    maxScore: config.maxScore,
    passed: scaled >= config.passScore && groups.every((group) => group.passed),
    sectionScores,
    groups,
  };
}
