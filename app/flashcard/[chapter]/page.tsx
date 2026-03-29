"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { getChapter } from "@/data/index";
import Link from "next/link";

const OPTION_LABELS = ["A", "B", "C", "D"];

export default function FlashcardPage() {
  const params = useParams();
  const chapterId = params.chapter as string;
  const chapter = getChapter(chapterId);

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const [shuffleEnabled, setShuffleEnabled] = useState(false);
  const [known, setKnown] = useState<Set<number>>(new Set());

  const questions = useMemo(() => {
    if (!chapter) return [];
    if (shuffleEnabled) {
      const arr = [...chapter.questions];
      let seed = shuffleSeed;
      for (let i = arr.length - 1; i > 0; i--) {
        seed = (seed * 1664525 + 1013904223) & 0xffffffff;
        const j = Math.abs(seed) % (i + 1);
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }
    return chapter.questions;
  }, [chapter, shuffleEnabled, shuffleSeed]);

  if (!chapter || questions.length === 0) return null;

  const q = questions[index];
  const progress = ((index + 1) / questions.length) * 100;
  const isKnown = known.has(q.id);

  function goNext() {
    setFlipped(false);
    setTimeout(() => setIndex(i => Math.min(i + 1, questions.length - 1)), 150);
  }

  function goPrev() {
    setFlipped(false);
    setTimeout(() => setIndex(i => Math.max(i - 1, 0)), 150);
  }

  function markKnown() {
    setKnown(prev => {
      const next = new Set(prev);
      if (next.has(q.id)) next.delete(q.id); else next.add(q.id);
      return next;
    });
  }

  function handleShuffle() {
    setShuffleEnabled(s => !s);
    setShuffleSeed(Math.floor(Math.random() * 999999));
    setIndex(0); setFlipped(false);
  }

  return (
    <main className="min-h-screen bg-[#07080f] px-4 py-6 sm:py-8 flex flex-col">
      <style>{`
        .card-inner { transition: transform 0.5s cubic-bezier(0.4,0,0.2,1); transform-style: preserve-3d; }
        .card-inner.flipped { transform: rotateY(180deg); }
        .card-front, .card-back { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .card-back { transform: rotateY(180deg); }
      `}</style>

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-72 h-72 bg-indigo-500/8 rounded-full blur-3xl animate-orb-1" />
        <div className="absolute bottom-0 -left-32 w-72 h-72 bg-violet-400/8 rounded-full blur-3xl animate-orb-2" />
      </div>

      <div className="relative z-10 max-w-lg mx-auto w-full flex flex-col flex-1">

        {/* Header */}
        <div className="flex items-center justify-between mb-5 animate-fade-up">
          <Link href="/" className="flex items-center gap-1.5 text-gray-500 hover:text-indigo-400 text-xs transition-colors active:scale-95 py-2 px-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Home
          </Link>
          <div className="text-center">
            <p className="text-indigo-400/70 text-xs font-semibold uppercase tracking-widest">Flashcard Mode</p>
            <p className="text-gray-600 text-[10px] mt-0.5">Chapter {chapterId} — tap to flip</p>
          </div>
          <button
            onClick={handleShuffle}
            className={`flex items-center gap-1 text-[10px] font-bold px-2.5 py-1.5 rounded-xl border transition-all active:scale-95
              ${shuffleEnabled ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-300" : "bg-white/4 border-white/10 text-gray-500 hover:border-indigo-500/30"}`}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h5l2 3H4zm16 0h-5l-2 3h7zM4 20h5l8-11h3M16 20h4v-3"/></svg>
            Shuffle
          </button>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-3 mb-5 animate-fade-up" style={{ animationDelay: "0.05s" }}>
          <span className="text-gray-500 text-xs tabular-nums">{index + 1} / {questions.length}</span>
          <div className="flex-1 bg-white/5 rounded-full h-1.5 overflow-hidden">
            <div className="h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-400 transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-green-400 text-xs font-bold">{known.size} Jana</span>
        </div>

        {/* Flashcard */}
        <div className="flex-1 flex items-center justify-center mb-6">
          <div className="w-full" style={{ perspective: "1200px" }}>
            <div
              className={`card-inner relative w-full cursor-pointer ${flipped ? "flipped" : ""}`}
              style={{ minHeight: "320px" }}
              onClick={() => setFlipped(f => !f)}
            >
              {/* Front — Question */}
              <div className="card-front absolute inset-0 bg-[#0d0d1f] border border-indigo-500/20 hover:border-indigo-500/40 rounded-3xl overflow-hidden shadow-2xl shadow-black/40 transition-colors duration-200">
                <div className="h-1 bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent" />
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-indigo-500/15 border border-indigo-500/25 text-indigo-400 text-xs font-black">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 text-xs">Tap to reveal answer</span>
                    {isKnown && <span className="text-green-400 text-xs font-bold">✓ Jana</span>}
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-white font-bold text-base sm:text-lg leading-7 text-center">{q.question}</p>
                  </div>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    {[0,1,2,3].map(i => (
                      <span key={i} className="w-2.5 h-2.5 rounded-full bg-white/10 border border-white/15" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Back — Answer */}
              <div className="card-back absolute inset-0 bg-[#0a0d1a] border border-green-500/25 rounded-3xl overflow-hidden shadow-2xl shadow-black/40">
                <div className="h-1 bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
                <div className="p-5 flex flex-col h-full">
                  <p className="text-gray-500 text-xs mb-4 text-center">Sahi jawab:</p>
                  <div className="space-y-2 flex-1">
                    {q.options.map((option, i) => {
                      const isCorrect = i === q.correct;
                      return (
                        <div key={i} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border transition-colors ${isCorrect ? "border-green-500/40 bg-green-500/10" : "border-white/5 bg-white/2"}`}>
                          <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black flex-shrink-0 ${isCorrect ? "bg-green-500 text-white" : "bg-white/6 text-gray-600"}`}>
                            {OPTION_LABELS[i]}
                          </span>
                          <span className={`text-xs flex-1 leading-4 ${isCorrect ? "text-green-300 font-semibold" : "text-gray-600"}`}>{option}</span>
                          {isCorrect && <span className="text-green-500 text-[10px] font-black flex-shrink-0">✓</span>}
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-center text-gray-700 text-xs mt-3">Tap to go back</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <button
            onClick={goPrev}
            disabled={index === 0}
            className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/4 border border-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={markKnown}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border font-bold text-sm transition-all duration-200 active:scale-[0.98]
              ${isKnown ? "bg-green-500/15 border-green-500/40 text-green-300 hover:bg-green-500/25" : "bg-white/4 border-white/10 text-gray-400 hover:border-green-500/30 hover:text-green-400"}`}
          >
            {isKnown ? "✓ Jana hua" : "Jana hua mark karein"}
          </button>

          <button
            onClick={goNext}
            disabled={index === questions.length - 1}
            className="flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 hover:border-indigo-500/60 text-indigo-400 hover:text-indigo-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Done state */}
        {index === questions.length - 1 && (
          <div className="mt-4 text-center animate-fade-up">
            <p className="text-gray-500 text-xs">Sab cards complete! {known.size}/{questions.length} Jana hua</p>
            <div className="flex items-center justify-center gap-3 mt-3">
              <button onClick={() => { setIndex(0); setFlipped(false); }}
                className="text-xs font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/25 px-4 py-2 rounded-xl hover:bg-indigo-500/20 transition-colors">
                Dobara Shuru
              </button>
              <Link href={`/quiz/${chapterId}`}
                className="text-xs font-bold text-white bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 rounded-xl hover:brightness-110 transition-all">
                Quiz Shuru Karein →
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
