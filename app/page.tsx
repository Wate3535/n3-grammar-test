"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { questions, type Question } from "@/questions";

const EXAM_TIME = 40 * 60;
const MAX_WARNINGS = 3;
const PASS_SCORE = 28;

type ExamState = "start" | "exam" | "finished";

export default function Home() {
  const [state, setState] = useState<ExamState>("start");

  const [name, setName] = useState("");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(EXAM_TIME);

  const [warnings, setWarnings] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [warningText, setWarningText] = useState("");

  // =========================================================
  // FIXED QUESTIONS
  // =========================================================

  const [examQuestions, setExamQuestions] = useState<Question[]>([]);

  const totalQuestions = examQuestions.length;

  const question = examQuestions[current];

  // =========================================================
  // ANSWERED COUNT
  // =========================================================

  const answeredCount = useMemo(() => {
    return examQuestions.filter(
      (q) => answers[q.id] !== undefined
    ).length;
  }, [answers, examQuestions]);

  const unansweredCount =
    totalQuestions - answeredCount;

  const allAnswered =
    totalQuestions > 0 &&
    answeredCount === totalQuestions;

  // =========================================================
  // SCORE
  // =========================================================

  const score = useMemo(() => {
    return examQuestions.reduce((total, q) => {
      return total + (answers[q.id] === q.answer ? 1 : 0);
    }, 0);
  }, [answers, examQuestions]);

  const percentage =
    totalQuestions > 0
      ? Math.round((score / totalQuestions) * 100)
      : 0;

  const passed = score >= PASS_SCORE;

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
            setState("finished");

            if (document.fullscreenElement) {
              document.exitFullscreen().catch(() => {});
            }
          }, 1800);
        }

        return next;
      });
    },
    [state]
  );

  // =========================================================
  // TAB CHANGE
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
  // DISABLE COPY / RIGHT CLICK
  // =========================================================

  useEffect(() => {
    if (state !== "exam") return;

    const preventContext = (event: MouseEvent) => {
      event.preventDefault();
    };

    const preventCopy = (event: ClipboardEvent) => {
      event.preventDefault();
    };

    const preventCut = (event: ClipboardEvent) => {
      event.preventDefault();
    };

    const preventPaste = (event: ClipboardEvent) => {
      event.preventDefault();
    };

    document.addEventListener(
      "contextmenu",
      preventContext
    );

    document.addEventListener("copy", preventCopy);
    document.addEventListener("cut", preventCut);
    document.addEventListener("paste", preventPaste);

    return () => {
      document.removeEventListener(
        "contextmenu",
        preventContext
      );

      document.removeEventListener("copy", preventCopy);
      document.removeEventListener("cut", preventCut);
      document.removeEventListener("paste", preventPaste);
    };
  }, [state]);

  // =========================================================
  // KEYBOARD PROTECTION
  // =========================================================

  useEffect(() => {
    if (state !== "exam") return;

    const handleKeyboard = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      const blocked =
        event.key === "F12" ||
        (event.ctrlKey &&
          event.shiftKey &&
          ["i", "j", "c"].includes(key)) ||
        (event.ctrlKey && ["u", "s", "p"].includes(key));

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
          setState("finished");

          if (document.fullscreenElement) {
            document.exitFullscreen().catch(() => {});
          }

          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [state]);

  // =========================================================
  // START EXAM
  // =========================================================

  const startExam = async () => {
    if (!name.trim()) {
      alert("Ism va familiyangizni kiriting.");
      return;
    }

    // Savollar random emas.
    // Barcha o'quvchilar bir xil tartibda ishlaydi.
    setExamQuestions([...questions]);

    setCurrent(0);
    setAnswers({});
    setWarnings(0);
    setTimeLeft(EXAM_TIME);

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

  // =========================================================
  // FINISH
  // =========================================================

  const finishExam = () => {
    if (!allAnswered) {
      const confirmFinish = window.confirm(
        `${unansweredCount} ta savol javobsiz qolgan.\n\nTestni yakunlamoqchimisiz?`
      );

      if (!confirmFinish) return;
    }

    setState("finished");

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  };

  // =========================================================
  // NEXT
  // =========================================================

  const nextQuestion = () => {
    if (current < totalQuestions - 1) {
      setCurrent((previous) => previous + 1);
    }
  };

  // =========================================================
  // PREVIOUS
  // =========================================================

  const previousQuestion = () => {
    if (current > 0) {
      setCurrent((previous) => previous - 1);
    }
  };

  // =========================================================
  // RESTART
  // =========================================================

  const restartExam = () => {
    setState("start");
    setName("");
    setCurrent(0);
    setAnswers({});
    setExamQuestions([]);
    setWarnings(0);
    setShowWarning(false);
    setWarningText("");
    setTimeLeft(EXAM_TIME);
  };

  // =========================================================
  // START SCREEN
  // =========================================================

  if (state === "start") {
    return (
      <main className="min-h-screen bg-slate-50 py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Header */}

            <div className="bg-blue-600 text-white px-6 py-8">
              <p className="text-sm font-semibold opacity-90">
                N3 日本語
              </p>

              <h1 className="text-3xl font-bold mt-2">
                漢字テスト
              </h1>

              <p className="mt-2 text-blue-100">
                N3 Kanji — 40問
              </p>
            </div>

            <div className="p-6">
              {/* Info Cards */}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <InfoCard
                  title="SAVOLLAR"
                  value="40"
                />

                <InfoCard
                  title="VAQT"
                  value="40 min"
                />

                <InfoCard
                  title="MAX BALL"
                  value="40"
                />

                <InfoCard
                  title="PASS"
                  value="28 / 70%"
                />
              </div>

              {/* Rules */}

              <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 mb-6">
                <p className="font-bold text-slate-900 mb-3">
                  Test qoidalari
                </p>

                <div className="space-y-2 text-sm text-slate-600">
                  <p>• 40 ta 漢字 savoli</p>

                  <p>• Har bir savol — 1 ball</p>

                  <p>• Maksimal ball — 40</p>

                  <p>
                    • O‘tish uchun kamida 28 ball / 70%
                  </p>

                  <p>• Vaqt — 40 daqiqa</p>

                  <p>
                    • Savollar aralashtirilgan, lekin tartib
                    barcha o‘quvchilar uchun bir xil
                  </p>

                  <p>
                    • Istalgan savolga o‘tish mumkin
                  </p>

                  <p>
                    • Test davomida boshqa tab yoki
                    dasturga o‘tmang
                  </p>

                  <p>
                    • 3 ta warningdan keyin test
                    avtomatik yakunlanadi
                  </p>
                </div>
              </div>

              {/* Name */}

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Ism va familiya
              </label>

              <input
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    startExam();
                  }
                }}
                placeholder="Masalan: Ali Valiyev"
                className="w-full h-12 rounded-xl border border-slate-300 px-4 text-slate-900 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />

              <button
                onClick={startExam}
                className="w-full h-12 mt-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition shadow-lg shadow-blue-600/20"
              >
                Testni boshlash
              </button>

              <p className="text-center text-xs text-slate-400 mt-5">
                Test boshlangandan keyin vaqt hisoblanadi.
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
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-blue-600 text-white px-6 py-8 text-center">
              <p className="text-sm opacity-90">
                N3 日本語
              </p>

              <h1 className="text-3xl font-bold mt-1">
                漢字テスト 結果
              </h1>

              <p className="mt-2 text-blue-100">
                {name}
              </p>
            </div>

            <div className="p-6">
              {/* Result */}

              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <ResultCard
                  title="BALL"
                  value={`${score} / ${totalQuestions}`}
                />

                <ResultCard
                  title="FOIZ"
                  value={`${percentage}%`}
                />

                <ResultCard
                  title="NATIJA"
                  value={passed ? "O‘TDI" : "O‘TMADI"}
                  success={passed}
                />
              </div>

              {/* Status */}

              <div
                className={`rounded-xl p-5 mb-8 border ${
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
                  {passed
                    ? "🎉 Tabriklaymiz! Siz testdan o‘tdingiz."
                    : "Testdan o‘ta olmadingiz."}
                </p>

                <p className="text-sm text-slate-600 mt-2">
                  O‘tish chegarasi: {PASS_SCORE} /{" "}
                  {totalQuestions} ball (70%)
                </p>
              </div>

              {/* Question Analysis */}

              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4">
                  Javoblar tahlili
                </h2>

                <div className="space-y-3">
                  {examQuestions.map((q, index) => {
                    const userAnswer =
                      answers[q.id];

                    const correct =
                      userAnswer === q.answer;

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

                          <div className="flex-1">
                            <p className="font-semibold text-slate-900">
                              {q.question}
                            </p>

                            <p className="text-sm mt-2">
                              <span className="text-slate-500">
                                Sizning javobingiz:
                              </span>{" "}
                              <span className="font-semibold">
                                {userAnswer !== undefined
                                  ? `${userAnswer + 1}. ${
                                      q.options[
                                        userAnswer
                                      ]
                                    }`
                                  : "Javobsiz"}
                              </span>
                            </p>

                            {!correct && (
                              <p className="text-sm mt-1 text-green-700 font-semibold">
                                To‘g‘ri javob:{" "}
                                {q.answer + 1}.{" "}
                                {q.options[q.answer]}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={restartExam}
                className="w-full h-12 mt-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition"
              >
                Testni qayta boshlash
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // =========================================================
  // EXAM SCREEN
  // =========================================================

  if (!question) {
    return null;
  }

  const selectedAnswer = answers[question.id];

  const timerDanger = timeLeft <= 5 * 60;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* TOP BAR */}

      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs text-slate-500">
                N3 漢字
              </p>

              <p className="font-bold text-slate-900">
                {current + 1} / {totalQuestions}
              </p>
            </div>

            <div
              className={`px-5 py-2 rounded-xl font-mono font-bold text-lg ${
                timerDanger
                  ? "bg-red-100 text-red-700"
                  : "bg-blue-50 text-blue-700"
              }`}
            >
              {formatTime(timeLeft)}
            </div>

            <div className="text-right">
              <p className="text-xs text-slate-500">
                Javob berilgan
              </p>

              <p className="font-bold text-slate-900">
                {answeredCount} / {totalQuestions}
              </p>
            </div>
          </div>

          {/* Progress */}

          <div className="h-2 bg-slate-100 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all"
              style={{
                width: `${
                  ((current + 1) / totalQuestions) *
                  100
                }%`,
              }}
            />
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[1fr_280px] gap-6">
          {/* QUESTION */}

          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                {current + 1}
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  問題
                </p>

                <p className="font-semibold text-slate-800">
                  Eng yaxshi javobni tanlang
                </p>
              </div>
            </div>

            {/* Question text */}

            <div className="rounded-xl bg-slate-50 border border-slate-200 p-6 mb-6">
              <p className="text-xl md:text-2xl font-bold text-slate-900 leading-relaxed">
                {question.question}
              </p>
            </div>

            {/* Options */}

            <div className="space-y-3">
              {question.options.map(
                (option, optionIndex) => {
                  const selected =
                    selectedAnswer === optionIndex;

                  return (
                    <button
                      key={optionIndex}
                      onClick={() =>
                        selectAnswer(optionIndex)
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

            {/* Navigation */}

            <div className="flex gap-3 mt-8">
              <button
                onClick={previousQuestion}
                disabled={current === 0}
                className="flex-1 h-12 rounded-xl border border-slate-300 font-semibold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
              >
                ← Oldingi
              </button>

              {current === totalQuestions - 1 ? (
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

          {/* QUESTION NAVIGATION */}

          <aside className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 h-fit lg:sticky lg:top-28">
            <h2 className="font-bold text-slate-900 mb-4">
              Savollar
            </h2>

            <div className="grid grid-cols-5 gap-2">
              {examQuestions.map((q, index) => {
                const answered =
                  answers[q.id] !== undefined;

                const active = index === current;

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrent(index)}
                    className={`h-10 rounded-lg text-sm font-bold border transition ${
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

            <div className="mt-5 space-y-2 text-xs text-slate-500">
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
          </aside>
        </div>
      </div>

      {/* WARNING MODAL */}

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
  success = false,
}: {
  title: string;
  value: string;
  success?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-5 ${
        success
          ? "bg-green-50 border-green-200"
          : "bg-slate-50 border-slate-200"
      }`}
    >
      <p className="text-xs text-slate-500 font-semibold">
        {title}
      </p>

      <p
        className={`text-2xl font-bold mt-1 ${
          success
            ? "text-green-700"
            : "text-slate-900"
        }`}
      >
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