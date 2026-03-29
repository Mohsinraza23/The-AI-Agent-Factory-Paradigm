"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { getChapter } from "@/data/index";
import Link from "next/link";
import { useSound } from "@/hooks/useSound";

const OPTION_LABELS = ["A", "B", "C", "D"];
const TIMER_SECONDS = 60;
const SPEED_SECONDS = 20;

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
  const [resumeBanner, setResumeBanner] = useState(false);
  const [resumeData, setResumeData] = useState<{ index: number; answers: (number | null)[] } | null>(null);
  const [shuffleEnabled, setShuffleEnabled] = useState(false);
  const [shuffledOrder, setShuffledOrder] = useState<number[]>([]);
  const [speedMode, setSpeedMode] = useState(false);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const sound = useSound();

  const effectiveTimer = speedMode ? SPEED_SECONDS : TIMER_SECONDS;

  useEffect(() => {
    const b = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    setBookmarks(new Set(b));
  }, []);

  function toggleBookmark(qId: number) {
    setBookmarks(prev => {
      const key = `chapter${chapterId}:${qId}`;
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      localStorage.setItem("bookmarks", JSON.stringify([...next]));
      return next;
    });
  }

  useEffect(() => {
    if (!chapter || chapter.questions.length === 0) router.push("/");
  }, [chapter, router]);

  // Check for saved progress (only in normal mode)
  useEffect(() => {
    if (!chapterId || shuffleEnabled) return;
    const saved = localStorage.getItem(`quizProgress_chapter${chapterId}`);
    if (saved) {
      const data = JSON.parse(saved);
      if (data.index > 0) { setResumeData(data); setResumeBanner(true); }
    }
  }, [chapterId, shuffleEnabled]);

  // Save progress (only in normal mode)
  useEffect(() => {
    if (shuffleEnabled) return;
    if (currentIndex === 0 && answers.length === 0) return;
    localStorage.setItem(`quizProgress_chapter${chapterId}`, JSON.stringify({ index: currentIndex, answers }));
  }, [currentIndex, answers, chapterId, shuffleEnabled]);

  // Active questions: shuffled or original
  const activeQuestions = useMemo(() => {
    if (!chapter) return [];
    if (shuffleEnabled && shuffledOrder.length > 0) {
      return shuffledOrder.map(i => chapter.questions[i]);
    }
    return chapter.questions;
  }, [chapter, shuffleEnabled, shuffledOrder]);

  const handleNext = useCallback(
    (auto = false) => {
      if (!chapter) return;
      const newAnswers = [...answers, auto ? null : selected];
      if (currentIndex + 1 >= activeQuestions.length) {
        // If shuffled, remap answers back to original question order
        let finalAnswers: (number | null)[];
        if (shuffleEnabled && shuffledOrder.length > 0) {
          finalAnswers = chapter.questions.map((_, origIdx) => {
            const pos = shuffledOrder.indexOf(origIdx);
            return pos !== -1 ? (newAnswers[pos] ?? null) : null;
          });
        } else {
          finalAnswers = newAnswers;
        }
        localStorage.setItem(`quizAnswers_chapter${chapterId}`, JSON.stringify(finalAnswers));
        localStorage.removeItem(`quizProgress_chapter${chapterId}`);
        sound.complete();
        router.push(`/result/${chapterId}`);
        return;
      }
      setAnswers(newAnswers);
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setTimeLeft(effectiveTimer);
      setCardKey((k) => k + 1);
    },
    [answers, chapter, chapterId, currentIndex, router, selected, activeQuestions, shuffleEnabled, shuffledOrder, effectiveTimer]
  );

  function toggleShuffle() {
    if (!chapter) return;
    if (!shuffleEnabled) {
      const indices = [...Array(chapter.questions.length).keys()];
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      setShuffledOrder(indices);
      setShuffleEnabled(true);
    } else {
      setShuffleEnabled(false);
      setShuffledOrder([]);
    }
    setCurrentIndex(0); setSelected(null); setAnswers([]);
    setTimeLeft(effectiveTimer); setCardKey(k => k + 1);
    setResumeBanner(false);
  }

  function toggleSpeedMode() {
    const next = !speedMode;
    setSpeedMode(next);
    setTimeLeft(next ? SPEED_SECONDS : TIMER_SECONDS);
  }

  // Keyboard shortcuts
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "1") setSelected(0);
      else if (e.key === "2") setSelected(1);
      else if (e.key === "3") setSelected(2);
      else if (e.key === "4") setSelected(3);
      else if ((e.key === "Enter" || e.key === " ") && selected !== null) {
        e.preventDefault();
        handleNext(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, handleNext]);

  useEffect(() => {
    if (!chapter || chapter.questions.length === 0) return;
    if (timeLeft === 0) { handleNext(true); return; }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, chapter, handleNext]);

  if (!chapter || chapter.questions.length === 0) return null;

  const question = activeQuestions[currentIndex];
  if (!question) return null;

  const progress = ((currentIndex + 1) / activeQuestions.length) * 100;
  const isUrgent = timeLeft <= 10;
  const isWarning = timeLeft <= 20;

  const timerStroke = isUrgent ? "#ef4444" : isWarning ? "#eab308" : "#6366f1";
  const timerTextColor = isUrgent ? "text-red-400" : isWarning ? "text-yellow-400" : "text-indigo-400";

  return (
    <main className="min-h-screen bg-[#07080f] px-4 py-6 sm:py-8">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-72 h-72 bg-indigo-500/8 rounded-full blur-3xl animate-orb-1" />
        <div className="absolute bottom-0 -left-32 w-72 h-72 bg-violet-400/8 rounded-full blur-3xl animate-orb-2" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">

        {/* Resume banner */}
        {resumeBanner && resumeData && (
          <div className="animate-fade-up mb-4 flex items-center justify-between gap-3 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl px-4 py-3">
            <div>
              <p className="text-indigo-300 text-xs font-bold">Pichla session mila!</p>
              <p className="text-gray-500 text-xs mt-0.5">Sawal {resumeData.index + 1} se continue karein?</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => {
                setCurrentIndex(resumeData.index); setAnswers(resumeData.answers);
                setTimeLeft(effectiveTimer); setCardKey(k => k + 1); setResumeBanner(false);
              }} className="text-xs font-bold bg-indigo-500 hover:bg-indigo-400 text-white px-3 py-1.5 rounded-xl transition-colors">
                Continue
              </button>
              <button onClick={() => {
                localStorage.removeItem(`quizProgress_chapter${chapterId}`);
                setResumeBanner(false);
              }} className="text-xs font-bold bg-white/8 hover:bg-white/15 text-gray-400 px-3 py-1.5 rounded-xl transition-colors">
                Naya
              </button>
            </div>
          </div>
        )}

        {/* Top bar */}
        <div className="flex items-center justify-between mb-5 animate-fade-up">
          <Link href="/" className="flex items-center gap-1.5 text-gray-500 hover:text-indigo-400 text-xs transition-colors duration-200 active:scale-95 py-2 px-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Home
          </Link>
          <span className="text-indigo-400/70 text-xs font-semibold uppercase tracking-widest">Chapter {chapterId}</span>
          {/* Mode toggles */}
          <div className="flex items-center gap-2">
            <button onClick={sound.toggle} title="Sound"
              className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-xl border transition-all duration-200 active:scale-95
                ${sound.enabled ? "bg-green-500/20 border-green-500/50 text-green-300" : "bg-white/4 border-white/10 text-gray-500 hover:border-green-500/30"}`}>
              {sound.enabled
                ? <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M12 6v12m0 0c-1.657 0-3-1.343-3-3V9a3 3 0 016 0v6c0 1.657-1.343 3-3 3z"/></svg>
                : <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
              }
            </button>
            <button
              onClick={toggleShuffle}
              title="Shuffle Questions"
              className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-xl border transition-all duration-200 active:scale-95
                ${shuffleEnabled ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-300" : "bg-white/4 border-white/10 text-gray-500 hover:border-indigo-500/30 hover:text-gray-300"}`}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h5l2 3H4zm16 0h-5l-2 3h7zM4 20h5l8-11h3M16 20h4v-3" />
              </svg>
              <span className="hidden sm:inline">Shuffle</span>
            </button>
            <button
              onClick={toggleSpeedMode}
              title="Speed Mode (20s)"
              className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-xl border transition-all duration-200 active:scale-95
                ${speedMode ? "bg-yellow-500/20 border-yellow-500/50 text-yellow-300" : "bg-white/4 border-white/10 text-gray-500 hover:border-yellow-500/30 hover:text-gray-300"}`}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="hidden sm:inline">{speedMode ? "20s" : "Speed"}</span>
            </button>
          </div>
        </div>

        {/* Mode badges */}
        {(shuffleEnabled || speedMode) && (
          <div className="flex items-center gap-2 mb-3 flex-wrap animate-fade-up">
            {shuffleEnabled && (
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-indigo-300 bg-indigo-500/10 border border-indigo-500/25 px-2.5 py-1 rounded-full">
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h5l2 3H4zm16 0h-5l-2 3h7zM4 20h5l8-11h3M16 20h4v-3" />
                </svg>
                Shuffle Mode On
              </span>
            )}
            {speedMode && (
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-yellow-300 bg-yellow-500/10 border border-yellow-500/25 px-2.5 py-1 rounded-full animate-pulse">
                <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Speed Mode — 20s
              </span>
            )}
          </div>
        )}

        {/* Progress bar */}
        <div className="flex items-center gap-3 mb-4 animate-fade-up" style={{ animationDelay: "0.05s" }}>
          <span className="text-gray-500 text-xs tabular-nums whitespace-nowrap">{currentIndex + 1} / {activeQuestions.length}</span>
          <div className="flex-1 bg-white/5 rounded-full h-1.5 overflow-hidden">
            <div className="h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-400 transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-gray-600 text-xs tabular-nums">{Math.round(progress)}%</span>
        </div>

        {/* Circular Timer */}
        <div className="flex items-center gap-4 mb-5 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <div className={`relative flex-shrink-0 flex items-center justify-center ${isUrgent ? "animate-urgent" : ""}`}>
            <svg width="56" height="56" className="-rotate-90">
              <circle cx="28" cy="28" r="22" fill="none" stroke="#ffffff08" strokeWidth="3.5" />
              <circle
                cx="28" cy="28" r="22"
                fill="none" strokeWidth="3.5" strokeLinecap="round"
                stroke={timerStroke}
                strokeDasharray={`${2 * Math.PI * 22}`}
                strokeDashoffset={`${2 * Math.PI * 22 * (1 - timeLeft / effectiveTimer)}`}
                style={{ transition: "stroke-dashoffset 1s linear, stroke 0.4s ease" }}
              />
            </svg>
            <span className={`absolute text-sm font-black tabular-nums leading-none ${timerTextColor}`}>{timeLeft}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1.5">
              <span className={`text-xs font-semibold ${timerTextColor}`}>
                {isUrgent ? "Jaldi karein!" : isWarning ? "Waqt khatam ho raha hai" : "Waqt bacha hua"}
              </span>
              <span className="text-gray-700 text-xs hidden sm:inline">Auto-skip on 0</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden">
              <div className="h-1 rounded-full transition-all duration-1000" style={{ width: `${(timeLeft / effectiveTimer) * 100}%`, background: timerStroke }} />
            </div>
          </div>
        </div>

        {/* Question card */}
        <div key={cardKey} className="animate-slide-in bg-[#0d0d1f] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-black/40 mb-4 animate-glow">
          <div className="px-5 py-4 border-b border-white/5 bg-gradient-to-br from-indigo-500/5 to-transparent">
            <div className="flex items-start gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-indigo-500/15 border border-indigo-500/25 text-indigo-400 text-xs font-black flex-shrink-0 mt-0.5">
                {currentIndex + 1}
              </span>
              <p className="text-white font-semibold text-sm sm:text-base leading-6 flex-1">{question.question}</p>
              <button onClick={() => toggleBookmark(question.id)} title="Bookmark"
                className={`flex-shrink-0 w-7 h-7 rounded-xl flex items-center justify-center border transition-all duration-200 active:scale-90
                  ${bookmarks.has(`chapter${chapterId}:${question.id}`) ? "bg-yellow-500/20 border-yellow-500/50 text-yellow-300" : "bg-white/4 border-white/10 text-gray-600 hover:border-yellow-500/40 hover:text-yellow-400"}`}>
                <svg className="w-3 h-3" fill={bookmarks.has(`chapter${chapterId}:${question.id}`) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="p-3 sm:p-4 space-y-2">
            {question.options.map((option, i) => {
              const isSelected = selected === i;
              return (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl border text-left transition-all duration-200
                    ${isSelected
                      ? "border-indigo-500/60 bg-indigo-500/15 shadow-lg shadow-indigo-500/10 scale-[1.01]"
                      : "border-white/8 bg-white/2 hover:border-indigo-500/30 hover:bg-indigo-500/8 active:bg-indigo-500/12 active:scale-[0.99]"
                    }`}
                >
                  <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black flex-shrink-0 transition-all duration-200
                    ${isSelected ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/40" : "bg-white/6 text-gray-400"}`}>
                    {OPTION_LABELS[i]}
                  </span>
                  <span className={`text-sm flex-1 leading-5 transition-colors duration-200 ${isSelected ? "text-white" : "text-gray-400"}`}>
                    {option}
                  </span>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            ${selected !== null
              ? "bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 active:scale-[0.98] hover:scale-[1.01]"
              : "bg-white/4 text-gray-600 cursor-not-allowed"
            }`}
        >
          {currentIndex + 1 === activeQuestions.length ? "Nateeja Dekhein →" : "Agla Sawal →"}
        </button>

        <p className="text-center text-gray-700 text-xs mt-3">
          Jawab na dein to {timeLeft}s baad auto-skip • 1-4 keys se select karein
        </p>
      </div>
    </main>
  );
}
