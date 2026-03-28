"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ScoreEntry { score: number; total: number; pct: number; ts: number; }

const SECTIONS = [
  { key: "scoreHistory_ch12",  label: "Chapter 12",     sub: "AI Agent Factory",          color: "indigo",  href: "/quiz/12",              icon: "📘" },
  { key: "scoreHistory_ch13",  label: "Chapter 13",     sub: "Markdown & Instructions",   color: "blue",    href: "/quiz/13",              icon: "📗" },
  { key: "scoreHistory_ch14",  label: "Chapter 14",     sub: "Claude Code & Cowork",      color: "violet",  href: "/quiz/14",              icon: "📙" },
  { key: "scoreHistory_14bc",  label: "Section B & C",  sub: "Extensibility & Teams",     color: "cyan",    href: "/practice/chapter14bc", icon: "⚡" },
  { key: "scoreHistory_14d",   label: "Section D",      sub: "Cowork & Advanced",         color: "fuchsia", href: "/practice/chapter14d",  icon: "💡" },
  { key: "scoreHistory_14e",   label: "Section E",      sub: "Strategy & Assessment",     color: "amber",   href: "/practice/chapter14e",  icon: "🎯" },
];

const COLOR_MAP: Record<string, { bar: string; text: string; bg: string; border: string }> = {
  indigo:  { bar: "from-indigo-500 to-violet-500",   text: "text-indigo-400",  bg: "bg-indigo-500/10",  border: "border-indigo-500/25" },
  blue:    { bar: "from-blue-500 to-sky-400",        text: "text-blue-400",    bg: "bg-blue-500/10",    border: "border-blue-500/25"   },
  violet:  { bar: "from-violet-500 to-purple-500",   text: "text-violet-400",  bg: "bg-violet-500/10",  border: "border-violet-500/25" },
  cyan:    { bar: "from-cyan-500 to-teal-400",       text: "text-cyan-400",    bg: "bg-cyan-500/10",    border: "border-cyan-500/25"   },
  fuchsia: { bar: "from-fuchsia-500 to-violet-400",  text: "text-fuchsia-400", bg: "bg-fuchsia-500/10", border: "border-fuchsia-500/25"},
  amber:   { bar: "from-amber-500 to-orange-400",    text: "text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/25"  },
};

function timeAgo(ts: number) {
  const d = Math.floor((Date.now() - ts) / 1000);
  if (d < 60) return "Abhi abhi";
  if (d < 3600) return `${Math.floor(d / 60)} min pehle`;
  if (d < 86400) return `${Math.floor(d / 3600)} ghante pehle`;
  return `${Math.floor(d / 86400)} din pehle`;
}

