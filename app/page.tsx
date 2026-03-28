"use client";

import Link from "next/link";
import { chapters } from "@/data/index";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#07080f] text-white overflow-x-hidden">

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-48 -left-48 w-[500px] h-[500px] bg-indigo-600/12 rounded-full blur-3xl animate-orb-1" />
        <div className="absolute top-1/2 -right-48 w-[400px] h-[400px] bg-violet-500/8 rounded-full blur-3xl animate-orb-2" />
        <div className="absolute -bottom-48 left-1/4 w-[450px] h-[450px] bg-indigo-500/8 rounded-full blur-3xl animate-orb-3" />

        <svg className="absolute inset-0 w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <line x1="8%" y1="12%" x2="28%" y2="30%" stroke="#6366f1" strokeWidth="0.5" strokeOpacity="0.15"/>
          <line x1="28%" y1="30%" x2="52%" y2="18%" stroke="#6366f1" strokeWidth="0.5" strokeOpacity="0.15"/>
          <line x1="52%" y1="18%" x2="75%" y2="35%" stroke="#818cf8" strokeWidth="0.5" strokeOpacity="0.12"/>
          <line x1="75%" y1="35%" x2="92%" y2="18%" stroke="#6366f1" strokeWidth="0.5" strokeOpacity="0.15"/>
          <line x1="28%" y1="30%" x2="18%" y2="58%" stroke="#6366f1" strokeWidth="0.5" strokeOpacity="0.12"/>
          <line x1="18%" y1="58%" x2="40%" y2="70%" stroke="#818cf8" strokeWidth="0.5" strokeOpacity="0.10"/>
          <line x1="40%" y1="70%" x2="65%" y2="82%" stroke="#6366f1" strokeWidth="0.5" strokeOpacity="0.12"/>
          <line x1="65%" y1="82%" x2="85%" y2="65%" stroke="#818cf8" strokeWidth="0.5" strokeOpacity="0.12"/>
          <line x1="85%" y1="65%" x2="75%" y2="35%" stroke="#6366f1" strokeWidth="0.5" strokeOpacity="0.12"/>
          <circle cx="8%" cy="12%" r="2.5" fill="#6366f1" className="animate-neural-1"/>
          <circle cx="28%" cy="30%" r="3.5" fill="#818cf8" className="animate-neural-2"/>
          <circle cx="52%" cy="18%" r="2.5" fill="#6366f1" className="animate-neural-3"/>
          <circle cx="75%" cy="35%" r="3" fill="#818cf8" className="animate-neural-4"/>
          <circle cx="92%" cy="18%" r="2" fill="#6366f1" className="animate-neural-5"/>
          <circle cx="18%" cy="58%" r="2.5" fill="#818cf8" className="animate-neural-6"/>
          <circle cx="40%" cy="70%" r="3.5" fill="#6366f1" className="animate-neural-7"/>
          <circle cx="65%" cy="82%" r="2.5" fill="#818cf8" className="animate-neural-8"/>
          <circle cx="85%" cy="65%" r="3" fill="#6366f1" className="animate-neural-1"/>
          <circle cx="38%" cy="44%" r="1.5" fill="#a5b4fc" className="animate-neural-3"/>
          <circle cx="62%" cy="52%" r="1.5" fill="#a5b4fc" className="animate-neural-5"/>
        </svg>

        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent animate-scan" />
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
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
            Exam Preparation Platform
          </div>

          <h1 className="text-5xl sm:text-6xl font-black leading-tight tracking-tight mb-4">
            <span className="text-white">Code with</span>
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-purple-400 bg-clip-text text-transparent">
              Mohsin
            </span>
          </h1>

          <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto mb-7 leading-relaxed">
            Chapter-wise MCQs — apni knowledge test karein aur samjhein. Har sawal par 50 second milte hain.
          </p>

          {/* Stat pills */}
          <div className="flex items-center justify-center flex-wrap gap-2.5">
            {[
              { icon: "📚", label: "6 Sections" },
              { icon: "❓", label: "353+ MCQs" },
              { icon: "⏱", label: "50s Timer" },
              { icon: "💾", label: "Auto-Resume" },
              { icon: "📊", label: "Score History" },
            ].map((s) => (
              <span key={s.label} className="inline-flex items-center gap-1.5 bg-white/4 border border-white/8 text-gray-400 text-xs font-medium px-3 py-1.5 rounded-full">
                <span>{s.icon}</span>
                {s.label}
              </span>
            ))}
          </div>
        </div>

        {/* Quiz Chapters */}
        <div className="mb-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-5 rounded-full bg-gradient-to-b from-indigo-400 to-violet-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-widest">Quiz Mode</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-indigo-500/20 to-transparent" />
            <span className="text-xs text-gray-600">{chapters.filter(c => c.questions.length > 0).length} chapters</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {chapters.map((chapter, idx) => {
              const isAvailable = chapter.questions.length > 0;
              const palettes = [
                {
                  bg: "bg-[#0c0c22]", border: "border-indigo-500/15", hoverBorder: "hover:border-indigo-500/50",
                  shadow: "hover:shadow-indigo-500/12", glow: "via-indigo-500/50",
                  badge: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
                  btn: "from-indigo-500 to-violet-500 shadow-indigo-500/20 hover:shadow-indigo-500/35",
                  accent: "text-indigo-400", num: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
                  blob: "bg-indigo-500/6",
                },
                {
                  bg: "bg-[#080f18]", border: "border-blue-500/15", hoverBorder: "hover:border-blue-500/50",
                  shadow: "hover:shadow-blue-500/12", glow: "via-blue-500/50",
                  badge: "bg-blue-500/15 text-blue-400 border-blue-500/30",
                  btn: "from-blue-500 to-sky-400 shadow-blue-500/20 hover:shadow-blue-500/35",
                  accent: "text-blue-400", num: "bg-blue-500/10 text-blue-300 border-blue-500/20",
                  blob: "bg-blue-500/6",
                },
                {
                  bg: "bg-[#0d0b1e]", border: "border-purple-500/15", hoverBorder: "hover:border-purple-500/50",
                  shadow: "hover:shadow-purple-500/12", glow: "via-purple-500/50",
                  badge: "bg-purple-500/15 text-purple-400 border-purple-500/30",
                  btn: "from-purple-600 to-fuchsia-500 shadow-purple-500/20 hover:shadow-purple-500/35",
                  accent: "text-purple-400", num: "bg-purple-500/10 text-purple-300 border-purple-500/20",
                  blob: "bg-purple-500/6",
                },
              ];
              const p = palettes[idx % palettes.length];

              return (
                <div
                  key={chapter.id}
                  className={`group relative ${p.bg} border ${isAvailable ? `${p.border} ${p.hoverBorder}` : "border-white/5 opacity-50"} rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${isAvailable ? p.shadow : ""}`}
                  style={{ animationDelay: `${0.12 + idx * 0.07}s` }}
                >
                  {isAvailable && (
                    <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${p.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  )}
                  {/* Corner blob */}
                  <div className={`absolute top-0 right-0 w-40 h-40 ${p.blob} rounded-full blur-3xl pointer-events-none`} />

                  <div className="p-6 relative">
                    {/* Top row */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex flex-col gap-1.5">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border w-fit ${isAvailable ? p.badge : "bg-white/5 text-gray-600 border-white/10"}`}>
                          Chapter {chapter.id}
                        </span>
                        {isAvailable && (
                          <span className={`text-[10px] font-semibold ${p.accent} opacity-60`}>Quiz Mode</span>
                        )}
                      </div>
                      <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center flex-shrink-0 ${isAvailable ? `${p.num} border-current/20` : "bg-white/3 border-white/8"}`}>
                        <span className={`text-xl font-black ${isAvailable ? p.accent : "text-gray-600"}`}>{chapter.id}</span>
                      </div>
                    </div>

                    <h3 className={`font-bold text-base leading-snug mb-2 ${isAvailable ? "text-white" : "text-gray-500"}`}>
                      {chapter.title}
                    </h3>
                    <p className="text-gray-500 text-xs leading-5 mb-5 line-clamp-2">{chapter.description}</p>

                    {isAvailable && (
                      <div className="flex items-center gap-3 mb-5">
                        <span className={`text-xs font-semibold ${p.accent}`}>{chapter.questions.length} sawaal</span>
                        <span className="text-gray-700 text-xs">•</span>
                        <span className="text-gray-600 text-xs">{chapter.topics} topics</span>
                        <span className="text-gray-700 text-xs">•</span>
                        <span className="text-gray-600 text-xs">50s/sawal</span>
                      </div>
                    )}

                    {isAvailable ? (
                      <Link
                        href={`/quiz/${chapter.id}`}
                        className={`flex items-center justify-center gap-2 w-full bg-gradient-to-r ${p.btn} hover:brightness-110 text-white font-bold text-sm py-3 rounded-2xl transition-all duration-200 shadow-lg`}
                      >
                        Quiz Shuru Karein
                        <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Link>
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
            <div className="w-1 h-5 rounded-full bg-gradient-to-b from-cyan-400 to-amber-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-widest">Practice Mode</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/20 to-transparent" />
            <span className="text-xs text-gray-600">Topic-wise</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            {/* Chapter 14 B & C */}
            <div className="group relative bg-[#05111a] border border-cyan-500/15 hover:border-cyan-500/50 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/12">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/6 rounded-full blur-2xl pointer-events-none" />
              <div className="p-5 relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full border w-fit bg-cyan-500/15 text-cyan-400 border-cyan-500/30">
                      Ch 14 — B &amp; C
                    </span>
                    <span className="text-[10px] font-semibold text-cyan-400/60">Zen Mode</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">⚡</span>
                  </div>
                </div>
                <h3 className="font-bold text-sm leading-snug mb-1.5 text-white">Extensibility &amp; Teams</h3>
                <p className="text-gray-600 text-xs leading-4 mb-4 line-clamp-2">Hooks, Plugins, Agent Teams, Worktrees, Channels</p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-semibold text-cyan-400">74 sawaal</span>
                  <span className="text-gray-700 text-xs">•</span>
                  <span className="text-gray-600 text-xs">8 topics</span>
                </div>
                <Link href="/practice/chapter14bc"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white font-bold text-sm py-2.5 rounded-2xl transition-all duration-200 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/35">
                  Practice Karein
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Chapter 14 D */}
            <div className="group relative bg-[#0c0714] border border-violet-500/15 hover:border-violet-500/50 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-500/12">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-violet-500/6 rounded-full blur-2xl pointer-events-none" />
              <div className="p-5 relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full border w-fit bg-violet-500/15 text-violet-400 border-violet-500/30">
                      Ch 14 — D
                    </span>
                    <span className="text-[10px] font-semibold text-violet-400/60">Guided Mode</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">💡</span>
                  </div>
                </div>
                <h3 className="font-bold text-sm leading-snug mb-1.5 text-white">Cowork &amp; Advanced</h3>
                <p className="text-gray-600 text-xs leading-4 mb-4 line-clamp-2">Dispatch, Computer Use, Browser, Projects &amp; Scheduling</p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-semibold text-violet-400">70 sawaal</span>
                  <span className="text-gray-700 text-xs">•</span>
                  <span className="text-gray-600 text-xs">11 topics</span>
                </div>
                <Link href="/practice/chapter14d"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-400 hover:to-fuchsia-400 text-white font-bold text-sm py-2.5 rounded-2xl transition-all duration-200 shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/35">
                  Practice Karein
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Chapter 14 E */}
            <div className="group relative bg-[#100e04] border border-amber-500/15 hover:border-amber-500/50 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/12">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="p-5 relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full border w-fit bg-amber-500/15 text-amber-400 border-amber-500/30">
                      Ch 14 — E
                    </span>
                    <span className="text-[10px] font-semibold text-amber-400/60">Deep Mode</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">🎯</span>
                  </div>
                </div>
                <h3 className="font-bold text-sm leading-snug mb-1.5 text-white">Strategy &amp; Assessment</h3>
                <p className="text-gray-600 text-xs leading-4 mb-4 line-clamp-2">Code vs Cowork, Skills, MBA Frameworks, Synthesis</p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-semibold text-amber-400">70 sawaal</span>
                  <span className="text-gray-700 text-xs">•</span>
                  <span className="text-gray-600 text-xs">5 topics</span>
                </div>
                <Link href="/practice/chapter14e"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold text-sm py-2.5 rounded-2xl transition-all duration-200 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/35">
                  Practice Karein
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>

          </div>
        </div>

        {/* Stats CTA */}
        <div className="animate-fade-up" style={{ animationDelay: "0.24s" }}>
          <Link href="/stats" className="group relative block bg-[#0a0a1e] border border-indigo-500/25 hover:border-indigo-500/55 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/15">
            {/* Top shimmer */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent" />
            {/* Sweep */}
            <div className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-indigo-500/4 to-transparent animate-sweep pointer-events-none" />
            {/* Blobs */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-violet-500/8 rounded-full blur-2xl pointer-events-none" />

            <div className="relative p-6">
              {/* Header row */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/15 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-black text-base leading-tight">Apni Performance</p>
                    <p className="text-indigo-400/60 text-xs font-semibold mt-0.5">Dekhein →</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-indigo-400/70 bg-indigo-500/10 border border-indigo-500/25 px-2.5 py-1 rounded-full">Stats Dashboard</span>
              </div>

              {/* Mini stat tiles */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="bg-white/3 border border-white/6 rounded-2xl p-3 text-center">
                  <p className="text-indigo-300 font-black text-lg leading-none mb-1">6</p>
                  <p className="text-gray-600 text-[10px]">Sections</p>
                </div>
                <div className="bg-white/3 border border-white/6 rounded-2xl p-3 text-center">
                  <p className="text-violet-300 font-black text-lg leading-none mb-1">353+</p>
                  <p className="text-gray-600 text-[10px]">Sawaalat</p>
                </div>
                <div className="bg-white/3 border border-white/6 rounded-2xl p-3 text-center">
                  <p className="text-purple-300 font-black text-lg leading-none mb-1">Best</p>
                  <p className="text-gray-600 text-[10px]">Score Track</p>
                </div>
              </div>

              {/* CTA button */}
              <div className="flex items-center justify-between bg-gradient-to-r from-indigo-500/12 to-violet-500/10 border border-indigo-500/20 group-hover:border-indigo-500/40 rounded-2xl px-4 py-3 transition-colors duration-300">
                <p className="text-gray-400 text-xs">Score history, best scores, attempts — sab ek jagah</p>
                <svg className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                className="group flex flex-col items-center gap-2 bg-white/3 hover:bg-indigo-500/10 border border-white/8 hover:border-indigo-500/35 rounded-2xl px-2 py-4 transition-all duration-200">
                <div className="w-8 h-8 bg-indigo-600/15 group-hover:bg-indigo-600/25 rounded-xl flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                  </svg>
                </div>
                <span className="text-gray-500 text-[10px] font-medium">Technova</span>
              </a>
            </div>

            {/* Creator */}
            <div className="flex items-center gap-3 mt-2">
              <div className="relative flex-shrink-0">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-indigo-500/35 shadow-lg shadow-indigo-500/15">
                  <img
                    src="/mohsin.png"
                    alt="Mohsin Raza"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "50% 8%", transform: "scale(3)", transformOrigin: "50% 8%" }}
                  />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-indigo-400 rounded-full border-2 border-[#07080f]" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Mohsin Raza</p>
                <p className="text-indigo-400 text-xs">✦ Code with Mohsin</p>
              </div>
            </div>

            <p className="text-gray-700 text-xs">Designed &amp; Created by Mohsin Raza</p>
          </div>
        </div>

      </div>
    </main>
  );
}
