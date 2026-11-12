// Barcha testlar ro'yxati. Yangi test qo'shish: savollar faylini yarating
// va shu ro'yxatga qo'shing (sayt, PDF va audio skriptlari shu yerdan oladi).

import { questions as questions2, TEST as TEST_2, type Question } from "@/questions";
import { questions3, TEST_3 } from "@/questions-test-3";
import { questions7, TEST_7 } from "@/questions-test-7";
import { questions9, TEST_9 } from "@/questions-test-9";
import { questions8, TEST_8 } from "@/questions-test-8";
import { questionsN3_1, TEST_N3_1 } from "@/questions-n3-1";
import { questionsN4_1, TEST_N4_1 } from "@/questions-n4-1";
import { questionsN5_1, TEST_N5_1 } from "@/questions-n5-1";
import type { LevelId } from "@/lib/levels";

export type TestDefinition = {
  slug: string;
  name: string;
  level: LevelId;
  questions: Question[];
};

// Har bir daraja ichida yangi testlar birinchi turadi.
export const TESTS: TestDefinition[] = [
  { ...TEST_9, level: "jft", questions: questions9 },
  { ...TEST_8, level: "jft", questions: questions8 },
  { ...TEST_7, level: "jft", questions: questions7 },
  { ...TEST_3, level: "jft", questions: questions3 },
  { ...TEST_2, level: "jft", questions: questions2 },
  { ...TEST_N3_1, level: "n3", questions: questionsN3_1 },
  { ...TEST_N4_1, level: "n4", questions: questionsN4_1 },
  { ...TEST_N5_1, level: "n5", questions: questionsN5_1 },
];

export function getTest(slug: string) {
  return TESTS.find((test) => test.slug === slug);
}

export function getTestsByLevel(level: LevelId) {
  return TESTS.filter((test) => test.level === level);
}
