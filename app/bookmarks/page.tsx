"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { chapters } from "@/data/index";
import { chapter14bc } from "@/data/chapter14bc";
import { chapter14d } from "@/data/chapter14d";
import { chapter14e } from "@/data/chapter14e";

const OPTION_LABELS = ["A", "B", "C", "D"];

interface AnyQuestion {
  id: number;
  question: string;
  options: [string, string, string, string];
  correct: 0 | 1 | 2 | 3;
  topic?: string;
  explanation?: string;
}

interface Section {
  key: string;
  label: string;
  href: string;
  color: string;
  questions: AnyQuestion[];
}

const SECTIONS: Section[] = [
  ...chapters.map(c => ({
    key: `chapter${c.id}`,
    label: `Chapter ${c.id}`,
    href: `/quiz/${c.id}`,
    color: "indigo",
    questions: c.questions as AnyQuestion[],
  })),
  { key: "chapter14bc", label: "Section B & C", href: "/practice/chapter14bc", color: "cyan",    questions: chapter14bc as AnyQuestion[] },
  { key: "chapter14d",  label: "Section D",     href: "/practice/chapter14d",  color: "violet",  questions: chapter14d as AnyQuestion[] },
  { key: "chapter14e",  label: "Section E",     href: "/practice/chapter14e",  color: "amber",   questions: chapter14e as AnyQuestion[] },
];

const COLOR_TEXT: Record<string, string> = {
  indigo: "text-indigo-400", cyan: "text-cyan-400", violet: "text-violet-400", amber: "text-amber-400",
};
const COLOR_BORDER: Record<string, string> = {
  indigo: "border-indigo-500/25", cyan: "border-cyan-500/25", violet: "border-violet-500/25", amber: "border-amber-500/25",
};
const COLOR_BG: Record<string, string> = {
  indigo: "bg-indigo-500/10", cyan: "bg-cyan-500/10", violet: "bg-violet-500/10", amber: "bg-amber-500/10",
};

interface BookmarkedQuestion extends AnyQuestion {
  sectionKey: string;
  sectionLabel: string;
  sectionHref: string;
  sectionColor: string;
}

