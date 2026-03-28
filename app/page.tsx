"use client";

import Link from "next/link";
import { chapters } from "@/data/index";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#07080f] text-white overflow-x-hidden">
      {/* Animated Gradient Orbs + AI Neural Network */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl animate-orb-1" />
        <div className="absolute top-1/3 -right-40 w-80 h-80 bg-violet-400/10 rounded-full blur-3xl animate-orb-2" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-orb-3" />

        {/* Neural Network SVG */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          {/* Connection lines */}
          <line x1="8%" y1="12%" x2="28%" y2="30%" stroke="#6366f1" strokeWidth="0.6" strokeOpacity="0.18"/>
          <line x1="28%" y1="30%" x2="52%" y2="18%" stroke="#6366f1" strokeWidth="0.6" strokeOpacity="0.18"/>
          <line x1="52%" y1="18%" x2="75%" y2="35%" stroke="#818cf8" strokeWidth="0.6" strokeOpacity="0.15"/>
          <line x1="75%" y1="35%" x2="92%" y2="18%" stroke="#6366f1" strokeWidth="0.6" strokeOpacity="0.18"/>
          <line x1="28%" y1="30%" x2="18%" y2="58%" stroke="#6366f1" strokeWidth="0.6" strokeOpacity="0.15"/>
          <line x1="18%" y1="58%" x2="40%" y2="70%" stroke="#818cf8" strokeWidth="0.6" strokeOpacity="0.12"/>
          <line x1="52%" y1="18%" x2="40%" y2="70%" stroke="#6366f1" strokeWidth="0.6" strokeOpacity="0.10"/>
          <line x1="40%" y1="70%" x2="65%" y2="82%" stroke="#6366f1" strokeWidth="0.6" strokeOpacity="0.15"/>
          <line x1="65%" y1="82%" x2="85%" y2="65%" stroke="#818cf8" strokeWidth="0.6" strokeOpacity="0.15"/>
          <line x1="85%" y1="65%" x2="75%" y2="35%" stroke="#6366f1" strokeWidth="0.6" strokeOpacity="0.15"/>
          <line x1="8%" y1="12%" x2="18%" y2="58%" stroke="#6366f1" strokeWidth="0.6" strokeOpacity="0.10"/>
          <line x1="92%" y1="18%" x2="85%" y2="65%" stroke="#6366f1" strokeWidth="0.6" strokeOpacity="0.12"/>
          {/* Neural nodes */}
          <circle cx="8%" cy="12%" r="3" fill="#6366f1" className="animate-neural-1"/>
          <circle cx="28%" cy="30%" r="4" fill="#818cf8" className="animate-neural-2"/>
          <circle cx="52%" cy="18%" r="3" fill="#6366f1" className="animate-neural-3"/>
          <circle cx="75%" cy="35%" r="3.5" fill="#818cf8" className="animate-neural-4"/>
          <circle cx="92%" cy="18%" r="2.5" fill="#6366f1" className="animate-neural-5"/>
          <circle cx="18%" cy="58%" r="3" fill="#818cf8" className="animate-neural-6"/>
          <circle cx="40%" cy="70%" r="4" fill="#6366f1" className="animate-neural-7"/>
          <circle cx="65%" cy="82%" r="3" fill="#818cf8" className="animate-neural-8"/>
          <circle cx="85%" cy="65%" r="3.5" fill="#6366f1" className="animate-neural-1"/>
          {/* Tiny secondary nodes */}
          <circle cx="38%" cy="44%" r="1.5" fill="#a5b4fc" className="animate-neural-3"/>
          <circle cx="62%" cy="52%" r="1.5" fill="#a5b4fc" className="animate-neural-5"/>
          <circle cx="14%" cy="82%" r="1.5" fill="#a5b4fc" className="animate-neural-7"/>
          <circle cx="88%" cy="88%" r="1.5" fill="#a5b4fc" className="animate-neural-2"/>
        </svg>

        {/* Floating data particles */}
        <div className="absolute bottom-1/3 left-[8%] w-1.5 h-1.5 rounded-full bg-indigo-400/70 animate-data-1" />
        <div className="absolute bottom-1/4 left-[28%] w-1 h-1 rounded-full bg-violet-400/60 animate-data-2" />
        <div className="absolute bottom-2/5 left-[52%] w-1.5 h-1.5 rounded-full bg-indigo-300/70 animate-data-3" />
        <div className="absolute bottom-1/3 left-[75%] w-1 h-1 rounded-full bg-indigo-400/60 animate-data-4" />
        <div className="absolute bottom-1/4 left-[18%] w-1 h-1 rounded-full bg-violet-300/50 animate-data-5" />
        <div className="absolute bottom-2/5 left-[40%] w-1.5 h-1.5 rounded-full bg-indigo-400/70 animate-data-6" />
        <div className="absolute bottom-1/3 left-[65%] w-1 h-1 rounded-full bg-violet-400/60 animate-data-7" />
        <div className="absolute bottom-1/4 left-[85%] w-1.5 h-1.5 rounded-full bg-indigo-300/60 animate-data-8" />

        {/* Scan beam */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400/35 to-transparent animate-scan" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-10 sm:py-14">

        {/* YouTube Subscribe Banner */}
        <a
          href="https://www.youtube.com/@CodewithMohsin1"
          target="_blank"
          rel="noopener noreferrer"
          className="animate-fade-up animate-glow-red group relative flex items-center justify-between bg-gradient-to-r from-red-950/70 via-[#1a0808]/80 to-red-950/50 border border-red-500/35 hover:border-red-400/70 rounded-2xl px-5 py-4 mb-8 transition-all duration-300 hover:scale-[1.015] overflow-hidden"
        >
          {/* Top shimmer line */}
          <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-red-400/70 to-transparent" />
          {/* Continuous sweep shimmer */}
          <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-red-400/8 to-transparent animate-sweep pointer-events-none" />
          {/* Bottom glow line */}
          <div className="absolute bottom-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />

          <div className="flex items-center gap-3 relative z-10">
            {/* Icon with ping ring */}
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 rounded-xl bg-red-500/25 animate-ping" style={{ animationDuration: "2.5s" }} />
              <div className="relative w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/50">
                <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <p className="text-white font-bold text-sm leading-tight">Code with Mohsin</p>
                <span className="text-[9px] font-black px-1.5 py-0.5 bg-red-500 text-white rounded-md tracking-wide animate-pulse">LIVE</span>
              </div>
              <p className="text-red-300/60 text-xs">AI, Coding aur Tech — Urdu mein seekhein</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-shrink-0 relative z-10">
            <span className="inline-flex items-center gap-1.5 animate-sub bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg shadow-red-600/40">
              {/* Bell icon */}
              <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
              </svg>
              Subscribe
            </span>
            <svg className="w-4 h-4 text-red-400/60 group-hover:text-red-400 group-hover:translate-x-0.5 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </a>

        {/* Hero */}
        <div className="text-center mb-10 animate-fade-up" style={{ animationDelay: "0.08s" }}>
          <div className="flex justify-center mb-5">
            <div className="relative inline-flex items-center justify-center">
              {/* Orbit ring 1 */}
              <div className="absolute w-48 h-10 border border-indigo-500/20 rounded-full animate-orbit-cw" style={{ borderStyle: "dashed" }} />
              {/* Orbit ring 2 */}
              <div className="absolute w-64 h-14 border border-violet-500/12 rounded-full animate-orbit-ccw" style={{ borderStyle: "dashed" }} />
              {/* Orbiting dot on ring 1 */}
              <div className="absolute w-48 h-10 animate-orbit-cw" style={{ pointerEvents: "none" }}>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-indigo-400/80 shadow-[0_0_6px_2px_rgba(99,102,241,0.6)]" />
              </div>
              {/* Orbiting dot on ring 2 */}
              <div className="absolute w-64 h-14 animate-orbit-ccw" style={{ pointerEvents: "none" }}>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-violet-400/70 shadow-[0_0_5px_2px_rgba(167,139,250,0.5)]" />
              </div>
              <span className="relative inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold px-4 py-2 rounded-full z-10">
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
                Exam Preparation Quiz
              </span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-3">
            <span className="text-white">Code with </span>
            <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-purple-400 bg-clip-text text-transparent">
              Mohsin
            </span>
          </h1>
          <p className="text-gray-400 text-base max-w-lg mx-auto">
            Chapter-wise MCQ quizzes — apni knowledge test karein. Har sawal par 50 second milte hain.
          </p>
        </div>

        {/* Chapter Cards */}
        <div className="mb-10">
          <h2 className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-5 text-center">
            Chapters
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {chapters.map((chapter, idx) => {
              const isAvailable = chapter.questions.length > 0;
              return (
                <div
                  key={chapter.id}
                  className={`animate-fade-up group relative bg-[#0e0e1f] border rounded-3xl overflow-hidden transition-all duration-300
                    ${isAvailable
                      ? "border-white/10 hover:border-indigo-500/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10"
                      : "border-white/5 opacity-60"
                    }`}
                  style={{ animationDelay: `${0.12 + idx * 0.08}s` }}
                >
                  {isAvailable && (
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full
                        ${isAvailable
                          ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/30"
                          : "bg-white/5 text-gray-600 border border-white/10"
                        }`}>
                        Chapter {chapter.id}
                      </span>
                      {!isAvailable && (
                        <span className="text-xs text-gray-600 bg-white/5 px-2 py-0.5 rounded-full border border-white/8">
                          Coming Soon
                        </span>
                      )}
                      {isAvailable && (
                        <span className="text-xs text-gray-500">{chapter.topics} Topics</span>
                      )}
                    </div>
                    <h3 className={`font-bold text-lg leading-snug mb-2 ${isAvailable ? "text-white" : "text-gray-500"}`}>
                      {chapter.title}
                    </h3>
                    <p className="text-gray-500 text-xs leading-5 mb-5 line-clamp-2">
                      {chapter.description}
                    </p>
                    {isAvailable && (
                      <div className="flex items-center gap-4 mb-5">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <svg className="w-3.5 h-3.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {chapter.questions.length} Questions
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <svg className="w-3.5 h-3.5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          50s / sawal
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <svg className="w-3.5 h-3.5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          MCQ
                        </div>
                      </div>
                    )}
                    {isAvailable ? (
                      <Link
                        href={`/quiz/${chapter.id}`}
                        className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white font-bold text-sm py-3 rounded-2xl transition-all duration-200 shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/35"
                      >
                        Quiz Shuru Karein
                        <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Link>
                    ) : (
                      <div className="flex items-center justify-center gap-2 w-full bg-white/5 text-gray-600 font-bold text-sm py-3 rounded-2xl border border-white/8 cursor-not-allowed">
                        Jald Aane Wala Hai
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Chapter 14 B & C — Practice Card */}
            <div
              className="animate-fade-up group relative bg-[#0e0e1f] border border-white/10 hover:border-indigo-500/50 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10"
              style={{ animationDelay: `${0.12 + chapters.length * 0.08}s` }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                      Chapter 14
                    </span>
                    <span className="text-sm font-black px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500/25 to-violet-500/20 text-indigo-300 border border-indigo-400/40 tracking-wide">
                      B &amp; C
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">8 Topics</span>
                </div>
                <h3 className="font-bold text-lg leading-snug mb-2 text-white">
                  Extensibility &amp; Teams
                </h3>
                <p className="text-gray-500 text-xs leading-5 mb-5 line-clamp-2">
                  Hooks, Plugins, Ralph Loop, Agent Teams, Worktrees, Remote Control, Scheduled Tasks, Channels
                </p>
                <div className="flex items-center gap-4 mb-5">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <svg className="w-3.5 h-3.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    74 Questions
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <svg className="w-3.5 h-3.5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Explanation
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <svg className="w-3.5 h-3.5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    MCQ
                  </div>
                </div>
                <Link
                  href="/practice/chapter14bc"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white font-bold text-sm py-3 rounded-2xl transition-all duration-200 shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/35"
                >
                  Practice Karein
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Chapter 14 D — Practice Card */}
            <div
              className="animate-fade-up group relative bg-[#0e0e1f] border border-white/10 hover:border-indigo-500/50 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10"
              style={{ animationDelay: `${0.12 + (chapters.length + 1) * 0.08}s` }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                      Chapter 14
                    </span>
                    <span className="text-sm font-black px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500/25 to-violet-500/20 text-indigo-300 border border-indigo-400/40 tracking-wide">
                      D
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">11 Topics</span>
                </div>
                <h3 className="font-bold text-lg leading-snug mb-2 text-white">
                  Cowork &amp; Advanced Features
                </h3>
                <p className="text-gray-500 text-xs leading-5 mb-5 line-clamp-2">
                  Cowork Story, Dispatch, Computer Use, Browser Integration, Custom Visuals, Projects &amp; Scheduling
                </p>
                <div className="flex items-center gap-4 mb-5">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <svg className="w-3.5 h-3.5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    70 Questions
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <svg className="w-3.5 h-3.5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Explanation
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <svg className="w-3.5 h-3.5 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    MCQ
                  </div>
                </div>
                <Link
                  href="/practice/chapter14d"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 text-white font-bold text-sm py-3 rounded-2xl transition-all duration-200 shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/35"
                >
                  Practice Karein
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Chapter 14 E — Practice Card */}
            <div
              className="animate-fade-up group relative bg-[#0e0e1f] border border-white/10 hover:border-amber-500/50 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10"
              style={{ animationDelay: `${0.12 + (chapters.length + 2) * 0.08}s` }}
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                      Chapter 14
                    </span>
                    <span className="text-sm font-black px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/25 to-orange-500/20 text-amber-300 border border-amber-400/40 tracking-wide">
                      E
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">5 Topics</span>
                </div>
                <h3 className="font-bold text-lg leading-snug mb-2 text-white">
                  Strategy &amp; Assessment
                </h3>
                <p className="text-gray-500 text-xs leading-5 mb-5 line-clamp-2">
                  Code vs Cowork Framework, Skills to Business, Cross-Vendor Landscape, MBA Frameworks, Integration &amp; Synthesis
                </p>
                <div className="flex items-center gap-4 mb-5">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <svg className="w-3.5 h-3.5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    70 Questions
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <svg className="w-3.5 h-3.5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Explanation
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <svg className="w-3.5 h-3.5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    MCQ
                  </div>
                </div>
                <Link
                  href="/practice/chapter14e"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold text-sm py-3 rounded-2xl transition-all duration-200 shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/35"
                >
                  Practice Karein
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-white/5" />

        {/* Footer */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-500/40 shadow-lg shadow-indigo-500/20">
                <img
                  src="/mohsin.png"
                  alt="Mohsin Raza"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "50% 8%", transform: "scale(3)", transformOrigin: "50% 8%" }}
                />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-indigo-400 rounded-full border-2 border-[#07080f]" />
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-sm leading-tight">Mohsin Raza</p>
              <p className="text-indigo-400 text-xs">✦ Code with Mohsin</p>
            </div>
          </div>
          <p className="text-gray-600 text-xs">Designed &amp; Created by Mohsin Raza</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-xl">
            {/* YouTube */}
            <a href="https://www.youtube.com/@CodewithMohsin1" target="_blank" rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 bg-white/4 hover:bg-red-500/10 border border-white/8 hover:border-red-500/40 rounded-2xl px-3 py-4 transition-all duration-200">
              <div className="w-9 h-9 bg-red-600/15 group-hover:bg-red-600/25 rounded-xl flex items-center justify-center transition-colors duration-200">
                <svg className="w-5 h-5 fill-red-400" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <span className="text-gray-400 text-xs font-medium">YouTube</span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 group-hover:bg-red-600/30 transition-colors duration-200">
                Subscribe
              </span>
            </a>
            {/* Facebook */}
            <a href="https://www.facebook.com/mohsin.raza.166438" target="_blank" rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 bg-white/4 hover:bg-blue-500/10 border border-white/8 hover:border-blue-500/40 rounded-2xl px-3 py-4 transition-all duration-200">
              <div className="w-9 h-9 bg-blue-600/15 group-hover:bg-blue-600/25 rounded-xl flex items-center justify-center transition-colors duration-200">
                <svg className="w-5 h-5 fill-blue-400" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <span className="text-gray-400 text-xs font-medium">Facebook</span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30 group-hover:bg-blue-600/30 transition-colors duration-200">
                Follow
              </span>
            </a>
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/mohsin-raza-a514392b6/" target="_blank" rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 bg-white/4 hover:bg-sky-500/10 border border-white/8 hover:border-sky-500/40 rounded-2xl px-3 py-4 transition-all duration-200">
              <div className="w-9 h-9 bg-sky-600/15 group-hover:bg-sky-600/25 rounded-xl flex items-center justify-center transition-colors duration-200">
                <svg className="w-5 h-5 fill-sky-400" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <span className="text-gray-400 text-xs font-medium">LinkedIn</span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-sky-600/20 text-sky-400 border border-sky-500/30 group-hover:bg-sky-600/30 transition-colors duration-200">
                Follow
              </span>
            </a>
            {/* Technova */}
            <a href="https://technova-zeta.vercel.app/" target="_blank" rel="noopener noreferrer"
              className="group flex flex-col items-center gap-2 bg-white/4 hover:bg-indigo-500/10 border border-white/8 hover:border-indigo-500/40 rounded-2xl px-3 py-4 transition-all duration-200">
              <div className="w-9 h-9 bg-indigo-600/15 group-hover:bg-indigo-600/25 rounded-xl flex items-center justify-center transition-colors duration-200">
                <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                </svg>
              </div>
              <span className="text-gray-400 text-xs font-medium">Technova</span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 group-hover:bg-indigo-600/30 transition-colors duration-200">
                Visit
              </span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
