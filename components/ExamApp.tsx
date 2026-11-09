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
import {
  getGrade,
  LEVELS,
  toScaledScore,
  type LevelId,
  type SectionMeta,
} from "@/lib/levels";
import { normalizeTelegram } from "@/lib/telegram";
import type { GlossaryItem, Question } from "@/questions";

// =========================================================
// UMUMIY IMTIHON INTERFEYSI (JFT-Basic, JLPT N3/N4/N5)
// Istalgan section va savolga erkin o'tish mumkin.
// 聴解 da har bir audio 2 martagacha eshitiladi.
// =========================================================

const MAX_WARNINGS = 3;
const MAX_PLAYS = 2;

type ExamState = "start" | "exam" | "finished";
type SaveState =
  | { status: "idle" | "saving" | "saved" }
  | { status: "error"; error: string };

type Section = SectionMeta & {
  start: number;
  end: number;
};

export type ExamTest = {
  slug: string;
  name: string;
  questions: Question[];
};

// =========================================================
// HELPERS
// =========================================================

function getSectionByQuestionNumber(
  questionNumber: number,
  sections: Section[]
): Section {
  return (
    sections.find(
      (section) =>
        questionNumber >= section.start &&
        questionNumber <= section.end
    ) || sections[0]
  );
}

// "＿電車＿" → tagiga chizilgan so‘z
function renderMarked(text: string): ReactNode {
  return text.split("＿").map((part, index) =>
    index % 2 === 1 ? (
      <span
        key={index}
        className="underline decoration-2 underline-offset-4 decoration-blue-600"
      >
        {part}
      </span>
    ) : (
      <span key={index}>{part}</span>
    )
  );
}

// =========================================================
// MAIN
// =========================================================

