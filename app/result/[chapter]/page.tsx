"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getChapter } from "@/data/index";
import Link from "next/link";

const OPTION_LABELS = ["A", "B", "C", "D"];

export default function ResultPage() {
  const router = useRouter();
  const params = useParams();
  const chapterId = params.chapter as string;

  const chapter = getChapter(chapterId);
  const [answers, setAnswers] = useState<(number | null)[] | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(`quizAnswers_chapter${chapterId}`);
    if (!stored) {
      router.push("/");
      return;
    }
    setAnswers(JSON.parse(stored));
  }, [chapterId, router]);

  if (!answers || !chapter) return null;

  const score = answers.reduce((acc: number, ans, i) => {
    return ans === chapter.questions[i].correct ? acc + 1 : acc;
  }, 0);

  const skipped = answers.filter((a) => a === null).length;
  const percentage = Math.round((score / chapter.questions.length) * 100);
  const passed = percentage >= 50;

  const grade =
    percentage >= 90 ? { label: "A+", color: "text-green-400" } :
    percentage >= 80 ? { label: "A",  color: "text-green-400" } :
    percentage >= 70 ? { label: "B",  color: "text-emerald-400" } :
    percentage >= 60 ? { label: "C",  color: "text-yellow-400" } :
    percentage >= 50 ? { label: "D",  color: "text-orange-400" } :
    { label: "F", color: "text-red-400" };

  return (
    <main className="min-h-screen bg-[#070f0a] px-4 py-8">
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-32 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6 animate-fade-up">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-300 text-xs font-semibold uppercase tracking-widest">
              Quiz Complete
            </span>
          </div>
          <a
            href="https://www.youtube.com/@CodewithMohsin1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-gray-600 hover:text-red-400 text-xs transition-colors duration-200"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Code with Mohsin
          </a>
        </div>

        {/* Score Card */}
        <div className="animate-fade-up bg-[#0d1f13] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-black/40 mb-5">
          {/* Banner */}
          <div className={`px-6 py-5 flex items-center justify-between ${passed ? "bg-gradient-to-r from-green-600 to-emerald-500" : "bg-gradient-to-r from-red-700 to-rose-600"}`}>
            <div>
              <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">
                {passed ? "Mubarak Ho!" : "Mehnat Karein!"}
              </p>
              <p className="text-white font-black text-xl">
                {passed ? "Aapne Quiz Pass Kar Li 🎉" : "Dobara Koshish Karein 💪"}
              </p>
            </div>
            <span className="text-5xl animate-pop">{passed ? "🏆" : "📚"}</span>
          </div>

          <div className="p-5 sm:p-6">
            {/* Score + Grade */}
            <div className="flex items-end justify-between mb-5">
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Total Score</p>
                <p className="animate-pop text-5xl sm:text-6xl font-black text-white leading-none">
                  {score}
                  <span className="text-xl sm:text-2xl text-gray-500 font-semibold ml-1">
                    / {chapter.questions.length}
                  </span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Grade</p>
                <p className={`animate-pop text-5xl sm:text-6xl font-black leading-none ${grade.color}`}>
                  {grade.label}
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-white/5 rounded-full h-3 mb-2 overflow-hidden">
              <div
                className={`h-3 rounded-full transition-all duration-1000 delay-300 ${passed ? "bg-gradient-to-r from-green-500 to-emerald-400" : "bg-gradient-to-r from-red-500 to-rose-400"}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-right text-xs text-gray-500 mb-5">{percentage}% Correct</p>

            {/* Stats — 4 cards */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { val: score,                          label: "Sahi",   icon: "✓", color: "text-green-400",  bg: "hover:bg-green-500/10  hover:border-green-500/30"  },
                { val: chapter.questions.length - score - skipped, label: "Galat",  icon: "✗", color: "text-red-400",    bg: "hover:bg-red-500/10    hover:border-red-500/30"    },
                { val: skipped,                        label: "Skip",   icon: "–", color: "text-yellow-400", bg: "hover:bg-yellow-500/10 hover:border-yellow-500/30" },
                { val: `${percentage}%`,               label: "Score",  icon: "%", color: "text-blue-400",   bg: "hover:bg-blue-500/10   hover:border-blue-500/30"   },
              ].map((s) => (
                <div
                  key={s.label}
                  className={`bg-white/4 border border-white/8 rounded-2xl p-3 text-center transition-all duration-200 cursor-default ${s.bg}`}
                >
                  <p className={`text-lg sm:text-2xl font-black ${s.color}`}>{s.val}</p>
                  <p className="text-gray-600 text-xs mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* YouTube CTA */}
        <a
          href="https://www.youtube.com/@CodewithMohsin1"
          target="_blank"
          rel="noopener noreferrer"
          className="group block mb-6 animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="relative bg-gradient-to-r from-red-600/20 via-red-500/10 to-red-600/20 hover:from-red-600/30 hover:to-red-600/30 border border-red-500/25 hover:border-red-500/60 rounded-2xl px-4 py-4 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg hover:shadow-red-500/15 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-red-600/40">
                  <svg className="w-5 h-5 sm:w-7 sm:h-7 fill-white" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white font-extrabold text-sm leading-tight">Code with Mohsin</p>
                  <p className="text-gray-500 text-xs mt-0.5">AI • Coding • Tech — Urdu mein</p>
                  <p className="text-red-300 text-xs font-semibold mt-0.5">👉 Subscribe — free hai!</p>
                </div>
              </div>
              <span className="flex-shrink-0 bg-red-600 group-hover:bg-red-500 text-white text-xs font-black px-4 py-2 rounded-full transition-colors duration-200 shadow-lg shadow-red-600/30">
                Subscribe
              </span>
            </div>
          </div>
        </a>

        {/* Review heading */}
        <div className="flex items-center gap-3 mb-4 px-1">
          <h2 className="text-green-300 font-black text-sm uppercase tracking-widest">
            Jawabat ka Jaiza
          </h2>
          <div className="flex-1 h-px bg-white/5" />
          <span className="text-gray-600 text-xs">{chapter.questions.length} sawal</span>
        </div>

        {/* Question review cards */}
        <div className="space-y-3">
          {chapter.questions.map((q, i) => {
            const userAnswer = answers[i];
            const isCorrect = userAnswer === q.correct;
            const isSkipped = userAnswer === null;

            const status = isSkipped ? "skip" : isCorrect ? "correct" : "wrong";

            return (
              <div
                key={q.id}
                className="animate-fade-up bg-[#0d1f13] border border-white/8 rounded-2xl overflow-hidden hover:border-white/15 transition-all duration-200"
                style={{ animationDelay: `${Math.min(i * 0.03, 0.5)}s` }}
              >
                {/* Question header */}
                <div
                  className={`px-4 py-3 flex items-start gap-3
                    ${status === "correct" ? "bg-green-500/8 border-b border-green-500/15"
                    : status === "wrong"   ? "bg-red-500/8   border-b border-red-500/15"
                    : "bg-yellow-500/5 border-b border-yellow-500/10"}`}
                >
                  {/* Q number */}
                  <div className="flex-shrink-0 flex flex-col items-center gap-1 pt-0.5">
                    <span
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black
                        ${status === "correct" ? "bg-green-500/20 text-green-400"
                        : status === "wrong"   ? "bg-red-500/20   text-red-400"
                        : "bg-yellow-500/15 text-yellow-500"}`}
                    >
                      {i + 1}
                    </span>
                    {/* Status badge */}
                    <span
                      className={`text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wide
                        ${status === "correct" ? "bg-green-500/20 text-green-400"
                        : status === "wrong"   ? "bg-red-500/20   text-red-400"
                        : "bg-yellow-500/15 text-yellow-500"}`}
                    >
                      {status === "correct" ? "✓ Sahi" : status === "wrong" ? "✗ Galat" : "– Skip"}
                    </span>
                  </div>

                  <span className="text-gray-200 text-sm leading-5 flex-1">{q.question}</span>
                </div>

                {/* Options */}
                <div className="p-3 space-y-1.5">
                  {q.options.map((option, j) => {
                    const isCorrectOpt = j === q.correct;
                    const isUserPick   = j === userAnswer;
                    const isWrongPick  = isUserPick && !isCorrect && !isSkipped;

                    let rowStyle   = "border-white/5 bg-transparent";
                    let labelStyle = "bg-white/6 text-gray-600";
                    let textStyle  = "text-gray-600";
                    let badge: React.ReactNode = null;

                    if (isCorrectOpt) {
                      rowStyle   = "border-green-500/35 bg-green-500/8";
                      labelStyle = "bg-green-500 text-white";
                      textStyle  = "text-green-300";
                      badge = <span className="text-green-400 text-[10px] font-black bg-green-500/15 px-2 py-0.5 rounded-full flex-shrink-0">Sahi jawab</span>;
                    } else if (isWrongPick) {
                      rowStyle   = "border-red-500/35 bg-red-500/8";
                      labelStyle = "bg-red-500 text-white";
                      textStyle  = "text-red-300";
                      badge = <span className="text-red-400 text-[10px] font-black bg-red-500/15 px-2 py-0.5 rounded-full flex-shrink-0">Aapka jawab</span>;
                    } else if (isSkipped && isCorrectOpt) {
                      badge = <span className="text-yellow-500 text-[10px] font-black bg-yellow-500/10 px-2 py-0.5 rounded-full flex-shrink-0">Skip hua</span>;
                    }

                    return (
                      <div
                        key={j}
                        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border ${rowStyle} transition-colors duration-150`}
                      >
                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 ${labelStyle}`}>
                          {OPTION_LABELS[j]}
                        </span>
                        <span className={`text-xs flex-1 leading-4 ${textStyle}`}>{option}</span>
                        {badge}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href={`/quiz/${chapterId}`}
            onClick={() => localStorage.removeItem(`quizAnswers_chapter${chapterId}`)}
            className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 hover:border-green-500/40 text-white hover:text-green-300 font-bold py-4 rounded-2xl text-center transition-all duration-200 hover:scale-[1.01]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Dobara Khelein
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 active:from-green-600 active:to-emerald-600 text-white font-bold py-4 rounded-2xl text-center transition-all duration-200 shadow-lg shadow-green-500/20 hover:shadow-green-500/40 hover:scale-[1.01]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42-.39-.39-1.02-.39-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z" />
            </svg>
            Chapters Dekhein
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-8 pb-4 text-center">
          <p className="text-gray-700 text-xs">
            Designed &amp; Created by{" "}
            <span className="text-green-400 font-bold tracking-wide">✦ Mohsin Raza</span>
          </p>
        </div>
      </div>
    </main>
  );
}
