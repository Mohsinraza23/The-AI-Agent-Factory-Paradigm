"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { chapter14d, TOPICS_D } from "@/data/chapter14d";

const TIMER_SECONDS = 50;

const OPTION_LABELS = ["A", "B", "C", "D"];

type TopicFilter = (typeof TOPICS_D)[number] | "All";

export default function PracticePageD() {
  const [activeTopic, setActiveTopic] = useState<TopicFilter>("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [hintActive, setHintActive] = useState(false);
  const [hintPenaltyThisQ, setHintPenaltyThisQ] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [answers, setAnswers] = useState<number[]>([]);
  const [shakeKey, setShakeKey] = useState(0);
  const [wrongQIds, setWrongQIds] = useState<Set<number> | null>(null);
  const [bestEver, setBestEver] = useState<number | null>(null);

  useEffect(() => {
    const h = JSON.parse(localStorage.getItem("scoreHistory_14d") || "[]");
    if (h.length > 0) setBestEver(Math.max(...h.map((e: { pct: number }) => e.pct)));
  }, []);

  useEffect(() => {
    if (!done) return;
    const h = JSON.parse(localStorage.getItem("scoreHistory_14d") || "[]");
    const entry = { score, total: questions.length, pct: Math.round((score / questions.length) * 100), ts: Date.now() };
    localStorage.setItem("scoreHistory_14d", JSON.stringify([entry, ...h].slice(0, 20)));
    setBestEver(prev => Math.max(prev ?? 0, entry.pct));
  }, [done]);

  useEffect(() => { setTimeLeft(TIMER_SECONDS); }, [currentIndex, activeTopic]);

  useEffect(() => {
    if (done || revealed) return;
    if (timeLeft === 0) {
      setRevealed(true);
      setAnswers(prev => { const a = [...prev]; a[currentIndex] = -1; return a; });
      return;
    }
    const t = setTimeout(() => setTimeLeft((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, done, revealed]);

  const questions = useMemo(() => {
    let base = activeTopic === "All" ? chapter14d : chapter14d.filter(q => q.topic === activeTopic);
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
        else if (e.key === "h" || e.key === "H") handleHint();
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleNext();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [revealed, done, currentIndex, selected, hintActive]);

  function handleTopicChange(topic: TopicFilter) {
    setActiveTopic(topic); setCurrentIndex(0); setSelected(null);
    setRevealed(false); setScore(0); setDone(false);
    setHintsUsed(0); setHintActive(false); setHintPenaltyThisQ(false);
    setTimeLeft(TIMER_SECONDS); setAnswers([]); setWrongQIds(null);
  }

  function handlePracticeWrong() {
    const ids = new Set(questions.filter((q, i) => answers[i] === undefined || answers[i] === -1 || answers[i] !== q.correct).map(q => q.id));
    setWrongQIds(ids);
    setCurrentIndex(0); setSelected(null); setRevealed(false);
    setScore(0); setDone(false); setTimeLeft(TIMER_SECONDS); setAnswers([]);
    setHintsUsed(0); setHintActive(false); setHintPenaltyThisQ(false);
  }

  function handleHint() {
    if (revealed || hintActive) return;
    setHintActive(true); setHintPenaltyThisQ(true); setHintsUsed((h) => h + 1);
  }

  function handleSelect(i: number) {
    if (revealed) return;
    setSelected(i); setRevealed(true);
    setAnswers(prev => { const a = [...prev]; a[currentIndex] = i; return a; });
    if (i === question.correct && !hintPenaltyThisQ) setScore((s) => s + 1);
    else if (i !== question.correct) setShakeKey(k => k + 1);
  }

  function handleNext() {
    if (currentIndex + 1 >= questions.length) { setDone(true); return; }
    setCurrentIndex((i) => i + 1); setSelected(null); setRevealed(false);
    setHintActive(false); setHintPenaltyThisQ(false);
  }

  function handleRestart() {
    setCurrentIndex(0); setSelected(null); setRevealed(false);
    setScore(0); setDone(false); setHintsUsed(0); setHintActive(false);
    setHintPenaltyThisQ(false); setTimeLeft(TIMER_SECONDS); setAnswers([]); setWrongQIds(null);
  }

  const percentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
  const grade =
    percentage >= 90 ? { label: "A+", color: "text-violet-300" } :
    percentage >= 80 ? { label: "A",  color: "text-violet-400" } :
    percentage >= 70 ? { label: "B",  color: "text-fuchsia-400" } :
    percentage >= 60 ? { label: "C",  color: "text-yellow-400" } :
    percentage >= 50 ? { label: "D",  color: "text-orange-400" } :
    { label: "F", color: "text-red-400" };

  return (
    <main className="min-h-screen bg-[#07080f] px-4 py-6 sm:py-8">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-violet-500/8 rounded-full blur-3xl animate-orb-1" />
        <div className="absolute bottom-0 -left-32 w-72 h-72 bg-fuchsia-400/8 rounded-full blur-3xl animate-orb-2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl animate-orb-3" />
        <div className="absolute top-[25%] right-[12%] w-1 h-1 rounded-full bg-violet-400/50 animate-neural-2" />
        <div className="absolute top-[65%] left-[8%] w-1 h-1 rounded-full bg-fuchsia-400/50 animate-neural-4" />
        <div className="absolute top-[45%] right-[75%] w-1 h-1 rounded-full bg-violet-300/40 animate-neural-6" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-5 animate-fade-up">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-gray-500 hover:text-violet-400 text-xs transition-colors duration-200 active:scale-95 py-2 px-1"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Home
          </Link>
          <div className="text-center">
            <p className="text-violet-400/80 text-xs font-semibold uppercase tracking-widest">Guided Practice</p>
            <p className="text-gray-600 text-[10px] mt-0.5">Chapter 14 — Section D</p>
          </div>
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-fuchsia-400 text-xs font-black">{hintsUsed}</span>
            <span className="text-gray-600 text-[9px] uppercase tracking-wide">hints</span>
          </div>
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
                    ? "bg-violet-500/20 border-violet-500/50 text-violet-300"
                    : "bg-white/4 border-white/10 text-gray-500 hover:border-violet-500/30 hover:text-gray-300"
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
            {/* Trophy + confetti */}
            <div className="text-center mb-5 relative">
              {percentage >= 80 && (
                <div className="absolute inset-0 pointer-events-none overflow-visible flex items-center justify-center">
                  {[
                    { x: -60, color: "#a78bfa" }, { x: 60, color: "#f59e0b" },
                    { x: -30, color: "#e879f9" }, { x: 30, color: "#34d399" },
                    { x: -80, color: "#f472b6" }, { x: 80, color: "#818cf8" },
                    { x: 0,   color: "#fbbf24" }, { x: -50, color: "#c084fc" },
                  ].map((c, i) => (
                    <div key={i} className={`absolute w-2.5 h-2.5 rounded-sm animate-confetti-${i}`}
                      style={{ background: c.color, left: `calc(50% + ${c.x}px)`, top: "40%" }} />
                  ))}
                </div>
              )}
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-yellow-500/20 to-amber-400/10 border border-yellow-500/25 animate-pop mb-3 shadow-lg shadow-yellow-500/10">
                <span className="text-4xl">{percentage >= 80 ? "🏆" : percentage >= 50 ? "🎯" : "💪"}</span>
              </div>
              <p className="text-white font-black text-2xl">{percentage >= 80 ? "Shabaash!" : percentage >= 50 ? "Acha Kiya!" : "Koshish Karein!"}</p>
              <p className="text-gray-500 text-xs mt-1">Section D • {questions.length} Sawaal</p>
              {bestEver !== null && (
                <p className="text-xs text-gray-600 mt-1">Best Score: <span className="text-violet-400 font-bold">{bestEver}%</span></p>
              )}
            </div>

            {/* Score Card */}
            <div className="bg-[#0d0d1f] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-black/40 mb-5">
              <div className={`px-6 py-4 ${percentage >= 50 ? "bg-gradient-to-r from-violet-600 to-fuchsia-500" : "bg-gradient-to-r from-red-700 to-rose-600"}`}>
                <p className="text-white font-black text-lg">{percentage >= 50 ? "Guided Practice Complete!" : "Dobara Practice Karein"}</p>
              </div>
              <div className="p-5">
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Score</p>
                    <p className="text-5xl font-black text-white leading-none">{score}<span className="text-xl text-gray-500 font-semibold ml-1">/ {questions.length}</span></p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Grade</p>
                    <p className={`text-5xl font-black leading-none ${grade.color}`}>{grade.label}</p>
                  </div>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2.5 mb-1.5 overflow-hidden">
                  <div className={`h-2.5 rounded-full ${percentage >= 50 ? "bg-gradient-to-r from-violet-500 to-fuchsia-400" : "bg-gradient-to-r from-red-500 to-rose-400"}`} style={{ width: `${percentage}%`, transition: "width 1s ease" }} />
                </div>
                <p className="text-right text-xs text-gray-500 mb-4">{percentage}% Sahi</p>
                <div className="grid grid-cols-4 gap-2">
                  <div className="bg-green-500/8 border border-green-500/20 rounded-2xl p-3 text-center">
                    <p className="text-xl font-black text-green-400">{score}</p>
                    <p className="text-gray-600 text-[11px] mt-0.5">Sahi ✓</p>
                  </div>
                  <div className="bg-red-500/8 border border-red-500/20 rounded-2xl p-3 text-center">
                    <p className="text-xl font-black text-red-400">{questions.filter((q, i) => answers[i] !== undefined && answers[i] !== -1 && answers[i] !== q.correct).length}</p>
                    <p className="text-gray-600 text-[11px] mt-0.5">Galat ✗</p>
                  </div>
                  <div className="bg-orange-500/8 border border-orange-500/20 rounded-2xl p-3 text-center">
                    <p className="text-xl font-black text-orange-400">{answers.filter(a => a === -1).length}</p>
                    <p className="text-gray-600 text-[11px] mt-0.5">Timeout ⏱</p>
                  </div>
                  <div className="bg-fuchsia-500/8 border border-fuchsia-500/20 rounded-2xl p-3 text-center">
                    <p className="text-xl font-black text-fuchsia-400">{hintsUsed}</p>
                    <p className="text-gray-600 text-[11px] mt-0.5">Hints 💡</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <button onClick={handleRestart} className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-500/40 text-white hover:text-violet-300 font-bold py-4 rounded-2xl transition-all duration-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                Dobara Practice
              </button>
              <Link href="/" className="flex items-center justify-center gap-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-400 hover:to-fuchsia-400 text-white font-bold py-4 rounded-2xl transition-all duration-200 shadow-lg shadow-violet-500/20">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                Chapters
              </Link>
            </div>
            {answers.some((a, i) => a === undefined || a === -1 || a !== questions[i]?.correct) && (
              <button onClick={handlePracticeWrong}
                className="w-full mb-8 flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/25 hover:border-red-500/50 text-red-300 font-bold py-3 rounded-2xl transition-all duration-200 text-sm">
                <span>🔁</span> Sirf Galat Sawaalon ki Practice ({answers.filter((a, i) => a === undefined || a === -1 || a !== questions[i]?.correct).length} sawal)
              </button>
            )}

            {/* Questions Review */}
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-white/8" />
                <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Jawabat ki Review</p>
                <div className="flex-1 h-px bg-white/8" />
              </div>
              <div className="space-y-3">
                {questions.map((q, i) => {
                  const userAns = answers[i];
                  const isTimeout = userAns === -1 || userAns === undefined;
                  const isCorrect = !isTimeout && userAns === q.correct;
                  return (
                    <div key={q.id} className="bg-[#0d0d1f] border border-white/8 rounded-2xl p-4">
                      <div className="flex items-start gap-2.5 mb-3">
                        <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5 ${isTimeout ? "bg-gray-500/20 text-gray-400" : isCorrect ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                          {isTimeout ? "⏱" : isCorrect ? "✓" : "✗"}
                        </span>
                        <p className="text-gray-200 text-xs font-semibold leading-5 flex-1">{q.question}</p>
                      </div>
                      <div className="ml-9 space-y-1.5 mb-2.5">
                        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-green-500/8 border border-green-500/20">
                          <span className="w-5 h-5 rounded-lg bg-green-500 flex items-center justify-center text-[10px] font-black text-white flex-shrink-0">{OPTION_LABELS[q.correct]}</span>
                          <span className="text-green-300 text-xs leading-5 flex-1">{q.options[q.correct]}</span>
                          <span className="text-green-500 text-[10px] font-bold ml-2 flex-shrink-0">Sahi</span>
                        </div>
                        {!isCorrect && !isTimeout && userAns !== undefined && (
                          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-500/8 border border-red-500/20">
                            <span className="w-5 h-5 rounded-lg bg-red-500 flex items-center justify-center text-[10px] font-black text-white flex-shrink-0">{OPTION_LABELS[userAns]}</span>
                            <span className="text-red-300 text-xs leading-5 flex-1">{q.options[userAns]}</span>
                            <span className="text-red-400 text-[10px] font-bold ml-2 flex-shrink-0">Aapka</span>
                          </div>
                        )}
                        {isTimeout && (
                          <div className="px-3 py-2 rounded-xl bg-gray-500/8 border border-gray-500/20">
                            <span className="text-gray-500 text-xs">⏱ Waqt khatam — jawab nahi diya</span>
                          </div>
                        )}
                      </div>
                      <div className="ml-9 px-3 py-2 bg-violet-500/5 border border-violet-500/10 rounded-xl">
                        <p className="text-gray-500 text-[11px] leading-5">{q.explanation}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Progress bar */}
            <div className="flex items-center gap-3 mb-4 animate-fade-up" style={{ animationDelay: "0.08s" }}>
              <span className="text-gray-500 text-xs tabular-nums whitespace-nowrap">
                {currentIndex + 1} / {questions.length}
              </span>
              <div className="flex-1 bg-white/5 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-400 transition-all duration-500"
                  style={{ width: `${(currentIndex / questions.length) * 100}%` }}
                />
              </div>
              <span className="text-violet-400 text-xs font-bold tabular-nums whitespace-nowrap">
                {score} sahi
              </span>
            </div>

            {/* Timer */}
            {!revealed && (
              <div className="flex items-center gap-3 mb-4 animate-fade-up" style={{ animationDelay: "0.09s" }}>
                <div className="flex-1 bg-white/5 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all duration-1000 ${
                      timeLeft <= 10 ? "bg-gradient-to-r from-red-500 to-rose-400"
                      : timeLeft <= 20 ? "bg-gradient-to-r from-yellow-500 to-amber-400"
                      : "bg-gradient-to-r from-violet-500 to-fuchsia-400"
                    }`}
                    style={{ width: `${(timeLeft / TIMER_SECONDS) * 100}%` }}
                  />
                </div>
                <span className={`text-xs font-black tabular-nums w-8 text-right ${
                  timeLeft <= 10 ? "text-red-400 animate-urgent"
                  : timeLeft <= 20 ? "text-yellow-400"
                  : "text-violet-400"
                }`}>{timeLeft}s</span>
              </div>
            )}

            {/* Topic badge + hint warning */}
            <div className="flex items-center gap-2 mb-3 animate-fade-up flex-wrap" style={{ animationDelay: "0.1s" }}>
              <span className="inline-flex items-center gap-1.5 bg-violet-500/10 border border-violet-500/25 text-violet-300 text-xs font-semibold px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse" />
                {question.topic}
              </span>
              {hintPenaltyThisQ && !revealed && (
                <span className="animate-hint inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-fuchsia-500/15 border border-fuchsia-500/30 text-fuchsia-300">
                  💡 Hint active — no score
                </span>
              )}
            </div>

            {/* Question card */}
            <div
              key={currentIndex}
              className="animate-slide-up bg-[#0d0d1f] border border-violet-500/10 hover:border-violet-500/20 rounded-3xl overflow-hidden shadow-2xl shadow-black/40 mb-4 transition-colors duration-300"
            >
              {/* Top accent */}
              <div className="h-0.5 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

              <div className="px-5 py-4 border-b border-white/5 bg-gradient-to-br from-violet-500/5 to-transparent">
                <div className="flex items-start gap-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-violet-500/15 border border-violet-500/25 text-violet-400 text-xs font-black flex-shrink-0 mt-0.5">
                    {currentIndex + 1}
                  </span>
                  <p className="text-white font-semibold text-sm sm:text-base leading-6 flex-1">
                    {question.question}
                  </p>
                </div>
              </div>

              {/* Hint reveal */}
              {hintActive && (
                <div className="animate-hint mx-3 sm:mx-4 mt-3 px-4 py-2.5 bg-fuchsia-500/10 border border-fuchsia-500/25 rounded-2xl flex items-center gap-2">
                  <span className="text-fuchsia-400 text-xs">💡</span>
                  <span className="text-fuchsia-300 text-xs font-semibold">
                    Sahi jawab: <span className="font-black text-sm">{OPTION_LABELS[question.correct]}</span>
                  </span>
                  <span className="ml-auto text-gray-600 text-[10px]">score -1</span>
                </div>
              )}

              <div className="p-3 sm:p-4 space-y-2">
                {question.options.map((option, i) => {
                  const isSelected = selected === i;
                  const isCorrect = i === question.correct;
                  const isHinted = hintActive && isCorrect && !revealed;

                  let style = "border-white/8 bg-white/2 hover:border-violet-500/35 hover:bg-violet-500/6 active:scale-[0.99]";
                  let labelStyle = "bg-white/6 text-gray-400";

                  if (revealed) {
                    if (isCorrect) {
                      style = "border-green-500/50 bg-green-500/10";
                      labelStyle = "bg-green-500 text-white";
                    } else if (isSelected && !isCorrect) {
                      style = "border-red-500/50 bg-red-500/10";
                      labelStyle = "bg-red-500 text-white";
                    } else {
                      style = "border-white/5 bg-transparent opacity-40";
                      labelStyle = "bg-white/5 text-gray-600";
                    }
                  } else if (isHinted) {
                    style = "border-fuchsia-500/40 bg-fuchsia-500/8";
                    labelStyle = "bg-fuchsia-500/40 text-fuchsia-200";
                  } else if (isSelected) {
                    style = "border-violet-500/60 bg-violet-500/12 scale-[1.01]";
                    labelStyle = "bg-violet-500 text-white";
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
                      <span className={`text-sm flex-1 leading-5 ${revealed && isCorrect ? "text-green-300 font-semibold" : revealed && isSelected && !isCorrect ? "text-red-300" : isHinted ? "text-fuchsia-300" : "text-gray-400"}`}>
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
                <div className="animate-fade-up mx-3 sm:mx-4 mb-4 p-4 bg-violet-500/5 border border-violet-500/15 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded-full bg-fuchsia-500/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-fuchsia-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 01-1 1H9a1 1 0 01-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7zm2 18H10v1a1 1 0 001 1h2a1 1 0 001-1v-1z"/>
                      </svg>
                    </span>
                    <span className="text-fuchsia-400 text-xs font-bold uppercase tracking-wide">Explanation</span>
                    {hintPenaltyThisQ && (
                      <span className="ml-auto text-[10px] text-gray-600 bg-white/5 px-2 py-0.5 rounded-full">hint used — no score</span>
                    )}
                  </div>
                  <p className="text-gray-300 text-xs leading-5">{question.explanation}</p>
                </div>
              )}
            </div>

            {/* Hint + Next buttons */}
            <div className="flex gap-3">
              {!revealed && !hintActive && (
                <button
                  onClick={handleHint}
                  className="animate-fade-up flex items-center justify-center gap-2 px-5 py-4 rounded-2xl font-bold text-sm bg-fuchsia-500/10 hover:bg-fuchsia-500/20 border border-fuchsia-500/25 hover:border-fuchsia-500/50 text-fuchsia-400 hover:text-fuchsia-300 transition-all duration-200 active:scale-[0.97]"
                >
                  💡 Hint
                </button>
              )}
              {revealed && (
                <button
                  onClick={handleNext}
                  className="animate-fade-up flex-1 py-4 rounded-2xl font-black text-base bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-400 hover:to-fuchsia-400 text-white shadow-lg shadow-violet-500/25 active:scale-[0.98] hover:scale-[1.01] transition-all duration-200"
                >
                  {currentIndex + 1 >= questions.length ? "Nateeja Dekhein →" : "Agla Sawal →"}
                </button>
              )}
            </div>

            {!revealed && (
              <p className="text-center text-gray-700 text-xs mt-2">
                {hintActive ? "Hint dekh liya — ab jawab chunein" : <>Keys: <kbd className="text-gray-600 bg-white/5 px-1 rounded">1-4</kbd> select • <kbd className="text-gray-600 bg-white/5 px-1 rounded">H</kbd> hint</>}
              </p>
            )}
          </>
        )}
      </div>
    </main>
  );
}
