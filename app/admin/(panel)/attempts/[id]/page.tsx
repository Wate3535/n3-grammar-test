import Link from "next/link";
import { notFound } from "next/navigation";
import { Bar, Card, NotConfigured, PassBadge, PageTitle, StatCard } from "@/components/admin/ui";
import {
  FINISH_REASONS,
  formatDate,
  formatDuration,
  levelLabel,
  percent,
  requireAdmin,
} from "@/lib/admin";
import { isLevelId, LEVELS } from "@/lib/levels";
import { getSupabase, type AttemptRow } from "@/lib/supabase";
import { scoreAttempt } from "@/lib/scoring";
import { getTest } from "@/lib/tests";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function AttemptPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  if (!UUID.test(id)) notFound();

  const supabase = getSupabase();
  if (!supabase) return <NotConfigured />;

  const { data } = await supabase.from("attempts").select("*").eq("id", id).maybeSingle();
  const attempt = data as AttemptRow | null;
  if (!attempt) notFound();

  const test = getTest(attempt.test_slug);
  const sections = isLevelId(attempt.level) ? LEVELS[attempt.level].sections : [];
  const wrongCount = attempt.total - attempt.correct;
  // JLPT: 得点区分 (基準点 bilan) saqlangan javoblardan qayta hisoblanadi.
  const groups =
    test && isLevelId(attempt.level) ? scoreAttempt(attempt.level, test.questions, attempt.answers ?? {}).groups : [];

  return (
    <>
      <Link href={`/admin/students/${attempt.student_id}`} className="text-sm text-slate-500 hover:text-slate-900">
        ← {attempt.student_name}
      </Link>
      <div className="mt-2">
        <PageTitle
          title={`${levelLabel(attempt.level)} · ${attempt.test_name}`}
          subtitle={`${attempt.student_name} · ${formatDate(attempt.created_at)}`}
        />
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Ball" value={`${attempt.scaled_score} / ${attempt.max_score}`} />
        <StatCard label="To‘g‘ri" value={`${attempt.correct} / ${attempt.total}`} hint={`${wrongCount} ta xato`} />
        <StatCard label="Vaqt" value={formatDuration(attempt.duration_sec)} hint={FINISH_REASONS[attempt.finish_reason]} />
        <StatCard label="Warning" value={String(attempt.warnings)} />
      </div>

      {groups.length > 0 && (
        <div className="mb-6 grid gap-3 md:grid-cols-3">
          {groups.map((group) => (
            <Card key={group.id} className={group.passed ? "" : "border-red-200! bg-red-50!"}>
              <p className="text-sm font-bold text-slate-900">{group.title}</p>
              <p className="mt-1 text-2xl font-bold text-slate-900">
                {group.score} <span className="text-base text-slate-500">/ {group.max}</span>
              </p>
              <p className={`mt-1 text-xs ${group.passed ? "text-slate-500" : "font-semibold text-red-700"}`}>
                基準点 {group.min} · {group.correct}/{group.total} to‘g‘ri {group.passed ? "✓" : "✗ minimumdan past"}
              </p>
            </Card>
          ))}
        </div>
      )}

      <Card className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-bold text-slate-900">Bo‘limlar</h2>
          <PassBadge passed={attempt.passed} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {sections.map((section) => {
            const score = attempt.section_scores?.[String(section.id)];
            if (!score) return null;
            const value = percent(score.correct, score.total);
            return (
              <div key={section.id}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-slate-700">
                    {section.id}. {section.title} <span className="text-slate-400">({section.subtitle})</span>
                  </span>
                  <span className="font-semibold">
                    {score.correct}/{score.total} · {value}%
                  </span>
                </div>
                <Bar value={value} />
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <h2 className="mb-4 font-bold text-slate-900">Javoblar</h2>
        {!test ? (
          <p className="text-sm text-slate-500">Bu test saytdan olib tashlangan, savollarni ko‘rsatib bo‘lmaydi.</p>
        ) : (
          <div className="space-y-3">
            {test.questions.map((q, index) => {
              const chosen = attempt.answers?.[String(q.id)];
              const correct = chosen === q.answer;

              return (
                <div
                  key={q.id}
                  className={`rounded-xl border p-4 ${
                    correct ? "border-green-200 bg-green-50/60" : "border-red-200 bg-red-50/60"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white ${
                        correct ? "bg-green-600" : "bg-red-600"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="mb-1 text-xs text-slate-500">{q.type}</p>
                      <p className="font-semibold whitespace-pre-line text-slate-900">
                        {q.image ? `${q.image} ` : ""}
                        {q.question.replace(/＿/g, "") || q.script?.map((line) => line.text).join(" ")}
                      </p>
                      <div className="mt-2 grid gap-1 sm:grid-cols-2">
                        {q.options.map((option, optionIndex) => (
                          <p
                            key={optionIndex}
                            className={`rounded-lg border px-3 py-1 text-sm ${
                              optionIndex === q.answer
                                ? "border-green-300 bg-green-100 font-semibold text-green-800"
                                : optionIndex === chosen
                                  ? "border-red-300 bg-red-100 font-semibold text-red-800"
                                  : "border-slate-200 bg-white text-slate-600"
                            }`}
                          >
                            {optionIndex + 1}. {option}
                            {optionIndex === q.answer && " ✓"}
                            {optionIndex === chosen && optionIndex !== q.answer && " ✗"}
                          </p>
                        ))}
                      </div>
                      {chosen === undefined && (
                        <p className="mt-2 text-sm font-semibold text-slate-500">Javob berilmagan</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </>
  );
}
