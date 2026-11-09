import Link from "next/link";
import {
  Bar,
  Card,
  ErrorBox,
  LevelFilter,
  NotConfigured,
  PassBadge,
  PageTitle,
  StatCard,
} from "@/components/admin/ui";
import { daysAgoIso, formatDate, levelLabel, percent, requireAdmin } from "@/lib/admin";
import { isLevelId, LEVEL_IDS, LEVELS } from "@/lib/levels";
import { getSupabase, type AttemptRow } from "@/lib/supabase";

type StatRow = Pick<AttemptRow, "level" | "correct" | "total" | "passed" | "created_at">;
type RecentRow = Pick<
  AttemptRow,
  | "id"
  | "student_id"
  | "student_name"
  | "level"
  | "test_name"
  | "scaled_score"
  | "max_score"
  | "passed"
  | "correct"
  | "total"
  | "created_at"
>;

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ level?: string }>;
}) {
  await requireAdmin();
  const { level } = await searchParams;
  const levelFilter = isLevelId(level) ? level : undefined;

  const supabase = getSupabase();
  if (!supabase) {
    return (
      <>
        <PageTitle title="Umumiy ko‘rinish" />
        <NotConfigured />
      </>
    );
  }

  const weekAgo = daysAgoIso(7);

  let recentQuery = supabase
    .from("attempts")
    .select(
      "id, student_id, student_name, level, test_name, scaled_score, max_score, passed, correct, total, created_at"
    )
    .order("created_at", { ascending: false })
    .limit(30);
  if (levelFilter) recentQuery = recentQuery.eq("level", levelFilter);

  const [studentsCount, statsResult, recentResult] = await Promise.all([
    supabase.from("students").select("id", { count: "exact", head: true }),
    supabase
      .from("attempts")
      .select("level, correct, total, passed, created_at")
      .order("created_at", { ascending: false })
      .limit(2000),
    recentQuery,
  ]);

  const error = studentsCount.error ?? statsResult.error ?? recentResult.error;
  const stats = (statsResult.data ?? []) as StatRow[];
  const recent = (recentResult.data ?? []) as RecentRow[];

  const lastWeek = stats.filter((row) => row.created_at >= weekAgo).length;
  const passedCount = stats.filter((row) => row.passed).length;

  return (
    <>
      <PageTitle title="Umumiy ko‘rinish" subtitle="O‘quvchilar natijalari va darajalar bo‘yicha statistika" />
      {error && <ErrorBox message={`Ma’lumotlarni o‘qib bo‘lmadi: ${error.message}`} />}

      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="O‘quvchilar" value={String(studentsCount.count ?? 0)} />
        <StatCard label="Urinishlar" value={String(stats.length)} />
        <StatCard label="Oxirgi 7 kun" value={String(lastWeek)} hint="urinish" />
        <StatCard
          label="O‘tganlar"
          value={`${percent(passedCount, stats.length)}%`}
          hint={`${passedCount} / ${stats.length}`}
        />
      </div>

      <Card className="mb-6">
        <h2 className="mb-4 font-bold text-slate-900">Darajalar bo‘yicha</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {LEVEL_IDS.map((id) => {
            const rows = stats.filter((row) => row.level === id);
            const correct = rows.reduce((sum, row) => sum + row.correct, 0);
            const total = rows.reduce((sum, row) => sum + row.total, 0);
            const avg = percent(correct, total);
            const passed = rows.filter((row) => row.passed).length;

            return (
              <div key={id} className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-slate-900">{LEVELS[id].label}</p>
                  <p className="text-sm text-slate-500">{rows.length} ta urinish</p>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-slate-600">O‘rtacha to‘g‘ri javob</span>
                  <span className="font-bold text-slate-900">{avg}%</span>
                </div>
                <div className="mt-1">
                  <Bar value={avg} />
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  O‘tganlar: {passed} / {rows.length} ({percent(passed, rows.length)}%)
                </p>
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <h2 className="mb-4 font-bold text-slate-900">Oxirgi natijalar</h2>
        <LevelFilter basePath="/admin" active={levelFilter} />

        {recent.length === 0 ? (
          <p className="py-6 text-center text-sm text-slate-500">Hozircha natija yo‘q.</p>
        ) : (
          <div className="-mx-5 overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-2">O‘quvchi</th>
                  <th className="px-2 py-2">Test</th>
                  <th className="px-2 py-2">Ball</th>
                  <th className="px-2 py-2">To‘g‘ri</th>
                  <th className="px-2 py-2">Natija</th>
                  <th className="px-5 py-2">Sana</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((row) => (
                  <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-5 py-2.5">
                      <Link href={`/admin/students/${row.student_id}`} className="font-semibold text-slate-900 hover:text-blue-600">
                        {row.student_name}
                      </Link>
                    </td>
                    <td className="px-2 py-2.5">
                      <Link href={`/admin/attempts/${row.id}`} className="text-blue-600 hover:underline">
                        {levelLabel(row.level)} · {row.test_name}
                      </Link>
                    </td>
                    <td className="px-2 py-2.5 font-bold whitespace-nowrap">
                      {row.scaled_score} / {row.max_score}
                    </td>
                    <td className="px-2 py-2.5 whitespace-nowrap">
                      {row.correct}/{row.total}
                    </td>
                    <td className="px-2 py-2.5">
                      <PassBadge passed={row.passed} />
                    </td>
                    <td className="px-5 py-2.5 whitespace-nowrap text-slate-500">{formatDate(row.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </>
  );
}
