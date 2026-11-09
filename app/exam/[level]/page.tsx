import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import ExamApp from "@/components/ExamApp";
import { isLevelId, LEVELS } from "@/lib/levels";
import { getStudentLevel } from "@/lib/session";
import { getTestsByLevel } from "@/lib/tests";

export const metadata: Metadata = {
  title: "Mock test",
};

// Faqat kod orqali shu darajaga kirgan o'quvchi testlarni ko'radi.
// Boshqa darajalarning savollari brauzerga yuborilmaydi.
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

  return <ExamApp key={level} levelId={LEVELS[level].id} tests={tests} />;
}
