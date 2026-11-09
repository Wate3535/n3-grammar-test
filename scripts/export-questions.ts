// Test savollarini JSON ko'rinishida chiqaradi (audio va PDF generatorlari uchun).
// Ishga tushirish: npx tsx scripts/export-questions.ts <test-slug>
import { getTest } from "../lib/tests";

const testSlug = process.argv[2] ?? "test-2";
const test = getTest(testSlug);

if (!test) {
  throw new Error(`Unknown test: ${testSlug}`);
}

process.stdout.write(JSON.stringify(test.questions));
