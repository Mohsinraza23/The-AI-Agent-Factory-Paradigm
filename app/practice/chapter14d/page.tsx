"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { chapter14d, TOPICS_D } from "@/data/chapter14d";

const OPTION_LABELS = ["A", "B", "C", "D"];

type TopicFilter = (typeof TOPICS_D)[number] | "All";

export default function PracticePageD() {
  const [activeTopic, setActiveTopic] = useState<TopicFilter>("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const questions = useMemo(
    () =>
      activeTopic === "All"
        ? chapter14d
        : chapter14d.filter((q) => q.topic === activeTopic),
    [activeTopic]
  );

  const question = questions[currentIndex];

  function handleTopicChange(topic: TopicFilter) {
    setActiveTopic(topic);
    setCurrentIndex(0);
    setSelected(null);
    setRevealed(false);
    setScore(0);
    setDone(false);
  }

  function handleSelect(i: number) {
    if (revealed) return;
    setSelected(i);
    setRevealed(true);
    if (i === question.correct) setScore((s) => s + 1);
  }

  function handleNext() {
    if (currentIndex + 1 >= questions.length) {
      setDone(true);
      return;
    }
    setCurrentIndex((i) => i + 1);
    setSelected(null);
    setRevealed(false);
  }

  function handleRestart() {
    setCurrentIndex(0);
    setSelected(null);
    setRevealed(false);
    setScore(0);
    setDone(false);
  }

  const percentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
  const grade =
    percentage >= 90 ? { label: "A+", color: "text-green-400" } :
    percentage >= 80 ? { label: "A",  color: "text-green-400" } :
    percentage >= 70 ? { label: "B",  color: "text-emerald-400" } :
    percentage >= 60 ? { label: "C",  color: "text-yellow-400" } :
    percentage >= 50 ? { label: "D",  color: "text-orange-400" } :
    { label: "F", color: "text-red-400" };

  return (
    <main className="min-h-screen bg-[#07080f] px-4 py-6 sm:py-8">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-72 h-72 bg-purple-500/6 rounded-full blur-3xl animate-orb-1" />
        <div className="absolute bottom-0 -left-32 w-72 h-72 bg-blue-400/6 rounded-full blur-3xl animate-orb-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/4 rounded-full blur-3xl animate-orb-3" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">

        {/* Header */}
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
          <div className="text-center">
            <p className="text-green-400/70 text-xs font-semibold uppercase tracking-widest">Practice Mode</p>
            <p className="text-gray-600 text-[10px] mt-0.5">Chapter 14 — Section D</p>
          </div>
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
        </div>

        {/* Topic Filter */}
        <div className="animate-fade-up mb-5" style={{ animationDelay: "0.05s" }}>
          <p className="text-gray-600 text-xs uppercase tracking-widest mb-2.5 px-1">Topic filter</p>
          <div className="flex flex-wrap gap-2">
            {(["All", ...TOPICS_D] as TopicFilter[]).map((t) => (
              <button
                key={t}
                onClick={() => handleTopicChange(t)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-200 active:scale-95
                  ${activeTopic === t
                    ? "bg-green-500/20 border-green-500/50 text-green-300"
                    : "bg-white/4 border-white/10 text-gray-500 hover:border-green-500/30 hover:text-gray-300"
                  }`}
              >
                {t === "All" ? `All (${chapter14d.length})` : t}
              </button>
            ))}
          </div>
        </div>

        {/* Done Screen */}
        {done ? (
          <div className="animate-pop">
            <div className="bg-[#0d0d1f] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-black/40 mb-5 animate-glow">
              <div className={`px-6 py-5 ${percentage >= 50 ? "bg-gradient-to-r from-green-600 to-emerald-500" : "bg-gradient-to-r from-red-700 to-rose-600"}`}>
                <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-1">
                  {percentage >= 50 ? "Mubarak Ho!" : "Mehnat Karein!"}
                </p>
                <p className="text-white font-black text-xl">
                  {percentage >= 50 ? "Practice Complete!" : "Dobara Practice Karein"}
                </p>
              </div>
              <div className="p-6">
                <div className="flex items-end justify-between mb-5">
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Score</p>
                    <p className="animate-pop text-5xl font-black text-white leading-none">
                      {score}
                      <span className="text-xl text-gray-500 font-semibold ml-1">/ {questions.length}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">Grade</p>
                    <p className={`animate-pop text-5xl font-black leading-none ${grade.color}`}>{grade.label}</p>
                  </div>
                </div>
                <div className="w-full bg-white/5 rounded-full h-3 mb-2 overflow-hidden">
                  <div
                    className={`h-3 rounded-full ${percentage >= 50 ? "bg-gradient-to-r from-green-500 to-emerald-400" : "bg-gradient-to-r from-red-500 to-rose-400"}`}
                    style={{ width: `${percentage}%`, transition: "width 1s ease" }}
                  />
                </div>
                <p className="text-right text-xs text-gray-500 mb-5">{percentage}% Sahi</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-500/8 border border-green-500/20 rounded-2xl p-3 text-center">
                    <p className="text-2xl font-black text-green-400">{score}</p>
                    <p className="text-gray-600 text-xs mt-0.5">Sahi</p>
                  </div>
                  <div className="bg-red-500/8 border border-red-500/20 rounded-2xl p-3 text-center">
                    <p className="text-2xl font-black text-red-400">{questions.length - score}</p>
                    <p className="text-gray-600 text-xs mt-0.5">Galat</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleRestart}
                className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 hover:border-green-500/40 text-white hover:text-green-300 font-bold py-4 rounded-2xl transition-all duration-200 hover:scale-[1.01]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Dobara Practice
              </button>
              <Link
                href="/"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold py-4 rounded-2xl transition-all duration-200 shadow-lg shadow-green-500/20 hover:scale-[1.01]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Chapters
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Progress + Score */}
            <div className="flex items-center gap-3 mb-4 animate-fade-up" style={{ animationDelay: "0.08s" }}>
              <span className="text-gray-500 text-xs tabular-nums whitespace-nowrap">
                {currentIndex + 1} / {questions.length}
              </span>
              <div className="flex-1 bg-white/5 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-400 transition-all duration-500"
                  style={{ width: `${(currentIndex / questions.length) * 100}%` }}
                />
              </div>
              <span className="text-green-400 text-xs font-bold tabular-nums whitespace-nowrap">
                {score} sahi
              </span>
            </div>

            {/* Topic badge */}
            <div className="mb-3 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <span className="inline-flex items-center gap-1.5 bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-semibold px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                {question.topic}
              </span>
            </div>

            {/* Question card */}
            <div
              key={currentIndex}
              className="animate-slide-in bg-[#0d0d1f] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-black/40 mb-4"
            >
              <div className="px-5 py-4 border-b border-white/5 bg-gradient-to-br from-purple-500/4 to-transparent">
                <div className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-purple-500/15 border border-purple-500/25 text-purple-400 text-xs font-black flex-shrink-0 mt-0.5">
                    {currentIndex + 1}
                  </span>
                  <p className="text-white font-semibold text-sm sm:text-base leading-6 flex-1">
                    {question.question}
                  </p>
                </div>
              </div>

              <div className="p-3 sm:p-4 space-y-2">
                {question.options.map((option, i) => {
                  const isSelected = selected === i;
                  const isCorrect = i === question.correct;

                  let style = "border-white/8 bg-white/2 hover:border-purple-500/30 hover:bg-purple-500/5 active:scale-[0.99]";
                  let labelStyle = "bg-white/6 text-gray-400";

                  if (revealed) {
                    if (isCorrect) {
                      style = "border-green-500/50 bg-green-500/10";
                      labelStyle = "bg-green-500 text-white";
                    } else if (isSelected && !isCorrect) {
                      style = "border-red-500/50 bg-red-500/10";
                      labelStyle = "bg-red-500 text-white";
                    } else {
                      style = "border-white/5 bg-transparent opacity-50";
                      labelStyle = "bg-white/6 text-gray-600";
                    }
                  } else if (isSelected) {
                    style = "border-purple-500/60 bg-purple-500/12 scale-[1.01]";
                    labelStyle = "bg-purple-500 text-white";
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(i)}
                      disabled={revealed}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border text-left transition-all duration-200 ${style}`}
                    >
                      <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0 transition-all duration-200 ${labelStyle}`}>
                        {OPTION_LABELS[i]}
                      </span>
                      <span className={`text-sm flex-1 leading-5 ${revealed && isCorrect ? "text-green-300 font-semibold" : revealed && isSelected && !isCorrect ? "text-red-300" : "text-gray-400"}`}>
                        {option}
                      </span>
                      {revealed && isCorrect && (
                        <span className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      )}
                      {revealed && isSelected && !isCorrect && (
                        <span className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {revealed && (
                <div className="animate-fade-up mx-3 sm:mx-4 mb-4 p-4 bg-[#0a0a1e] border border-white/8 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 01-1 1H9a1 1 0 01-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7zm2 18H10v1a1 1 0 001 1h2a1 1 0 001-1v-1z"/>
                      </svg>
                    </span>
                    <span className="text-yellow-400 text-xs font-bold uppercase tracking-wide">Explanation</span>
                  </div>
                  <p className="text-gray-300 text-xs leading-5">{question.explanation}</p>
                </div>
              )}
            </div>

            {/* Next button */}
            {revealed && (
              <button
                onClick={handleNext}
                className="animate-fade-up w-full py-4 rounded-2xl font-black text-base bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white shadow-lg shadow-green-500/25 hover:shadow-green-500/40 active:scale-[0.98] hover:scale-[1.01] transition-all duration-200"
              >
                {currentIndex + 1 >= questions.length ? "Nateeja Dekhein →" : "Agla Sawal →"}
              </button>
            )}

            {!revealed && (
              <p className="text-center text-gray-700 text-xs mt-1">
                Koi bhi option select karein — jawab ke baad explanation nazar aayegi
              </p>
            )}
          </>
        )}
      </div>
    </main>
  );
}
