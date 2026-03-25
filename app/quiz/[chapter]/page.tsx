"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { getChapter } from "@/data/index";
import Link from "next/link";

const OPTION_LABELS = ["A", "B", "C", "D"];
const TIMER_SECONDS = 50;

export default function QuizPage() {
  const router = useRouter();
  const params = useParams();
  const chapterId = params.chapter as string;

  const chapter = getChapter(chapterId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);

  useEffect(() => {
    if (!chapter || chapter.questions.length === 0) {
      router.push("/");
    }
  }, [chapter, router]);

  const handleNext = useCallback(
    (auto = false) => {
      if (!chapter) return;
      const newAnswers = [...answers, auto ? null : selected];

      if (currentIndex + 1 >= chapter.questions.length) {
        localStorage.setItem(
          `quizAnswers_chapter${chapterId}`,
          JSON.stringify(newAnswers)
        );
        router.push(`/result/${chapterId}`);
        return;
      }

      setAnswers(newAnswers);
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setTimeLeft(TIMER_SECONDS);
    },
    [answers, chapter, chapterId, currentIndex, router, selected]
  );

  // Timer countdown
  useEffect(() => {
    if (!chapter || chapter.questions.length === 0) return;
    if (timeLeft === 0) {
      handleNext(true);
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, chapter, handleNext]);

  if (!chapter || chapter.questions.length === 0) return null;

  const question = chapter.questions[currentIndex];
  const progress = ((currentIndex + 1) / chapter.questions.length) * 100;

  const timerColor =
    timeLeft <= 10
      ? "bg-red-500"
      : timeLeft <= 20
      ? "bg-yellow-500"
      : "bg-green-500";

  const timerTextColor =
    timeLeft <= 10
      ? "text-red-400"
      : timeLeft <= 20
      ? "text-yellow-400"
      : "text-green-400";

  return (
    <main className="min-h-screen bg-[#070f0a] px-4 py-8">
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-72 h-72 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-32 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-gray-500 hover:text-green-400 text-xs transition-colors duration-200"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Home
          </Link>
          <span className="text-green-300 text-xs font-semibold uppercase tracking-widest">
            Chapter {chapterId}
          </span>
          <a
            href="https://www.youtube.com/@CodewithMohsin1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-gray-600 hover:text-red-400 text-xs transition-colors duration-200"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Code with Mohsin
          </a>
        </div>

        {/* Progress bar */}
        <div className="mb-2 flex items-center justify-between text-xs text-gray-500">
          <span>
            Question {currentIndex + 1} / {chapter.questions.length}
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-white/5 rounded-full h-1.5 mb-6 overflow-hidden">
          <div
            className="h-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Timer */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <svg className={`w-4 h-4 ${timerTextColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className={`text-sm font-bold tabular-nums ${timerTextColor}`}>
              {timeLeft}s
            </span>
          </div>
          <div className="flex-1 mx-3 bg-white/5 rounded-full h-2 overflow-hidden">
            <div
              className={`h-2 rounded-full transition-all duration-1000 ${timerColor}`}
              style={{ width: `${(timeLeft / TIMER_SECONDS) * 100}%` }}
            />
          </div>
          <span className="text-gray-600 text-xs">Auto-skip on 0</span>
        </div>

        {/* Question Card */}
        <div className="bg-[#0e1f14] border border-white/10 rounded-3xl overflow-hidden shadow-2xl mb-5">
          <div className="px-6 py-5 border-b border-white/5">
            <div className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-xl bg-green-500/15 border border-green-500/30 flex items-center justify-center text-green-400 text-sm font-bold flex-shrink-0 mt-0.5">
                {currentIndex + 1}
              </span>
              <p className="text-white font-semibold text-base leading-6">
                {question.question}
              </p>
            </div>
          </div>

          <div className="p-4 space-y-2.5">
            {question.options.map((option, i) => {
              const isSelected = selected === i;
              return (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border text-left transition-all duration-200 group
                    ${
                      isSelected
                        ? "border-green-500/60 bg-green-500/15 text-white shadow-lg shadow-green-500/10"
                        : "border-white/8 bg-white/3 hover:border-green-500/30 hover:bg-green-500/8 text-gray-300 hover:text-white"
                    }`}
                >
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all duration-200
                      ${
                        isSelected
                          ? "bg-green-500 text-white"
                          : "bg-white/8 text-gray-500 group-hover:bg-green-500/20 group-hover:text-green-400"
                      }`}
                  >
                    {OPTION_LABELS[i]}
                  </span>
                  <span className="text-sm flex-1 leading-5">{option}</span>
                  {isSelected && (
                    <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={() => handleNext(false)}
          disabled={selected === null}
          className={`w-full py-4 rounded-2xl font-bold text-base transition-all duration-200
            ${
              selected !== null
                ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-[1.01] active:scale-[0.99]"
                : "bg-white/5 text-gray-600 cursor-not-allowed"
            }`}
        >
          {currentIndex + 1 === chapter.questions.length ? "Nateeja Dekhein" : "Agla Sawal"}
        </button>

        <p className="text-center text-gray-700 text-xs mt-3">
          Jawab na dein to waqt khatam hone par skip ho jaye ga
        </p>
      </div>
    </main>
  );
}
