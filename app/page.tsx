"use client";

import Link from "next/link";
import Image from "next/image";
import { chapters } from "@/data/index";
import { useEffect, useState, useRef } from "react";

// ── Animated counter ──────────────────────────────────────────────────────────
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      setVal(Math.round((frame / 60) * to));
      if (frame >= 60) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [to]);
  return <>{val}{suffix}</>;
}

// ── Score ring ────────────────────────────────────────────────────────────────
function ScoreRing({ pct }: { pct: number }) {
  const r = 17, circ = 2 * Math.PI * r;
  const color = pct >= 80 ? "#34d399" : pct >= 60 ? "#fbbf24" : pct >= 40 ? "#fb923c" : "#f87171";
  return (
    <div className="relative flex items-center justify-center w-11 h-11">
      <svg width="44" height="44" className="-rotate-90">
        <circle cx="22" cy="22" r={r} fill="none" stroke="#ffffff08" strokeWidth="3.5" />
        <circle cx="22" cy="22" r={r} fill="none" strokeWidth="3.5" strokeLinecap="round"
          stroke={color} strokeDasharray={circ} strokeDashoffset={circ * (1 - pct / 100)}
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)" }} />
      </svg>
      <span className="absolute text-[10px] font-black" style={{ color }}>{pct}%</span>
    </div>
  );
}

