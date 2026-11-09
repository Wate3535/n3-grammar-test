"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { leaveExam, saveAttempt, type AttemptInput } from "@/app/actions";
import type { ExamTest } from "@/components/ExamApp";
import {
  getMondaiInfo,
  mondaiAudio,
  numberInMondai,
  type JlptSpec,
  type Paper,
} from "@/lib/jlpt";
import { LEVELS, type LevelId } from "@/lib/levels";
import { scoreAttempt } from "@/lib/scoring";
import type { GlossaryItem, Question } from "@/questions";

// =========================================================
// JLPT N3/N4/N5 — real imtihon muhiti
//   • 3 ta qism ketma-ket, har biri o'z vaqti bilan; tugagan qismga qaytilmaydi
//   • 聴解 to'xtovsiz: ko'rsatma → savol → javob uchun pauza, har biri 1 marta
//   • Imtihon paytida lug'at yo'q — u natijalar tahlilida ko'rsatiladi
// =========================================================

const MAX_WARNINGS = 3;
const SOUND_CHECK = "/audio/jlpt-sound-check.mp3";

type Phase = "start" | "paper" | "between" | "finished";
type SaveState =
  | { status: "idle" | "saving" | "saved" }
  | { status: "error"; error: string };

type Indexed = { q: Question; index: number };

function renderMarked(text: string): ReactNode {
  return text.split("＿").map((part, index) =>
    index % 2 === 1 ? (
      <span key={index} className="underline decoration-2 underline-offset-4 decoration-slate-900">
        {part}
      </span>
    ) : (
      <span key={index}>{part}</span>
    )
  );
}

// Qism ichidagi tartib raqami (javob varaqasidagidek 1 dan boshlanadi).
function numberInPaper(spec: JlptSpec, questions: Question[], index: number) {
  const paper = spec.papers.find((item) => item.sections.includes(questions[index].section));
  return questions.slice(0, index + 1).filter((q) => paper?.sections.includes(q.section)).length;
}

