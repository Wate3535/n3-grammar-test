// Darajalar sozlamalari: JFT-Basic A2 va JLPT N3/N4/N5.
// Bu fayl server va client uchun umumiy (maxfiy ma'lumot yo'q).

import type { SectionId } from "@/questions";
import { N3_SPEC, N4_SPEC, N5_SPEC, type JlptSpec } from "@/lib/jlpt";

export const LEVEL_IDS = ["jft", "n3", "n4", "n5"] as const;

export type LevelId = (typeof LEVEL_IDS)[number];

export type SectionMeta = {
  id: SectionId;
  title: string;
  subtitle: string;
  types: string;
};

export type LevelConfig = {
  id: LevelId;
  label: string; // "JFT-Basic A2", "JLPT N3"
  title: string; // yaponcha sarlavha
  examMinutes: number;
  minScore: number;
  maxScore: number;
  passScore: number;
  sections: SectionMeta[];
  passText: string;
  failText: string;
  // Faqat JLPT: qismlar, ball guruhlari (基準点 bilan) va 問題 ko'rsatmalari.
  jlpt?: JlptSpec;
};

const JLPT_SECTIONS: SectionMeta[] = [
  {
    id: 1,
    title: "文字・語彙",
    subtitle: "Kanji va lug‘at",
    types: "漢字読み · 表記 · 文脈規定 · 言い換え類義 · 用法",
  },
  {
    id: 2,
    title: "文法",
    subtitle: "Grammatika",
    types: "文の文法 · 並べ替え · 文章の文法",
  },
  {
    id: 3,
    title: "読解",
    subtitle: "O‘qib tushunish",
    types: "内容理解 · 情報検索",
  },
  {
    id: 4,
    title: "聴解",
    subtitle: "Tinglab tushunish",
    types: "課題理解 · ポイント理解 · 発話表現 · 即時応答",
  },
];

export const LEVELS: Record<LevelId, LevelConfig> = {
  jft: {
    id: "jft",
    label: "JFT-Basic A2",
    title: "国際交流基金日本語基礎テスト",
    examMinutes: 60,
    minScore: 10,
    maxScore: 250,
    passScore: 200,
    sections: [
      {
        id: 1,
        title: "文字と語彙",
        subtitle: "So‘z va lug‘at",
        types: "語の意味 · 語の使い方 · 漢字の読み · 漢字の意味と使い方",
      },
      {
        id: 2,
        title: "会話と表現",
        subtitle: "Suhbat va ifodalar",
        types: "文法 · 表現",
      },
      {
        id: 3,
        title: "聴解",
        subtitle: "Tinglab tushunish",
        types: "会話 · 店・公共の場所 · アナウンス・指示",
      },
      {
        id: 4,
        title: "読解",
        subtitle: "O‘qib tushunish",
        types: "内容理解 · 情報検索",
      },
    ],
    passText: "合格 — A2 darajasi yetarli",
    failText: "不合格 — A2 uchun yetarli emas",
  },
  n3: {
    id: "n3",
    label: "JLPT N3",
    title: "日本語能力試験 N3",
    examMinutes: 140,
    minScore: 0,
    maxScore: 180,
    passScore: 95,
    sections: JLPT_SECTIONS,
    passText: "合格 — N3 darajasi yetarli",
    failText: "不合格 — N3 uchun yetarli emas",
    jlpt: N3_SPEC,
  },
  n4: {
    id: "n4",
    label: "JLPT N4",
    title: "日本語能力試験 N4",
    examMinutes: 115,
    minScore: 0,
    maxScore: 180,
    passScore: 90,
    sections: JLPT_SECTIONS,
    passText: "合格 — N4 darajasi yetarli",
    failText: "不合格 — N4 uchun yetarli emas",
    jlpt: N4_SPEC,
  },
  n5: {
    id: "n5",
    label: "JLPT N5",
    title: "日本語能力試験 N5",
    examMinutes: 90,
    minScore: 0,
    maxScore: 180,
    passScore: 80,
    sections: JLPT_SECTIONS,
    passText: "合格 — N5 darajasi yetarli",
    failText: "不合格 — N5 uchun yetarli emas",
    jlpt: N5_SPEC,
  },
};

export function isLevelId(value: unknown): value is LevelId {
  return typeof value === "string" && (LEVEL_IDS as readonly string[]).includes(value);
}

// To'g'ri javoblar sonidan taxminiy ballni hisoblaydi (chiziqli shkala).
export function toScaledScore(level: LevelConfig, correct: number, total: number) {
  if (total === 0) return level.minScore;
  return Math.round(
    level.minScore + ((level.maxScore - level.minScore) * correct) / total
  );
}

// JFT uchun CEFR darajasi, JLPT uchun 合格/不合格.
export function getGrade(level: LevelConfig, scaled: number) {
  if (level.id === "jft") {
    if (scaled >= 200) return "A2";
    if (scaled >= 175) return "A2.1";
    if (scaled >= 145) return "A1";
    return "—";
  }
  return scaled >= level.passScore ? "合格" : "不合格";
}