export default function ExamApp({
  levelId,
  tests,
}: {
  levelId: LevelId;
  tests: ExamTest[];
}) {
  const config = LEVELS[levelId];
  const EXAM_TIME = config.examMinutes * 60;
  const PASS_SCORE = config.passScore;
  const MAX_SCORE = config.maxScore;

  const [state, setState] = useState<ExamState>("start");

  const [selectedTestSlug, setSelectedTestSlug] = useState(tests[0]?.slug ?? "");
  const [name, setName] = useState("");
  const [telegram, setTelegram] = useState("");
  const [formError, setFormError] = useState("");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [plays, setPlays] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(EXAM_TIME);

  const [warnings, setWarnings] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [warningText, setWarningText] = useState("");

  const [finishReason, setFinishReason] =
    useState<AttemptInput["finishReason"]>("manual");
  const [save, setSave] = useState<SaveState>({ status: "idle" });
  const startedAtRef = useRef(0);
  const durationRef = useRef(0);

  const selectedTest =
    tests.find((test) => test.slug === selectedTestSlug) ?? tests[0];
  const testQuestions = useMemo(
    () => selectedTest?.questions ?? [],
    [selectedTest]
  );
  const sections = useMemo(
    () =>
      config.sections
        .map((meta) => {
          const numbers = testQuestions
            .map((q, index) => (q.section === meta.id ? index + 1 : 0))
            .filter((number) => number > 0);

          return {
            ...meta,
            start: numbers[0],
            end: numbers[numbers.length - 1],
          };
        })
        .filter((section) => section.start !== undefined),
    [config.sections, testQuestions]
  );
  const totalQuestions = testQuestions.length;
  const question = testQuestions[current];

  // =========================================================
  // CURRENT SECTION
  // =========================================================

  const currentSection = useMemo(() => {
    return getSectionByQuestionNumber(current + 1, sections);
  }, [current, sections]);

  const isLastQuestion = current + 1 === testQuestions.length;

  const canGoBack = current > 0;

  // =========================================================
  // ANSWERED COUNT
  // =========================================================

  const answeredCount = useMemo(() => {
    return testQuestions.filter(
      (q) => answers[q.id] !== undefined
    ).length;
  }, [answers, testQuestions]);

  const unansweredCount =
    totalQuestions - answeredCount;

  // =========================================================
  // SCORE
  // =========================================================

  const score = useMemo(() => {
    return testQuestions.reduce((total, q) => {
      return total + (answers[q.id] === q.answer ? 1 : 0);
    }, 0);
  }, [answers, testQuestions]);

  const percentage =
    totalQuestions > 0
      ? Math.round((score / totalQuestions) * 100)
      : 0;

  const scaledScore = toScaledScore(config, score, totalQuestions);
  const level = getGrade(config, scaledScore);
  const passed = scaledScore >= PASS_SCORE;

  // =========================================================
  // SECTION STATISTICS
  // =========================================================

  const getSectionQuestions = (section: Section) =>
    testQuestions.filter((q) => q.section === section.id);

  const getSectionAnsweredCount = (section: Section) => {
    return getSectionQuestions(section).filter(
      (q) => answers[q.id] !== undefined
    ).length;
  };

  // =========================================================
  // FORMAT TIME
  // =========================================================

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      secs
    ).padStart(2, "0")}`;
  };

  // =========================================================
  // END EXAM
  // =========================================================

  const endExam = useCallback((reason: AttemptInput["finishReason"]) => {
    durationRef.current = Math.round(
      (Date.now() - startedAtRef.current) / 1000
    );
    setFinishReason(reason);
    setState("finished");

    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  // =========================================================
  // WARNING
  // =========================================================

  const addWarning = useCallback(
    (message: string) => {
      if (state !== "exam") return;

      setWarnings((previous) => {
        if (previous >= MAX_WARNINGS) {
          return previous;
        }

        const next = previous + 1;

        setWarningText(message);
        setShowWarning(true);

        if (next >= MAX_WARNINGS) {
          setTimeout(() => {
            setShowWarning(false);
            endExam("warnings");
          }, 1800);
        }

        return next;
      });
    },
    [state, endExam]
  );

  // =========================================================
  // TAB CHANGE PROTECTION
  // =========================================================

  useEffect(() => {
    if (state !== "exam") return;

    const handleVisibility = () => {
      if (document.visibilityState === "hidden") {
        addWarning(
          "Test oynasidan chiqdingiz. Boshqa tab yoki dasturga o'tish qayd qilindi."
        );
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );
    };
  }, [state, addWarning]);

  // =========================================================
  // COPY / RIGHT CLICK PROTECTION
  // =========================================================

  useEffect(() => {
    if (state !== "exam") return;

    const prevent = (event: Event) => {
      event.preventDefault();
    };

    const events = ["contextmenu", "copy", "cut", "paste"];

    events.forEach((type) =>
      document.addEventListener(type, prevent)
    );

    return () => {
      events.forEach((type) =>
        document.removeEventListener(type, prevent)
      );
    };
  }, [state]);

  // =========================================================
  // KEYBOARD PROTECTION
  // =========================================================

  useEffect(() => {
    if (state !== "exam") return;

    const handleKeyboard = (
      event: KeyboardEvent
    ) => {
      const key = event.key.toLowerCase();

      const blocked =
        event.key === "F12" ||
        (event.ctrlKey &&
          event.shiftKey &&
          ["i", "j", "c"].includes(key)) ||
        (event.ctrlKey &&
          ["u", "s", "p"].includes(key));

      if (blocked) {
        event.preventDefault();

        setWarningText(
          "Bu amal test vaqtida ruxsat etilmagan."
        );

        setShowWarning(true);
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyboard
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyboard
      );
    };
  }, [state]);

  // =========================================================
  // TIMER
  // =========================================================

  useEffect(() => {
    if (state !== "exam") return;

    const timer = setInterval(() => {
      setTimeLeft((previous) => {
        if (previous <= 1) {
          clearInterval(timer);
          endExam("timeout");
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [state, endExam]);

  // =========================================================
  // SAVE RESULT — test tugashi bilan Supabase'ga yuboriladi
  // =========================================================

  const submitResult = useCallback(async () => {
    if (!selectedTest) return;

    setSave({ status: "saving" });

    try {
      const result = await saveAttempt({
        testSlug: selectedTest.slug,
        name,
        telegram,
        answers,
        warnings,
        durationSec: durationRef.current,
        finishReason,
      });

      setSave(
        result.ok
          ? { status: "saved" }
          : { status: "error", error: result.error }
      );
    } catch {
      setSave({
        status: "error",
        error: "Internet bilan bog‘lanib bo‘lmadi.",
      });
    }
  }, [selectedTest, name, telegram, answers, warnings, finishReason]);

  useEffect(() => {
    if (state !== "finished" || save.status !== "idle") return;
    // Natija yakunlangan zahoti bir marta yuboriladi (tashqi tizim bilan sinxronlash).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void submitResult();
  }, [state, save.status, submitResult]);

  // =========================================================
  // START EXAM
  // =========================================================

  const startExam = async () => {
    if (name.trim().length < 2) {
      setFormError("Ism va familiyangizni kiriting.");
      return;
    }

    if (!normalizeTelegram(telegram)) {
      setFormError("Telegram nikingizni kiriting (masalan: @ali_valiyev). Faqat lotin harflari, raqam va _ — 5 tadan 32 tagacha belgi.");
      return;
    }

    setFormError("");
    setCurrent(0);
    setAnswers({});
    setPlays({});
    setWarnings(0);
    setTimeLeft(EXAM_TIME);
    setSave({ status: "idle" });
    startedAtRef.current = Date.now();

    setState("exam");

    try {
      await document.documentElement.requestFullscreen();
    } catch {
      // Fullscreen ishlamasa ham test davom etadi.
    }
  };

  // =========================================================
  // ANSWER
  // =========================================================

  const selectAnswer = (optionIndex: number) => {
    if (!question) return;

    setAnswers((previous) => ({
      ...previous,
      [question.id]: optionIndex,
    }));
  };

  const registerPlay = (questionId: number) => {
    setPlays((previous) => ({
      ...previous,
      [questionId]: (previous[questionId] ?? 0) + 1,
    }));
  };

  // =========================================================
  // NAVIGATION
  // =========================================================

  // Istalgan section va savolga erkin o'tish mumkin.
  const goToQuestion = (index: number) => {
    if (index < 0 || index >= totalQuestions) return;

    setCurrent(index);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const nextQuestion = () => {
    goToQuestion(current + 1);
  };

  const previousQuestion = () => {
    goToQuestion(current - 1);
  };

  const goToSection = (section: Section) => {
    goToQuestion(section.start - 1);
  };

  // =========================================================
  // FINISH
  // =========================================================

  const finishExam = () => {
    const message =
      (unansweredCount > 0
        ? `${unansweredCount} ta savol javobsiz qolgan.\n`
        : "") +
      "\nTestni yakunlamoqchimisiz?";

    if (!window.confirm(message)) return;

    endExam("manual");
  };

  // =========================================================
  // RESTART
  // =========================================================

  // Ism va Telegram nik saqlanib qoladi — o'quvchi keyingi testni darrov boshlaydi.
  const restartExam = () => {
    setState("start");
    setSave({ status: "idle" });
    setCurrent(0);
    setAnswers({});
    setPlays({});
    setWarnings(0);
    setShowWarning(false);
    setWarningText("");
    setTimeLeft(EXAM_TIME);
  };

  // =========================================================
  // START SCREEN
  // =========================================================

  if (!selectedTest) {
    return (
      <main className="min-h-screen bg-slate-50 py-10 px-4">
        <div className="max-w-xl mx-auto bg-white rounded-2xl border border-slate-200 p-8 text-center">
          <p className="text-sm font-semibold text-blue-600">
            {config.label}
          </p>
          <h1 className="text-2xl font-bold text-slate-900 mt-2">
            Testlar tez orada qo‘shiladi
          </h1>
          <p className="text-slate-500 mt-2">
            Bu daraja uchun hozircha test yo‘q.
          </p>
          <form action={leaveExam}>
            <button className="mt-6 h-11 px-6 rounded-xl border border-slate-300 font-semibold text-slate-700 hover:bg-slate-50">
              ← Boshqa kod kiritish
            </button>
          </form>
        </div>
      </main>
    );
  }

  if (state === "start") {
    return (
      <main className="min-h-screen bg-slate-50 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Header */}

            <div className="bg-blue-600 text-white px-6 py-8">
              <div className="flex items-start justify-between gap-4">
                <p className="text-sm font-semibold opacity-90">
                  {config.label}
                </p>

                <form action={leaveExam}>
                  <button className="text-xs font-semibold rounded-lg bg-white/15 hover:bg-white/25 px-3 py-1.5">
                    Chiqish
                  </button>
                </form>
              </div>

              <h1 className="text-3xl font-bold mt-2">
                {config.title}
              </h1>

              <p className="mt-2 text-blue-100">
                {selectedTest.name} · {totalQuestions}問
              </p>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h2 className="font-bold text-slate-900 mb-3">
                  Test variantini tanlang
                </h2>

                <div className="grid sm:grid-cols-2 gap-3">
                  {tests.map((test) => (
                    <button
                      key={test.slug}
                      type="button"
                      aria-pressed={selectedTestSlug === test.slug}
                      onClick={() => setSelectedTestSlug(test.slug)}
                      className={`rounded-xl border p-4 text-left transition ${
                        selectedTestSlug === test.slug
                          ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500/20"
                          : "border-slate-200 bg-white hover:border-blue-300"
                      }`}
                    >
                      <span className="block font-bold text-slate-900">
                        {test.name}
                      </span>
                      <span className="block text-sm text-slate-500 mt-1">
                        {test.questions.length} ta savol · {config.examMinutes} daqiqa
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* INFO CARDS */}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <InfoCard
                  title="SAVOLLAR"
                  value={String(totalQuestions)}
                />

                <InfoCard
                  title="VAQT"
                  value={`${config.examMinutes} min`}
                />

                <InfoCard
                  title="SECTION"
                  value={String(sections.length)}
                />

                <InfoCard
                  title="O‘TISH BALI"
                  value={`${PASS_SCORE} / ${MAX_SCORE}`}
                />
              </div>

              {/* SECTIONS */}

              <div className="mb-6">
                <h2 className="font-bold text-slate-900 mb-3">
                  Test bo‘limlari
                </h2>

                <div className="grid md:grid-cols-2 gap-3">
                  {sections.map((section) => (
                    <div
                      key={section.id}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
                          {section.id}
                        </div>

                        <div className="min-w-0">
                          <p className="font-bold text-slate-900">
                            {section.title}
                          </p>

                          <p className="text-xs text-slate-500">
                            {section.subtitle} ·{" "}
                            {section.start}–
                            {section.end}
                          </p>

                          <p className="text-[11px] text-slate-400 mt-1">
                            {section.types}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RULES */}

              <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 mb-6">
                <p className="font-bold text-slate-900 mb-3">
                  Test qoidalari
                </p>

                <div className="space-y-2 text-sm text-slate-600">
                  <p>
                    • Jami {totalQuestions} ta savol, {sections.length} ta section
                  </p>

                  <p>
                    • Umumiy vaqt — {config.examMinutes} daqiqa (barcha
                    sectionlar uchun umumiy)
                  </p>

                  <p>
                    • Istalgan section va savolga erkin o&apos;tish,
                    javobni istalgan vaqtda o&apos;zgartirish mumkin
                  </p>

                  <p>
                    • 聴解 (tinglash) bo&apos;limida har bir audioni
                    faqat {MAX_PLAYS} marta eshitish mumkin
                  </p>

                  <p>
                    • Natija {config.minScore}–{MAX_SCORE} ball shkalasida
                    ko&apos;rsatiladi, {PASS_SCORE} va undan yuqori — 合格
                  </p>

                  <p>
                    • Natijangiz o&apos;qituvchingizga saqlanadi
                  </p>

                  <p>
                    • Test davomida boshqa tab yoki
                    dasturga o&apos;tmang — 3 ta warningdan
                    keyin test avtomatik yakunlanadi
                  </p>

                  <p>
                    • Quloqchin (naushnik) tayyorlang
                  </p>
                </div>
              </div>

              {/* NAME */}

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Ism va familiya
              </label>

              <input
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                autoComplete="name"
                maxLength={80}
                placeholder="Masalan: Ali Valiyev"
                className="w-full h-12 rounded-xl border border-slate-300 px-4 text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />

              <label className="block text-sm font-semibold text-slate-700 mb-2 mt-4">
                Telegram nik
              </label>

              <input
                value={telegram}
                onChange={(event) =>
                  setTelegram(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    startExam();
                  }
                }}
                autoComplete="off"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                maxLength={45}
                placeholder="@ali_valiyev"
                className="w-full h-12 rounded-xl border border-slate-300 px-4 text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />

              {formError && (
                <p className="text-sm text-red-600 mt-3">
                  {formError}
                </p>
              )}

              <button
                onClick={startExam}
                className="w-full h-12 mt-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition shadow-lg shadow-blue-600/20"
              >
                Testni boshlash
              </button>

              <p className="text-center text-xs text-slate-400 mt-5">
                Test boshlangandan keyin {config.examMinutes} daqiqalik
                vaqt hisoblanadi.
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // =========================================================
  // FINISHED SCREEN
  // =========================================================

  if (state === "finished") {
    return (
      <main className="min-h-screen bg-slate-50 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {/* RESULT HEADER */}

            <div className="bg-blue-600 text-white px-6 py-8 text-center">
              <p className="text-sm opacity-90">
                {config.label} — {selectedTest.name}
              </p>

              <h1 className="text-2xl sm:text-3xl font-bold mt-1">
                {config.title} 結果
              </h1>

              <p className="mt-2 text-blue-100">
                {name}
              </p>

              {/* BALL — mobil va kompyuterda katta ko'rinadi */}

              <div className="mt-5 inline-block rounded-2xl bg-white/15 px-6 py-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-100">
                  Sizning ballingiz
                </p>

                <p className="mt-1 font-bold leading-none">
                  <span className="text-5xl">
                    {scaledScore}
                  </span>
                  <span className="text-2xl text-blue-100">
                    {" "}/ {MAX_SCORE}
                  </span>
                </p>

                <p className="mt-2 text-xs text-blue-100">
                  O‘tish bali: {PASS_SCORE}
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              {/* SAVE STATUS */}

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
                  <button
                    onClick={() => void submitResult()}
                    className="h-9 px-4 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold"
                  >
                    Qayta yuborish
                  </button>
                )}
              </div>

              {/* RESULT CARDS */}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
                <ResultCard
                  title="BALL"
                  value={`${scaledScore} / ${MAX_SCORE}`}
                />

                <ResultCard
                  title="DARAJA"
                  value={level}
                />

                <ResultCard
                  title="TO‘G‘RI"
                  value={`${score} / ${totalQuestions}`}
                />

                <ResultCard
                  title="FOIZ"
                  value={`${percentage}%`}
                />
              </div>

              {/* STATUS */}

              <div
                className={`rounded-xl border p-5 mb-8 ${
                  passed
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                <p
                  className={`font-bold text-lg ${
                    passed
                      ? "text-green-700"
                      : "text-red-700"
                  }`}
                >
                  {passed ? config.passText : config.failText}
                </p>

                <p className="text-sm text-slate-600 mt-2">
                  O‘tish bali: {PASS_SCORE} / {MAX_SCORE}. Javoblar:{" "}
                  {answeredCount} / {totalQuestions}. Ball
                  taxminiy hisoblanadi — rasmiy imtihon
                  savollarning qiyinligiga qarab ball beradi.
                </p>
              </div>

              {/* SECTION RESULTS */}

              <div className="mb-8">
                <h2 className="text-xl font-bold text-slate-900 mb-4">
                  Section natijalari
                </h2>

                <div className="grid md:grid-cols-2 gap-3">
                  {sections.map((section) => {
                    const sectionQuestions =
                      getSectionQuestions(section);

                    const sectionScore =
                      sectionQuestions.filter(
                        (q) => answers[q.id] === q.answer
                      ).length;

                    const sectionTotal =
                      sectionQuestions.length;

                    const sectionPercentage =
                      sectionTotal > 0
                        ? Math.round(
                            (sectionScore /
                              sectionTotal) *
                              100
                          )
                        : 0;

                    return (
                      <div
                        key={section.id}
                        className="rounded-xl border border-slate-200 p-4 bg-slate-50"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-bold text-slate-900">
                              {section.id}.{" "}
                              {section.title}
                            </p>

                            <p className="text-xs text-slate-500 mt-1">
                              {section.subtitle}
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="font-bold text-blue-600">
                              {sectionScore}/
                              {sectionTotal}
                            </p>

                            <p className="text-xs text-slate-500">
                              {sectionPercentage}%
                            </p>
                          </div>
                        </div>

                        <div className="h-2 bg-slate-200 rounded-full mt-3 overflow-hidden">
                          <div
                            className="h-full bg-blue-600"
                            style={{
                              width: `${sectionPercentage}%`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ANSWER ANALYSIS */}

              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4">
                  Javoblar tahlili
                </h2>

                <div className="space-y-3">
                  {testQuestions.map((q, index) => {
                    const userAnswer =
                      answers[q.id];

                    const correct =
                      userAnswer === q.answer;

                    const section =
                      getSectionByQuestionNumber(
                        index + 1,
                        sections
                      );

                    const showPassage =
                      q.passage &&
                      q.passage !==
                        testQuestions[index - 1]?.passage;

                    return (
                      <div
                        key={q.id}
                        className={`rounded-xl border p-4 ${
                          correct
                            ? "border-green-200 bg-green-50"
                            : "border-red-200 bg-red-50"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${
                              correct
                                ? "bg-green-600 text-white"
                                : "bg-red-600 text-white"
                            }`}
                          >
                            {index + 1}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className="text-xs font-semibold px-2 py-1 rounded-md bg-white border border-slate-200 text-slate-500">
                                {section.title}
                              </span>

                              <span className="text-xs font-semibold px-2 py-1 rounded-md bg-white border border-slate-200 text-slate-500">
                                {q.type}
                              </span>
                            </div>

                            {showPassage && (
                              <div className="rounded-xl bg-white border border-slate-200 p-4 mb-4">
                                <p className="text-sm md:text-base text-slate-800 leading-7 whitespace-pre-line">
                                  {q.passage}
                                </p>
                              </div>
                            )}

                            {q.image && (
                              <p className="text-5xl mb-2">
                                {q.image}
                              </p>
                            )}

                            <p className="font-semibold text-slate-900 leading-relaxed whitespace-pre-line">
                              {renderMarked(q.question)}
                            </p>

                            {/* LISTENING IN RESULT */}

                            {(q.script || q.audio) && (
                              <div className="mt-4 space-y-3">
                                <ListeningPlayer
                                  key={q.id}
                                  question={q}
                                  playsUsed={0}
                                  maxPlays={null}
                                  onPlay={() => {}}
                                />

                                {q.script && (
                                  <div className="rounded-xl bg-white border border-slate-200 p-4 text-sm text-slate-700 space-y-1">
                                    <p className="text-xs font-semibold text-slate-400 mb-1">
                                      スクリプト
                                    </p>

                                    {q.script.map(
                                      (line, lineIndex) => (
                                        <p key={lineIndex}>
                                          <span className="font-bold">
                                            {line.speaker ===
                                            "M"
                                              ? "男"
                                              : "女"}
                                            ：
                                          </span>
                                          {line.text}
                                        </p>
                                      )
                                    )}
                                  </div>
                                )}
                              </div>
                            )}

                            {/* OPTIONS — to'g'ri va tanlangan javob belgilanadi */}

                            <div className="mt-3 space-y-1">
                              {q.options.map(
                                (option, optionIndex) => {
                                  const isCorrect =
                                    optionIndex === q.answer;

                                  const isChosen =
                                    optionIndex === userAnswer;

                                  return (
                                    <p
                                      key={optionIndex}
                                      className={`text-sm rounded-lg px-3 py-1.5 border ${
                                        isCorrect
                                          ? "bg-green-100 border-green-300 text-green-800 font-semibold"
                                          : isChosen
                                          ? "bg-red-100 border-red-300 text-red-800 font-semibold"
                                          : "bg-white border-slate-200 text-slate-600"
                                      }`}
                                    >
                                      {optionIndex + 1}. {option}
                                      {isCorrect && " ✓ to‘g‘ri javob"}
                                      {isChosen &&
                                        (isCorrect
                                          ? " · sizning javobingiz"
                                          : " ✗ sizning javobingiz")}
                                    </p>
                                  );
                                }
                              )}
                            </div>

                            {userAnswer === undefined && (
                              <p className="text-sm mt-2 text-slate-500 font-semibold">
                                Javob berilmagan
                              </p>
                            )}

                            {q.glossary && (
                              <div className="mt-3">
                                <Glossary items={q.glossary} />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* RESTART */}

              <div className="grid sm:grid-cols-2 gap-3 mt-8">
                <button
                  onClick={restartExam}
                  className="h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition"
                >
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
        </div>
      </main>
    );
  }

  // =========================================================
  // SAFETY
  // =========================================================

  if (!question) {
    return null;
  }

  const selectedAnswer = answers[question.id];

  const timerDanger = timeLeft <= 5 * 60;

  const isListening = Boolean(question.script || question.audio);

  // =========================================================
  // EXAM SCREEN
  // =========================================================

  return (
    <main className="min-h-screen bg-slate-50">
      {/* =====================================================
          TOP BAR
      ====================================================== */}

      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* LEFT */}

            <div className="min-w-0">
              <p className="text-xs text-slate-500">
                {config.label}
              </p>

              <p className="font-bold text-slate-900">
                {current + 1} / {totalQuestions}
              </p>
            </div>

            {/* SECTION */}

            <div className="hidden md:block text-center">
              <p className="text-xs text-slate-500">
                現在のセクション
              </p>

              <p className="font-bold text-blue-600">
                {currentSection.title}
              </p>
            </div>

            {/* TIMER */}

            <div
              className={`px-5 py-2 rounded-xl font-mono font-bold text-lg ${
                timerDanger
                  ? "bg-red-100 text-red-700"
                  : "bg-blue-50 text-blue-700"
              }`}
            >
              {formatTime(timeLeft)}
            </div>

            {/* ANSWERED */}

            <div className="text-right">
              <p className="text-xs text-slate-500">
                Javob berilgan
              </p>

              <p className="font-bold text-slate-900">
                {answeredCount} / {totalQuestions}
              </p>
            </div>
          </div>

          {/* MAIN PROGRESS */}

          <div className="h-2 bg-slate-100 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all"
              style={{
                width: `${
                  ((current + 1) /
                    totalQuestions) *
                  100
                }%`,
              }}
            />
          </div>

          {/* SECTION PROGRESS */}

          <div className="grid grid-cols-4 gap-1 mt-3">
            {sections.map((section) => {
              const active =
                section.id === currentSection.id;

              const sectionTotal =
                section.end - section.start + 1;

              const done =
                getSectionAnsweredCount(section) ===
                sectionTotal;

              return (
                <button
                  key={section.id}
                  onClick={() => goToSection(section)}
                  className={`rounded-lg px-2 py-2 text-left transition ${
                    active
                      ? "bg-blue-100 border border-blue-300"
                      : done
                      ? "bg-green-50 border border-green-200 hover:border-blue-300"
                      : "bg-slate-50 border border-slate-200 hover:border-blue-300"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className={`text-xs font-bold truncate ${
                        active
                          ? "text-blue-700"
                          : "text-slate-600"
                      }`}
                    >
                      {done ? "✓ " : ""}
                      {section.id}.{" "}
                      {section.title}
                    </span>

                    <span className="text-[10px] text-slate-500">
                      {getSectionAnsweredCount(section)}/
                      {sectionTotal}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[1fr_300px] gap-6">
          {/* =================================================
              QUESTION
          ================================================== */}

          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            {/* SECTION HEADER */}

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                {current + 1}
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  {currentSection.subtitle} · {question.type}
                </p>

                <p className="font-semibold text-slate-800">
                  {currentSection.title}
                </p>
              </div>
            </div>

            {/* PASSAGE — READING QUESTIONS */}

            {question.passage && (
              <div className="rounded-xl bg-white border border-slate-200 p-6 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">📖</span>
                  <p className="font-bold text-slate-900">
                    読解 — Reading
                  </p>
                </div>

                <p className="text-base md:text-lg text-slate-800 leading-8 whitespace-pre-line">
                  {question.passage}
                </p>
              </div>
            )}

            {/* AUDIO */}

            {isListening && (
              <div className="mb-6">
                <ListeningPlayer
                  key={question.id}
                  question={question}
                  playsUsed={plays[question.id] ?? 0}
                  maxPlays={MAX_PLAYS}
                  onPlay={() => registerPlay(question.id)}
                />
              </div>
            )}

            {/* QUESTION */}

            <div className="rounded-xl bg-slate-50 border border-slate-200 p-6 mb-6">
              {question.image && (
                <p className="text-7xl text-center mb-4">
                  {question.image}
                </p>
              )}

              <p className="text-xl md:text-2xl font-bold text-slate-900 leading-relaxed whitespace-pre-line">
                {renderMarked(question.question)}
              </p>
            </div>

            {/* GLOSSARY — N3 kanjilar ma'nosi */}

            {question.glossary && (
              <div className="mb-6">
                <Glossary items={question.glossary} />
              </div>
            )}

            {/* OPTIONS */}

            <div className="space-y-3">
              {question.options.map(
                (option, optionIndex) => {
                  const selected =
                    selectedAnswer ===
                    optionIndex;

                  return (
                    <button
                      key={optionIndex}
                      onClick={() =>
                        selectAnswer(
                          optionIndex
                        )
                      }
                      className={`w-full text-left rounded-xl border-2 p-4 transition ${
                        selected
                          ? "border-blue-600 bg-blue-50"
                          : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/40"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-bold shrink-0 ${
                            selected
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {optionIndex + 1}
                        </div>

                        <span className="text-lg text-slate-900">
                          {option}
                        </span>
                      </div>
                    </button>
                  );
                }
              )}
            </div>

            {/* NAVIGATION */}

            <div className="flex gap-3 mt-8">
              <button
                onClick={previousQuestion}
                disabled={!canGoBack}
                className="flex-1 h-12 rounded-xl border border-slate-300 font-semibold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
              >
                ← Oldingi
              </button>

              {isLastQuestion ? (
                <button
                  onClick={finishExam}
                  className="flex-1 h-12 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold"
                >
                  Testni yakunlash
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  className="flex-1 h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold"
                >
                  Keyingi →
                </button>
              )}
            </div>
          </section>

          {/* =================================================
              SIDEBAR
          ================================================== */}

          <aside className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 h-fit lg:sticky lg:top-32">
            <h2 className="font-bold text-slate-900 mb-4">
              Savollar
            </h2>

            {/* SECTION LIST */}

            <div className="space-y-4">
              {sections.map((section) => {
                const active =
                  section.id === currentSection.id;

                return (
                  <div key={section.id}>
                    <div className="flex items-center justify-between mb-2">
                      <button
                        onClick={() => goToSection(section)}
                        className={`text-xs font-bold hover:text-blue-600 ${
                          active
                            ? "text-blue-700"
                            : "text-slate-700"
                        }`}
                      >
                        {section.id}.{" "}
                        {section.title}
                      </button>

                      <span className="text-[10px] text-slate-400">
                        {getSectionAnsweredCount(
                          section
                        )}
                        /
                        {section.end -
                          section.start +
                          1}
                      </span>
                    </div>

                    <div className="grid grid-cols-6 gap-2">
                      {testQuestions
                        .map((q, index) => ({
                          q,
                          index,
                        }))
                        .filter(
                          ({ q }) =>
                            q.section === section.id
                        )
                        .map(({ q, index }) => {
                          const answered =
                            answers[q.id] !==
                            undefined;

                          const active =
                            index === current;

                          return (
                            <button
                              key={q.id}
                              onClick={() =>
                                goToQuestion(index)
                              }
                              className={`h-9 rounded-lg text-xs font-bold border transition ${
                                active
                                  ? "bg-blue-600 text-white border-blue-600"
                                  : answered
                                  ? "bg-green-100 text-green-700 border-green-200"
                                  : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
                              }`}
                            >
                              {index + 1}
                            </button>
                          );
                        })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* LEGEND */}

            <div className="mt-5 pt-5 border-t border-slate-200 space-y-2 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-blue-600" />
                <span>Hozirgi savol</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-green-100 border border-green-200" />
                <span>Javob berilgan</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-white border border-slate-200" />
                <span>Javobsiz</span>
              </div>
            </div>

            {/* WARNING */}

            <div className="mt-5 pt-5 border-t border-slate-200">
              <p className="text-xs text-slate-500">
                Warning
              </p>

              <p
                className={`font-bold ${
                  warnings >= 2
                    ? "text-red-600"
                    : "text-slate-800"
                }`}
              >
                {warnings} / {MAX_WARNINGS}
              </p>
            </div>

            {/* FINISH BUTTON */}

            <button
              onClick={finishExam}
              className="w-full h-11 mt-5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold"
            >
              Testni yakunlash
            </button>
          </aside>
        </div>
      </div>

      {/* =====================================================
          WARNING MODAL
      ====================================================== */}

      {showWarning && (
        <WarningModal
          text={warningText}
          warnings={warnings}
          maxWarnings={MAX_WARNINGS}
          onClose={() => setShowWarning(false)}
        />
      )}
    </main>
  );
}

// =========================================================
// LISTENING PLAYER
// mp3 bo'lsa — audio fayl, bo'lmasa — brauzerning yapon
// tilidagi ovozi (Web Speech API) orqali script o'qiladi.
// =========================================================

function ListeningPlayer({
  question,
  playsUsed,
  maxPlays,
  onPlay,
}: {
  question: Question;
  playsUsed: number;
  maxPlays: number | null;
  onPlay: () => void;
}) {
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const remaining =
    maxPlays === null ? null : Math.max(maxPlays - playsUsed, 0);

  const disabled = playing || remaining === 0;

  // Voices ro'yxati asinxron yuklanadi — oldindan qizdirib qo'yamiz.
  useEffect(() => {
    if (!("speechSynthesis" in window)) return;

    const synth = window.speechSynthesis;
    const warm = () => synth.getVoices();

    warm();
    synth.addEventListener("voiceschanged", warm);

    return () => {
      synth.removeEventListener("voiceschanged", warm);
      synth.cancel();
    };
  }, []);

  const play = () => {
    if (disabled) return;

    setError("");

    if (question.audio) {
      const audio = audioRef.current;
      if (!audio) return;

      audio.currentTime = 0;
      audio
        .play()
        .then(() => {
          onPlay();
          setPlaying(true);
        })
        .catch(() => setError("Audio ijro etilmadi."));
      return;
    }

    if (!question.script) return;

    if (!("speechSynthesis" in window)) {
      setError(
        "Brauzeringiz ovozli o'qishni qo'llab-quvvatlamaydi. Chrome yoki Edge'dan foydalaning."
      );
      return;
    }

    const synth = window.speechSynthesis;

    const japaneseVoices = synth
      .getVoices()
      .filter((voice) =>
        voice.lang.toLowerCase().replace("_", "-").startsWith("ja")
      );

    if (japaneseVoices.length === 0) {
      setError(
        "Yapon tili ovozi topilmadi. Chrome yoki Edge brauzerida oching (Windows: Sozlamalar → Vaqt va til → Nutq → yapon tilini qo'shing)."
      );
      return;
    }

    const femaleVoice = japaneseVoices[0];
    const maleVoice = japaneseVoices[1] ?? japaneseVoices[0];

    synth.cancel();

    const lines = [
      { speaker: "N" as const, text: question.question },
      ...question.script,
    ];

    lines.forEach((line, index) => {
      const utterance = new SpeechSynthesisUtterance(line.text);

      utterance.lang = "ja-JP";
      utterance.rate = 0.9;

      if (line.speaker === "M") {
        utterance.voice = maleVoice;
        utterance.pitch = maleVoice === femaleVoice ? 0.6 : 1;
      } else {
        utterance.voice = femaleVoice;
        utterance.pitch = line.speaker === "F" ? 1.2 : 1;
      }

      if (index === lines.length - 1) {
        utterance.onend = () => setPlaying(false);
        utterance.onerror = () => setPlaying(false);
      }

      synth.speak(utterance);
    });

    onPlay();
    setPlaying(true);
  };

  return (
    <div className="rounded-xl bg-blue-50 border border-blue-200 p-5">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-xl">🔊</span>

          <div>
            <p className="font-bold text-blue-900">
              聴解 — Listening
            </p>

            <p className="text-xs text-blue-700">
              {remaining === null
                ? "Audioni qayta eshitish"
                : `Audioni diqqat bilan tinglang · qolgan: ${remaining} / ${maxPlays}`}
            </p>
          </div>
        </div>

        <button
          onClick={play}
          disabled={disabled}
          className="h-11 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {playing
            ? "Ijro etilmoqda…"
            : remaining === 0
            ? "Limit tugadi"
            : "▶ Tinglash"}
        </button>
      </div>

      {question.audio && (
        <audio
          ref={audioRef}
          src={question.audio}
          preload="auto"
          onEnded={() => setPlaying(false)}
          className="hidden"
        />
      )}

      {error && (
        <p className="text-sm text-red-600 mt-3">{error}</p>
      )}
    </div>
  );
}

// =========================================================
// GLOSSARY
// =========================================================

function Glossary({ items }: { items: GlossaryItem[] }) {
  return (
    <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
      <p className="text-xs font-bold text-amber-700 mb-2">
        📘 Kanji lug‘ati
      </p>

      <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1">
        {items.map((item) => (
          <p key={item.word} className="text-sm text-slate-700">
            <span className="font-bold text-slate-900">
              {item.word}
            </span>{" "}
            <span className="text-slate-500">
              （{item.reading}）
            </span>{" "}
            — {item.meaning}
          </p>
        ))}
      </div>
    </div>
  );
}

// =========================================================
// INFO CARD
// =========================================================

function InfoCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">
      <p className="text-xs text-blue-600 font-semibold">
        {title}
      </p>

      <p className="text-xl font-bold text-blue-900 mt-1">
        {value}
      </p>
    </div>
  );
}

// =========================================================
// RESULT CARD
// =========================================================

function ResultCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
      <p className="text-xs text-slate-500 font-semibold">
        {title}
      </p>

      <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 whitespace-nowrap">
        {value}
      </p>
    </div>
  );
}

// =========================================================
// WARNING MODAL
// =========================================================

function WarningModal({
  text,
  warnings,
  maxWarnings,
  onClose,
}: {
  text: string;
  warnings: number;
  maxWarnings: number;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-red-600 text-white px-6 py-5">
          <p className="text-sm font-semibold">
            DIQQAT!
          </p>

          <h2 className="text-2xl font-bold mt-1">
            Test qoidasi buzildi
          </h2>
        </div>

        <div className="p-6">
          <p className="text-slate-700 leading-relaxed">
            {text}
          </p>

          <div className="mt-5 rounded-xl bg-red-50 border border-red-200 p-4">
            <p className="text-sm text-red-600">
              Warning
            </p>

            <p className="text-xl font-bold text-red-700">
              {warnings} / {maxWarnings}
            </p>
          </div>

          {warnings >= maxWarnings ? (
            <p className="mt-4 text-sm font-semibold text-red-600">
              3 ta warning olindi. Test avtomatik
              yakunlanadi.
            </p>
          ) : (
            <button
              onClick={onClose}
              className="w-full h-11 mt-5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold"
            >
              Tushundim
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
