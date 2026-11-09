import Link from "next/link";
import { Bar, Card, ErrorBox, NotConfigured, PageTitle, StatCard } from "@/components/admin/ui";
import { analyseAttempts, percent, requireAdmin } from "@/lib/admin";
import { LEVEL_IDS, LEVELS } from "@/lib/levels";
import { getSupabase, type AttemptRow } from "@/lib/supabase";
import { getTest, TESTS } from "@/lib/tests";

type Row = Pick<AttemptRow, "test_slug" | "level" | "answers">;

export default async function AnalysisPage({
  searchParams,
}: {
  searchParams: Promise<{ test?: string; sort?: string }>;
}) {
  await requireAdmin();
  const params = await searchParams;
  const test = getTest(params.test ?? "") ?? TESTS[0];
  const sortByOrder = params.sort === "order";

  const supabase = getSupabase();
  if (!supabase) {
    return (
      <>
        <PageTitle title="Xatolar tahlili" />
        <NotConfigured />
      </>
    );
  }

  const { data, error } = await supabase
    .from("attempts")
    .select("test_slug, level, answers")
    .eq("test_slug", test.slug)
    .order("created_at", { ascending: false })
    .limit(5000);
  const attempts = (data ?? []) as Row[];

  // Har bir savol bo'yicha: nechta to'g'ri, har bir variant necha marta tanlangan.
  const stats = test.questions.map((q, index) => {
    const choices = q.options.map(() => 0);
    let unanswered = 0;
    for (const attempt of attempts) {
      const chosen = attempt.answers?.[String(q.id)];
      if (chosen === undefined || chosen < 0 || chosen >= choices.length) unanswered += 1;
      else choices[chosen] += 1;
    }
    const correct = choices[q.answer];
    const wrong = attempts.length - correct;
    const topWrong = choices
      .map((count, option) => ({ count, option }))
      .filter((item) => item.option !== q.answer && item.count > 0)
      .sort((a, b) => b.count - a.count)[0];

    return { q, number: index + 1, choices, correct, wrong, unanswered, topWrong };
  });

  const rows = sortByOrder
    ? stats
    : [...stats].sort((a, b) => b.wrong - a.wrong || a.number - b.number);
  const { types } = analyseAttempts(attempts);
  const totalCorrect = stats.reduce((sum, item) => sum + item.correct, 0);
  const average = percent(totalCorrect, attempts.length * test.questions.length);
  const hardest = stats.filter((item) => attempts.length && percent(item.wrong, attempts.length) >= 50).length;

  const query = (next: Record<string, string>) =>
    `/admin/analysis?${new URLSearchParams({ test: test.slug, ...(sortByOrder ? { sort: "order" } : {}), ...next })}`;

  return (
    <>
      <PageTitle title="Xatolar tahlili" subtitle="Qaysi savollarda o‘quvchilar ko‘p xato qilayotganini ko‘ring" />
      {error && <ErrorBox message={`Ma’lumotlarni o‘qib bo‘lmadi: ${error.message}`} />}

      <Card className="mb-6">
        <div className="space-y-3">
          {LEVEL_IDS.map((level) => {
            const levelTests = TESTS.filter((item) => item.level === level);
            if (!levelTests.length) return null;
            return (
              <div key={level} className="flex flex-wrap items-center gap-2">
                <span className="w-28 shrink-0 text-sm font-bold text-slate-700">{LEVELS[level].label}</span>
                {levelTests.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/admin/analysis?test=${item.slug}`}
                    className={`rounded-lg border px-3 py-1.5 text-sm font-semibold ${
                      item.slug === test.slug
                        ? "border-slate-900 bg-slate-900 text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-400"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            );
          })}
        </div>
      </Card>

      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-3">
        <StatCard label="Urinishlar" value={String(attempts.length)} hint={test.name} />
        <StatCard label="O‘rtacha to‘g‘ri" value={attempts.length ? `${average}%` : "—"} />
        <StatCard label="Qiyin savollar" value={String(hardest)} hint="50% va undan ko‘p xato" />
      </div>

      {attempts.length === 0 ? (
        <Card>
          <p className="py-6 text-center text-sm text-slate-500">Bu test bo‘yicha hali natija yo‘q.</p>
        </Card>
      ) : (
        <>
          <Card className="mb-6">
            <h2 className="mb-1 font-bold text-slate-900">Savol turlari bo‘yicha</h2>
            <p className="mb-4 text-xs text-slate-500">Eng zaif tur yuqorida</p>
            <div className="grid gap-x-8 gap-y-3 md:grid-cols-2">
              {types.map((item) => {
                const value = percent(item.correct, item.total);
                return (
                  <div key={item.key}>
                    <div className="mb-1 flex justify-between gap-2 text-sm">
                      <span className="text-slate-700">{item.label.split(" · ")[0]}</span>
                      <span className="font-semibold">{value}% to‘g‘ri</span>
                    </div>
                    <Bar value={value} />
                  </div>
                );
              })}
            </div>
          </Card>

          <Card>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-bold text-slate-900">Savollar</h2>
              <div className="flex gap-2 text-sm">
                <Link
                  href={query({ sort: "errors" })}
                  className={`rounded-lg px-3 py-1 font-semibold ${!sortByOrder ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"}`}
                >
                  Ko‘p xato birinchi
                </Link>
                <Link
                  href={query({ sort: "order" })}
                  className={`rounded-lg px-3 py-1 font-semibold ${sortByOrder ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"}`}
                >
                  Tartib bo‘yicha
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              {rows.map((item) => {
                const errorRate = percent(item.wrong, attempts.length);
                return (
                  <div key={item.q.id} className="rounded-xl border border-slate-200 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-slate-500">
                          {item.number}-savol · {item.q.type}
                        </p>
                        <p className="mt-1 font-semibold whitespace-pre-line text-slate-900">
                          {item.q.image ? `${item.q.image} ` : ""}
                          {item.q.question.replace(/＿/g, "") || item.q.script?.map((line) => line.text).join(" ")}
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-xl font-bold ${
                            errorRate >= 50 ? "text-red-600" : errorRate >= 30 ? "text-amber-600" : "text-green-700"
                          }`}
                        >
                          {errorRate}%
                        </p>
                        <p className="text-xs text-slate-500">
                          xato · {item.wrong}/{attempts.length}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {item.q.options.map((option, optionIndex) => {
                        const share = percent(item.choices[optionIndex], attempts.length);
                        const isAnswer = optionIndex === item.q.answer;
                        return (
                          <div key={optionIndex} className="text-sm">
                            <div className="mb-0.5 flex justify-between gap-2">
                              <span className={isAnswer ? "font-semibold text-green-700" : "text-slate-700"}>
                                {optionIndex + 1}. {option} {isAnswer && "✓"}
                              </span>
                              <span className="text-slate-500">{item.choices[optionIndex]} · {share}%</span>
                            </div>
                            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                              <div
                                className={`h-full ${isAnswer ? "bg-green-500" : "bg-red-400"}`}
                                style={{ width: `${share}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {(item.topWrong || item.unanswered > 0) && (
                      <p className="mt-3 text-xs text-slate-500">
                        {item.topWrong &&
                          `Eng ko‘p tanlangan xato: ${item.topWrong.option + 1}. ${item.q.options[item.topWrong.option]} (${item.topWrong.count} kishi)`}
                        {item.topWrong && item.unanswered > 0 && " · "}
                        {item.unanswered > 0 && `Javobsiz: ${item.unanswered}`}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </>
      )}
    </>
  );
}
