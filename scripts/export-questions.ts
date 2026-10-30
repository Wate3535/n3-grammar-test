// Test savollarini JSON ko'rinishida chiqaradi (audio va PDF generatorlari uchun).
import { questions } from "../questions";
import { questions3 } from "../questions-test-3";

const testSlug = process.argv[2] ?? "test-2";
const testQuestions =
  testSlug === "test-2"
    ? questions
    : testSlug === "test-3"
      ? questions3
      : undefined;

if (!testQuestions) {
  throw new Error(`Unknown test: ${testSlug}`);
}

process.stdout.write(JSON.stringify(testQuestions));
