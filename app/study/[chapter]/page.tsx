"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { getChapter } from "@/data/index";
import Link from "next/link";

const OPTION_LABELS = ["A", "B", "C", "D"];

export default function StudyPage() {
  const params = useParams();
  const chapterId = params.chapter as string;
  const chapter = getChapter(chapterId);
  const [search, setSearch] = useState("");
  const [openAll, setOpenAll] = useState(false);
  const [openMap, setOpenMap] = useState<Record<number, boolean>>({});

  if (!chapter || chapter.questions.length === 0) return null;

  const filtered = search.trim()
    ? chapter.questions.filter(q =>
        q.question.toLowerCase().includes(search.toLowerCase()) ||
        q.options.some(o => o.toLowerCase().includes(search.toLowerCase()))
      )
    : chapter.questions;

  function isOpen(idx: number) {
    return openAll || !!openMap[idx];
  }

  function toggle(idx: number) {
    if (openAll) {
      // collapse all, then open all except this one
      const map: Record<number, boolean> = {};
      chapter!.questions.forEach((_, i) => { map[i] = true; });
      map[idx] = false;
      setOpenAll(false);
      setOpenMap(map);
    } else {
      setOpenMap(prev => ({ ...prev, [idx]: !prev[idx] }));
    }
  }

  return (
    <main className="min-h-screen bg-[#07080f] px-4 py-6 sm:py-8">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-72 h-72 bg-indigo-500/6 rounded-full blur-3xl animate-orb-1" />
        <div className="absolute bottom-0 -left-32 w-72 h-72 bg-violet-400/6 rounded-full blur-3xl animate-orb-2" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 animate-fade-up">
          <Link href="/" className="flex items-center gap-1.5 text-gray-500 hover:text-indigo-400 text-xs transition-colors duration-200 active:scale-95 py-2 px-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Home
          </Link>
          <div className="text-center">
            <p className="text-indigo-400/70 text-xs font-semibold uppercase tracking-widest">Study Mode</p>
            <p className="text-gray-600 text-[10px] mt-0.5">Chapter {chapterId} — {chapter.questions.length} Sawaal</p>
          </div>
          <Link href={`/quiz/${chapterId}`} className="text-xs font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/25 px-3 py-1.5 rounded-xl hover:bg-indigo-500/20 transition-colors">
            Quiz Shuru →
          </Link>
        </div>

        {/* Title */}
        <div className="mb-5 animate-fade-up" style={{ animationDelay: "0.04s" }}>
          <h1 className="text-white font-black text-xl leading-tight">{chapter.title}</h1>
          <p className="text-gray-600 text-xs mt-1">{chapter.description}</p>
        </div>

        {/* Search + controls */}
        <div className="flex items-center gap-3 mb-5 animate-fade-up" style={{ animationDelay: "0.08s" }}>
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Sawaal ya option dhundein..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/4 border border-white/10 focus:border-indigo-500/40 rounded-2xl pl-9 pr-4 py-2.5 text-xs text-gray-300 placeholder-gray-600 outline-none transition-colors"
            />
          </div>
          <button
            onClick={() => { setOpenAll(a => !a); setOpenMap({}); }}
            className="text-xs font-bold text-gray-400 bg-white/4 border border-white/10 hover:border-indigo-500/30 hover:text-indigo-300 px-3 py-2.5 rounded-2xl transition-colors whitespace-nowrap"
          >
            {openAll ? "Sab Band" : "Sab Kholein"}
          </button>
        </div>

        {/* Results count */}
        {search && (
          <p className="text-gray-600 text-xs mb-4 px-1">{filtered.length} nateeja mila "{search}" ke liye</p>
        )}

        {/* Question list */}
        <div className="space-y-2 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          {filtered.map((q, idx) => {
            const open = isOpen(chapter.questions.indexOf(q));
            return (
              <div key={q.id} className="bg-[#0d0d1f] border border-white/8 rounded-2xl overflow-hidden transition-all duration-200 hover:border-white/15">
                {/* Question row */}
                <button
                  onClick={() => toggle(chapter.questions.indexOf(q))}
                  className="w-full flex items-start gap-3 px-4 py-3.5 text-left"
                >
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-xl bg-indigo-500/12 border border-indigo-500/20 text-indigo-400 text-[10px] font-black flex-shrink-0 mt-0.5">
                    {chapter.questions.indexOf(q) + 1}
                  </span>
                  <p className="text-gray-200 text-sm leading-5 flex-1 text-left">{q.question}</p>
                  <svg
                    className={`w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Options (shown when open) */}
                {open && (
                  <div className="px-4 pb-4 space-y-1.5">
                    {q.options.map((option, i) => {
                      const isCorrect = i === q.correct;
                      return (
                        <div key={i} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border transition-colors duration-150 ${isCorrect ? "border-green-500/35 bg-green-500/8" : "border-white/5 bg-white/2"}`}>
                          <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black flex-shrink-0 ${isCorrect ? "bg-green-500 text-white" : "bg-white/6 text-gray-500"}`}>
                            {OPTION_LABELS[i]}
                          </span>
                          <span className={`text-xs flex-1 leading-4 ${isCorrect ? "text-green-300 font-semibold" : "text-gray-500"}`}>
                            {option}
                          </span>
                          {isCorrect && (
                            <span className="text-green-500 text-[10px] font-bold bg-green-500/15 px-2 py-0.5 rounded-full flex-shrink-0">Sahi Jawab</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-white font-bold">Koi nateeja nahi mila</p>
            <p className="text-gray-500 text-sm mt-1">"{search}" ke liye koi sawaal nahi</p>
          </div>
        )}

        <div className="mt-8 pb-4 text-center">
          <p className="text-gray-700 text-xs">Designed &amp; Created by <span className="text-indigo-400 font-bold">✦ Mohsin Raza</span></p>
        </div>
      </div>
    </main>
  );
}
