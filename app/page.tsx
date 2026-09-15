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

  const [answers, setAnswers] = useState<Record<string, number>>({});

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
  // FULLSCREEN
  // =========================================================

  useEffect(() => {
    if (state !== "exam") return;

    const handleFullscreen = () => {
      if (!document.fullscreenElement) {
        addWarning(
          "Fullscreen rejimidan chiqdingiz."
        );
      }
    };

    document.addEventListener(
      "fullscreenchange",
      handleFullscreen
    );

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreen
      );
    };
  }, [state, addWarning]);

  // =========================================================
  // KEYBOARD BLOCK
  // =========================================================

  useEffect(() => {
    if (state !== "exam") return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();

      const blocked =
        (event.ctrlKey && key === "c") ||
        (event.ctrlKey && key === "v") ||
        (event.ctrlKey && key === "x") ||
        (event.ctrlKey && key === "a") ||
        (event.ctrlKey && key === "u") ||
        (event.ctrlKey && key === "s") ||
        (event.ctrlKey && key === "p") ||
        (event.ctrlKey &&
          event.shiftKey &&
          key === "i") ||
        (event.ctrlKey &&
          event.shiftKey &&
          key === "j") ||
        (event.ctrlKey &&
          event.shiftKey &&
          key === "c") ||
        event.key === "F12";

      if (blocked) {
        event.preventDefault();

        setWarningText(
          "Bu amal test vaqtida ruxsat etilmagan."
        );

        setShowWarning(true);
      }

      if (event.key === "PrintScreen") {
        setWarningText(
          "Screenshot funksiyasi aniqlandi. Test faoliyati qayd qilindi."
        );

        setShowWarning(true);

        if (navigator.clipboard) {
          navigator.clipboard
            .writeText("")
            .catch(() => {});
        }
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [state]);

  // =========================================================
  // COPY / PASTE / RIGHT CLICK
  // =========================================================

  useEffect(() => {
    if (state !== "exam") return;

    const prevent = (event: Event) => {
      event.preventDefault();
    };

    document.addEventListener("copy", prevent);
    document.addEventListener("cut", prevent);
    document.addEventListener("paste", prevent);
    document.addEventListener(
      "contextmenu",
      prevent
    );
    document.addEventListener(
      "dragstart",
      prevent
    );

    return () => {
      document.removeEventListener(
        "copy",
        prevent
      );
      document.removeEventListener(
        "cut",
        prevent
      );
      document.removeEventListener(
        "paste",
        prevent
      );
      document.removeEventListener(
        "contextmenu",
        prevent
      );
      document.removeEventListener(
        "dragstart",
        prevent
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

    return () => {
      clearInterval(timer);
    };
  }, [state]);

  // =========================================================
  // START
  // =========================================================

  const startExam = async () => {
    if (!name.trim()) {
      setWarningText(
        "Avval ism va familiyangizni kiriting."
      );

      setShowWarning(true);

      return;
    }

    // RANDOM YO'Q
    // questions.ts tartibi o'zgarmaydi.

    setExamQuestions([...questions]);

    setCurrent(0);

    setAnswers({});

    setWarnings(0);

    setTimeLeft(EXAM_TIME);

    try {
      await document.documentElement.requestFullscreen();
    } catch {
      // Fullscreen ishlamasa ham test davom etadi.
    }

    setState("exam");
  };

  // =========================================================
  // SELECT ANSWER
  // =========================================================

  const selectAnswer = (answerIndex: number) => {
    if (!question) return;

    setAnswers((previous) => ({
      ...previous,
      [question.id]: answerIndex,
    }));
  };

  // =========================================================
  // GO TO QUESTION
  // =========================================================

  const goToQuestion = (index: number) => {
    if (
      index < 0 ||
      index >= totalQuestions
    ) {
      return;
    }

    setCurrent(index);
  };

  // =========================================================
  // NEXT
  // =========================================================

  const nextQuestion = () => {
    if (!question) return;

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
  // FINISH
  // =========================================================

  const finishExam = () => {
    if (!allAnswered) {
      setWarningText(
        `Hali ${unansweredCount} ta savolga javob bermadingiz. Barcha 40 ta savolga javob bering.`
      );

      setShowWarning(true);

      return;
    }

    setState("finished");

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  };

  // =========================================================
  // TIME FORMAT
  // =========================================================

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");

    const secs = (seconds % 60)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${secs}`;
  };

  // =========================================================
  // START SCREEN
  // =========================================================

  if (state === "start") {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">

        <div className="w-full max-w-lg">

          {/* Logo */}
          <div className="text-center mb-7">

            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600 text-white text-xl font-black shadow-lg shadow-blue-600/20">
              N3
            </div>

            <h1 className="mt-5 text-3xl font-bold text-slate-900">
              N3 Grammar Test
            </h1>

            <p className="mt-2 text-slate-500">
              JLPT N3 文法試験
            </p>

          </div>

          {/* Card */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-6 md:p-7">

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-6">

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">

                <p className="text-xs text-blue-600 font-semibold">
                  SAVOLLAR
                </p>

                <p className="text-2xl font-bold text-blue-900 mt-1">
                  40
                </p>

              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">

                <p className="text-xs text-blue-600 font-semibold">
                  MAKSIMAL BALL
                </p>

                <p className="text-2xl font-bold text-blue-900 mt-1">
                  40
                </p>

              </div>

            </div>

            {/* Rules */}
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 mb-6">

              <p className="font-bold text-slate-900 mb-3">
                Test qoidalari
              </p>

              <div className="space-y-2 text-sm text-slate-600">

                <p>
                  • 40 ta grammatika savoli
                </p>

                <p>
                  • Har bir savol — 1 ball
                </p>

                <p>
                  • Maksimal ball — 40
                </p>

                <p>
                  • O‘tish uchun kamida 28 ball / 70%
                </p>

                <p>
                  • Vaqt — 40 daqiqa
                </p>

                <p>
                  • Savollar bir xil ketma-ketlikda
                </p>

                <p>
                  • Istalgan savolga o'tish mumkin
                </p>

                <p>
                  • Test davomida boshqa tab yoki dasturga o'tmang
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

        {showWarning && (
          <WarningModal
            text={warningText}
            onClose={() =>
              setShowWarning(false)
            }
          />
        )}

      </main>
    );
  }

  // =========================================================
  // FINISHED
  // =========================================================

  if (state === "finished") {
    return (
      <main className="min-h-screen bg-slate-50 py-8 px-4">

        <div className="max-w-3xl mx-auto">

          {/* Result */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-6 md:p-8">

            <div
              className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-2xl font-bold ${
                passed
                  ? "bg-blue-100 text-blue-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {passed ? "✓" : "!"}
            </div>

            <p className="text-sm text-slate-500 text-center mt-5">
              TEST YAKUNLANDI
            </p>

            <h1 className="text-2xl font-bold text-slate-900 text-center mt-2">
              {name}
            </h1>

            {/* Score */}
            <div className="text-center mt-7">

              <p
                className={`text-6xl font-black ${
                  passed
                    ? "text-blue-600"
                    : "text-red-600"
                }`}
              >
                {score}/40
              </p>

              <p className="text-xl font-semibold text-slate-500 mt-2">
                {percentage}%
              </p>

              <div className="mt-4">

                {passed ? (
                  <span className="inline-flex px-5 py-2 rounded-full bg-blue-100 text-blue-700 font-black">
                    ✓ TESTDAN O‘TDINGIZ
                  </span>
                ) : (
                  <span className="inline-flex px-5 py-2 rounded-full bg-red-100 text-red-700 font-black">
                    ✕ TESTDAN O‘TA OLMADINGIZ
                  </span>
                )}

              </div>

            </div>

            {/* Summary */}
            <div className="mt-7 bg-slate-50 rounded-xl p-5">

              <ResultRow
                label="Maksimal ball"
                value="40"
              />

              <ResultRow
                label="Sizning ballingiz"
                value={String(score)}
                valueClass={
                  passed
                    ? "text-blue-600"
                    : "text-red-600"
                }
              />

              <ResultRow
                label="O‘tish bali"
                value="28"
              />

              <ResultRow
                label="To‘g‘ri javoblar"
                value={String(score)}
              />

              <ResultRow
                label="Noto‘g‘ri javoblar"
                value={String(40 - score)}
              />

              <ResultRow
                label="Ogohlantirishlar"
                value={String(warnings)}
                valueClass={
                  warnings > 0
                    ? "text-red-600"
                    : "text-slate-900"
                }
              />

            </div>

            {/* Message */}
            <div
              className={`mt-5 rounded-xl border p-4 text-center ${
                passed
                  ? "border-blue-200 bg-blue-50 text-blue-800"
                  : "border-red-200 bg-red-50 text-red-800"
              }`}
            >
              {passed
                ? "Tabriklaymiz! Siz N3 grammatika testidan muvaffaqiyatli o'tdingiz."
                : "Testdan o'tish uchun kamida 28/40 ball, ya'ni 70% olish kerak."}
            </div>

          </div>

          {/* Detailed answers */}
          <div className="mt-7">

            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Javoblar tahlili
            </h2>

            <div className="space-y-4">

              {examQuestions.map((q, index) => {

                const userAnswer =
                  answers[q.id];

                const isCorrect =
                  userAnswer === q.answer;

                return (
                  <div
                    key={q.id}
                    className={`bg-white rounded-2xl border-2 p-5 ${
                      isCorrect
                        ? "border-blue-100"
                        : "border-red-100"
                    }`}
                  >

                    <div className="flex items-center justify-between gap-3">

                      <div className="flex items-center gap-3">

                        <span
                          className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold ${
                            isCorrect
                              ? "bg-blue-100 text-blue-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {index + 1}
                        </span>

                        <span
                          className={`text-sm font-bold ${
                            isCorrect
                              ? "text-blue-700"
                              : "text-red-700"
                          }`}
                        >
                          {isCorrect
                            ? "✓ To‘g‘ri"
                            : "✕ Noto‘g‘ri"}
                        </span>

                      </div>

                      {q.type === "star" && (
                        <span className="px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold">
                          ★ WORD ORDER
                        </span>
                      )}

                    </div>

                    <div className="mt-4 text-base md:text-lg leading-8 text-slate-900 whitespace-pre-line">
                      {q.question}
                    </div>

                    {/* User */}
                    <div className="mt-4 rounded-xl bg-slate-50 p-4">

                      <p className="text-xs font-bold text-slate-500 uppercase">
                        Sizning javobingiz
                      </p>

                      {userAnswer !== undefined ? (
                        <p
                          className={`mt-1 font-semibold ${
                            isCorrect
                              ? "text-blue-700"
                              : "text-red-700"
                          }`}
                        >
                          {String.fromCharCode(
                            65 + userAnswer
                          )}
                          .{" "}
                          {q.options[userAnswer]}
                        </p>
                      ) : (
                        <p className="mt-1 text-red-600 font-semibold">
                          Javob berilmagan
                        </p>
                      )}

                    </div>

                    {/* Correct */}
                    <div className="mt-3 rounded-xl bg-blue-50 border border-blue-100 p-4">

                      <p className="text-xs font-bold text-blue-600 uppercase">
                        To‘g‘ri javob
                      </p>

                      <p className="mt-1 text-blue-900 font-semibold">
                        {String.fromCharCode(
                          65 + q.answer
                        )}
                        .{" "}
                        {q.options[q.answer]}
                      </p>

                    </div>

                  </div>
                );
              })}

            </div>

          </div>

          <div className="text-center mt-7 pb-8">
            <p className="text-xs text-slate-400">
              {name} · N3 Grammar Examination
            </p>
          </div>

        </div>

      </main>
    );
  }

  // =========================================================
  // EXAM
  // =========================================================

  if (!question) {
    return null;
  }

  const selectedAnswer = answers[question.id];

  const progress =
    ((answeredCount / totalQuestions) * 100);

  const isLowTime = timeLeft <= 5 * 60;

  return (
    <main
      className="min-h-screen bg-slate-50 select-none"
      onContextMenu={(event) =>
        event.preventDefault()
      }
    >

      {/* =====================================================
          TOP HEADER
      ===================================================== */}

      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">

        <div className="max-w-5xl mx-auto px-3 md:px-5 py-3">

          <div className="flex items-center justify-between gap-3">

            <div>
              <p className="text-xs font-semibold text-blue-600">
                JLPT N3
              </p>

              <p className="font-bold text-slate-900">
                Grammar Test
              </p>
            </div>

            {/* Answer progress */}
            <div className="hidden sm:block text-sm text-slate-500">
              Javob berildi:{" "}
              <b className="text-green-600">
                {answeredCount}
              </b>
              /40
            </div>

            {/* Timer */}
            <div
              className={`px-3 md:px-4 py-2 rounded-xl font-mono font-bold text-base md:text-lg ${
                isLowTime
                  ? "bg-red-100 text-red-700 border border-red-200"
                  : "bg-blue-50 text-blue-700 border border-blue-100"
              }`}
            >
              {formatTime(timeLeft)}
            </div>

          </div>

          {/* =================================================
              40 QUESTION NAVIGATION
          ================================================= */}

          <div className="mt-3">

            <div className="flex items-center justify-between mb-2">

              <p className="text-xs font-bold text-slate-500">
                SAVOLLAR
              </p>

              <p className="text-xs text-slate-400">
                {answeredCount}/40 belgilangan
              </p>

            </div>

            <div className="grid grid-cols-10 gap-1.5 md:gap-2">

              {examQuestions.map(
                (q, index) => {

                  const answered =
                    answers[q.id] !== undefined;

                  const active =
                    current === index;

                  return (
                    <button
                      key={q.id}
                      onClick={() =>
                        goToQuestion(index)
                      }
                      className={`
                        h-8 md:h-9
                        rounded-lg
                        text-xs md:text-sm
                        font-bold
                        transition
                        border
                        ${
                          active
                            ? "bg-blue-600 text-white border-blue-600 ring-2 ring-blue-200"
                            : answered
                            ? "bg-green-500 text-white border-green-500 hover:bg-green-600"
                            : "bg-white text-slate-500 border-slate-200 hover:border-blue-300 hover:text-blue-600"
                        }
                      `}
                    >
                      {index + 1}
                    </button>
                  );
                }
              )}

            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-2 text-[11px] text-slate-400">

              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-600" />
                Hozirgi
              </span>

              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-green-500" />
                Belgilangan
              </span>

              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm border border-slate-300 bg-white" />
                Bo‘sh
              </span>

            </div>

            {/* Overall progress */}
            <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">

              <div
                className="h-full bg-green-500 transition-all duration-300"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

          </div>

        </div>

      </header>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="max-w-4xl mx-auto px-4 py-6 md:py-9">

        {/* Student */}
        <div className="flex items-center justify-between mb-5">

          <span className="text-sm text-slate-500">
            {name}
          </span>

          {warnings > 0 && (
            <span className="text-red-600 font-bold text-sm">
              ⚠ Warning: {warnings}/{MAX_WARNINGS}
            </span>
          )}

        </div>

        {/* ===================================================
            QUESTION CARD
        =================================================== */}

        <section className="bg-white border border-slate-200 rounded-2xl shadow-lg shadow-slate-200/50 p-5 md:p-9">

          {/* Number */}
          <div className="flex items-center justify-between mb-5">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-lg">
                {current + 1}
              </div>

              <div>

                <p className="text-xs text-slate-400">
                  SAVOL
                </p>

                <p className="font-bold text-slate-900">
                  {current + 1} / 40
                </p>

              </div>

            </div>

            {question.type === "star" ? (
              <span className="px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold">
                ★ WORD ORDER
              </span>
            ) : (
              <span className="px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold">
                文法
              </span>
            )}

          </div>

          {/* Instruction */}
          <p className="text-sm text-slate-500 mb-5">
            {question.type === "star"
              ? "★の位置に入る最も適切なものを選びなさい。"
              : "次の文の（　）に入る最も適切なものを選びなさい。"}
          </p>

          {/* Question */}
          <div className="text-lg md:text-xl leading-[2] font-medium text-slate-900 whitespace-pre-line">
            {question.question}
          </div>

          {/* =================================================
              OPTIONS
          ================================================= */}

          <div className="mt-8 space-y-3">

            {question.options.map(
              (option, index) => {

                const selected =
                  selectedAnswer === index;

                return (
                  <button
                    key={`${question.id}-${index}`}
                    onClick={() =>
                      selectAnswer(index)
                    }
                    className={`w-full text-left rounded-xl border-2 px-4 py-4 transition ${
                      selected
                        ? "border-blue-600 bg-blue-50 shadow-sm"
                        : "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/30"
                    }`}
                  >

                    <div className="flex items-center gap-4">

                      <span
                        className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center font-bold ${
                          selected
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {String.fromCharCode(
                          65 + index
                        )}
                      </span>

                      <span className="text-base md:text-lg text-slate-900">
                        {option}
                      </span>

                    </div>

                  </button>
                );
              }
            )}

          </div>

          {/* =================================================
              NAVIGATION BUTTONS
          ================================================= */}

          <div className="mt-8 flex gap-3">

            <button
              onClick={previousQuestion}
              disabled={current === 0}
              className="px-5 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-600 font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:border-blue-300 transition"
            >
              ←
            </button>

            {current < totalQuestions - 1 ? (
              <button
                onClick={nextQuestion}
                className="flex-1 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition shadow-lg shadow-blue-600/20"
              >
                Keyingi savol →
              </button>
            ) : allAnswered ? (
              <button
                onClick={finishExam}
                className="flex-1 py-3.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-black transition shadow-lg shadow-green-600/20"
              >
                ✓ TESTNI YAKUNLASH
              </button>
            ) : (
              <button
                onClick={() => {
                  setWarningText(
                    `Testni yakunlash uchun yana ${unansweredCount} ta savolga javob bering.`
                  );

                  setShowWarning(true);
                }}
                className="flex-1 py-3.5 rounded-xl bg-slate-200 text-slate-500 font-bold cursor-not-allowed"
              >
                {unansweredCount} ta savol qoldi
              </button>
            )}

          </div>

          {/* Finish button can also appear on ANY question */}
          {allAnswered && (
            <button
              onClick={finishExam}
              className="w-full mt-3 py-3 rounded-xl border-2 border-green-500 bg-green-50 text-green-700 hover:bg-green-100 font-bold transition"
            >
              ✓ Barcha savollar belgilangan — Testni yakunlash
            </button>
          )}

        </section>

        {/* ===================================================
            MOBILE STATUS
        =================================================== */}

        <div className="mt-5 text-center">

          <p className="text-xs text-slate-400">
            {answeredCount}/40 savolga javob berildi
          </p>

        </div>

      </div>

      {/* =====================================================
          WATERMARK
      ===================================================== */}

      <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden opacity-[0.035]">

        <div className="absolute inset-0 flex items-center justify-center">

          <p className="text-5xl md:text-7xl font-black rotate-[-25deg] whitespace-nowrap">
            {name} · N3 EXAM
          </p>

        </div>

      </div>

      {/* WARNING */}
      {showWarning && (
        <WarningModal
          text={warningText}
          onClose={() =>
            setShowWarning(false)
          }
        />
      )}

    </main>
  );
}

// ===========================================================
// RESULT ROW
// ===========================================================

function ResultRow({
  label,
  value,
  valueClass = "text-slate-900",
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex justify-between py-2">

      <span className="text-slate-500">
        {label}
      </span>

      <b className={valueClass}>
        {value}
      </b>

    </div>
  );
}

// ===========================================================
// WARNING MODAL
// ===========================================================

function WarningModal({
  text,
  onClose,
}: {
  text: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] bg-red-950/70 backdrop-blur-sm flex items-center justify-center p-5">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-red-600">

        {/* Header */}
        <div className="bg-red-600 text-white px-6 py-5 text-center">

          <div className="w-14 h-14 mx-auto rounded-full bg-white/20 flex items-center justify-center text-3xl font-black mb-3">
            !
          </div>

          <h2 className="text-2xl font-black">
            OGOHLANTIRISH
          </h2>

        </div>

        {/* Body */}
        <div className="p-6 text-center">

          <p className="text-slate-700 leading-relaxed">
            {text}
          </p>

          <button
            onClick={onClose}
            className="w-full mt-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition"
          >
            Testga qaytish
          </button>

        </div>

      </div>

    </div>
  );
}