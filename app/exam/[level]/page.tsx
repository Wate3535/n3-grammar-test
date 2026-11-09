import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import ExamApp from "@/components/ExamApp";
import JlptExamApp from "@/components/JlptExamApp";
import { isLevelId, LEVELS } from "@/lib/levels";
import { getStudentLevel } from "@/lib/session";
import { getTestsByLevel } from "@/lib/tests";

export const metadata: Metadata = {
  title: "Mock test",
};

// Faqat kod orqali shu darajaga kirgan o'quvchi testlarni ko'radi.
// Boshqa darajalarning savollari brauzerga yuborilmaydi.
// JFT-Basic — avvalgi interfeys, JLPT — rasmiy formatdagi alohida interfeys.
export default async function ExamPage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = await params;
  if (!isLevelId(level)) notFound();

  const allowed = await getStudentLevel();
  if (allowed !== level) redirect("/");

  const tests = getTestsByLevel(level).map(({ slug, name, questions }) => ({
    slug,
    name,
    questions,
  }));

  if (LEVELS[level].jlpt) {
    return <JlptExamApp key={level} levelId={level} tests={tests} />;
  }

  return <ExamApp key={level} levelId={level} tests={tests} />;
}
