import Link from "next/link";
import { notFound } from "next/navigation";
import { Bar, Card, NotConfigured, PassBadge, PageTitle, StatCard } from "@/components/admin/ui";
import {
  analyseAttempts,
  formatDate,
  formatDuration,
  levelLabel,
  percent,
  requireAdmin,
} from "@/lib/admin";
import { getSupabase, type AttemptRow, type StudentRow } from "@/lib/supabase";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function StudentPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  if (!UUID.test(id)) notFound();

  const supabase = getSupabase();
  if (!supabase) return <NotConfigured />;

  const [{ data: studentData }, { data: attemptData }] = await Promise.all([
    supabase.from("students").select("*").eq("id", id).maybeSingle(),
    supabase
      .from("attempts")
      .select("*")
      .eq("student_id", id)
      .order("created_at", { ascending: false })
      .limit(200),
  ]);

  const student = studentData as StudentRow | null;
  if (!student) notFound();

  const attempts = (attemptData ?? []) as AttemptRow[];
  const correct = attempts.reduce((sum, row) => sum + row.correct, 0);
  const total = attempts.reduce((sum, row) => sum + row.total, 0);
  const passed = attempts.filter((row) => row.passed).length;
  const { types, sections } = analyseAttempts(attempts);
  const weakTypes = types.filter((item) => percent(item.correct, item.total) < 70).slice(0, 8);

  return (
    <>
      <Link href="/admin/students" className="text-sm text-slate-500 hover:text-slate-900">
        ← O‘quvchilar
      </Link>
      <div className="mt-2">
        <PageTitle
          title={student.name}
          subtitle={`${student.phone} · ro‘yxatdan o‘tgan: ${formatDate(student.created_at)}`}
        />
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard label="Urinishlar" value={String(attempts.length)} />
        <StatCard label="O‘rtacha to‘g‘ri" value={`${percent(correct, total)}%`} />
        <StatCard label="O‘tgan" value={`${passed} / ${attempts.length}`} />
        <StatCard
          label="Eng yaxshi"
          value={
            attempts.length
              ? (() => {
                  const best = attempts.reduce((a, b) =>
                    a.scaled_score / a.max_score >= b.scaled_score / b.max_score ? a : b
                  );
                  return `${best.scaled_score}/${best.max_score}`;
                })()
              : "—"
          }
        />
      </div>

      {attempts.length > 0 && (
        <div className="mb-6 grid gap-6 md:grid-cols-2">
          <Card>
            <h2 className="mb-1 font-bold text-slate-900">Bo‘limlar bo‘yicha</h2>
            <p className="mb-4 text-xs text-slate-500">Eng zaif bo‘lim yuqorida</p>
            <div className="space-y-3">
              {sections.map((item) => {
                const value = percent(item.correct, item.total);
                return (
                  <div key={item.key}>
                    <div className="mb-1 flex justify-between gap-2 text-sm">
                      <span className="text-slate-700">{item.label}</span>
                      <span className="font-semibold">{value}%</span>
                    </div>
                    <Bar value={value} />
                  </div>
                );
              })}
            </div>
          </Card>

          <Card>
            <h2 className="mb-1 font-bold text-slate-900">Zaif tomonlari</h2>
            <p className="mb-4 text-xs text-slate-500">To‘g‘ri javob 70% dan past bo‘lgan savol turlari</p>
            {weakTypes.length === 0 ? (
              <p className="text-sm text-green-700">Barcha savol turlarida 70% va undan yuqori. 👍</p>
            ) : (
              <div className="space-y-3">
                {weakTypes.map((item) => {
                  const value = percent(item.correct, item.total);
                  return (
                    <div key={item.key}>
                      <div className="mb-1 flex justify-between gap-2 text-sm">
                        <span className="text-slate-700">{item.label}</span>
                        <span className="font-semibold">
                          {item.correct}/{item.total} · {value}%
                        </span>
                      </div>
                      <Bar value={value} />
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </div>
      )}

      <Card className="p-0!">
        <h2 className="px-5 pt-5 font-bold text-slate-900">Barcha urinishlar</h2>
        {attempts.length === 0 ? (
          <p className="py-10 text-center text-sm text-slate-500">Urinish yo‘q.</p>
        ) : (
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-2">Test</th>
                  <th className="px-2 py-2">Ball</th>
                  <th className="px-2 py-2">To‘g‘ri</th>
                  <th className="px-2 py-2">Natija</th>
                  <th className="px-2 py-2">Vaqt</th>
                  <th className="px-2 py-2">Warning</th>
                  <th className="px-5 py-2">Sana</th>
                </tr>
              </thead>
              <tbody>
                {attempts.map((row) => (
                  <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-5 py-2.5">
                      <Link href={`/admin/attempts/${row.id}`} className="text-blue-600 hover:underline">
                        {levelLabel(row.level)} · {row.test_name}
                      </Link>
                    </td>
                    <td className="px-2 py-2.5 font-bold whitespace-nowrap">
                      {row.scaled_score} / {row.max_score}
                    </td>
                    <td className="px-2 py-2.5">
                      {row.correct}/{row.total}
                    </td>
                    <td className="px-2 py-2.5">
                      <PassBadge passed={row.passed} />
                    </td>
                    <td className="px-2 py-2.5 whitespace-nowrap text-slate-600">{formatDuration(row.duration_sec)}</td>
                    <td className={`px-2 py-2.5 ${row.warnings > 0 ? "font-bold text-red-600" : "text-slate-500"}`}>
                      {row.warnings}
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
