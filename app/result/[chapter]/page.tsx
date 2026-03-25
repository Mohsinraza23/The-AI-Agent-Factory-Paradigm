"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getChapter } from "@/data/index";
import Link from "next/link";

const OPTION_LABELS = ["A", "B", "C", "D"];

export default function ResultPage() {
  const router = useRouter();
  const params = useParams();
  const chapterId = params.chapter as string;

  const chapter = getChapter(chapterId);
  const [answers, setAnswers] = useState<(number | null)[] | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(`quizAnswers_chapter${chapterId}`);
    if (!stored) {
      router.push("/");
      return;
    }
    setAnswers(JSON.parse(stored));
  }, [chapterId, router]);

  if (!answers || !chapter) return null;

  const score = answers.reduce((acc: number, ans, i) => {
    return ans === chapter.questions[i].correct ? acc + 1 : acc;
  }, 0);

  const percentage = Math.round((score / chapter.questions.length) * 100);
  const passed = percentage >= 50;

  const grade =
    percentage >= 90 ? { label: "A+", color: "text-green-400" } :
    percentage >= 80 ? { label: "A", color: "text-green-400" } :
    percentage >= 70 ? { label: "B", color: "text-emerald-400" } :
    percentage >= 60 ? { label: "C", color: "text-yellow-400" } :
    percentage >= 50 ? { label: "D", color: "text-orange-400" } :
    { label: "F", color: "text-red-400" };

  return (
    <main className="min-h-screen bg-[#070f0a] px-4 py-10">
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-72 h-72 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-32 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-300 text-xs font-semibold uppercase tracking-widest">
              Quiz Complete
            </span>
          </div>
          <a
            href="https://www.youtube.com/@CodewithMohsin1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-gray-600 hover:text-red-400 text-xs transition-colors duration-200"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Code with Mohsin
          </a>
        </div>

        {/* Score Card */}
        <div className="bg-[#0e1f14] border border-white/10 rounded-3xl overflow-hidden shadow-2xl mb-6">
          {/* Top banner */}
          <div className={`px-6 py-4 flex items-center justify-between ${passed ? "bg-gradient-to-r from-green-600 to-emerald-600" : "bg-gradient-to-r from-red-700 to-rose-600"}`}>
            <div>
              <p className="text-white/70 text-xs font-medium uppercase tracking-widest mb-0.5">
                {passed ? "Mubarak Ho!" : "Mehnat Karein!"}
              </p>
              <p className="text-white font-bold text-lg">
                {passed ? "Aapne Quiz Pass Kar Li" : "Dobara Koshish Karein"}
              </p>
            </div>
            <span className="text-5xl">{passed ? "🏆" : "📚"}</span>
          </div>

          <div className="p-6">
            {/* Main Score */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Total Score</p>
                <p className="text-5xl font-black text-white">
                  {score}
                  <span className="text-2xl text-gray-500 font-semibold">/{chapter.questions.length}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Grade</p>
                <p className={`text-5xl font-black ${grade.color}`}>{grade.label}</p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-white/5 rounded-full h-3 mb-4 overflow-hidden">
              <div
                className={`h-3 rounded-full transition-all duration-1000 ${passed ? "bg-gradient-to-r from-green-500 to-emerald-400" : "bg-gradient-to-r from-red-500 to-rose-400"}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-right text-xs text-gray-500 mb-6">{percentage}% Correct</p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/5 hover:bg-green-500/10 border border-white/10 hover:border-green-500/30 rounded-2xl p-4 text-center transition-all duration-200 cursor-default">
                <p className="text-2xl font-black text-green-400">{score}</p>
                <p className="text-gray-500 text-xs mt-1">Sahi ✓</p>
              </div>
              <div className="bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 rounded-2xl p-4 text-center transition-all duration-200 cursor-default">
                <p className="text-2xl font-black text-red-400">{chapter.questions.length - score}</p>
                <p className="text-gray-500 text-xs mt-1">Galat ✗</p>
              </div>
              <div className="bg-white/5 hover:bg-blue-500/10 border border-white/10 hover:border-blue-500/30 rounded-2xl p-4 text-center transition-all duration-200 cursor-default">
                <p className="text-2xl font-black text-blue-400">{percentage}%</p>
                <p className="text-gray-500 text-xs mt-1">Score</p>
              </div>
            </div>
          </div>
        </div>

        {/* YouTube Subscribe CTA */}
        <a
          href="https://www.youtube.com/@CodewithMohsin1"
          target="_blank"
          rel="noopener noreferrer"
          className="group block mb-6"
        >
          <div className="relative bg-gradient-to-r from-red-600/20 via-red-500/15 to-red-600/20 hover:from-red-600/35 hover:via-red-500/25 hover:to-red-600/35 border border-red-500/30 hover:border-red-500/70 rounded-2xl px-5 py-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-red-500/15 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent" />
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-red-600/40">
                  <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white font-extrabold text-base leading-tight">Code with Mohsin</p>
                  <p className="text-gray-400 text-xs mt-0.5">AI • Coding • Tech — Urdu mein seekhein</p>
                  <p className="text-red-300 text-xs font-semibold mt-1">👉 Subscribe karein — free hai!</p>
                </div>
              </div>
              <div className="flex-shrink-0">
                <span className="block bg-red-600 group-hover:bg-red-500 text-white text-xs font-black px-5 py-2 rounded-full transition-colors duration-200 shadow-lg shadow-red-600/30 text-center">
                  Subscribe
                </span>
              </div>
            </div>
          </div>
        </a>

        {/* Review Section */}
        <h2 className="text-green-300 font-bold text-sm uppercase tracking-widest mb-4 px-1">
          Jawabat ka Jaiza
        </h2>

        <div className="space-y-3">
          {chapter.questions.map((q, i) => {
            const userAnswer = answers[i];
            const isCorrect = userAnswer === q.correct;

            return (
              <div key={q.id} className="bg-[#0e1f14] border border-white/10 rounded-2xl overflow-hidden group hover:border-white/20 transition-all duration-200">
                {/* Question header */}
                <div className={`px-4 py-3 flex items-start gap-3 ${isCorrect ? "bg-green-500/10 border-b border-green-500/20" : "bg-red-500/10 border-b border-red-500/20"}`}>
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${isCorrect ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                    {i + 1}
                  </span>
                  <span className="text-gray-200 text-sm font-medium flex-1 leading-5">{q.question}</span>
                  <span className={`flex-shrink-0 text-base ${isCorrect ? "text-green-400" : "text-red-400"}`}>
                    {isCorrect ? "✓" : "✗"}
                  </span>
                </div>

                {/* Options */}
                <div className="p-3 space-y-1.5">
                  {q.options.map((option, j) => {
                    const isCorrectOption = j === q.correct;
                    const isUserChoice = j === userAnswer;
                    const isWrongChoice = isUserChoice && !isCorrect;

                    let optStyle = "border-white/5 bg-transparent text-gray-500";
                    let labelStyle = "bg-white/5 text-gray-600";

                    if (isCorrectOption) {
                      optStyle = "border-green-500/40 bg-green-500/10 text-green-300";
                      labelStyle = "bg-green-500 text-white";
                    } else if (isWrongChoice) {
                      optStyle = "border-red-500/40 bg-red-500/10 text-red-300";
                      labelStyle = "bg-red-500 text-white";
                    }

                    return (
                      <div key={j} className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border ${optStyle}`}>
                        <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${labelStyle}`}>
                          {OPTION_LABELS[j]}
                        </span>
                        <span className="text-xs flex-1">{option}</span>
                        {isCorrectOption && (
                          <span className="text-green-500 text-xs font-semibold flex-shrink-0">Sahi</span>
                        )}
                        {isWrongChoice && !(userAnswer === null) && (
                          <span className="text-red-400 text-xs font-semibold flex-shrink-0">Aapka</span>
                        )}
                        {userAnswer === null && isCorrectOption && (
                          <span className="text-yellow-500 text-xs font-semibold flex-shrink-0">Skip</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            href={`/quiz/${chapterId}`}
            onClick={() => localStorage.removeItem(`quizAnswers_chapter${chapterId}`)}
            className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-green-500/40 text-white font-bold py-4 rounded-2xl text-center transition-all duration-200 hover:scale-[1.01] hover:text-green-300"
          >
            Dobara Khelein
          </Link>
          <Link
            href="/"
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold py-4 rounded-2xl text-center transition-all duration-200 shadow-lg shadow-green-500/20 hover:shadow-green-500/40 hover:scale-[1.01]"
          >
            Chapters Dekhein
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-8 pb-4 text-center">
          <p className="text-gray-600 text-xs">
            Designed &amp; Created by{" "}
            <span className="text-green-400 font-bold tracking-wide">✦ Mohsin Raza</span>
          </p>
        </div>
      </div>
    </main>
  );
}
