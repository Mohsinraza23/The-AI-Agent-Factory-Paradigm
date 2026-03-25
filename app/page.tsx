"use client";

import Link from "next/link";
import { questions } from "@/data/questions";

const topics = [
  { label: "LLM Constraints", icon: "🧠" },
  { label: "Agent Maturity Model", icon: "📈" },
  { label: "Five Powers & AI Stack", icon: "⚡" },
  { label: "AIFF Standards", icon: "📋" },
  { label: "Digital FTE Strategy", icon: "💼" },
  { label: "Orchestrator Role", icon: "🎯" },
  { label: "Nine Pillars of AIDD", icon: "🏛️" },
  { label: "Spec-Driven Development", icon: "📐" },
  { label: "Inflection Point", icon: "🚀" },
];

const steps = [
  { num: "01", title: "Sawal Parhen", desc: "Har sawal ko ghour se parhen" },
  { num: "02", title: "Jawab Chunein", desc: "4 options mein se sahi chunein" },
  { num: "03", title: "Nateeja Dekhein", desc: "Score aur detailed review payein" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070f0a] text-white overflow-x-hidden">
      {/* Gradient Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-green-500/15 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-green-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-10 sm:py-14">

        {/* YouTube Subscribe Banner */}
        <a
          href="https://www.youtube.com/@CodewithMohsin1"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between bg-gradient-to-r from-red-600/15 to-red-500/10 hover:from-red-600/25 hover:to-red-500/20 border border-red-500/25 hover:border-red-500/60 rounded-2xl px-5 py-4 mb-8 transition-all duration-300 hover:scale-[1.01] hover:shadow-lg hover:shadow-red-500/10"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-red-600/30">
              <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">Code with Mohsin</p>
              <p className="text-gray-400 text-xs mt-0.5">AI, Coding aur Tech — Urdu mein seekhein</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="hidden sm:inline-block bg-red-600 hover:bg-red-500 text-white text-xs font-bold px-4 py-1.5 rounded-full transition-colors duration-200">
              Subscribe
            </span>
            <svg className="w-4 h-4 text-gray-500 group-hover:text-red-400 group-hover:translate-x-0.5 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </a>

        {/* Chapter Badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-300 text-xs font-semibold px-4 py-2 rounded-full">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Chapter 12 — Exam Preparation Quiz
          </span>
        </div>

        {/* Hero Title */}
        <div className="text-center mb-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            <span className="text-white">The AI Agent</span>
            <br />
            <span className="bg-gradient-to-r from-green-400 via-emerald-300 to-lime-400 bg-clip-text text-transparent">
              Factory Paradigm
            </span>
          </h1>
          <p className="mt-4 text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
            Test your knowledge on LLMs, AI Agents, AIDD, and the future of software development
          </p>
        </div>

        {/* Stats Row */}
        <div className="flex justify-center gap-8 sm:gap-14 mt-8 mb-10">
          {[
            { value: questions.length, label: "Questions" },
            { value: "9", label: "Topics" },
            { value: "MCQ", label: "Format" },
          ].map((s) => (
            <div key={s.label} className="text-center group cursor-default">
              <p className="text-3xl sm:text-4xl font-black bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent group-hover:from-green-300 group-hover:to-emerald-500 transition-all duration-300">
                {s.value}
              </p>
              <p className="text-gray-500 text-xs sm:text-sm mt-1 font-medium uppercase tracking-widest">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Topics */}
        <div className="mb-10">
          <h2 className="text-center text-xs text-gray-500 uppercase tracking-widest font-semibold mb-4">
            Topics Covered
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {topics.map((t) => (
              <span
                key={t.label}
                className="inline-flex items-center gap-1.5 bg-white/5 hover:bg-green-500/15 border border-white/10 hover:border-green-500/40 text-gray-300 hover:text-green-300 text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full cursor-default transition-all duration-200 hover:scale-105"
              >
                <span>{t.icon}</span>
                {t.label}
              </span>
            ))}
          </div>
        </div>

        {/* How it Works */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {steps.map((s) => (
            <div
              key={s.num}
              className="group bg-white/5 hover:bg-green-500/10 border border-white/10 hover:border-green-500/40 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-500/10 cursor-default"
            >
              <p className="text-3xl font-black text-green-500/25 group-hover:text-green-400/60 transition-colors duration-300 mb-2">
                {s.num}
              </p>
              <p className="font-bold text-white text-sm mb-1">{s.title}</p>
              <p className="text-gray-400 text-xs leading-5">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-3">
          <Link
            href="/quiz"
            className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold text-lg px-10 py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-[1.03] active:scale-[0.98] w-full sm:w-auto sm:min-w-64"
          >
            <span>Quiz Shuru Karein</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <p className="text-gray-600 text-xs">Koi account ya registration ki zaroorat nahi</p>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-white/5" />

        {/* Footer */}
        <div className="text-center space-y-2">
          <p className="text-gray-500 text-sm">
            Designed &amp; Created by{" "}
            <span className="text-green-400 font-bold tracking-wide">✦ Mohsin Raza</span>
          </p>
          <a
            href="https://www.youtube.com/@CodewithMohsin1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-gray-600 hover:text-red-400 text-xs transition-colors duration-200 group"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span className="group-hover:underline">youtube.com/@CodewithMohsin1</span>
          </a>
        </div>
      </div>
    </main>
  );
}