// Ko'rsatmalardagi "＿＿＿" — tagiga chizilgan bo'sh joy belgisi.
function renderInstruction(text: string): ReactNode {
  return text.split("＿＿＿").map((part, index) => (
    <span key={index}>
      {index > 0 && <span className="inline-block w-10 mx-1 border-b-2 border-slate-900 align-middle" />}
      {part}
    </span>
  ));
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// =========================================================
// MAIN
// =========================================================

export default function JlptExamApp({
  levelId,
  tests,
}: {
  levelId: LevelId;
  tests: ExamTest[];
}) {
  const config = LEVELS[levelId];
  const spec = config.jlpt as JlptSpec;

  const [phase, setPhase] = useState<Phase>("start");
  const [selectedSlug, setSelectedSlug] = useState(tests[0]?.slug ?? "");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [formError, setFormError] = useState("");

  const [paperIdx, setPaperIdx] = useState(0);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [timeUp, setTimeUp] = useState(false);

  const [warnings, setWarnings] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [warningText, setWarningText] = useState("");

  const [finishReason, setFinishReason] = useState<AttemptInput["finishReason"]>("manual");
  const [save, setSave] = useState<SaveState>({ status: "idle" });
  const startedAtRef = useRef(0);
  const durationRef = useRef(0);

  const test = tests.find((item) => item.slug === selectedSlug) ?? tests[0];
  const questions = useMemo(() => test?.questions ?? [], [test]);
  const paper: Paper = spec.papers[paperIdx];

  const paperQuestions: Indexed[] = useMemo(
    () =>
      questions
        .map((q, index) => ({ q, index }))
        .filter(({ q }) => paper.sections.includes(q.section)),
    [questions, paper]
  );

  const result = useMemo(
    () => scoreAttempt(levelId, questions, answers),
    [levelId, questions, answers]
  );

  // ---------------- finish ----------------

  const finishExam = useCallback((reason: AttemptInput["finishReason"]) => {
    durationRef.current = Math.round((Date.now() - startedAtRef.current) / 1000);
    setFinishReason(reason);
    setPhase("finished");
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  }, []);

  // Qism tugadi (o'zi yoki vaqt tugashi bilan) → keyingi qism oldidan tanaffus.
  const endPaper = useCallback(
    (byTimeout: boolean) => {
      if (paperIdx >= spec.papers.length - 1) {
        finishExam(byTimeout ? "timeout" : "manual");
        return;
      }
      setTimeUp(byTimeout);
      setPhase("between");
      window.scrollTo({ top: 0 });
    },
    [paperIdx, spec.papers.length, finishExam]
  );

  const startPaper = (index: number) => {
    const next = spec.papers[index];
    setPaperIdx(index);
    setCurrent(0);
    setTimeLeft((next.minutes ?? 0) * 60);
    setTimeUp(false);
    setPhase("paper");
    window.scrollTo({ top: 0 });
  };

  // ---------------- warnings ----------------

  const addWarning = useCallback(
    (message: string) => {
      setWarnings((previous) => {
        if (previous >= MAX_WARNINGS) return previous;
        const next = previous + 1;
        setWarningText(message);
        setShowWarning(true);
        if (next >= MAX_WARNINGS) {
          setTimeout(() => {
            setShowWarning(false);
            finishExam("warnings");
          }, 1800);
        }
        return next;
      });
    },
    [finishExam]
  );

  const inExam = phase === "paper" || phase === "between";

  useEffect(() => {
    if (!inExam) return;
    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        addWarning("Test oynasidan chiqdingiz. Boshqa tab yoki dasturga o‘tish qayd qilindi.");
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [inExam, addWarning]);

  useEffect(() => {
    if (!inExam) return;
    const prevent = (event: Event) => event.preventDefault();
    const events = ["contextmenu", "copy", "cut", "paste"];
    events.forEach((type) => document.addEventListener(type, prevent));
    const onKey = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (
        event.key === "F12" ||
        (event.ctrlKey && event.shiftKey && ["i", "j", "c"].includes(key)) ||
        (event.ctrlKey && ["u", "s", "p"].includes(key))
      ) {
        event.preventDefault();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      events.forEach((type) => document.removeEventListener(type, prevent));
      document.removeEventListener("keydown", onKey);
    };
  }, [inExam]);

  // ---------------- paper timer (聴解 dan tashqari) ----------------

  const timed = phase === "paper" && paper.minutes !== null;

  useEffect(() => {
    if (!timed) return;
    const timer = setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          clearInterval(timer);
          setTimeout(() => endPaper(true), 0);
          return 0;
        }
        return previous - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timed, endPaper]);

  // ---------------- save ----------------

  const submitResult = useCallback(async () => {
    if (!test) return;
    setSave({ status: "saving" });
    try {
      const response = await saveAttempt({
        testSlug: test.slug,
        name,
        phone,
        answers,
        warnings,
        durationSec: durationRef.current,
        finishReason,
      });
      setSave(response.ok ? { status: "saved" } : { status: "error", error: response.error });
    } catch {
      setSave({ status: "error", error: "Internet bilan bog‘lanib bo‘lmadi." });
    }
  }, [test, name, phone, answers, warnings, finishReason]);

  useEffect(() => {
    if (phase !== "finished" || save.status !== "idle") return;
    // Natija yakunlangan zahoti bir marta serverga yuboriladi.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void submitResult();
  }, [phase, save.status, submitResult]);

  // ---------------- actions ----------------

  const select = (questionId: number, option: number) =>
    setAnswers((previous) => ({ ...previous, [questionId]: option }));

  const begin = async () => {
    if (name.trim().length < 2) {
      setFormError("Ism va familiyangizni kiriting.");
      return;
    }
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 9 || digits.length > 15) {
      setFormError("Telefon raqamingizni to‘liq kiriting (masalan: +998 90 123 45 67).");
      return;
    }
    setFormError("");
    setAnswers({});
    setWarnings(0);
    setSave({ status: "idle" });
    startedAtRef.current = Date.now();
    startPaper(0);
    try {
      await document.documentElement.requestFullscreen();
    } catch {
      // Fullscreen ishlamasa ham test davom etadi.
    }
  };

  const restart = () => {
    setPhase("start");
    setSave({ status: "idle" });
    setAnswers({});
    setWarnings(0);
    setPaperIdx(0);
    setCurrent(0);
  };

  // =========================================================
  // RENDER
  // =========================================================

  if (!test) {
    return (
      <main className="min-h-screen bg-slate-50 py-10 px-4">
        <div className="max-w-xl mx-auto bg-white rounded-2xl border border-slate-200 p-8 text-center">
          <p className="text-sm font-semibold text-blue-600">{config.label}</p>
          <h1 className="text-2xl font-bold text-slate-900 mt-2">Testlar tez orada qo‘shiladi</h1>
          <form action={leaveExam}>
            <button className="mt-6 h-11 px-6 rounded-xl border border-slate-300 font-semibold text-slate-700 hover:bg-slate-50">
              ← Boshqa kod kiritish
            </button>
          </form>
        </div>
      </main>
    );
  }

  if (phase === "start") {
    return (
      <StartScreen
        config={config}
        spec={spec}
        tests={tests}
        selectedSlug={test.slug}
        onSelect={setSelectedSlug}
        name={name}
        phone={phone}
        onName={setName}
        onPhone={setPhone}
        error={formError}
        onBegin={begin}
      />
    );
  }

  if (phase === "finished") {
    return (
      <ResultScreen
        levelId={levelId}
        spec={spec}
        test={test}
        name={name}
        answers={answers}
        result={result}
        save={save}
        onRetrySave={() => void submitResult()}
        onRestart={restart}
      />
    );
  }

  const warningModal = showWarning && (
    <WarningModal text={warningText} warnings={warnings} onClose={() => setShowWarning(false)} />
  );

  if (phase === "between") {
    const next = spec.papers[paperIdx + 1];
    const nextCount = questions.filter((q) => next.sections.includes(q.section)).length;
    return (
      <main className="min-h-screen bg-slate-50 py-10 px-4">
        <div className="max-w-xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-slate-900 text-white px-6 py-6">
            <p className="text-sm text-slate-300">{config.label} · {test.name}</p>
            <h1 className="text-2xl font-bold mt-1">
              {timeUp ? "Vaqt tugadi" : "Qism yakunlandi"}
            </h1>
            <p className="text-sm text-slate-300 mt-1">{paper.title}</p>
          </div>
          <div className="p-6">
            <p className="text-sm text-slate-500">Keyingi qism</p>
            <p className="text-xl font-bold text-slate-900 mt-1">{next.title}</p>
            <p className="text-sm text-slate-500">
              {next.subtitle} · {nextCount} ta savol ·{" "}
              {next.minutes ? `${next.minutes} daqiqa` : `taxminan ${next.officialMinutes} daqiqa (audio)`}
            </p>
            <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-900 space-y-1">
              <p>• Oldingi qismga qaytib bo‘lmaydi.</p>
              {next.minutes === null ? (
                <>
                  <p>• Quloqchin taqing. Audio to‘xtovsiz yangraydi va har bir savol faqat 1 marta eshittiriladi.</p>
                  <p>• Javobni har bir savoldan keyingi pauzada belgilang.</p>
                </>
              ) : (
                <p>• Vaqt «Boshlash» bosilgandan keyin hisoblanadi.</p>
              )}
            </div>
            <button
              onClick={() => startPaper(paperIdx + 1)}
              className="w-full h-12 mt-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold"
            >
              Boshlash
            </button>
          </div>
        </div>
        {warningModal}
      </main>
    );
  }

  // phase === "paper"
  if (paper.minutes === null) {
    return (
      <>
        <ListeningSession
          key={test.slug}
          slug={test.slug}
          spec={spec}
          levelLabel={config.label}
          all={questions}
          items={paperQuestions}
          answers={answers}
          warnings={warnings}
          onAnswer={select}
          onFinish={() => finishExam("manual")}
        />
        {warningModal}
      </>
    );
  }

  return (
    <>
      <PaperView
        levelLabel={config.label}
        spec={spec}
        paper={paper}
        all={questions}
        items={paperQuestions}
        current={current}
        onCurrent={(index) => {
          setCurrent(index);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        answers={answers}
        onAnswer={select}
        timeLeft={timeLeft}
        warnings={warnings}
        isLastPaper={paperIdx === spec.papers.length - 1}
        onEnd={() => {
          const unanswered = paperQuestions.filter(({ q }) => answers[q.id] === undefined).length;
          const message =
            (unanswered > 0 ? `${unanswered} ta savol javobsiz qolgan.\n` : "") +
            "Bu qismni yakunlaysizmi? Keyin unga qaytib bo‘lmaydi.";
          if (window.confirm(message)) endPaper(false);
        }}
      />
      {warningModal}
    </>
  );
}

// =========================================================
// START SCREEN
// =========================================================

function StartScreen({
  config,
  spec,
  tests,
  selectedSlug,
  onSelect,
  name,
  phone,
  onName,
  onPhone,
  error,
  onBegin,
}: {
  config: (typeof LEVELS)[LevelId];
  spec: JlptSpec;
  tests: ExamTest[];
  selectedSlug: string;
  onSelect: (slug: string) => void;
  name: string;
  phone: string;
  onName: (value: string) => void;
  onPhone: (value: string) => void;
  error: string;
  onBegin: () => void;
}) {
  const test = tests.find((item) => item.slug === selectedSlug) ?? tests[0];
  const total = spec.papers.reduce((sum, paper) => sum + paper.officialMinutes, 0);

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-blue-600 text-white px-6 py-8">
          <div className="flex items-start justify-between gap-4">
            <p className="text-sm font-semibold opacity-90">{config.label}</p>
            <form action={leaveExam}>
              <button className="text-xs font-semibold rounded-lg bg-white/15 hover:bg-white/25 px-3 py-1.5">
                Chiqish
              </button>
            </form>
          </div>
          <h1 className="text-3xl font-bold mt-2">{config.title}</h1>
          <p className="mt-2 text-blue-100">
            {test.name} · {test.questions.length}問
          </p>
        </div>

        <div className="p-6">
          {tests.length > 1 && (
            <div className="mb-6">
              <h2 className="font-bold text-slate-900 mb-3">Test variantini tanlang</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {tests.map((item) => (
                  <button
                    key={item.slug}
                    type="button"
                    aria-pressed={item.slug === test.slug}
                    onClick={() => onSelect(item.slug)}
                    className={`rounded-xl border p-4 text-left transition ${
                      item.slug === test.slug
                        ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500/20"
                        : "border-slate-200 bg-white hover:border-blue-300"
                    }`}
                  >
                    <span className="block font-bold text-slate-900">{item.name}</span>
                    <span className="block text-sm text-slate-500 mt-1">{item.questions.length} ta savol</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <InfoCard title="SAVOLLAR" value={String(test.questions.length)} />
            <InfoCard title="VAQT" value={`${total} min`} />
            <InfoCard title="QISMLAR" value={String(spec.papers.length)} />
            <InfoCard title="O‘TISH BALI" value={`${config.passScore} / ${config.maxScore}`} />
          </div>

          <h2 className="font-bold text-slate-900 mb-3">Imtihon qismlari</h2>
          <div className="space-y-2 mb-6">
            {spec.papers.map((paper, index) => {
              const count = test.questions.filter((q) => paper.sections.includes(q.section)).length;
              return (
                <div key={paper.id} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
                    {index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-slate-900">{paper.title}</p>
                    <p className="text-xs text-slate-500">
                      {paper.subtitle} · {count} ta savol
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-slate-700 whitespace-nowrap">
                    {paper.minutes ? `${paper.minutes} daq` : `~${paper.officialMinutes} daq`}
                  </p>
                </div>
              );
            })}
          </div>

          <h2 className="font-bold text-slate-900 mb-3">Baholash (得点区分)</h2>
          <div className="grid md:grid-cols-3 gap-3 mb-6">
            {spec.groups.map((group) => (
              <div key={group.id} className="rounded-xl border border-slate-200 p-4">
                <p className="font-bold text-slate-900 text-sm">{group.title}</p>
                <p className="text-xs text-slate-500">{group.subtitle}</p>
                <p className="mt-2 text-sm text-slate-700">
                  0–{group.max} ball · 基準点 <b>{group.min}</b>
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 mb-6">
            <p className="font-bold text-slate-900 mb-3">Test qoidalari</p>
            <div className="space-y-2 text-sm text-slate-600">
              <p>• Qismlar ketma-ket topshiriladi, har birining o‘z vaqti bor. Tugagan qismga qaytib bo‘lmaydi.</p>
              <p>• 聴解 to‘xtovsiz yangraydi: har bir savol faqat 1 marta eshittiriladi, to‘xtatib yoki qaytarib bo‘lmaydi.</p>
              <p>
                • O‘tish uchun umumiy ball {config.passScore} dan yuqori bo‘lishi va har bir bo‘limda 基準点 (minimal ball) olinishi kerak.
              </p>
              <p>• Imtihon paytida lug‘at ko‘rsatilmaydi — kanji ma’nolari natijalar tahlilida chiqadi.</p>
              <p>• Boshqa tab yoki dasturga o‘tmang — 3 ta warningdan keyin test avtomatik yakunlanadi.</p>
              <p>• Quloqchin (naushnik) tayyorlang. Natijangiz o‘qituvchingizga saqlanadi.</p>
            </div>
          </div>

          <label className="block text-sm font-semibold text-slate-700 mb-2">Ism va familiya</label>
          <input
            value={name}
            onChange={(event) => onName(event.target.value)}
            autoComplete="name"
            maxLength={80}
            placeholder="Masalan: Ali Valiyev"
            className="w-full h-12 rounded-xl border border-slate-300 px-4 text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />
          <label className="block text-sm font-semibold text-slate-700 mb-2 mt-4">Telefon raqami</label>
          <input
            value={phone}
            onChange={(event) => onPhone(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && onBegin()}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={20}
            placeholder="+998 90 123 45 67"
            className="w-full h-12 rounded-xl border border-slate-300 px-4 text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />
          {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
          <button
            onClick={onBegin}
            className="w-full h-12 mt-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition shadow-lg shadow-blue-600/20"
          >
            Imtihonni boshlash
          </button>
        </div>
      </div>
    </main>
  );
}

// =========================================================
// PAPER VIEW — 文字・語彙 va 文法・読解
// =========================================================

function PaperView({
  levelLabel,
  spec,
  paper,
  all,
  items,
  current,
  onCurrent,
  answers,
  onAnswer,
  timeLeft,
  warnings,
  isLastPaper,
  onEnd,
}: {
  levelLabel: string;
  spec: JlptSpec;
  paper: Paper;
  all: Question[];
  items: Indexed[];
  current: number;
  onCurrent: (index: number) => void;
  answers: Record<number, number>;
  onAnswer: (questionId: number, option: number) => void;
  timeLeft: number;
  warnings: number;
  isLastPaper: boolean;
  onEnd: () => void;
}) {
  const item = items[current];
  if (!item) return null;
  const { q } = item;
  const info = getMondaiInfo(spec, q);
  const answered = items.filter(({ q: x }) => answers[x.id] !== undefined).length;
  const mondais = [...new Set(items.map(({ q: x }) => x.mondai ?? 0))];
  const isUsage = q.type === "用法";

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs text-slate-500">{levelLabel}</p>
            <p className="font-bold text-slate-900 truncate">{paper.title}</p>
          </div>
          <div
            className={`px-4 py-2 rounded-xl font-mono font-bold text-lg ${
              timeLeft <= 5 * 60 ? "bg-red-100 text-red-700" : "bg-blue-50 text-blue-700"
            }`}
          >
            {formatTime(timeLeft)}
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500">Javob</p>
            <p className="font-bold text-slate-900">
              {answered} / {items.length}
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 grid lg:grid-cols-[1fr_300px] gap-6">
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6">
          {info && (
            <div className="mb-5 rounded-xl border-2 border-slate-800 p-4">
              <p className="text-sm font-bold text-slate-900">
                {levelLabel.endsWith("N5") ? "もんだい" : "問題"}
                {q.mondai}
              </p>
              <p className="text-sm text-slate-800 leading-7 mt-1">{renderInstruction(info.instruction)}</p>
            </div>
          )}

          {q.passage && (
            <div className="rounded-xl bg-white border border-slate-300 p-4 sm:p-6 mb-5 max-h-[55vh] overflow-y-auto">
              <p className="text-base md:text-lg text-slate-900 leading-8 whitespace-pre-line">{q.passage}</p>
            </div>
          )}

          <div className="flex items-start gap-3 mb-5">
            <span className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold shrink-0">
              {current + 1}
            </span>
            <p
              className={`pt-1 font-bold text-slate-900 leading-relaxed whitespace-pre-line ${
                isUsage ? "text-3xl" : "text-xl md:text-2xl"
              }`}
            >
              {renderMarked(q.question)}
            </p>
          </div>

          <div className="space-y-3">
            {q.options.map((option, index) => {
              const selected = answers[q.id] === index;
              return (
                <button
                  key={index}
                  onClick={() => onAnswer(q.id, index)}
                  className={`w-full text-left rounded-xl border-2 p-4 transition ${
                    selected ? "border-blue-600 bg-blue-50" : "border-slate-200 bg-white hover:border-blue-300"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-bold shrink-0 ${
                        selected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className="text-lg text-slate-900">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex gap-3 mt-8">
            <button
              onClick={() => onCurrent(current - 1)}
              disabled={current === 0}
              className="flex-1 h-12 rounded-xl border border-slate-300 font-semibold text-slate-700 disabled:opacity-40 hover:bg-slate-50"
            >
              ← Oldingi
            </button>
            {current + 1 < items.length ? (
              <button
                onClick={() => onCurrent(current + 1)}
                className="flex-1 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold"
              >
                Keyingi →
              </button>
            ) : (
              <button onClick={onEnd} className="flex-1 h-12 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold">
                {isLastPaper ? "Testni yakunlash" : "Qismni yakunlash"}
              </button>
            )}
          </div>
        </section>

        <aside className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 h-fit lg:sticky lg:top-24">
          <h2 className="font-bold text-slate-900 mb-4">Javob varaqasi</h2>
          <div className="space-y-4">
            {mondais.map((m) => (
              <div key={m}>
                <p className="text-xs font-bold text-slate-600 mb-2">
                  {levelLabel.endsWith("N5") ? "もんだい" : "問題"}
                  {m} · {items.find(({ q: x }) => x.mondai === m)?.q.type}
                </p>
                <div className="grid grid-cols-6 gap-2">
                  {items.map(({ q: x }, index) =>
                    x.mondai !== m ? null : (
                      <button
                        key={x.id}
                        onClick={() => onCurrent(index)}
                        className={`h-9 rounded-lg text-xs font-bold border transition ${
                          index === current
                            ? "bg-blue-600 text-white border-blue-600"
                            : answers[x.id] !== undefined
                              ? "bg-green-100 text-green-700 border-green-200"
                              : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
                        }`}
                      >
                        {index + 1}
                      </button>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-5 border-t border-slate-200 flex items-center justify-between">
            <span className="text-xs text-slate-500">Warning</span>
            <span className={`font-bold ${warnings >= 2 ? "text-red-600" : "text-slate-800"}`}>
              {warnings} / {MAX_WARNINGS}
            </span>
          </div>
          <button onClick={onEnd} className="w-full h-11 mt-5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold">
            {isLastPaper ? "Testni yakunlash" : "Qismni yakunlash"}
          </button>
          <p className="text-[11px] text-slate-400 mt-2">
            {all.length} ta savoldan {items.length} tasi shu qismda.
          </p>
        </aside>
      </div>
    </main>
  );
}

// =========================================================
// LISTENING SESSION — to'xtovsiz 聴解
// =========================================================

type Step =
  | { kind: "instruction"; mondai: number; src: string; item: number }
  | { kind: "item"; item: number; src: string }
  | { kind: "pause"; item: number; seconds: number };

function ListeningSession({
  slug,
  spec,
  levelLabel,
  all,
  items,
  answers,
  warnings,
  onAnswer,
  onFinish,
}: {
  slug: string;
  spec: JlptSpec;
  levelLabel: string;
  all: Question[];
  items: Indexed[];
  answers: Record<number, number>;
  warnings: number;
  onAnswer: (questionId: number, option: number) => void;
  onFinish: () => void;
}) {
  const steps: Step[] = useMemo(() => {
    const list: Step[] = [];
    let lastMondai: number | undefined;
    items.forEach(({ q }, item) => {
      if (q.mondai !== lastMondai) {
        lastMondai = q.mondai;
        list.push({ kind: "instruction", mondai: q.mondai ?? 0, src: mondaiAudio(slug, q.mondai ?? 0), item });
      }
      list.push({ kind: "item", item, src: q.audio ?? "" });
      list.push({ kind: "pause", item, seconds: getMondaiInfo(spec, q)?.answerSeconds ?? 10 });
    });
    return list;
  }, [items, slug, spec]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const primedRef = useRef(-1);
  const [started, setStarted] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const [retry, setRetry] = useState(0);
  const [failedStep, setFailedStep] = useState(-1);
  const [tick, setTick] = useState({ step: -1, left: 0 });
  const [manualView, setManualView] = useState<{ item: number; forStep: number } | null>(null);
  const [checking, setChecking] = useState(false);

  const step = steps[Math.min(stepIdx, steps.length - 1)];
  const playingItem = step.item;
  const viewItem = manualView && manualView.forStep === stepIdx ? manualView.item : playingItem;
  const view = items[viewItem];

  const advance = useCallback(() => {
    setStepIdx((previous) => {
      const next = previous + 1;
      if (next >= steps.length) {
        setTimeout(onFinish, 0);
        return previous;
      }
      return next;
    });
  }, [steps.length, onFinish]);

  // Audio bosqichlari: manba qo'yiladi va ijro etiladi.
  useEffect(() => {
    if (!started) return;
    const current = steps[stepIdx];
    if (current.kind === "pause") {
      const endsAt = Date.now() + current.seconds * 1000;
      const timer = setInterval(() => {
        const left = Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
        setTick({ step: stepIdx, left });
        if (left <= 0) {
          clearInterval(timer);
          advance();
        }
      }, 250);
      return () => clearInterval(timer);
    }

    const audio = audioRef.current;
    if (!audio) return;
    if (primedRef.current === stepIdx) {
      primedRef.current = -1;
      return;
    }
    audio.src = current.src;
    audio.play().catch(() => setFailedStep(stepIdx));
  }, [started, stepIdx, retry, steps, advance]);

  useEffect(() => {
    const audio = audioRef.current;
    return () => audio?.pause();
  }, []);

  const start = () => {
    const audio = audioRef.current;
    if (!audio) return;
    // Brauzer (ayniqsa iPhone) ovozni faqat bosish bilan ruxsat beradi — birinchi audio shu yerda boshlanadi.
    audio.src = steps[0].kind === "pause" ? "" : steps[0].src;
    audio.play().catch(() => setFailedStep(0));
    primedRef.current = 0;
    setStarted(true);
  };

  const soundCheck = () => {
    const sample = new Audio(SOUND_CHECK);
    setChecking(true);
    sample.onended = () => setChecking(false);
    sample.play().catch(() => setChecking(false));
  };

  const answered = items.filter(({ q }) => answers[q.id] !== undefined).length;
  const progress = Math.round((stepIdx / steps.length) * 100);
  const failed = failedStep === stepIdx;
  const pauseLeft = step.kind === "pause" ? (tick.step === stepIdx ? tick.left : step.seconds) : 0;
  const instruction = step.kind === "instruction" ? getMondaiInfo(spec, items[step.item].q) : null;
  const mondaiWord = levelLabel.endsWith("N5") ? "もんだい" : "問題";

  return (
    <main className="min-h-screen bg-slate-50">
      <audio
        ref={audioRef}
        preload="auto"
        className="hidden"
        onEnded={() => {
          if (steps[stepIdx]?.kind !== "pause") advance();
        }}
        onError={() => started && setFailedStep(stepIdx)}
      />

      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-slate-500">{levelLabel}</p>
            <p className="font-bold text-slate-900">聴解</p>
          </div>
          <div className="flex-1 max-w-sm">
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500">Javob</p>
            <p className="font-bold text-slate-900">
              {answered} / {items.length}
            </p>
          </div>
        </div>
      </header>

      {!started ? (
        <div className="max-w-xl mx-auto px-4 py-10">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h1 className="text-2xl font-bold text-slate-900">聴解 — Tinglab tushunish</h1>
            <div className="mt-4 space-y-2 text-sm text-slate-600">
              <p>• Audio to‘xtovsiz yangraydi: avval har bir 問題 ning ko‘rsatmasi, keyin savollar.</p>
              <p>• Har bir savol faqat 1 marta eshittiriladi. Javobni savoldan keyingi pauzada belgilang.</p>
              <p>• Ba’zi savollarda javob variantlari yozilmagan — ular audioda o‘qiladi (1, 2, 3).</p>
              <p>• Hozirgi va oldingi savollarning javobini o‘zgartirish mumkin.</p>
            </div>
            <button
              onClick={soundCheck}
              disabled={checking}
              className="w-full h-11 mt-6 rounded-xl border border-slate-300 font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              {checking ? "🔊 Ovoz yangramoqda…" : "🔊 Ovozni tekshirish"}
            </button>
            <button onClick={start} className="w-full h-12 mt-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold">
              ▶ 聴解ni boshlash
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-6 grid lg:grid-cols-[1fr_300px] gap-6">
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6">
            {/* STATUS */}
            <div
              className={`rounded-xl px-4 py-3 mb-5 flex items-center justify-between gap-3 ${
                step.kind === "pause" ? "bg-amber-50 border border-amber-200" : "bg-blue-50 border border-blue-200"
              }`}
            >
              <p className={`font-bold ${step.kind === "pause" ? "text-amber-800" : "text-blue-800"}`}>
                {step.kind === "instruction"
                  ? "📢 Ko‘rsatma o‘qilmoqda…"
                  : step.kind === "item"
                    ? "🔊 Tinglang…"
                    : "✍️ Javobni belgilang"}
              </p>
              {step.kind === "pause" && (
                <span className="font-mono font-bold text-2xl text-amber-800">{pauseLeft}</span>
              )}
            </div>

            {failed && (
              <div className="rounded-xl bg-red-50 border border-red-200 p-4 mb-5 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-red-700">Audio yuklanmadi. Internetni tekshiring.</p>
                <button
                  onClick={() => {
                    setFailedStep(-1);
                    setRetry((value) => value + 1);
                  }}
                  className="h-9 px-4 rounded-lg bg-red-600 text-white font-semibold"
                >
                  Qayta urinish
                </button>
              </div>
            )}

            {instruction && (
              <div className="mb-5 rounded-xl border-2 border-slate-800 p-4">
                <p className="text-sm font-bold text-slate-900">
                  {mondaiWord}
                  {instruction.mondai}
                </p>
                <p className="text-sm text-slate-800 leading-7 mt-1">{renderInstruction(instruction.instruction)}</p>
              </div>
            )}

            {view && (
              <ListeningCard
                q={view.q}
                number={numberInMondai(all, view.index)}
                mondaiWord={mondaiWord}
                selected={answers[view.q.id]}
                onSelect={(option) => onAnswer(view.q.id, option)}
                reviewing={viewItem !== playingItem}
              />
            )}

            {viewItem !== playingItem && (
              <button
                onClick={() => setManualView(null)}
                className="mt-5 w-full h-11 rounded-xl bg-blue-600 text-white font-bold"
              >
                Hozirgi savolga qaytish
              </button>
            )}
          </section>

          <aside className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 h-fit lg:sticky lg:top-24">
            <h2 className="font-bold text-slate-900 mb-4">Javob varaqasi</h2>
            <div className="space-y-4">
              {[...new Set(items.map(({ q }) => q.mondai ?? 0))].map((m) => (
                <div key={m}>
                  <p className="text-xs font-bold text-slate-600 mb-2">
                    {mondaiWord}
                    {m} · {items.find(({ q }) => q.mondai === m)?.q.type}
                  </p>
                  <div className="grid grid-cols-6 gap-2">
                    {items.map(({ q, index }, item) =>
                      q.mondai !== m ? null : (
                        <button
                          key={q.id}
                          disabled={item > playingItem}
                          onClick={() => setManualView({ item, forStep: stepIdx })}
                          className={`h-9 rounded-lg text-xs font-bold border transition disabled:opacity-40 ${
                            item === viewItem
                              ? "bg-blue-600 text-white border-blue-600"
                              : answers[q.id] !== undefined
                                ? "bg-green-100 text-green-700 border-green-200"
                                : "bg-white text-slate-600 border-slate-200"
                          }`}
                        >
                          {numberInMondai(all, index)}
                        </button>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-5 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">Warning</span>
              <span className={`font-bold ${warnings >= 2 ? "text-red-600" : "text-slate-800"}`}>
                {warnings} / {MAX_WARNINGS}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-3">
              聴解 audio tugashi bilan test avtomatik yakunlanadi.
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}

function ListeningCard({
  q,
  number,
  mondaiWord,
  selected,
  onSelect,
  reviewing,
}: {
  q: Question;
  number: number;
  mondaiWord: string;
  selected: number | undefined;
  onSelect: (option: number) => void;
  reviewing: boolean;
}) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <span className="rounded-lg bg-slate-900 text-white px-3 py-1.5 font-bold">
          {mondaiWord}
          {q.mondai}　{number}番
        </span>
        {reviewing && <span className="text-xs font-semibold text-amber-700">oldingi savol</span>}
      </div>

      {q.image && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 py-6 mb-4 text-center">
          <p className="text-7xl">{q.image}</p>
          {q.type === "発話表現" && <p className="text-xs text-slate-500 mt-2">→ の人は何と言いますか</p>}
        </div>
      )}

      {q.spoken ? (
        <div>
          <p className="text-sm text-slate-500 mb-3">
            {q.type === "即時応答" || q.type === "概要理解" ? "問題用紙に何も印刷されていません。" : ""}
            Javob variantlari audioda o‘qiladi.
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {q.options.map((_, index) => (
              <button
                key={index}
                onClick={() => onSelect(index)}
                className={`h-16 rounded-xl border-2 text-2xl font-bold transition ${
                  selected === index ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 bg-white text-slate-800 hover:border-blue-400"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {q.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onSelect(index)}
              className={`w-full text-left rounded-xl border-2 p-4 transition ${
                selected === index ? "border-blue-600 bg-blue-50" : "border-slate-200 bg-white hover:border-blue-300"
              }`}
            >
              <div className="flex items-center gap-4">
                <span
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold shrink-0 ${
                    selected === index ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {index + 1}
                </span>
                <span className="text-lg text-slate-900">{option}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// =========================================================
// RESULT SCREEN
// =========================================================

function ResultScreen({
  levelId,
  spec,
  test,
  name,
  answers,
  result,
  save,
  onRetrySave,
  onRestart,
}: {
  levelId: LevelId;
  spec: JlptSpec;
  test: ExamTest;
  name: string;
  answers: Record<number, number>;
  result: ReturnType<typeof scoreAttempt>;
  save: SaveState;
  onRetrySave: () => void;
  onRestart: () => void;
}) {
  const config = LEVELS[levelId];
  const failedGroups = result.groups.filter((group) => !group.passed);
  const totalEnough = result.scaled >= config.passScore;
  const mondaiWord = levelId === "n5" ? "もんだい" : "問題";

  return (
    <main className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-blue-600 text-white px-6 py-8 text-center">
          <p className="text-sm opacity-90">
            {config.label} — {test.name}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold mt-1">{config.title} 結果</h1>
          <p className="mt-2 text-blue-100">{name}</p>
          <div className="mt-5 inline-block rounded-2xl bg-white/15 px-6 py-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-100">Umumiy ball</p>
            <p className="mt-1 font-bold leading-none">
              <span className="text-5xl">{result.scaled}</span>
              <span className="text-2xl text-blue-100"> / {config.maxScore}</span>
            </p>
            <p className="mt-2 text-xs text-blue-100">合格点: {config.passScore}</p>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <div
            className={`rounded-xl border px-4 py-3 mb-6 text-sm flex flex-wrap items-center justify-between gap-3 ${
              save.status === "saved"
                ? "bg-green-50 border-green-200 text-green-800"
                : save.status === "error"
                  ? "bg-amber-50 border-amber-200 text-amber-800"
                  : "bg-slate-50 border-slate-200 text-slate-600"
            }`}
          >
            <span>
              {save.status === "saved"
                ? "✓ Natijangiz saqlandi."
                : save.status === "error"
                  ? `Natija saqlanmadi: ${save.error}`
                  : "Natija saqlanmoqda…"}
            </span>
            {save.status === "error" && (
              <button onClick={onRetrySave} className="h-9 px-4 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold">
                Qayta yuborish
              </button>
            )}
          </div>

          <div
            className={`rounded-xl border p-5 mb-6 ${
              result.passed ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
            }`}
          >
            <p className={`font-bold text-lg ${result.passed ? "text-green-700" : "text-red-700"}`}>
              {result.passed ? config.passText : config.failText}
            </p>
            <p className="text-sm text-slate-600 mt-2">
              {result.passed
                ? `Umumiy ball ${config.passScore} dan yuqori va barcha bo‘limlarda 基準点 olindi.`
                : totalEnough
                  ? `Umumiy ball yetarli, lekin ${failedGroups.map((group) => group.title).join(", ")} bo‘limida 基準点 (${failedGroups.map((group) => group.min).join(", ")}) dan past ball olindi.`
                  : `Umumiy ball ${config.passScore} dan past.`}{" "}
              To‘g‘ri javoblar: {result.correct} / {result.total}. Ball taxminiy — rasmiy JLPT savollarning qiyinligiga qarab ball beradi.
            </p>
          </div>

          <h2 className="text-xl font-bold text-slate-900 mb-4">得点区分別得点</h2>
          <div className="grid md:grid-cols-3 gap-3 mb-8">
            {result.groups.map((group) => {
              const share = Math.round((group.score / group.max) * 100);
              return (
                <div
                  key={group.id}
                  className={`rounded-xl border p-4 ${group.passed ? "border-slate-200 bg-slate-50" : "border-red-200 bg-red-50"}`}
                >
                  <p className="font-bold text-slate-900 text-sm">{group.title}</p>
                  <p className="text-xs text-slate-500">{group.subtitle}</p>
                  <p className="mt-2 font-bold text-2xl text-slate-900 whitespace-nowrap">
                    {group.score} <span className="text-base text-slate-500">/ {group.max}</span>
                  </p>
                  <div className="h-2 bg-slate-200 rounded-full mt-2 overflow-hidden relative">
                    <div className={`h-full ${group.passed ? "bg-blue-600" : "bg-red-500"}`} style={{ width: `${share}%` }} />
                    <div className="absolute top-0 h-full w-0.5 bg-slate-900" style={{ left: `${(group.min / group.max) * 100}%` }} />
                  </div>
                  <p className={`text-xs mt-2 ${group.passed ? "text-slate-500" : "text-red-700 font-semibold"}`}>
                    基準点 {group.min} · {group.correct}/{group.total} to‘g‘ri {group.passed ? "✓" : "✗"}
                  </p>
                </div>
              );
            })}
          </div>

          <h2 className="text-xl font-bold text-slate-900 mb-4">Javoblar tahlili</h2>
          <div className="space-y-3">
            {test.questions.map((q, index) => {
              const chosen = answers[q.id];
              const correct = chosen === q.answer;
              const showPassage = q.passage && q.passage !== test.questions[index - 1]?.passage;
              const firstOfMondai =
                index === 0 ||
                test.questions[index - 1].mondai !== q.mondai ||
                test.questions[index - 1].section !== q.section;
              const info = getMondaiInfo(spec, q);

              return (
                <div key={q.id}>
                  {firstOfMondai && (
                    <p className="mt-6 mb-2 text-sm font-bold text-slate-700">
                      {spec.papers.find((paper) => paper.sections.includes(q.section))?.title} · {mondaiWord}
                      {q.mondai} {info?.type}
                    </p>
                  )}
                  <div className={`rounded-xl border p-4 ${correct ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}>
                    <div className="flex items-start gap-3">
                      <span
                        className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 text-white ${
                          correct ? "bg-green-600" : "bg-red-600"
                        }`}
                      >
                        {q.section === 4 ? numberInMondai(test.questions, index) : numberInPaper(spec, test.questions, index)}
                      </span>
                      <div className="flex-1 min-w-0">
                        {showPassage && (
                          <div className="rounded-xl bg-white border border-slate-200 p-4 mb-3">
                            <p className="text-sm text-slate-800 leading-7 whitespace-pre-line">{q.passage}</p>
                          </div>
                        )}
                        {q.image && <p className="text-4xl mb-2">{q.image}</p>}
                        {q.intro && <p className="text-sm text-slate-500">{q.intro}</p>}
                        {q.question && (
                          <p className="font-semibold text-slate-900 leading-relaxed whitespace-pre-line">{renderMarked(q.question)}</p>
                        )}

                        {q.audio && (
                          <div className="mt-3 space-y-2">
                            <audio controls preload="none" src={q.audio} className="w-full h-10" />
                            {q.script && (
                              <div className="rounded-xl bg-white border border-slate-200 p-3 text-sm text-slate-700 space-y-1">
                                <p className="text-xs font-semibold text-slate-400">スクリプト</p>
                                {q.script.map((line, lineIndex) => (
                                  <p key={lineIndex}>
                                    <b>{line.speaker === "M" ? "男" : "女"}：</b>
                                    {line.text}
                                  </p>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        <div className="mt-3 space-y-1">
                          {q.options.map((option, optionIndex) => (
                            <p
                              key={optionIndex}
                              className={`text-sm rounded-lg px-3 py-1.5 border ${
                                optionIndex === q.answer
                                  ? "bg-green-100 border-green-300 text-green-800 font-semibold"
                                  : optionIndex === chosen
                                    ? "bg-red-100 border-red-300 text-red-800 font-semibold"
                                    : "bg-white border-slate-200 text-slate-600"
                              }`}
                            >
                              {optionIndex + 1}. {option}
                              {optionIndex === q.answer && " ✓ to‘g‘ri javob"}
                              {optionIndex === chosen && (optionIndex === q.answer ? " · sizning javobingiz" : " ✗ sizning javobingiz")}
                            </p>
                          ))}
                        </div>
                        {chosen === undefined && <p className="text-sm mt-2 text-slate-500 font-semibold">Javob berilmagan</p>}
                        {q.glossary && <Glossary items={q.glossary} />}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mt-8">
            <button onClick={onRestart} className="h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold">
              Boshqa test ishlash
            </button>
            <form action={leaveExam}>
              <button className="w-full h-12 rounded-xl border border-slate-300 font-semibold text-slate-700 hover:bg-slate-50">
                Chiqish
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

// =========================================================
// SMALL COMPONENTS
// =========================================================

function Glossary({ items }: { items: GlossaryItem[] }) {
  return (
    <div className="mt-3 rounded-xl bg-amber-50 border border-amber-200 p-3">
      <p className="text-xs font-bold text-amber-700 mb-1">📘 Kanji lug‘ati</p>
      <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1">
        {items.map((item) => (
          <p key={item.word} className="text-sm text-slate-700">
            <b className="text-slate-900">{item.word}</b>{" "}
            <span className="text-slate-500">（{item.reading}）</span> — {item.meaning}
          </p>
        ))}
      </div>
    </div>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">
      <p className="text-xs text-blue-600 font-semibold">{title}</p>
      <p className="text-xl font-bold text-blue-900 mt-1 whitespace-nowrap">{value}</p>
    </div>
  );
}

function WarningModal({
  text,
  warnings,
  onClose,
}: {
  text: string;
  warnings: number;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-100 bg-black/60 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-red-600 text-white px-6 py-5">
          <p className="text-sm font-semibold">DIQQAT!</p>
          <h2 className="text-2xl font-bold mt-1">Test qoidasi buzildi</h2>
        </div>
        <div className="p-6">
          <p className="text-slate-700 leading-relaxed">{text}</p>
          <p className="mt-4 text-xl font-bold text-red-700">
            Warning: {warnings} / {MAX_WARNINGS}
          </p>
          {warnings >= MAX_WARNINGS ? (
            <p className="mt-4 text-sm font-semibold text-red-600">3 ta warning olindi. Test avtomatik yakunlanadi.</p>
          ) : (
            <button onClick={onClose} className="w-full h-11 mt-5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold">
              Tushundim
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
