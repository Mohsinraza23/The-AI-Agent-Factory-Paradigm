"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { getChapter } from "@/data/index";
import Link from "next/link";

const OPTION_LABELS = ["A", "B", "C", "D"];
const TIMER_SECONDS = 30;
const CIRCUMFERENCE = 2 * Math.PI * 26; // r=26

export default function QuizPage() {
  const router = useRouter();
  const params = useParams();
  const chapterId = params.chapter as string;

  const chapter = getChapter(chapterId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [cardKey, setCardKey] = useState(0);

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
      setCardKey((k) => k + 1);
    },
    [answers, chapter, chapterId, currentIndex, router, selected]
  );

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
  const isUrgent = timeLeft <= 10;
  const isWarning = timeLeft <= 20;

  const timerStroke = isUrgent ? "#ef4444" : isWarning ? "#eab308" : "#22c55e";
  const timerTextColor = isUrgent
    ? "text-red-400"
    : isWarning
    ? "text-yellow-400"
    : "text-green-400";

  const dashOffset = CIRCUMFERENCE * (1 - timeLeft / TIMER_SECONDS);

  return (
    <main className="min-h-screen bg-[#070f0a] px-4 py-6 sm:py-8">
      {/* Animated background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-72 h-72 bg-green-500/8 rounded-full blur-3xl animate-orb-1" />
        <div className="absolute bottom-0 -left-32 w-72 h-72 bg-emerald-400/8 rounded-full blur-3xl animate-orb-2" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-5 animate-fade-up">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-gray-500 hover:text-green-400 text-xs transition-colors duration-200 active:scale-95 py-2 px-1"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Home
          </Link>

          <span className="text-green-400/70 text-xs font-semibold uppercase tracking-widest">
            Chapter {chapterId}
          </span>

          <a
            href="https://www.youtube.com/@CodewithMohsin1"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-gray-600 hover:text-red-400 text-xs transition-colors duration-200"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Code with Mohsin
          </a>
          <span className="sm:hidden w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-3 mb-4 animate-fade-up" style={{ animationDelay: "0.05s" }}>
          <span className="text-gray-500 text-xs tabular-nums whitespace-nowrap">
            {currentIndex + 1} / {chapter.questions.length}
          </span>
          <div className="flex-1 bg-white/5 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-gray-600 text-xs tabular-nums">{Math.round(progress)}%</span>
        </div>

        {/* Timer row — circular SVG timer */}
        <div className="flex items-center gap-4 mb-5 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          {/* Circular timer */}
          <div className={`relative flex-shrink-0 flex items-center justify-center ${isUrgent ? "animate-urgent" : ""}`}>
            <svg width="56" height="56" className="-rotate-90">
              {/* Background track */}
              <circle
                cx="28" cy="28" r="22"
                fill="none"
                stroke="#ffffff08"
                strokeWidth="3.5"
              />
              {/* Progress arc */}
              <circle
                cx="28" cy="28" r="22"
                fill="none"
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke={timerStroke}
                strokeDasharray={`${2 * Math.PI * 22}`}
                strokeDashoffset={`${2 * Math.PI * 22 * (1 - timeLeft / TIMER_SECONDS)}`}
                style={{ transition: "stroke-dashoffset 1s linear, stroke 0.4s ease" }}
              />
            </svg>
            <span className={`absolute text-sm font-black tabular-nums leading-none ${timerTextColor}`}>
              {timeLeft}
            </span>
          </div>

          {/* Timer label + auto-skip text */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1.5">
              <span className={`text-xs font-semibold ${timerTextColor}`}>
                {isUrgent ? "Jaldi karein!" : isWarning ? "Waqt khatam ho raha hai" : "Waqt bacha hua"}
              </span>
              <span className="text-gray-700 text-xs hidden sm:inline">Auto-skip on 0</span>
            </div>
            {/* Thin color bar */}
            <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden">
              <div
                className="h-1 rounded-full transition-all duration-1000"
                style={{
                  width: `${(timeLeft / TIMER_SECONDS) * 100}%`,
                  background: timerStroke,
                }}
              />
            </div>
          </div>
        </div>

        {/* Question card */}
        <div
          key={cardKey}
          className="animate-slide-in bg-[#0d1f13] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-black/40 mb-4 animate-glow"
        >
          {/* Question header */}
          <div className="px-5 py-4 border-b border-white/5 bg-gradient-to-br from-green-500/5 to-transparent">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-green-500/15 border border-green-500/25 text-green-400 text-xs font-black">
                  {currentIndex + 1}
                </span>
              </div>
              <p className="text-white font-semibold text-sm sm:text-base leading-6 flex-1">
                {question.question}
              </p>
            </div>
          </div>

          {/* Options */}
          <div className="p-3 sm:p-4 space-y-2">
            {question.options.map((option, i) => {
              const isSelected = selected === i;
              return (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border text-left transition-all duration-200
                    ${
                      isSelected
                        ? "border-green-500/60 bg-green-500/15 shadow-lg shadow-green-500/10 scale-[1.01]"
                        : "border-white/8 bg-white/2 hover:border-green-500/30 hover:bg-green-500/8 active:bg-green-500/12 active:scale-[0.99]"
                    }`}
                >
                  <span
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0 transition-all duration-200
                      ${
                        isSelected
                          ? "bg-green-500 text-white shadow-md shadow-green-500/40"
                          : "bg-white/6 text-gray-400"
                      }`}
                  >
                    {OPTION_LABELS[i]}
                  </span>
                  <span className={`text-sm flex-1 leading-5 transition-colors duration-200 ${isSelected ? "text-white" : "text-gray-400"}`}>
                    {option}
                  </span>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Next button */}
        <button
          onClick={() => handleNext(false)}
          disabled={selected === null}
          className={`w-full py-4 rounded-2xl font-black text-base transition-all duration-200
            ${
              selected !== null
                ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white shadow-lg shadow-green-500/25 hover:shadow-green-500/40 active:scale-[0.98] hover:scale-[1.01]"
                : "bg-white/4 text-gray-600 cursor-not-allowed"
            }`}
        >
          {currentIndex + 1 === chapter.questions.length ? "Nateeja Dekhein →" : "Agla Sawal →"}
        </button>

        <p className="text-center text-gray-700 text-xs mt-3">
          Jawab na dein to {timeLeft}s baad auto-skip ho jaye ga
        </p>
      </div>
    </main>
  );
}
