"use client";

import Link from "next/link";
import { chapters } from "@/data/index";

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

        {/* Hero */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-5">
            <span className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-300 text-xs font-semibold px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Exam Preparation Quiz
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-3">
            <span className="text-white">Code with </span>
            <span className="bg-gradient-to-r from-green-400 via-emerald-300 to-lime-400 bg-clip-text text-transparent">
              Mohsin
            </span>
          </h1>
          <p className="text-gray-400 text-base max-w-lg mx-auto">
            Chapter-wise MCQ quizzes — apni knowledge test karein. Har sawal par 30 second milte hain.
          </p>
        </div>

        {/* Chapter Cards */}
        <div className="mb-10">
          <h2 className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-5 text-center">
            Chapters
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {chapters.map((chapter) => {
              const isAvailable = chapter.questions.length > 0;
              return (
                <div
                  key={chapter.id}
                  className={`group relative bg-[#0e1f14] border rounded-3xl overflow-hidden transition-all duration-300
                    ${isAvailable
                      ? "border-white/10 hover:border-green-500/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-500/10"
                      : "border-white/5 opacity-60"
                    }`}
                >
                  {/* Top accent line */}
                  {isAvailable && (
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}

                  <div className="p-6">
                    {/* Chapter badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full
                        ${isAvailable
                          ? "bg-green-500/15 text-green-400 border border-green-500/30"
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
                        <span className="text-xs text-gray-500">
                          {chapter.topics} Topics
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className={`font-bold text-lg leading-snug mb-2 ${isAvailable ? "text-white" : "text-gray-500"}`}>
                      {chapter.title}
                    </h3>
                    <p className="text-gray-500 text-xs leading-5 mb-5 line-clamp-2">
                      {chapter.description}
                    </p>

                    {/* Stats row */}
                    {isAvailable && (
                      <div className="flex items-center gap-4 mb-5">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {chapter.questions.length} Questions
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <svg className="w-3.5 h-3.5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          30s / sawal
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          MCQ
                        </div>
                      </div>
                    )}

                    {/* CTA */}
                    {isAvailable ? (
                      <Link
                        href={`/quiz/${chapter.id}`}
                        className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold text-sm py-3 rounded-2xl transition-all duration-200 shadow-lg shadow-green-500/20 group-hover:shadow-green-500/35"
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
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-white/5" />

        {/* Footer */}
        <div className="flex flex-col items-center gap-3">
          {/* Profile photo + name */}
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-green-500/40 shadow-lg shadow-green-500/20">
                <img
                  src="/mohsin.png"
                  alt="Mohsin Raza"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center 8%", transform: "scale(1.9)", transformOrigin: "center 18%" }}
                />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-[#070f0a]" />
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-sm leading-tight">Mohsin Raza</p>
              <p className="text-green-400 text-xs">✦ Code with Mohsin</p>
            </div>
          </div>
          <p className="text-gray-600 text-xs">Designed &amp; Created by Mohsin Raza</p>
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