// ── 3D tilt card ──────────────────────────────────────────────────────────────
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-6px) scale(1.01)`;
    el.style.transition = "transform 0.08s ease-out";
  };
  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "";
    ref.current.style.transition = "transform 0.45s cubic-bezier(.4,0,.2,1)";
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={className}>
      {children}
    </div>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [scores, setScores] = useState<Record<string, number | null>>({});
  const [resume, setResume] = useState<Record<string, number>>({});
  const [search, setSearch] = useState("");

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const ds = JSON.parse(localStorage.getItem("dailyStreak") || '{"count":0,"lastDate":""}');
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (ds.lastDate === today || ds.lastDate === yesterday) setStreak(ds.count);

    const scoreKeys: Record<string, string> = {
      chapter12: "scoreHistory_ch12", chapter13: "scoreHistory_ch13",
      chapter14: "scoreHistory_ch14", chapter14bc: "scoreHistory_14bc",
      chapter14d: "scoreHistory_14d", chapter14e: "scoreHistory_14e",
    };
    const s: Record<string, number | null> = {};
    for (const [key, sk] of Object.entries(scoreKeys)) {
      const h = JSON.parse(localStorage.getItem(sk) || "[]");
      s[key] = h.length > 0 ? Math.max(...h.map((e: { pct: number }) => e.pct)) : null;
    }
    setScores(s);

    const r: Record<string, number> = {};
    for (const c of chapters) {
      const saved = localStorage.getItem(`quizProgress_chapter${c.id}`);
      if (saved) { const d = JSON.parse(saved); if (d.index > 0) r[c.id] = d.index; }
    }
    setResume(r);
  }, []);

  const quizPalettes = [
    {
      bg: "from-[#0c1228] to-[#080c1c]", border: "border-blue-500/20", hoverBorder: "hover:border-blue-400/50",
      glow: "via-blue-400/50", badge: "bg-blue-500/15 text-blue-300 border-blue-500/25",
      btn: "from-blue-500 to-indigo-500", accent: "text-blue-400", orb: "bg-blue-600/15",
      num: "text-blue-500/8", tag: "text-blue-400/50",
      studyHover: "hover:border-blue-500/40 hover:text-blue-300",
      flashHover: "hover:border-blue-400/40 hover:text-blue-300",
    },
    {
      bg: "from-[#120c28] to-[#0d091c]", border: "border-violet-500/20", hoverBorder: "hover:border-violet-400/50",
      glow: "via-violet-400/50", badge: "bg-violet-500/15 text-violet-300 border-violet-500/25",
      btn: "from-violet-500 to-purple-500", accent: "text-violet-400", orb: "bg-violet-600/15",
      num: "text-violet-500/8", tag: "text-violet-400/50",
      studyHover: "hover:border-violet-500/40 hover:text-violet-300",
      flashHover: "hover:border-violet-400/40 hover:text-violet-300",
    },
    {
      bg: "from-[#240c1e] to-[#1a091a]", border: "border-fuchsia-500/20", hoverBorder: "hover:border-fuchsia-400/50",
      glow: "via-fuchsia-400/50", badge: "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/25",
      btn: "from-fuchsia-500 to-pink-500", accent: "text-fuchsia-400", orb: "bg-fuchsia-600/15",
      num: "text-fuchsia-500/8", tag: "text-fuchsia-400/50",
      studyHover: "hover:border-fuchsia-500/40 hover:text-fuchsia-300",
      flashHover: "hover:border-fuchsia-400/40 hover:text-fuchsia-300",
    },
  ];

  const practiceSections = [
    {
      key: "chapter14bc", href: "/practice/chapter14bc", label: "Ch 14 — B & C",
      title: "Extensibility & Teams", desc: "Hooks, Plugins, Agent Teams, Channels",
      count: 74, topics: 8, icon: "⚡",
      bg: "from-[#091a1e] to-[#060e14]", border: "border-cyan-500/20", hoverBorder: "hover:border-cyan-400/50",
      glow: "via-cyan-400/50", badge: "bg-cyan-500/15 text-cyan-300 border-cyan-500/25",
      btn: "from-cyan-500 to-teal-500", accent: "text-cyan-400", orb: "bg-cyan-600/15",
    },
    {
      key: "chapter14d", href: "/practice/chapter14d", label: "Ch 14 — D",
      title: "Cowork & Advanced", desc: "Dispatch, Computer Use, Browser, Projects",
      count: 70, topics: 11, icon: "💡",
      bg: "from-[#120c28] to-[#0d091c]", border: "border-violet-500/20", hoverBorder: "hover:border-violet-400/50",
      glow: "via-violet-400/50", badge: "bg-violet-500/15 text-violet-300 border-violet-500/25",
      btn: "from-violet-500 to-fuchsia-500", accent: "text-violet-400", orb: "bg-violet-600/15",
    },
    {
      key: "chapter14e", href: "/practice/chapter14e", label: "Ch 14 — E",
      title: "Strategy & Assessment", desc: "Code vs Cowork, Skills, MBA Frameworks",
      count: 70, topics: 5, icon: "🎯",
      bg: "from-[#1a1208] to-[#12100a]", border: "border-amber-500/20", hoverBorder: "hover:border-amber-400/50",
      glow: "via-amber-400/50", badge: "bg-amber-500/15 text-amber-300 border-amber-500/25",
      btn: "from-amber-500 to-orange-500", accent: "text-amber-400", orb: "bg-amber-600/15",
    },
  ];

  const allSections = [
    { key: "chapter12", label: "Ch 12" }, { key: "chapter13", label: "Ch 13" },
    { key: "chapter14", label: "Ch 14" }, { key: "chapter14bc", label: "14 B&C" },
    { key: "chapter14d", label: "14 D" },  { key: "chapter14e", label: "14 E" },
  ];
  const completedSections = allSections.filter(s => scores[s.key] !== null && scores[s.key] !== undefined).length;

  const filteredChapters = chapters.filter(c =>
    !search ||
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    (c.description || "").toLowerCase().includes(search.toLowerCase()) ||
    String(c.id).includes(search)
  );

  return (
    <main className="min-h-screen bg-[#030309] text-white overflow-x-hidden">

      {/* ── Background ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        {/* Tech grid lines */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }} />
        {/* Glowing dot at every intersection */}
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle, rgba(99,102,241,0.12) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }} />

        {/* Central top radial light — main focus point */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-3xl animate-breathe"
          style={{ background: "radial-gradient(ellipse at top, rgba(139,92,246,0.22) 0%, rgba(99,102,241,0.10) 40%, transparent 70%)" }} />

        {/* Aurora blobs — large, vibrant, drifting */}
        <div className="absolute -top-56 -left-56 w-[750px] h-[750px] rounded-full blur-3xl animate-aurora-1"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 65%)" }} />
        <div className="absolute -top-24 -right-48 w-[550px] h-[550px] rounded-full blur-3xl animate-aurora-2"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.14) 0%, transparent 65%)" }} />
        <div className="absolute top-[30%] -left-36 w-[480px] h-[480px] rounded-full blur-3xl animate-aurora-3"
          style={{ background: "radial-gradient(circle, rgba(168,85,247,0.13) 0%, transparent 65%)" }} />
        <div className="absolute top-[45%] right-[5%] w-[420px] h-[420px] rounded-full blur-3xl animate-aurora-4"
          style={{ background: "radial-gradient(circle, rgba(236,72,153,0.11) 0%, transparent 65%)" }} />
        <div className="absolute bottom-[-100px] left-[20%] w-[600px] h-[600px] rounded-full blur-3xl animate-aurora-5"
          style={{ background: "radial-gradient(circle, rgba(20,184,166,0.11) 0%, transparent 65%)" }} />
        <div className="absolute bottom-[-80px] right-[15%] w-[450px] h-[450px] rounded-full blur-3xl animate-aurora-6"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 65%)" }} />

        {/* Horizontal horizon glow */}
        <div className="absolute top-[45%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/12 to-transparent" />
        <div className="absolute top-[45%] left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-violet-400/18 to-transparent blur-sm" />

        {/* Floating neon dots */}
        {[
          { x: "7%",  y: "14%", c: "#6366f1", cls: "animate-float-1" },
          { x: "83%", y: "8%",  c: "#06b6d4", cls: "animate-float-2" },
          { x: "93%", y: "48%", c: "#a855f7", cls: "animate-float-3" },
          { x: "16%", y: "76%", c: "#ec4899", cls: "animate-float-4" },
          { x: "57%", y: "91%", c: "#6366f1", cls: "animate-float-5" },
          { x: "3%",  y: "53%", c: "#06b6d4", cls: "animate-float-6" },
          { x: "44%", y: "22%", c: "#f59e0b", cls: "animate-float-2" },
          { x: "71%", y: "63%", c: "#10b981", cls: "animate-float-4" },
        ].map((d, i) => (
          <div key={i} className={`absolute w-1 h-1 rounded-full ${d.cls}`}
            style={{ left: d.x, top: d.y, background: d.c, boxShadow: `0 0 10px ${d.c}, 0 0 20px ${d.c}55` }} />
        ))}

        {/* Rising particles */}
        {[
          { x: "15%",  y: "80%", c: "#6366f1", cls: "animate-rise-1" },
          { x: "32%",  y: "90%", c: "#8b5cf6", cls: "animate-rise-2" },
          { x: "55%",  y: "85%", c: "#06b6d4", cls: "animate-rise-3" },
          { x: "74%",  y: "88%", c: "#ec4899", cls: "animate-rise-4" },
          { x: "88%",  y: "82%", c: "#a855f7", cls: "animate-rise-5" },
          { x: "42%",  y: "92%", c: "#10b981", cls: "animate-rise-6" },
        ].map((d, i) => (
          <div key={`r${i}`} className={`absolute w-0.5 h-0.5 rounded-full ${d.cls}`}
            style={{ left: d.x, top: d.y, background: d.c, boxShadow: `0 0 6px ${d.c}` }} />
        ))}

        {/* Glowing grid accent lines */}
        <div className="absolute top-[20%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/8 to-transparent animate-grid-1" />
        <div className="absolute top-[60%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/8 to-transparent animate-grid-2" />
        <div className="absolute top-[80%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/6 to-transparent animate-grid-3" />

        {/* Top scan line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent animate-scan" />

        {/* Noise texture for depth */}
        <div className="absolute inset-0 opacity-[0.018]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "180px 180px",
        }} />

        {/* Vignette — edges darker for depth */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(3,3,9,0.6) 100%)"
        }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 lg:py-12">

        {/* ── YouTube Banner ── */}
        <a href="https://www.youtube.com/@CodewithMohsin1" target="_blank" rel="noopener noreferrer"
          className="animate-fade-up group relative flex items-center justify-between bg-gradient-to-r from-red-950/60 via-[#150606]/70 to-red-950/40 backdrop-blur-sm border border-red-500/25 hover:border-red-400/50 rounded-2xl px-4 sm:px-5 py-3 sm:py-3.5 mb-6 sm:mb-8 transition-all duration-300 hover:scale-[1.012] overflow-hidden">
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-red-400/50 to-transparent" />
          <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-red-400/4 to-transparent animate-sweep pointer-events-none" />
          <div className="flex items-center gap-3 relative z-10">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 rounded-xl bg-red-500/20 animate-ping" style={{ animationDuration: "2.5s" }} />
              <div className="relative w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/30">
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
              <p className="text-red-300/45 text-xs hidden xs:block sm:block">AI, Coding aur Tech — Urdu mein seekhein</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 relative z-10">
            <span className="animate-sub bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-red-600/25">Subscribe</span>
            <svg className="w-4 h-4 text-red-400/50 group-hover:text-red-400 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </a>

        {/* ── Hero ── */}
        <div className="mb-10 animate-fade-up" style={{ animationDelay: "0.05s" }}>
          {/* mobile: stack (text then image), md+: side by side */}
          <div className="flex flex-col md:flex-row md:items-center gap-6">

            {/* Text */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2.5 bg-gradient-to-r from-indigo-500/10 via-violet-500/8 to-cyan-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold px-5 py-2 rounded-full mb-6 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                ✦ AI Exam Preparation Platform
                <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
              </div>

              <h1 className="font-black leading-none tracking-tighter mb-5">
                <span className="block text-3xl sm:text-4xl md:text-5xl text-white/85 mb-2">Code with</span>
                <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl bg-gradient-to-r from-cyan-300 via-violet-300 to-pink-400 bg-clip-text text-transparent drop-shadow-lg">
                  Mohsin
                </span>
              </h1>

              <p className="text-gray-400/80 text-sm sm:text-base max-w-lg mx-auto md:mx-0 mb-6 md:mb-8 leading-relaxed">
                Chapter-wise MCQs for AI, Agents, LLMs &amp; Modern Software.{" "}
                <span className="text-indigo-400/70">Har sawal par 60 second — test yourself!</span>
              </p>
            </div>

            {/* AI Robot image — mobile: centered below text, md+: right side */}
            <div className="flex justify-center md:justify-end flex-shrink-0 relative">
              <div className="absolute inset-0 rounded-3xl bg-violet-500/10 blur-2xl scale-110" />
              <Image
                src="/ai-education.jpg"
                alt="AI Education Robot"
                width={240}
                height={240}
                className="relative rounded-3xl object-cover shadow-2xl shadow-violet-900/40 border border-white/10 w-[200px] sm:w-[220px] md:w-[200px] lg:w-[240px]"
                priority
              />
            </div>
          </div>

          {/* Animated stat pills */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mt-6">
            {[
              { val: 353, suffix: "+", label: "MCQs",     icon: "❓", color: "text-blue-400",   border: "border-blue-500/20"   },
              { val: 6,   suffix: "",  label: "Chapters", icon: "📚", color: "text-violet-400", border: "border-violet-500/20" },
              { val: 24,  suffix: "+", label: "Topics",   icon: "🎯", color: "text-cyan-400",   border: "border-cyan-500/20"   },
              { val: 60,  suffix: "s", label: "Timer",    icon: "⏱", color: "text-pink-400",   border: "border-pink-500/20"   },
            ].map(s => (
              <div key={s.label} className={`flex items-center gap-2.5 bg-white/[0.03] backdrop-blur-sm border ${s.border} rounded-2xl px-4 py-2.5`}>
                <span className="text-base">{s.icon}</span>
                <div className="text-left">
                  <p className={`text-sm font-black leading-none ${s.color}`}><CountUp to={s.val} suffix={s.suffix} /></p>
                  <p className="text-gray-600 text-[10px] mt-0.5">{s.label}</p>
                </div>
              </div>
            ))}
            {streak > 0 && (
              <div className="flex items-center gap-2.5 bg-orange-500/10 border border-orange-500/25 rounded-2xl px-4 py-2.5">
                <span className="text-base">🔥</span>
                <div className="text-left">
                  <p className="text-sm font-black leading-none text-orange-400">{streak} Din</p>
                  <p className="text-gray-600 text-[10px] mt-0.5">Streak!</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Progress Overview ── */}
        {completedSections > 0 && (
          <div className="mb-8 animate-fade-up backdrop-blur-sm bg-white/[0.02] border border-white/8 rounded-3xl p-5" style={{ animationDelay: "0.08s" }}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-white uppercase tracking-widest">Aapki Journey</span>
                <span className="text-[10px] text-gray-600">{completedSections}/6 sections</span>
              </div>
              <span className="text-xs font-black text-indigo-400">{Math.round((completedSections / 6) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-1.5 mb-4 overflow-hidden">
              <div className="h-1.5 rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 transition-all duration-1000"
                style={{ width: `${(completedSections / 6) * 100}%` }} />
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {allSections.map(s => {
                const pct = scores[s.key];
                const done = pct !== null && pct !== undefined;
                const barColor = done
                  ? pct! >= 80 ? "bg-green-400" : pct! >= 60 ? "bg-yellow-400" : pct! >= 40 ? "bg-orange-400" : "bg-red-400"
                  : "bg-white/8";
                return (
                  <div key={s.key} className="text-center">
                    <div className={`h-1.5 rounded-full ${barColor} mb-1.5`} />
                    <p className="text-[9px] text-gray-600">{s.label}</p>
                    {done && <p className="text-[9px] font-black text-gray-400">{pct}%</p>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Quiz Mode ── */}
        <div className="mb-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/15 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-sm font-black text-white uppercase tracking-widest">Quiz Mode</h2>
              <p className="text-gray-600 text-[10px]">60 seconds per question</p>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-500/25 to-transparent" />
            <span className="text-[10px] font-bold text-blue-300 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full">
              {chapters.filter(c => c.questions.length > 0).length} Active
            </span>
          </div>

          {/* Search bar */}
          <div className="relative mb-4">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none"
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Chapter dhundein..."
              className="w-full bg-white/[0.03] border border-white/10 focus:border-indigo-500/40 focus:bg-indigo-500/5 text-white text-sm placeholder-gray-600 rounded-2xl pl-10 pr-4 py-2.5 outline-none transition-all duration-200"
            />
            {search && (
              <button onClick={() => setSearch("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Skeleton cards (before mount) */}
          {!mounted ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="rounded-3xl border border-white/6 p-4 sm:p-5 space-y-3">
                  <div className="skeleton h-6 w-24" />
                  <div className="skeleton h-4 w-full" />
                  <div className="skeleton h-4 w-3/4" />
                  <div className="skeleton h-10 w-full mt-4 rounded-2xl" />
                </div>
              ))}
            </div>
          ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredChapters.length === 0 && (
              <div className="col-span-full text-center py-10 text-gray-600 text-sm">
                <svg className="w-8 h-8 mx-auto mb-2 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Koi chapter nahi mila
              </div>
            )}
            {filteredChapters.map((chapter, idx) => {
              const isAvailable = chapter.questions.length > 0;
              const p = quizPalettes[idx % quizPalettes.length];
              const bestScore = scores[`chapter${chapter.id}`];
              const resumeIdx = resume[chapter.id];

              return (
                <TiltCard key={chapter.id}>
                  <div className={`relative bg-gradient-to-br ${isAvailable ? p.bg : "from-white/[0.02] to-transparent"} backdrop-blur-xl border ${isAvailable ? `${p.border} ${p.hoverBorder}` : "border-white/5 opacity-50"} rounded-3xl overflow-hidden h-full transition-all duration-300`}
                    style={{ animationDelay: `${0.12 + idx * 0.06}s` }}>
                    {isAvailable && <>
                      <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${p.glow} to-transparent opacity-60`} />
                      <div className={`absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent ${p.glow.replace("/50", "/4")} to-transparent animate-sweep pointer-events-none`} />
                    </>}
                    <div className={`absolute -top-10 -right-10 w-36 h-36 ${isAvailable ? p.orb : "bg-white/3"} rounded-full blur-3xl pointer-events-none`} />
                    {isAvailable && (
                      <div className={`absolute -bottom-3 -right-1 text-[96px] font-black leading-none ${p.num} pointer-events-none select-none`}>
                        {chapter.id}
                      </div>
                    )}

                    <div className="p-4 sm:p-5 relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex flex-col gap-1.5">
                          <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border w-fit tracking-wide ${isAvailable ? p.badge : "bg-white/5 text-gray-600 border-white/8"}`}>
                            Chapter {chapter.id}
                          </span>
                          {isAvailable && <span className={`text-[9px] font-semibold uppercase tracking-widest ${p.tag}`}>Quiz Mode</span>}
                        </div>
                        {isAvailable && bestScore !== null && bestScore !== undefined
                          ? <ScoreRing pct={bestScore} />
                          : isAvailable
                          ? <div className="w-11 h-11 rounded-2xl bg-white/4 border border-white/8 flex items-center justify-center">
                              <span className={`text-2xl font-black ${p.accent} opacity-25`}>{chapter.id}</span>
                            </div>
                          : null}
                      </div>

                      <h3 className={`font-bold text-sm leading-snug mb-1.5 ${isAvailable ? "text-white" : "text-gray-600"}`}>
                        {chapter.title}
                      </h3>
                      <p className="text-gray-600 text-xs leading-5 mb-4 line-clamp-2">{chapter.description}</p>

                      {isAvailable && (
                        <div className="flex items-center gap-2 mb-4 flex-wrap">
                          <span className={`text-xs font-bold ${p.accent}`}>{chapter.questions.length} sawaal</span>
                          <span className="w-1 h-1 rounded-full bg-gray-700" />
                          <span className="text-gray-600 text-xs">{chapter.topics} topics</span>
                          <span className="w-1 h-1 rounded-full bg-gray-700" />
                          <span className="text-gray-600 text-xs">60s</span>
                        </div>
                      )}

                      {isAvailable && resumeIdx && (
                        <div className={`flex items-center justify-between mb-3 px-3 py-2 rounded-xl bg-white/3 border ${p.border}`}>
                          <span className="text-gray-400 text-[10px]">▶ Sawal {resumeIdx + 1} pe ruka hua</span>
                          <Link href={`/quiz/${chapter.id}`} className={`text-[10px] font-black ${p.accent} hover:opacity-80`}>Resume →</Link>
                        </div>
                      )}

                      {isAvailable ? (
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <Link href={`/study/${chapter.id}`}
                              className={`flex items-center justify-center gap-1.5 flex-1 bg-white/3 border border-white/8 ${p.studyHover} text-gray-500 font-bold text-xs py-2.5 rounded-xl transition-all duration-200`}>
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                              </svg>
                              Study
                            </Link>
                            <Link href={`/flashcard/${chapter.id}`}
                              className={`flex items-center justify-center gap-1.5 flex-1 bg-white/3 border border-white/8 ${p.flashHover} text-gray-500 font-bold text-xs py-2.5 rounded-xl transition-all duration-200`}>
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z"/>
                              </svg>
                              Flashcard
                            </Link>
                          </div>
                          <Link href={`/quiz/${chapter.id}`}
                            className={`group/btn flex items-center justify-center gap-2 w-full bg-gradient-to-r ${p.btn} hover:brightness-110 active:scale-[0.98] text-white font-black text-sm py-3 rounded-2xl transition-all duration-200 shadow-lg`}>
                            Quiz Shuru Karein
                            <svg className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                            </svg>
                          </Link>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2 w-full bg-white/3 text-gray-600 font-bold text-sm py-3 rounded-2xl border border-white/6 cursor-not-allowed select-none">
                          <span className="w-1.5 h-1.5 bg-gray-700 rounded-full animate-pulse" />
                          Jald Aane Wala Hai
                        </div>
                      )}
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
          )}
        </div>

        {/* ── Practice Mode ── */}
        <div className="mb-8 animate-fade-up" style={{ animationDelay: "0.18s" }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/15 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-sm font-black text-white uppercase tracking-widest">Practice Mode</h2>
              <p className="text-gray-600 text-[10px]">Topic-wise with hints</p>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/20 to-transparent" />
            <span className="text-[10px] font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-full">3 Sections</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {practiceSections.map((s, idx) => {
              const bestScore = scores[s.key];
              return (
                <TiltCard key={s.key}>
                  <div className={`relative bg-gradient-to-br ${s.bg} backdrop-blur-xl border ${s.border} ${s.hoverBorder} rounded-3xl overflow-hidden h-full transition-all duration-300`}
                    style={{ animationDelay: `${0.2 + idx * 0.06}s` }}>
                    <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent ${s.glow} to-transparent opacity-60`} />
                    <div className={`absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent ${s.glow.replace("/50", "/4")} to-transparent animate-sweep pointer-events-none`} />
                    <div className={`absolute -top-10 -right-10 w-32 h-32 ${s.orb} rounded-full blur-3xl pointer-events-none`} />
                    <div className="absolute -bottom-4 -right-2 text-[72px] leading-none pointer-events-none select-none opacity-10">{s.icon}</div>

                    <div className="p-5 relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex flex-col gap-1.5">
                          <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border w-fit ${s.badge}`}>{s.label}</span>
                          <span className={`text-[9px] font-semibold uppercase tracking-widest ${s.accent} opacity-60`}>Practice Mode</span>
                        </div>
                        {bestScore !== null && bestScore !== undefined
                          ? <ScoreRing pct={bestScore} />
                          : <div className="w-11 h-11 rounded-2xl bg-white/4 border border-white/8 flex items-center justify-center text-xl">{s.icon}</div>}
                      </div>
                      <h3 className="font-bold text-sm leading-snug mb-1 text-white">{s.title}</h3>
                      <p className="text-gray-600 text-xs leading-4 mb-4 line-clamp-2">{s.desc}</p>
                      <div className="flex items-center gap-2 mb-4">
                        <span className={`text-xs font-bold ${s.accent}`}>{s.count} sawaal</span>
                        <span className="w-1 h-1 rounded-full bg-gray-700" />
                        <span className="text-gray-600 text-xs">{s.topics} topics</span>
                      </div>
                      <Link href={s.href}
                        className={`group/btn flex items-center justify-center gap-2 w-full bg-gradient-to-r ${s.btn} hover:brightness-110 active:scale-[0.98] text-white font-black text-sm py-3 rounded-2xl transition-all duration-200 shadow-lg`}>
                        Practice Karein
                        <svg className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>

        {/* ── Stats + Bookmarks ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 sm:mb-8 animate-fade-up" style={{ animationDelay: "0.24s" }}>

          <TiltCard>
            <Link href="/stats" className="group relative block bg-gradient-to-br from-[#0c0c24] to-[#08081a] backdrop-blur-xl border border-indigo-500/20 hover:border-indigo-400/50 rounded-3xl overflow-hidden h-full transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-indigo-500/3 to-transparent animate-sweep pointer-events-none" />
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-600/12 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-6 -right-3 text-[80px] leading-none text-indigo-400/6 pointer-events-none select-none font-black">📊</div>
              <div className="relative p-5 z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/15 border border-indigo-500/25 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-black text-sm">Stats Dashboard</p>
                    <p className="text-indigo-400/55 text-xs">Apni performance track karein</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { val: "6",   label: "Sections",  color: "text-indigo-400" },
                    { val: "353+",label: "Sawaalat",  color: "text-violet-400" },
                    { val: streak > 0 ? `${streak}🔥` : "—", label: "Streak", color: streak > 0 ? "text-orange-400" : "text-gray-600" },
                  ].map(t => (
                    <div key={t.label} className="bg-white/[0.03] border border-white/6 rounded-xl p-2.5 text-center">
                      <p className={`${t.color} font-black text-base leading-none mb-1`}>{t.val}</p>
                      <p className="text-gray-600 text-[9px]">{t.label}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between bg-indigo-500/6 border border-indigo-500/15 rounded-2xl px-3.5 py-2.5 group-hover:border-indigo-500/35 transition-colors">
                  <p className="text-gray-500 text-xs">Score history · Best scores · Attempts</p>
                  <svg className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </Link>
          </TiltCard>

          <TiltCard>
            <Link href="/bookmarks" className="group relative block bg-gradient-to-br from-[#1a1508] to-[#120f06] backdrop-blur-xl border border-yellow-500/20 hover:border-yellow-400/50 rounded-3xl overflow-hidden h-full transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/8">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-600/8 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-6 -right-3 text-[80px] leading-none text-yellow-400/6 pointer-events-none select-none font-black">🔖</div>
              <div className="relative p-5 z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-yellow-500/12 border border-yellow-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-black text-sm">Saved Bookmarks</p>
                    <p className="text-yellow-400/55 text-xs">Save kiye gaye sawal</p>
                  </div>
                </div>
                <p className="text-gray-600 text-xs mb-5 leading-5">Quiz ya practice mein kisi bhi sawal ko bookmark karein — baad mein revise karein, accordion view mein.</p>
                <div className="flex items-center justify-between bg-yellow-500/5 border border-yellow-500/15 rounded-2xl px-3.5 py-2.5 group-hover:border-yellow-500/35 transition-colors">
                  <p className="text-gray-500 text-xs">Bookmarked sawaal dekhein</p>
                  <svg className="w-4 h-4 text-yellow-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </Link>
          </TiltCard>
        </div>

        {/* ── Footer ── */}
        <div className="mt-4 pt-8 border-t border-white/[0.05] animate-fade-up" style={{ animationDelay: "0.28s" }}>
          <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-xs mx-auto mb-8">
            {[
              { href: "https://www.youtube.com/@CodewithMohsin1",          label: "YouTube",  hbg: "hover:bg-red-500/10",  hb: "hover:border-red-500/30",  ic: "text-red-400",  ibg: "bg-red-500/10",  type: "yt" },
              { href: "https://www.facebook.com/mohsin.raza.166438",       label: "Facebook", hbg: "hover:bg-blue-500/10", hb: "hover:border-blue-500/30", ic: "text-blue-400", ibg: "bg-blue-500/10", type: "fb" },
              { href: "https://www.linkedin.com/in/mohsin-raza-a514392b6/",label: "LinkedIn", hbg: "hover:bg-sky-500/10",  hb: "hover:border-sky-500/30",  ic: "text-sky-400",  ibg: "bg-sky-500/10",  type: "li" },
              { href: "https://technova-zeta.vercel.app/",                 label: "Technova", hbg: "hover:bg-cyan-500/10", hb: "hover:border-cyan-500/30", ic: "text-cyan-400", ibg: "bg-cyan-500/10", type: "web" },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className={`group flex flex-col items-center gap-2 bg-white/[0.02] ${s.hbg} border border-white/8 ${s.hb} rounded-2xl px-2 py-4 transition-all duration-200 hover:-translate-y-0.5`}>
                <div className={`w-8 h-8 ${s.ibg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  {s.type === "yt"  && <svg className={`w-4 h-4 fill-current ${s.ic}`} viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>}
                  {s.type === "fb"  && <svg className={`w-4 h-4 fill-current ${s.ic}`} viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>}
                  {s.type === "li"  && <svg className={`w-4 h-4 fill-current ${s.ic}`} viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>}
                  {s.type === "web" && <svg className={`w-4 h-4 ${s.ic}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>}
                </div>
                <span className="text-gray-600 text-[10px] font-medium group-hover:text-gray-400 transition-colors">{s.label}</span>
              </a>
            ))}
          </div>

          {/* Creator card */}
          <div className="relative bg-gradient-to-r from-white/[0.02] via-white/[0.04] to-white/[0.02] backdrop-blur-sm border border-white/8 rounded-3xl p-5 max-w-sm mx-auto overflow-hidden">
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent" />
            <div className="flex items-center gap-4">
              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-transparent shadow-2xl"
                  style={{ background: "linear-gradient(#030309, #030309) padding-box, linear-gradient(135deg, #06b6d4, #7c3aed, #ec4899) border-box" }}>
                  <img src="/mohsin.png" alt="Mohsin Raza" className="w-full h-full object-cover"
                    style={{ objectPosition: "50% 8%", transform: "scale(3)", transformOrigin: "50% 8%" }} />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-[#030309] shadow-lg shadow-green-400/50" />
              </div>
              <div>
                <p className="text-white font-black text-base">Mohsin Raza</p>
                <p className="bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 bg-clip-text text-transparent text-xs font-bold mt-0.5">✦ Code with Mohsin</p>
                <p className="text-gray-600 text-[10px] mt-1.5">AI · Coding · Tech — Urdu mein</p>
              </div>
            </div>
          </div>

          <p className="text-center text-gray-700 text-[10px] mt-5 mb-2">Designed &amp; Created by Mohsin Raza</p>
        </div>

      </div>
    </main>
  );
}
