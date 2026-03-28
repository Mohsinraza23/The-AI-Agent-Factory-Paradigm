"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { chapter14e, TOPICS_E } from "@/data/chapter14e";

const OPTION_LABELS = ["A", "B", "C", "D"];
const TIMER_SECONDS = 50;

type TopicFilter = (typeof TOPICS_E)[number] | "All";

export default function PracticePageE() {
  const [activeTopic, setActiveTopic] = useState<TopicFilter>("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [answers, setAnswers] = useState<number[]>([]);
  const [shakeKey, setShakeKey] = useState(0);
  const [wrongQIds, setWrongQIds] = useState<Set<number> | null>(null);
  const [bestEver, setBestEver] = useState<number | null>(null);

  useEffect(() => {
    const h = JSON.parse(localStorage.getItem("scoreHistory_14e") || "[]");
    if (h.length > 0) setBestEver(Math.max(...h.map((e: { pct: number }) => e.pct)));
  }, []);

  useEffect(() => {
    if (!done) return;
    const h = JSON.parse(localStorage.getItem("scoreHistory_14e") || "[]");
    const entry = { score, total: questions.length, pct: Math.round((score / questions.length) * 100), ts: Date.now() };
    localStorage.setItem("scoreHistory_14e", JSON.stringify([entry, ...h].slice(0, 20)));
    setBestEver(prev => Math.max(prev ?? 0, entry.pct));
  }, [done]);

  // Reset timer on new question
  useEffect(() => {
    setTimeLeft(TIMER_SECONDS);
  }, [currentIndex, activeTopic]);

  // Countdown
  useEffect(() => {
    if (done || revealed) return;
    if (timeLeft === 0) {
      setAnswers(prev => { const a = [...prev]; a[currentIndex] = -1; return a; });
      setRevealed(true);
      return;
    }
    const t = setTimeout(() => setTimeLeft((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, done, revealed]);

  const questions = useMemo(() => {
    let base = activeTopic === "All" ? chapter14e : chapter14e.filter(q => q.topic === activeTopic);
    if (wrongQIds) base = base.filter(q => wrongQIds.has(q.id));
    return base;
  }, [activeTopic, wrongQIds]);

  const question = questions[currentIndex];

  // Keyboard shortcuts
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (done) return;
      if (!revealed) {
        if (e.key === "1") handleSelect(0);
        else if (e.key === "2") handleSelect(1);
        else if (e.key === "3") handleSelect(2);
        else if (e.key === "4") handleSelect(3);
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleNext();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [revealed, done, currentIndex, selected]);

  function handleTopicChange(topic: TopicFilter) {
    setActiveTopic(topic);
    setCurrentIndex(0);
    setSelected(null);
    setRevealed(false);
    setScore(0);
    setDone(false);
    setTimeLeft(TIMER_SECONDS);
    setAnswers([]);
    setWrongQIds(null);
  }

  function handlePracticeWrong() {
    const ids = new Set(questions.filter((q, i) => answers[i] === undefined || answers[i] === -1 || answers[i] !== q.correct).map(q => q.id));
    setWrongQIds(ids);
    setCurrentIndex(0); setSelected(null); setRevealed(false);
    setScore(0); setDone(false); setTimeLeft(TIMER_SECONDS); setAnswers([]);
  }

  function handleSelect(i: number) {
    if (revealed) return;
    setSelected(i);
    setRevealed(true);
    setAnswers(prev => { const a = [...prev]; a[currentIndex] = i; return a; });
    if (i === question.correct) setScore((s) => s + 1);
    else setShakeKey(k => k + 1);
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
    setTimeLeft(TIMER_SECONDS);
    setAnswers([]);
    setWrongQIds(null);
  }

  const percentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
  const grade =
    percentage >= 90 ? { label: "A+", color: "text-green-400" } :
    percentage >= 80 ? { label: "A",  color: "text-green-400" } :
    percentage >= 70 ? { label: "B",  color: "text-amber-400" } :
    percentage >= 60 ? { label: "C",  color: "text-yellow-400" } :
    percentage >= 50 ? { label: "D",  color: "text-orange-400" } :
    { label: "F", color: "text-red-400" };

  return (
    <main className="min-h-screen bg-[#07080f] px-4 py-6 sm:py-8">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-72 h-72 bg-amber-500/6 rounded-full blur-3xl animate-orb-1" />
        <div className="absolute bottom-0 -left-32 w-72 h-72 bg-orange-400/6 rounded-full blur-3xl animate-orb-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/4 rounded-full blur-3xl animate-orb-3" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-5 animate-fade-up">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-gray-500 hover:text-amber-400 text-xs transition-colors duration-200 active:scale-95 py-2 px-1"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Home
          </Link>
          <div className="text-center">
            <p className="text-amber-400/70 text-xs font-semibold uppercase tracking-widest">Practice Mode</p>
            <p className="text-gray-600 text-[10px] mt-0.5">Chapter 14 — Section E</p>
          </div>
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        </div>

        {/* Topic Filter */}
        <div className="animate-fade-up mb-5" style={{ animationDelay: "0.05s" }}>
          <p className="text-gray-600 text-xs uppercase tracking-widest mb-2.5 px-1">Topic filter</p>
          <div className="flex flex-wrap gap-2">
            {(["All", ...TOPICS_E] as TopicFilter[]).map((t) => (
              <button
                key={t}
                onClick={() => handleTopicChange(t)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all duration-200 active:scale-95
                  ${activeTopic === t
                    ? "bg-amber-500/20 border-amber-500/50 text-amber-300"
                    : "bg-white/4 border-white/10 text-gray-500 hover:border-amber-500/30 hover:text-gray-300"
                  }`}
              >
                {t === "All" ? `All (${chapter14e.length})` : t}
              </button>
            ))}
          </div>
        </div>

        {/* Done Screen */}
        {done ? (
          <div className="animate-pop">
            {/* Trophy + confetti */}
            <div className="text-center mb-6 relative">
              {percentage >= 80 && (
                <div className="absolute inset-0 pointer-events-none overflow-visible flex items-center justify-center">
                  {[
                    { x: -60, color: "#f59e0b" }, { x: 60, color: "#fb923c" },
                    { x: -30, color: "#fbbf24" }, { x: 30, color: "#10b981" },
                    { x: -80, color: "#f472b6" }, { x: 80, color: "#a78bfa" },
                    { x: 0,   color: "#34d399" }, { x: -50, color: "#fde68a" },
                  ].map((c, i) => (
                    <div key={i} className={`absolute w-2.5 h-2.5 rounded-sm animate-confetti-${i}`}
                      style={{ background: c.color, left: `calc(50% + ${c.x}px)`, top: "40%" }} />
                  ))}
                </div>
              )}
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/30 mb-3 animate-pop">
                <span className="text-5xl">{percentage >= 80 ? "🏆" : percentage >= 50 ? "🎯" : "💪"}</span>
              </div>
              <p className="text-white font-black text-2xl">
                {percentage >= 80 ? "Shaandaar!" : percentage >= 50 ? "Acha Kiya!" : "Himmat Rakho!"}
              </p>
              <p className="text-gray-500 text-sm mt-1">
                {percentage >= 80 ? "Strategy expert ban gaye!" : percentage >= 50 ? "Practice jari rakho!" : "Dobara koshish karo!"}
              </p>
              {bestEver !== null && (
                <p className="text-xs text-gray-600 mt-1">Best Score: <span className="text-amber-400 font-bold">{bestEver}%</span></p>
              )}
            </div>

            {/* Score card */}
            <div className="bg-[#0d0d1f] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-black/40 mb-5 animate-glow">
              <div className={`px-6 py-4 ${percentage >= 50 ? "bg-gradient-to-r from-amber-600 to-orange-500" : "bg-gradient-to-r from-red-700 to-rose-600"}`}>
                <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-0.5">
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
                    className={`h-3 rounded-full ${percentage >= 50 ? "bg-gradient-to-r from-amber-500 to-orange-400" : "bg-gradient-to-r from-red-500 to-rose-400"}`}
                    style={{ width: `${percentage}%`, transition: "width 1s ease" }}
                  />
                </div>
                <p className="text-right text-xs text-gray-500 mb-5">{percentage}% Sahi</p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-green-500/8 border border-green-500/20 rounded-2xl p-3 text-center">
                    <p className="text-2xl font-black text-green-400">{score}</p>
                    <p className="text-gray-600 text-xs mt-0.5">Sahi ✓</p>
                  </div>
                  <div className="bg-red-500/8 border border-red-500/20 rounded-2xl p-3 text-center">
                    <p className="text-2xl font-black text-red-400">{questions.filter((q, i) => answers[i] !== undefined && answers[i] !== -1 && answers[i] !== q.correct).length}</p>
                    <p className="text-gray-600 text-xs mt-0.5">Galat ✗</p>
                  </div>
                  <div className="bg-orange-500/8 border border-orange-500/20 rounded-2xl p-3 text-center">
                    <p className="text-2xl font-black text-orange-400">{answers.filter(a => a === -1).length}</p>
                    <p className="text-gray-600 text-xs mt-0.5">Timeout ⏱</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <button
                onClick={handleRestart}
                className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 active:bg-white/15 border border-white/10 hover:border-amber-500/40 text-white hover:text-amber-300 font-bold py-4 rounded-2xl transition-all duration-200 hover:scale-[1.01]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Dobara Practice
              </button>
              <Link
                href="/"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold py-4 rounded-2xl transition-all duration-200 shadow-lg shadow-amber-500/20 hover:scale-[1.01]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Chapters
              </Link>
            </div>

            {answers.some((a, i) => a === undefined || a === -1 || a !== questions[i]?.correct) && (
              <button onClick={handlePracticeWrong}
                className="w-full mb-8 flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/25 hover:border-red-500/50 text-red-300 font-bold py-3 rounded-2xl transition-all duration-200 text-sm">
                <span>🔁</span> Sirf Galat Sawaalon ki Practice ({answers.filter((a, i) => a === undefined || a === -1 || a !== questions[i]?.correct).length} sawal)
              </button>
            )}

            {/* Jawabat ki Review */}
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-white/8" />
                <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest">Jawabat ki Review</p>
                <div className="flex-1 h-px bg-white/8" />
              </div>
              <div className="space-y-3">
                {questions.map((q, idx) => {
                  const userAns = answers[idx];
                  const isCorrect = userAns === q.correct;
                  const isTimeout = userAns === -1;
                  const isUnanswered = userAns === undefined;
                  return (
                    <div key={q.id} className="animate-slide-up bg-[#0d0d1f] border border-white/8 rounded-2xl overflow-hidden" style={{ animationDelay: `${idx * 0.03}s` }}>
                      <div className="flex items-start gap-3 p-4">
                        <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-black mt-0.5 ${isCorrect ? "bg-green-500/20 text-green-400" : isTimeout || isUnanswered ? "bg-orange-500/20 text-orange-400" : "bg-red-500/20 text-red-400"}`}>
                          {isCorrect ? "✓" : isTimeout || isUnanswered ? "⏱" : "✗"}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-300 text-xs font-medium leading-5 mb-2">{idx + 1}. {q.question}</p>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-green-400 text-xs font-semibold w-16 flex-shrink-0">Sahi Jawab:</span>
                              <span className="text-green-300 text-xs">{OPTION_LABELS[q.correct]}. {q.options[q.correct]}</span>
                            </div>
                            {!isCorrect && !isTimeout && !isUnanswered && (
                              <div className="flex items-center gap-2">
                                <span className="text-red-400 text-xs font-semibold w-16 flex-shrink-0">Aapka Jawab:</span>
                                <span className="text-red-300 text-xs">{OPTION_LABELS[userAns]}. {q.options[userAns]}</span>
                              </div>
                            )}
                            {(isTimeout || isUnanswered) && (
                              <div className="flex items-center gap-2">
                                <span className="text-orange-400 text-xs font-semibold w-16 flex-shrink-0">Status:</span>
                                <span className="text-orange-300 text-xs">Waqt khatam — skip ho gaya</span>
                              </div>
                            )}
                          </div>
                          <div className="mt-2 p-2.5 bg-amber-500/6 border border-amber-500/15 rounded-xl">
                            <p className="text-amber-200/70 text-xs leading-4">{q.explanation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Progress + Score + Timer */}
            <div className="flex items-center gap-3 mb-4 animate-fade-up" style={{ animationDelay: "0.08s" }}>
              <span className="text-gray-500 text-xs tabular-nums whitespace-nowrap">
                {currentIndex + 1} / {questions.length}
              </span>
              <div className="flex-1 bg-white/5 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-400 transition-all duration-500"
                  style={{ width: `${(currentIndex / questions.length) * 100}%` }}
                />
              </div>
              <span className="text-amber-400 text-xs font-bold tabular-nums whitespace-nowrap">
                {score} sahi
              </span>
            </div>

            {/* Timer */}
            {!revealed && (
              <div className="flex items-center gap-3 mb-4 animate-fade-up" style={{ animationDelay: "0.09s" }}>
                <div className="flex-1 bg-white/5 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all duration-1000 ${
                      timeLeft <= 10
                        ? "bg-gradient-to-r from-red-500 to-rose-400"
                        : timeLeft <= 20
                        ? "bg-gradient-to-r from-yellow-500 to-amber-400"
                        : "bg-gradient-to-r from-amber-500 to-orange-400"
                    }`}
                    style={{ width: `${(timeLeft / TIMER_SECONDS) * 100}%` }}
                  />
                </div>
                <span
                  className={`text-xs font-black tabular-nums w-8 text-right ${
                    timeLeft <= 10
                      ? "text-red-400 animate-urgent"
                      : timeLeft <= 20
                      ? "text-yellow-400"
                      : "text-amber-400"
                  }`}
                >
                  {timeLeft}s
                </span>
              </div>
            )}

            {/* Topic badge */}
            <div className="mb-3 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              <span className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-semibold px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                {question.topic}
              </span>
            </div>

            {/* Question card */}
            <div
              key={currentIndex}
              className="animate-slide-in bg-[#0d0d1f] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-black/40 mb-4"
            >
              <div className="px-5 py-4 border-b border-white/5 bg-gradient-to-br from-amber-500/4 to-transparent">
                <div className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/25 text-amber-400 text-xs font-black flex-shrink-0 mt-0.5">
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

                  let style = "border-white/8 bg-white/2 hover:border-amber-500/30 hover:bg-amber-500/5 active:scale-[0.99]";
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
                    style = "border-amber-500/60 bg-amber-500/12 scale-[1.01]";
                    labelStyle = "bg-amber-500 text-white";
                  }

                  return (
                    <button
                      key={revealed && !isCorrect && isSelected ? shakeKey : i}
                      onClick={() => handleSelect(i)}
                      disabled={revealed}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border text-left transition-all duration-200 ${style} ${revealed && isSelected && !isCorrect ? "animate-shake" : ""}`}
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
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 01-1 1H9a1 1 0 01-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7zm2 18H10v1a1 1 0 001 1h2a1 1 0 001-1v-1z"/>
                      </svg>
                    </span>
                    <span className="text-amber-400 text-xs font-bold uppercase tracking-wide">Explanation</span>
                  </div>
                  <p className="text-gray-300 text-xs leading-5">{question.explanation}</p>
                </div>
              )}
            </div>

            {/* Next button */}
            {revealed && (
              <button
                onClick={handleNext}
                className="animate-fade-up w-full py-4 rounded-2xl font-black text-base bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 active:scale-[0.98] hover:scale-[1.01] transition-all duration-200"
              >
                {currentIndex + 1 >= questions.length ? "Nateeja Dekhein →" : "Agla Sawal →"}
              </button>
            )}

            {!revealed && (
              <p className="text-center text-gray-700 text-xs mt-1">
                Koi bhi option chunein — ya keyboard se <kbd className="text-gray-600 bg-white/5 px-1 rounded">1</kbd> <kbd className="text-gray-600 bg-white/5 px-1 rounded">2</kbd> <kbd className="text-gray-600 bg-white/5 px-1 rounded">3</kbd> <kbd className="text-gray-600 bg-white/5 px-1 rounded">4</kbd>
              </p>
            )}
          </>
        )}
      </div>
    </main>
  );
}
