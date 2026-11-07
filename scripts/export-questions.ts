// Test savollarini JSON ko'rinishida chiqaradi (audio va PDF generatorlari uchun).
import { questions } from "../questions";
import { questions3 } from "../questions-test-3";
import { questions7 } from "../questions-test-7";
import { questions8 } from "../questions-test-8";

const testSlug = process.argv[2] ?? "test-2";
const testQuestions =
  testSlug === "test-2"
    ? questions
    : testSlug === "test-3"
      ? questions3
      : testSlug === "test-7"
        ? questions7
        : testSlug === "test-8"
          ? questions8
        : undefined;

if (!testQuestions) {
  throw new Error(`Unknown test: ${testSlug}`);
}

process.stdout.write(JSON.stringify(testQuestions));
