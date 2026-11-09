import CodeGate from "@/components/CodeGate";
import { LEVELS, LEVEL_IDS } from "@/lib/levels";

// Saytga kirganda kod so'raladi. Kod qaysi darajaga tegishli bo'lsa,
// o'quvchi o'sha darajadagi testlarga yo'naltiriladi.
export default function Home() {
  return (
    <main className="relative min-h-screen bg-slate-50 px-4 py-16">
      <div className="mx-auto max-w-3xl text-center" aria-hidden="true">
        <p className="text-sm font-semibold text-blue-600">日本語 模擬テスト</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">
          Yapon tili mock testlari
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {LEVEL_IDS.map((id) => (
            <div key={id} className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="font-bold text-slate-900">{LEVELS[id].label}</p>
              <p className="mt-1 text-xs text-slate-500">
                {LEVELS[id].examMinutes} daqiqa · {LEVELS[id].maxScore} ball
              </p>
            </div>
          ))}
        </div>
      </div>

      <CodeGate />
    </main>
  );
}
