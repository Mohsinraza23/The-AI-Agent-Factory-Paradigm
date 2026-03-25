"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/data/questions";

const OPTION_LABELS = ["A", "B", "C", "D"];

export default function QuizPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );

  useEffect(() => {
    localStorage.removeItem("quizAnswers");
  }, []);

  const current = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const progress = ((currentIndex + 1) / questions.length) * 100;

  function handleSelect(index: number) {
    setSelectedOption(index);
  }

  function handleNext() {
    if (selectedOption === null) return;
    const updated = [...answers];
    updated[currentIndex] = selectedOption;
    setAnswers(updated);
    if (isLast) {
      localStorage.setItem("quizAnswers", JSON.stringify(updated));
      router.push("/result");
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    }
  }

  return (
    <main className="min-h-screen bg-[#070f0a] flex flex-col items-center justify-center px-4 py-8">
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-72 h-72 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-xl">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-300 text-xs font-semibold uppercase tracking-widest">
              AI Agent Factory Quiz
            </span>
          </div>
          <span className="text-gray-500 text-xs font-medium">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/5 rounded-full h-1.5 mb-6 overflow-hidden">
          <div
            className="bg-gradient-to-r from-green-500 to-emerald-400 rounded-full h-1.5 transition-all duration-700 ease-out shadow-sm shadow-green-500/50"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question Card */}
        <div className="bg-[#0e1f14] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">

          {/* Question Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                Q{currentIndex + 1}
              </span>
              <span className="text-green-100 text-xs">{Math.round(progress)}% complete</span>
            </div>
            <h2 className="text-white text-base sm:text-lg font-semibold leading-7">
              {current.question}
            </h2>
          </div>

          {/* Options */}
          <div className="p-5 space-y-3">
            {current.options.map((option, i) => {
              const isSelected = selectedOption === i;
              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer group
                    ${isSelected
                      ? "border-green-500 bg-green-500/10 shadow-md shadow-green-500/20"
                      : "border-white/10 bg-white/5 hover:border-green-500/40 hover:bg-green-500/5"
                    }`}
                >
                  <span className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all duration-200
                    ${isSelected
                      ? "bg-green-500 text-white shadow-lg shadow-green-500/40"
                      : "bg-white/10 text-gray-400 border border-white/10 group-hover:border-green-500/40 group-hover:text-green-400"
                    }`}>
                    {OPTION_LABELS[i]}
                  </span>
                  <span className={`text-sm sm:text-base font-medium transition-colors duration-200
                    ${isSelected ? "text-green-300" : "text-gray-300 group-hover:text-white"}`}>
                    {option}
                  </span>
                  {isSelected && (
                    <span className="ml-auto flex-shrink-0 text-green-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <div className="px-5 pb-5">
            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className={`w-full py-4 rounded-2xl font-bold text-base transition-all duration-200 flex items-center justify-center gap-2
                ${selectedOption !== null
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-[1.01] cursor-pointer"
                  : "bg-white/5 text-gray-600 cursor-not-allowed border border-white/5"
                }`}
            >
              {isLast ? "Nateeja Dekhein" : "Agla Sawal"}
              {selectedOption !== null && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-5 px-1">
          <p className="text-gray-600 text-xs">
            by <span className="text-green-500 font-bold">✦ Mohsin Raza</span>
          </p>
          <a
            href="https://www.youtube.com/@CodewithMohsin1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-gray-600 hover:text-red-400 text-xs transition-colors duration-200"
          >
            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Code with Mohsin
          </a>
        </div>
      </div>
    </main>
  );
}
