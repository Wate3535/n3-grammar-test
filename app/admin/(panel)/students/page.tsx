import Link from "next/link";
import { Card, ErrorBox, NotConfigured, PageTitle } from "@/components/admin/ui";
import { formatDate, levelLabel, percent, requireAdmin } from "@/lib/admin";
import { getSupabase, type AttemptRow, type StudentRow } from "@/lib/supabase";
import { telegramLink } from "@/lib/telegram";

type AttemptSummary = Pick<
  AttemptRow,
  "student_id" | "level" | "correct" | "total" | "scaled_score" | "max_score" | "passed" | "created_at"
>;

export default async function StudentsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  await requireAdmin();
  const { q } = await searchParams;
  const search = (q ?? "").trim().slice(0, 50);

  const supabase = getSupabase();
  if (!supabase) {
    return (
      <>
        <PageTitle title="O‘quvchilar" />
        <NotConfigured />
      </>
    );
  }

  let query = supabase
    .from("students")
    .select("id, name, phone, created_at, last_seen_at")
    .order("last_seen_at", { ascending: false })
    .limit(300);

  if (search) {
    // PostgREST filtri uchun maxsus belgilar olib tashlanadi.
    const safe = search.replace(/[%,()*\\]/g, "");
    if (safe) query = query.or(`name.ilike.%${safe}%,phone.ilike.%${safe}%`);
  }

  const { data: studentData, error } = await query;
  const students = (studentData ?? []) as StudentRow[];

  const { data: attemptData, error: attemptsError } = students.length
    ? await supabase
        .from("attempts")
        .select("student_id, level, correct, total, scaled_score, max_score, passed, created_at")
        .in(
          "student_id",
          students.map((student) => student.id)
        )
        .order("created_at", { ascending: false })
        .limit(5000)
    : { data: [], error: null };
  const attempts = (attemptData ?? []) as AttemptSummary[];

  const summary = new Map<string, AttemptSummary[]>();
  for (const attempt of attempts) {
    const list = summary.get(attempt.student_id) ?? [];
    list.push(attempt);
    summary.set(attempt.student_id, list);
  }

  return (
    <>
      <PageTitle title="O‘quvchilar" subtitle={`${students.length} ta o‘quvchi`} />
      {(error || attemptsError) && (
        <ErrorBox message={`Ma’lumotlarni o‘qib bo‘lmadi: ${(error ?? attemptsError)?.message}`} />
      )}

      <form className="mb-4 flex gap-2">
        <input
          name="q"
          defaultValue={search}
          placeholder="Ism yoki Telegram nik bo‘yicha qidirish"
          className="h-11 flex-1 rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none focus:border-slate-900"
        />
        <button className="h-11 rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white hover:bg-slate-800">
          Qidirish
        </button>
      </form>

      <Card className="p-0!">
        {students.length === 0 ? (
          <p className="py-10 text-center text-sm text-slate-500">O‘quvchi topilmadi.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-xs uppercase tracking-wide text-slate-500">
                  <th className="px-5 py-3">Ism</th>
                  <th className="px-2 py-3">Telegram</th>
                  <th className="px-2 py-3">Urinishlar</th>
                  <th className="px-2 py-3">O‘rtacha</th>
                  <th className="px-2 py-3">Oxirgi natija</th>
                  <th className="px-5 py-3">Oxirgi faollik</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => {
                  const list = summary.get(student.id) ?? [];
                  const last = list[0];
                  const correct = list.reduce((sum, row) => sum + row.correct, 0);
                  const total = list.reduce((sum, row) => sum + row.total, 0);

                  return (
                    <tr key={student.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-5 py-3">
                        <Link
                          href={`/admin/students/${student.id}`}
                          className="font-semibold text-slate-900 hover:text-blue-600"
                        >
                          {student.name}
                        </Link>
                      </td>
                      <td className="px-2 py-3 whitespace-nowrap">
                        <a
                          href={telegramLink(student.phone)}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {student.phone}
                        </a>
                      </td>
                      <td className="px-2 py-3">{list.length}</td>
                      <td className="px-2 py-3 font-semibold">{list.length ? `${percent(correct, total)}%` : "—"}</td>
                      <td className="px-2 py-3 whitespace-nowrap">
                        {last ? (
                          <span className={last.passed ? "text-green-700" : "text-red-600"}>
                            {levelLabel(last.level)} · {last.scaled_score}/{last.max_score}
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-5 py-3 whitespace-nowrap text-slate-500">
                        {formatDate(student.last_seen_at)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </>
  );
}
