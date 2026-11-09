// JLPT testining 聴解 qismini audio generatori uchun JSON ko'rinishida chiqaradi.
// Ishga tushirish: npx tsx scripts/export-jlpt.ts <test-slug>
import { numberInMondai } from "../lib/jlpt";
import { LEVELS } from "../lib/levels";
import { getTest } from "../lib/tests";

const slug = process.argv[2] ?? "";
const test = getTest(slug);
const spec = test ? LEVELS[test.level].jlpt : undefined;
if (!test || !spec) throw new Error(`Unknown JLPT test: ${slug}`);

const items = test.questions
  .map((q, index) => ({ q, index }))
  .filter(({ q }) => q.section === 4)
  .map(({ q, index }) => ({
    ...q,
    number: numberInMondai(test.questions, index),
  }));

const mondai = spec.mondai
  .filter((m) => m.paper === 3)
  .map((m) => ({ mondai: m.mondai, type: m.type, instruction: m.instruction }));

process.stdout.write(
  JSON.stringify({
    slug: test.slug,
    level: test.level,
    readingPause: spec.readingPauseSeconds,
    mondai,
    items,
  })
);