export default function BookmarksPage() {
  const [bookmarked, setBookmarked] = useState<BookmarkedQuestion[]>([]);
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const keys: string[] = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    const result: BookmarkedQuestion[] = [];
    for (const key of keys) {
      const colonIdx = key.indexOf(":");
      if (colonIdx === -1) continue;
      const sectionKey = key.slice(0, colonIdx);
      const qId = parseInt(key.slice(colonIdx + 1));
      const section = SECTIONS.find(s => s.key === sectionKey);
      if (!section) continue;
      const q = section.questions.find(q => q.id === qId);
      if (!q) continue;
      result.push({ ...q, sectionKey, sectionLabel: section.label, sectionHref: section.href, sectionColor: section.color });
    }
    setBookmarked(result);
  }, []);

  function removeBookmark(sectionKey: string, qId: number) {
    const key = `${sectionKey}:${qId}`;
    const current: string[] = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    const updated = current.filter(k => k !== key);
    localStorage.setItem("bookmarks", JSON.stringify(updated));
    setBookmarked(prev => prev.filter(q => !(q.sectionKey === sectionKey && q.id === qId)));
  }

  function toggleOpen(key: string) {
    setOpenMap(prev => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <main className="min-h-screen bg-[#07080f] px-4 py-6 sm:py-8">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-72 h-72 bg-yellow-500/6 rounded-full blur-3xl animate-orb-1" />
        <div className="absolute bottom-0 -left-32 w-72 h-72 bg-amber-400/6 rounded-full blur-3xl animate-orb-2" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6 animate-fade-up">
          <Link href="/" className="flex items-center gap-1.5 text-gray-500 hover:text-yellow-400 text-xs transition-colors duration-200 active:scale-95 py-2 px-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Home
          </Link>
          <div className="text-center">
            <p className="text-yellow-400/70 text-xs font-semibold uppercase tracking-widest">Bookmarks</p>
            <p className="text-gray-600 text-[10px] mt-0.5">{bookmarked.length} saved sawal</p>
          </div>
          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
        </div>

        {/* Empty state */}
        {bookmarked.length === 0 && (
          <div className="animate-fade-up text-center py-16">
            <p className="text-5xl mb-4">🔖</p>
            <p className="text-white font-bold text-lg">Koi bookmark nahi</p>
            <p className="text-gray-500 text-sm mt-2">Quiz ya practice mein sawal ke upar bookmark icon dabayein</p>
            <Link href="/" className="inline-flex mt-4 items-center gap-2 bg-yellow-500/15 border border-yellow-500/30 text-yellow-300 font-semibold text-sm px-5 py-2.5 rounded-2xl hover:bg-yellow-500/25 transition-colors">
              Chapters Dekhein →
            </Link>
          </div>
        )}

        {/* Bookmarked questions */}
        {bookmarked.length > 0 && (
          <div className="space-y-3">
            {bookmarked.map((q, idx) => {
              const mapKey = `${q.sectionKey}:${q.id}`;
              const isOpen = openMap[mapKey] ?? false;
              return (
                <div key={mapKey} className="animate-slide-up bg-[#0d0d1f] border border-white/8 rounded-2xl overflow-hidden hover:border-white/15 transition-all duration-200" style={{ animationDelay: `${idx * 0.04}s` }}>
                  <button
                    onClick={() => toggleOpen(mapKey)}
                    className="w-full flex items-start gap-3 p-4 text-left"
                  >
                    <div className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black mt-0.5 ${COLOR_BG[q.sectionColor]} ${COLOR_TEXT[q.sectionColor]}`}>
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className={`text-[10px] font-bold ${COLOR_TEXT[q.sectionColor]} ${COLOR_BG[q.sectionColor]} ${COLOR_BORDER[q.sectionColor]} border px-2 py-0.5 rounded-full`}>
                          {q.sectionLabel}
                        </span>
                        {q.topic && (
                          <span className="text-[10px] text-gray-600 bg-white/4 border border-white/8 px-2 py-0.5 rounded-full">{q.topic}</span>
                        )}
                      </div>
                      <p className="text-white text-xs font-semibold leading-5 line-clamp-2">{q.question}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-1">
                      <svg className={`w-3 h-3 text-gray-600 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {/* Expanded answer */}
                  {isOpen && (
                    <div className="px-4 pb-4 animate-fade-up">
                      <div className="space-y-1.5 mb-3">
                        {q.options.map((option, i) => {
                          const isCorrect = i === q.correct;
                          return (
                            <div key={i} className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border transition-colors ${isCorrect ? "border-green-500/40 bg-green-500/8" : "border-white/5 bg-white/2"}`}>
                              <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black flex-shrink-0 ${isCorrect ? "bg-green-500 text-white" : "bg-white/6 text-gray-600"}`}>
                                {OPTION_LABELS[i]}
                              </span>
                              <span className={`text-xs flex-1 leading-4 ${isCorrect ? "text-green-300 font-semibold" : "text-gray-600"}`}>{option}</span>
                              {isCorrect && <span className="text-green-500 text-[10px] font-black flex-shrink-0">✓</span>}
                            </div>
                          );
                        })}
                      </div>
                      {q.explanation && (
                        <div className="p-3 bg-yellow-500/5 border border-yellow-500/15 rounded-xl mb-3">
                          <p className="text-yellow-200/60 text-xs leading-4">{q.explanation}</p>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Link href={q.sectionHref} className={`flex-1 text-center text-xs font-bold ${COLOR_TEXT[q.sectionColor]} ${COLOR_BG[q.sectionColor]} ${COLOR_BORDER[q.sectionColor]} border py-2 rounded-xl hover:opacity-80 transition-opacity`}>
                          Practice karein →
                        </Link>
                        <button
                          onClick={() => removeBookmark(q.sectionKey, q.id)}
                          className="flex items-center gap-1.5 text-xs font-bold text-red-400 bg-red-500/8 border border-red-500/20 px-3 py-2 rounded-xl hover:bg-red-500/15 transition-colors"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Hatao
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pb-4 text-center">
          <p className="text-gray-700 text-xs">
            Designed &amp; Created by <span className="text-indigo-400 font-bold">✦ Mohsin Raza</span>
          </p>
        </div>
      </div>
    </main>
  );
}
