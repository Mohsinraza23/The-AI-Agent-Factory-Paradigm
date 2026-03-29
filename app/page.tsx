"use client";

import Link from "next/link";
import { chapters } from "@/data/index";
import { useEffect, useState } from "react";

function ScoreRing({ pct }: { pct: number }) {
  const r = 16;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct / 100);
  const color = pct >= 80 ? "#34d399" : pct >= 60 ? "#fbbf24" : pct >= 40 ? "#fb923c" : "#f87171";
  return (
    <div className="relative flex items-center justify-center w-10 h-10">
      <svg width="40" height="40" className="-rotate-90">
        <circle cx="20" cy="20" r={r} fill="none" stroke="#ffffff08" strokeWidth="3" />
        <circle cx="20" cy="20" r={r} fill="none" strokeWidth="3" strokeLinecap="round"
          stroke={color}
          strokeDasharray={circ}
          strokeDashoffset={offset}
          className="animate-ring"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <span className="absolute text-[10px] font-black" style={{ color }}>{pct}%</span>
    </div>
  );
}

export default function Home() {
  const [streak, setStreak] = useState(0);
  const [scores, setScores] = useState<Record<string, number | null>>({});
  const [resume, setResume] = useState<Record<string, number>>({});

  useEffect(() => {
    const ds = JSON.parse(localStorage.getItem("dailyStreak") || '{"count":0,"lastDate":""}');
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (ds.lastDate === today || ds.lastDate === yesterday) setStreak(ds.count);

    const scoreKeys: Record<string, string> = {
      chapter12: "scoreHistory_ch12",
      chapter13: "scoreHistory_ch13",
      chapter14: "scoreHistory_ch14",
      chapter14bc: "scoreHistory_14bc",
      chapter14d: "scoreHistory_14d",
      chapter14e: "scoreHistory_14e",
    };
    const s: Record<string, number | null> = {};
    for (const [key, storageKey] of Object.entries(scoreKeys)) {
      const h = JSON.parse(localStorage.getItem(storageKey) || "[]");
      s[key] = h.length > 0 ? Math.max(...h.map((e: { pct: number }) => e.pct)) : null;
    }
    setScores(s);

    const r: Record<string, number> = {};
    for (const c of chapters) {
      const saved = localStorage.getItem(`quizProgress_chapter${c.id}`);
      if (saved) {
        const d = JSON.parse(saved);
        if (d.index > 0) r[c.id] = d.index;
      }
    }
    setResume(r);
  }, []);

  const quizPalettes = [
    {
      bg: "from-blue-950/80 to-indigo-950/60", border: "border-blue-500/20", hoverBorder: "hover:border-blue-400/60",
      glow: "via-blue-400/60", badge: "bg-blue-500/15 text-blue-300 border-blue-500/30",
      btn: "from-blue-500 to-indigo-500 shadow-blue-500/25 hover:shadow-blue-400/40",
      accent: "text-blue-400", orbColor: "bg-blue-600/10", tag: "text-blue-400/60",
      shadow: "hover:shadow-blue-500/15", studyHover: "hover:border-blue-500/40 hover:text-blue-300",
      flashHover: "hover:border-blue-400/40 hover:text-blue-300",
    },
    {
      bg: "from-violet-950/80 to-purple-950/60", border: "border-violet-500/20", hoverBorder: "hover:border-violet-400/60",
      glow: "via-violet-400/60", badge: "bg-violet-500/15 text-violet-300 border-violet-500/30",
      btn: "from-violet-500 to-purple-500 shadow-violet-500/25 hover:shadow-violet-400/40",
      accent: "text-violet-400", orbColor: "bg-violet-600/10", tag: "text-violet-400/60",
      shadow: "hover:shadow-violet-500/15", studyHover: "hover:border-violet-500/40 hover:text-violet-300",
      flashHover: "hover:border-violet-400/40 hover:text-violet-300",
    },
    {
      bg: "from-fuchsia-950/80 to-pink-950/60", border: "border-fuchsia-500/20", hoverBorder: "hover:border-fuchsia-400/60",
      glow: "via-fuchsia-400/60", badge: "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30",
      btn: "from-fuchsia-500 to-pink-500 shadow-fuchsia-500/25 hover:shadow-fuchsia-400/40",
      accent: "text-fuchsia-400", orbColor: "bg-fuchsia-600/10", tag: "text-fuchsia-400/60",
      shadow: "hover:shadow-fuchsia-500/15", studyHover: "hover:border-fuchsia-500/40 hover:text-fuchsia-300",
      flashHover: "hover:border-fuchsia-400/40 hover:text-fuchsia-300",
    },
  ];

  const practiceSections = [
    {
      key: "chapter14bc", href: "/practice/chapter14bc", label: "Ch 14 — B & C", mode: "Zen Mode",
      title: "Extensibility & Teams", desc: "Hooks, Plugins, Agent Teams, Worktrees, Channels",
      count: 74, topics: 8, icon: "⚡",
      bg: "from-cyan-950/80 to-teal-950/60", border: "border-cyan-500/20", hoverBorder: "hover:border-cyan-400/60",
      glow: "via-cyan-400/60", badge: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
      btn: "from-cyan-500 to-teal-500 shadow-cyan-500/25 hover:shadow-cyan-400/40",
      accent: "text-cyan-400", orb: "bg-cyan-600/10", shadow: "hover:shadow-cyan-500/15",
    },
    {
      key: "chapter14d", href: "/practice/chapter14d", label: "Ch 14 — D", mode: "Guided Mode",
      title: "Cowork & Advanced", desc: "Dispatch, Computer Use, Browser, Projects & Scheduling",
      count: 70, topics: 11, icon: "💡",
      bg: "from-violet-950/80 to-purple-950/60", border: "border-violet-500/20", hoverBorder: "hover:border-violet-400/60",
      glow: "via-violet-400/60", badge: "bg-violet-500/15 text-violet-300 border-violet-500/30",
      btn: "from-violet-500 to-fuchsia-500 shadow-violet-500/25 hover:shadow-violet-400/40",
      accent: "text-violet-400", orb: "bg-violet-600/10", shadow: "hover:shadow-violet-500/15",
    },
    {
      key: "chapter14e", href: "/practice/chapter14e", label: "Ch 14 — E", mode: "Deep Mode",
      title: "Strategy & Assessment", desc: "Code vs Cowork, Skills, MBA Frameworks, Synthesis",
      count: 70, topics: 5, icon: "🎯",
      bg: "from-amber-950/80 to-orange-950/60", border: "border-amber-500/20", hoverBorder: "hover:border-amber-400/60",
      glow: "via-amber-400/60", badge: "bg-amber-500/15 text-amber-300 border-amber-500/30",
      btn: "from-amber-500 to-orange-500 shadow-amber-500/25 hover:shadow-amber-400/40",
      accent: "text-amber-400", orb: "bg-amber-600/10", shadow: "hover:shadow-amber-500/15",
    },
  ];

  return (
    <main className="min-h-screen bg-[#040410] text-white overflow-x-hidden">

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Dot grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle, #ffffff08 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
        {/* Orbs */}
        <div className="absolute -top-56 -left-56 w-[600px] h-[600px] bg-blue-700/12 rounded-full blur-3xl animate-orb-1" />
        <div className="absolute top-1/3 -right-48 w-[450px] h-[450px] bg-violet-600/10 rounded-full blur-3xl animate-orb-2" />
        <div className="absolute -bottom-56 left-1/3 w-[500px] h-[500px] bg-cyan-700/8 rounded-full blur-3xl animate-orb-3" />
        <div className="absolute top-[60%] right-[20%] w-72 h-72 bg-pink-700/8 rounded-full blur-3xl animate-orb-2" />
        {/* Floating dots */}
        {[
          { x: "12%", y: "18%", color: "#6366f1" },
          { x: "78%", y: "12%", color: "#06b6d4" },
          { x: "88%", y: "55%", color: "#a855f7" },
          { x: "25%", y: "72%", color: "#ec4899" },
          { x: "55%", y: "88%", color: "#6366f1" },
          { x: "6%",  y: "48%", color: "#06b6d4" },
        ].map((d, i) => (
          <div key={i} className={`absolute w-1 h-1 rounded-full animate-float-${i + 1}`}
            style={{ left: d.x, top: d.y, background: d.color, boxShadow: `0 0 6px ${d.color}` }} />
        ))}
        {/* Scan line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent animate-scan" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 sm:py-12">

        {/* YouTube Banner */}
        <a
          href="https://www.youtube.com/@CodewithMohsin1"
          target="_blank"
          rel="noopener noreferrer"
          className="animate-fade-up animate-glow-red group relative flex items-center justify-between bg-gradient-to-r from-red-950/70 via-[#1a0808]/80 to-red-950/50 border border-red-500/30 hover:border-red-400/60 rounded-2xl px-5 py-3.5 mb-8 transition-all duration-300 hover:scale-[1.012] overflow-hidden"
        >
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-red-400/60 to-transparent" />
          <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-red-400/6 to-transparent animate-sweep pointer-events-none" />
          <div className="flex items-center gap-3 relative z-10">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 rounded-xl bg-red-500/20 animate-ping" style={{ animationDuration: "2.5s" }} />
              <div className="relative w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/40">
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-white font-bold text-sm">Code with Mohsin</p>
                <span className="text-[9px] font-black px-1.5 py-0.5 bg-red-500 text-white rounded-md tracking-wide animate-pulse">LIVE</span>
              </div>
              <p className="text-red-300/50 text-xs">AI, Coding aur Tech — Urdu mein seekhein</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 relative z-10">
            <span className="animate-sub bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-red-600/30">
              Subscribe
            </span>
            <svg className="w-4 h-4 text-red-400/50 group-hover:text-red-400 group-hover:translate-x-0.5 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </a>

        {/* Hero */}
        <div className="text-center mb-12 animate-fade-up" style={{ animationDelay: "0.06s" }}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-violet-500/10 border border-blue-500/25 text-blue-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
            Exam Preparation Platform
            <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
          </div>

          <h1 className="text-5xl sm:text-6xl font-black leading-tight tracking-tight mb-4">
            <span className="text-white">Code with</span>
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-violet-300 to-pink-400 bg-clip-text text-transparent">
              Mohsin
            </span>
          </h1>

          <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto mb-7 leading-relaxed">
            Chapter-wise MCQs — apni knowledge test karein aur samjhein. Har sawal par 60 second milte hain.
          </p>

          {/* Stat pills */}
          <div className="flex items-center justify-center flex-wrap gap-2.5">
            {[
              { icon: "📚", label: "6 Sections", color: "border-blue-500/20 text-blue-300/70" },
              { icon: "❓", label: "353+ MCQs", color: "border-violet-500/20 text-violet-300/70" },
              { icon: "⏱", label: "60s Timer", color: "border-cyan-500/20 text-cyan-300/70" },
              { icon: "💾", label: "Auto-Resume", color: "border-pink-500/20 text-pink-300/70" },
              { icon: "📊", label: "Score History", color: "border-indigo-500/20 text-indigo-300/70" },
            ].map((s) => (
              <span key={s.label} className={`inline-flex items-center gap-1.5 bg-white/3 border ${s.color} text-xs font-medium px-3 py-1.5 rounded-full`}>
                <span>{s.icon}</span>
                {s.label}
              </span>
            ))}
            {streak > 0 && (
              <span className="inline-flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-bold px-3 py-1.5 rounded-full animate-pulse">
                🔥 {streak} din ki streak!
              </span>
            )}
          </div>
        </div>

        {/* Quiz Chapters */}
        <div className="mb-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-5 rounded-full bg-gradient-to-b from-cyan-400 via-violet-400 to-pink-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-widest">Quiz Mode</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-500/30 to-transparent" />
            <span className="text-xs text-gray-600">{chapters.filter(c => c.questions.length > 0).length} chapters</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {chapters.map((chapter, idx) => {
              const isAvailable = chapter.questions.length > 0;
              const p = quizPalettes[idx % quizPalettes.length];
              const bestScore = scores[`chapter${chapter.id}`];
              const resumeIdx = resume[chapter.id];

              return (
                <div
                  key={chapter.id}
                  className={`group relative bg-gradient-to-br ${isAvailable ? p.bg : "from-white/3 to-white/1"} border ${isAvailable ? `${p.border} ${p.hoverBorder}` : "border-white/5 opacity-50"} rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${isAvailable ? p.shadow : ""}`}
                  style={{ animationDelay: `${0.12 + idx * 0.07}s` }}
                >
                  {/* Top animated border line */}
                  {isAvailable && (
                    <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${p.glow} to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-300`} />
                  )}
                  {/* Glow sweep */}
                  {isAvailable && (
                    <div className={`absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent ${p.glow.replace("/60", "/3")} to-transparent animate-sweep pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  )}
                  {/* Corner orb */}
                  <div className={`absolute -top-8 -right-8 w-32 h-32 ${isAvailable ? p.orbColor : "bg-white/3"} rounded-full blur-2xl pointer-events-none`} />

                  <div className="p-5 relative">
                    {/* Top row: badge + score ring */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex flex-col gap-1">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border w-fit ${isAvailable ? p.badge : "bg-white/5 text-gray-600 border-white/10"}`}>
                          Chapter {chapter.id}
                        </span>
                        {isAvailable && <span className={`text-[10px] font-semibold ${p.tag}`}>Quiz Mode</span>}
                      </div>
                      {isAvailable && bestScore !== null && bestScore !== undefined ? (
                        <ScoreRing pct={bestScore} />
                      ) : isAvailable ? (
                        <div className="w-10 h-10 rounded-2xl bg-white/4 border border-white/8 flex items-center justify-center">
                          <span className={`text-xl font-black ${p.accent} opacity-50`}>{chapter.id}</span>
                        </div>
                      ) : null}
                    </div>

                    <h3 className={`font-bold text-sm leading-snug mb-1.5 ${isAvailable ? "text-white" : "text-gray-500"}`}>
                      {chapter.title}
                    </h3>
                    <p className="text-gray-600 text-xs leading-5 mb-4 line-clamp-2">{chapter.description}</p>

                    {isAvailable && (
                      <div className="flex items-center gap-2 mb-4">
                        <span className={`text-xs font-semibold ${p.accent}`}>{chapter.questions.length} sawaal</span>
                        <span className="text-gray-700 text-xs">•</span>
                        <span className="text-gray-600 text-xs">{chapter.topics} topics</span>
                        <span className="text-gray-700 text-xs">•</span>
                        <span className="text-gray-600 text-xs">60s/sawal</span>
                      </div>
                    )}

                    {/* Resume banner */}
                    {isAvailable && resumeIdx && (
                      <div className={`flex items-center justify-between mb-3 px-3 py-2 rounded-xl bg-white/4 border ${p.border}`}>
                        <span className="text-gray-400 text-[10px]">Sawal {resumeIdx + 1} pe ruka hua hai</span>
                        <Link href={`/quiz/${chapter.id}`}
                          className={`text-[10px] font-bold ${p.accent} hover:opacity-80`}>
                          Continue →
                        </Link>
                      </div>
                    )}

                    {isAvailable ? (
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Link href={`/study/${chapter.id}`}
                            className={`flex items-center justify-center gap-1.5 flex-1 bg-white/4 border border-white/8 ${p.studyHover} text-gray-500 font-bold text-xs py-2 rounded-xl transition-all duration-200`}>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                            Study
                          </Link>
                          <Link href={`/flashcard/${chapter.id}`}
                            className={`flex items-center justify-center gap-1.5 flex-1 bg-white/4 border border-white/8 ${p.flashHover} text-gray-500 font-bold text-xs py-2 rounded-xl transition-all duration-200`}>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z"/></svg>
                            Flashcard
                          </Link>
                        </div>
                        <Link href={`/quiz/${chapter.id}`}
                          className={`flex items-center justify-center gap-2 w-full bg-gradient-to-r ${p.btn} hover:brightness-110 text-white font-bold text-sm py-2.5 rounded-2xl transition-all duration-200 shadow-lg`}>
                          Quiz Shuru Karein
                          <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                        </Link>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2 w-full bg-white/4 text-gray-600 font-bold text-sm py-3 rounded-2xl border border-white/8 cursor-not-allowed">
                        Jald Aane Wala Hai
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Practice Sections */}
        <div className="mb-8 animate-fade-up" style={{ animationDelay: "0.18s" }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-5 rounded-full bg-gradient-to-b from-cyan-400 via-violet-400 to-amber-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-widest">Practice Mode</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/20 to-transparent" />
            <span className="text-xs text-gray-600">Topic-wise</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {practiceSections.map((s, idx) => {
              const bestScore = scores[s.key];
              return (
                <div key={s.key}
                  className={`group relative bg-gradient-to-br ${s.bg} border ${s.border} ${s.hoverBorder} rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${s.shadow}`}
                  style={{ animationDelay: `${0.2 + idx * 0.06}s` }}
                >
                  <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${s.glow} to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-300`} />
                  <div className={`absolute -top-8 -right-8 w-28 h-28 ${s.orb} rounded-full blur-2xl pointer-events-none`} />

                  <div className="p-5 relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex flex-col gap-1">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border w-fit ${s.badge}`}>{s.label}</span>
                        <span className={`text-[10px] font-semibold ${s.accent} opacity-60`}>{s.mode}</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        {bestScore !== null && bestScore !== undefined ? (
                          <ScoreRing pct={bestScore} />
                        ) : (
                          <div className="w-10 h-10 rounded-2xl bg-white/4 border border-white/8 flex items-center justify-center">
                            <span className="text-xl">{s.icon}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <h3 className="font-bold text-sm leading-snug mb-1 text-white">{s.title}</h3>
                    <p className="text-gray-600 text-xs leading-4 mb-4 line-clamp-2">{s.desc}</p>
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`text-xs font-semibold ${s.accent}`}>{s.count} sawaal</span>
                      <span className="text-gray-700 text-xs">•</span>
                      <span className="text-gray-600 text-xs">{s.topics} topics</span>
                    </div>

                    <Link href={s.href}
                      className={`flex items-center justify-center gap-2 w-full bg-gradient-to-r ${s.btn} hover:brightness-110 text-white font-bold text-sm py-2.5 rounded-2xl transition-all duration-200 shadow-lg`}>
                      Practice Karein
                      <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats + Bookmarks — side by side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-0 animate-fade-up" style={{ animationDelay: "0.24s" }}>

          {/* Stats CTA */}
          <Link href="/stats" className="group relative block bg-gradient-to-br from-indigo-950/80 to-violet-950/60 border border-indigo-500/20 hover:border-indigo-400/60 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/15">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-indigo-500/3 to-transparent animate-sweep pointer-events-none" />
            <div className="absolute -top-8 -right-8 w-28 h-28 bg-indigo-600/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/15 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-black text-sm">Stats Dashboard</p>
                  <p className="text-indigo-400/60 text-xs mt-0.5">Apni performance dekhein</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { val: "6", label: "Sections", color: "text-indigo-400" },
                  { val: "353+", label: "Sawaalat", color: "text-violet-400" },
                  { val: streak > 0 ? `${streak}🔥` : "Best", label: streak > 0 ? "Streak" : "Score", color: streak > 0 ? "text-orange-400" : "text-purple-400" },
                ].map(t => (
                  <div key={t.label} className="bg-white/3 border border-white/6 rounded-xl p-2.5 text-center">
                    <p className={`${t.color} font-black text-base leading-none mb-1`}>{t.val}</p>
                    <p className="text-gray-600 text-[10px]">{t.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between bg-indigo-500/8 border border-indigo-500/20 rounded-xl px-3 py-2.5 group-hover:border-indigo-500/40 transition-colors">
                <p className="text-gray-500 text-xs">Score history, best scores, attempts</p>
                <svg className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Bookmarks CTA */}
          <Link href="/bookmarks" className="group relative block bg-gradient-to-br from-yellow-950/60 to-amber-950/40 border border-yellow-500/20 hover:border-yellow-400/60 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-yellow-500/12">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute -top-8 -right-8 w-28 h-28 bg-yellow-600/8 rounded-full blur-2xl pointer-events-none" />
            <div className="relative p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-2xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white font-black text-sm">Bookmarks</p>
                  <p className="text-yellow-400/60 text-xs mt-0.5">Save kiye gaye sawal</p>
                </div>
              </div>
              <p className="text-gray-600 text-xs mb-5 leading-5">Quiz ya practice mein kisi bhi sawal ko bookmark karein aur baad mein revise karein.</p>
              <div className="flex items-center justify-between bg-yellow-500/6 border border-yellow-500/20 rounded-xl px-3 py-2.5 group-hover:border-yellow-500/40 transition-colors">
                <p className="text-gray-500 text-xs">Bookmarked sawaal dekhein</p>
                <svg className="w-4 h-4 text-yellow-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-white/5 animate-fade-up" style={{ animationDelay: "0.28s" }}>
          <div className="flex flex-col items-center gap-6">
            {/* Social links */}
            <div className="grid grid-cols-4 gap-3 w-full max-w-sm">
              <a href="https://www.youtube.com/@CodewithMohsin1" target="_blank" rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2 bg-white/3 hover:bg-red-500/10 border border-white/8 hover:border-red-500/35 rounded-2xl px-2 py-4 transition-all duration-200">
                <div className="w-8 h-8 bg-red-600/15 group-hover:bg-red-600/25 rounded-xl flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 fill-red-400" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
                <span className="text-gray-500 text-[10px] font-medium">YouTube</span>
              </a>
              <a href="https://www.facebook.com/mohsin.raza.166438" target="_blank" rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2 bg-white/3 hover:bg-blue-500/10 border border-white/8 hover:border-blue-500/35 rounded-2xl px-2 py-4 transition-all duration-200">
                <div className="w-8 h-8 bg-blue-600/15 group-hover:bg-blue-600/25 rounded-xl flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 fill-blue-400" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <span className="text-gray-500 text-[10px] font-medium">Facebook</span>
              </a>
              <a href="https://www.linkedin.com/in/mohsin-raza-a514392b6/" target="_blank" rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2 bg-white/3 hover:bg-sky-500/10 border border-white/8 hover:border-sky-500/35 rounded-2xl px-2 py-4 transition-all duration-200">
                <div className="w-8 h-8 bg-sky-600/15 group-hover:bg-sky-600/25 rounded-xl flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 fill-sky-400" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <span className="text-gray-500 text-[10px] font-medium">LinkedIn</span>
              </a>
              <a href="https://technova-zeta.vercel.app/" target="_blank" rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2 bg-white/3 hover:bg-cyan-500/10 border border-white/8 hover:border-cyan-500/35 rounded-2xl px-2 py-4 transition-all duration-200">
                <div className="w-8 h-8 bg-cyan-600/15 group-hover:bg-cyan-600/25 rounded-xl flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                  </svg>
                </div>
                <span className="text-gray-500 text-[10px] font-medium">Technova</span>
              </a>
            </div>

            {/* Creator */}
            <div className="flex items-center gap-3 mt-2">
              <div className="relative flex-shrink-0">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-transparent shadow-lg"
                  style={{ background: "linear-gradient(#040410, #040410) padding-box, linear-gradient(135deg, #06b6d4, #7c3aed, #ec4899) border-box" }}>
                  <img
                    src="/mohsin.png"
                    alt="Mohsin Raza"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "50% 8%", transform: "scale(3)", transformOrigin: "50% 8%" }}
                  />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-cyan-400 rounded-full border-2 border-[#040410]" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Mohsin Raza</p>
                <p className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent text-xs font-semibold">✦ Code with Mohsin</p>
              </div>
            </div>

            <p className="text-gray-700 text-xs">Designed &amp; Created by Mohsin Raza</p>
          </div>
        </div>

      </div>
    </main>
  );
}