export default function StatsPage() {
  const [data, setData] = useState<Record<string, ScoreEntry[]>>({});

  useEffect(() => {
    const result: Record<string, ScoreEntry[]> = {};
    SECTIONS.forEach(s => {
      result[s.key] = JSON.parse(localStorage.getItem(s.key) || "[]");
    });
    setData(result);
  }, []);

  const totalAttempts = Object.values(data).reduce((acc, h) => acc + h.length, 0);
  const totalCorrect = Object.values(data).reduce((acc, h) => acc + h.reduce((a, e) => a + e.score, 0), 0);
  const totalQs = Object.values(data).reduce((acc, h) => acc + h.reduce((a, e) => a + e.total, 0), 0);
  const overallPct = totalQs > 0 ? Math.round((totalCorrect / totalQs) * 100) : 0;

  return (
    <main className="min-h-screen bg-[#07080f] text-white px-4 py-6 sm:py-10">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-indigo-500/8 rounded-full blur-3xl animate-orb-1" />
        <div className="absolute bottom-0 -left-32 w-72 h-72 bg-violet-400/8 rounded-full blur-3xl animate-orb-2" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-fade-up">
          <Link href="/" className="flex items-center gap-1.5 text-gray-500 hover:text-indigo-400 text-xs transition-colors duration-200 active:scale-95 py-2 px-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Home
          </Link>
          <div className="text-center">
            <p className="text-indigo-400/70 text-xs font-semibold uppercase tracking-widest">Performance</p>
            <p className="text-gray-600 text-[10px] mt-0.5">Sab chapters ka result</p>
          </div>
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
        </div>

        {/* Overall summary */}
        {totalAttempts > 0 ? (
          <div className="animate-fade-up bg-[#0d0d1f] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-black/40 mb-6" style={{ animationDelay: "0.05s" }}>
            <div className="px-6 py-4 bg-gradient-to-r from-indigo-600/80 to-violet-600/80">
              <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-0.5">Overall Stats</p>
              <p className="text-white font-black text-lg">Aapki Overall Performance</p>
            </div>
            <div className="p-5 grid grid-cols-3 gap-3">
              <div className="bg-indigo-500/8 border border-indigo-500/20 rounded-2xl p-3 text-center">
                <p className="text-2xl font-black text-indigo-400">{totalAttempts}</p>
                <p className="text-gray-600 text-xs mt-0.5">Attempts</p>
              </div>
              <div className="bg-green-500/8 border border-green-500/20 rounded-2xl p-3 text-center">
                <p className="text-2xl font-black text-green-400">{totalCorrect}</p>
                <p className="text-gray-600 text-xs mt-0.5">Sahi Jawab</p>
              </div>
              <div className={`rounded-2xl p-3 text-center border ${overallPct >= 70 ? "bg-green-500/8 border-green-500/20" : overallPct >= 50 ? "bg-yellow-500/8 border-yellow-500/20" : "bg-red-500/8 border-red-500/20"}`}>
                <p className={`text-2xl font-black ${overallPct >= 70 ? "text-green-400" : overallPct >= 50 ? "text-yellow-400" : "text-red-400"}`}>{overallPct}%</p>
                <p className="text-gray-600 text-xs mt-0.5">Accuracy</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-fade-up text-center py-12 mb-6">
            <p className="text-5xl mb-4">📊</p>
            <p className="text-white font-bold text-lg">Abhi koi data nahi</p>
            <p className="text-gray-500 text-sm mt-2">Quiz ya practice shuru karein — score yahan dikhega</p>
            <Link href="/" className="inline-flex mt-4 items-center gap-2 bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-semibold text-sm px-5 py-2.5 rounded-2xl hover:bg-indigo-500/25 transition-colors">
              Chapters Dekhein →
            </Link>
          </div>
        )}

        {/* Per-section cards */}
        <div className="space-y-3">
          {SECTIONS.map((s, idx) => {
            const history = data[s.key] || [];
            const c = COLOR_MAP[s.color];
            const best = history.length > 0 ? Math.max(...history.map(e => e.pct)) : null;
            const last = history[0] ?? null;
            const attempts = history.length;

            return (
              <div key={s.key} className="animate-slide-up bg-[#0d0d1f] border border-white/8 rounded-2xl overflow-hidden hover:border-white/15 transition-all duration-200" style={{ animationDelay: `${idx * 0.05}s` }}>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{s.icon}</span>
                      <div>
                        <p className="text-white font-bold text-sm leading-tight">{s.label}</p>
                        <p className="text-gray-600 text-xs mt-0.5">{s.sub}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {best !== null ? (
                        <>
                          <p className={`text-2xl font-black ${c.text}`}>{best}%</p>
                          <p className="text-gray-600 text-[10px]">Best Score</p>
                        </>
                      ) : (
                        <span className="text-xs text-gray-600 bg-white/5 px-2 py-1 rounded-full border border-white/8">Na khela</span>
                      )}
                    </div>
                  </div>

                  {best !== null && (
                    <>
                      <div className="w-full bg-white/5 rounded-full h-1.5 mb-2 overflow-hidden">
                        <div className={`h-1.5 rounded-full bg-gradient-to-r ${c.bar} transition-all duration-700`}
                          style={{ width: `${best}%` }} />
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <span>{attempts} attempt{attempts !== 1 ? "s" : ""}</span>
                        <div className="flex items-center gap-3">
                          {last && <span>Last: <span className={c.text + " font-semibold"}>{last.pct}%</span></span>}
                          {last && <span>{timeAgo(last.ts)}</span>}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className={`px-4 py-2.5 ${c.bg} border-t ${c.border} flex items-center justify-between`}>
                  <div className="flex gap-1">
                    {history.slice(0, 8).map((e, i) => (
                      <div key={i} title={`${e.pct}%`}
                        className={`w-1.5 rounded-full transition-all ${e.pct >= 80 ? "bg-green-400" : e.pct >= 50 ? "bg-yellow-400" : "bg-red-400"}`}
                        style={{ height: `${Math.max(6, (e.pct / 100) * 24)}px` }} />
                    ))}
                  </div>
                  <Link href={s.href} className={`text-xs font-bold ${c.text} hover:opacity-80 transition-opacity`}>
                    {attempts > 0 ? "Phir Khelein →" : "Shuru Karein →"}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clear data */}
        {totalAttempts > 0 && (
          <button
            onClick={() => {
              SECTIONS.forEach(s => localStorage.removeItem(s.key));
              setData({});
            }}
            className="w-full mt-6 text-xs text-gray-700 hover:text-red-400 py-3 transition-colors duration-200"
          >
            Sab data clear karein
          </button>
        )}

        <div className="mt-4 pb-4 text-center">
          <p className="text-gray-700 text-xs">
            Designed &amp; Created by <span className="text-indigo-400 font-bold">✦ Mohsin Raza</span>
          </p>
        </div>
      </div>
    </main>
  );
}
