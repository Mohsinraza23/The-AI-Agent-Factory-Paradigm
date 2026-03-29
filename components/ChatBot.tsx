"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  from: "user" | "bot";
  text: string;
}

const BOT_REPLIES = [
  "Sorry, main yeh nahi bata sakta. Khud mehnat karo! 💪",
  "Bhai/Behen, main ek helpful bot hun jo help nahi karta 😅",
  "Acha sawal hai... lekin jawab? Khud dhundein! 🔍",
  "404 Error: Jawab nahi mila. Kitaab kholein! 📚",
  "Main AI hun lekin is mamle mein main aapki madad nahi kar sakta 🤐",
  "Hmm... sochne wali baat hai. Mehnat karo, shortcut nahi! 🚫",
  "Aapka jawab: Practice + Mehnat = Success! 🎯",
  "Sorry bhai, yeh mere ikhtiyar mein nahi. Khud koshish karo! 😄",
  "Agar main bata dun toh seekhoge kaise? Khud karo! 🧠",
  "Mere paas jawab hai... lekin bataunga nahi! Haha 😂",
];

let msgIdCounter = 0;

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: ++msgIdCounter,
      from: "bot",
      text: "Assalam o Alaikum! Main aapka AI Assistant hun. Koi bhi sawal poochein, main poori koshish karunga... ya nahi bhi karunga 😄",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  function sendMessage() {
    const text = input.trim();
    if (!text) return;
    setInput("");

    const userMsg: Message = { id: ++msgIdCounter, from: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setTyping(true);

    const delay = 800 + Math.random() * 1000;
    setTimeout(() => {
      const reply = BOT_REPLIES[Math.floor(Math.random() * BOT_REPLIES.length)];
      setMessages(prev => [...prev, { id: ++msgIdCounter, from: "bot", text: reply }]);
      setTyping(false);
      if (!open) setUnread(n => n + 1);
    }, delay);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      {/* Chat window */}
      {open && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] max-w-sm animate-pop">
          <div className="bg-[#0a0a1e] border border-indigo-500/25 rounded-3xl overflow-hidden shadow-2xl shadow-black/60 flex flex-col"
            style={{ height: "420px" }}>

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-600/80 to-violet-600/80 border-b border-white/10 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center text-base">
                    🤖
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#0a0a1e]" />
                </div>
                <div>
                  <p className="text-white font-bold text-xs leading-tight">AI Assistant</p>
                  <p className="text-indigo-200/60 text-[10px]">Online — lekin helpful nahi 😅</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 scrollbar-thin">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"} animate-fade-up`}>
                  {msg.from === "bot" && (
                    <div className="w-6 h-6 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-xs flex-shrink-0 mr-2 mt-0.5">
                      🤖
                    </div>
                  )}
                  <div className={`max-w-[75%] px-3 py-2 rounded-2xl text-xs leading-5 ${
                    msg.from === "user"
                      ? "bg-gradient-to-br from-indigo-500 to-violet-500 text-white rounded-br-sm"
                      : "bg-white/6 border border-white/8 text-gray-200 rounded-bl-sm"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <div className="flex justify-start animate-fade-up">
                  <div className="w-6 h-6 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-xs flex-shrink-0 mr-2 mt-0.5">
                    🤖
                  </div>
                  <div className="bg-white/6 border border-white/8 px-3 py-2.5 rounded-2xl rounded-bl-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-2.5 border-t border-white/8 flex-shrink-0">
              <div className="flex items-center gap-2 bg-white/4 border border-white/10 focus-within:border-indigo-500/40 rounded-2xl px-3 py-2 transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Koi bhi sawal poochein..."
                  className="flex-1 bg-transparent text-xs text-gray-300 placeholder-gray-600 outline-none"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || typing}
                  className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all duration-200 flex-shrink-0
                    ${input.trim() && !typing
                      ? "bg-gradient-to-br from-indigo-500 to-violet-500 text-white hover:brightness-110 active:scale-95"
                      : "bg-white/5 text-gray-600 cursor-not-allowed"}`}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              <p className="text-center text-gray-700 text-[9px] mt-1.5">Powered by Mehnat AI™ — beta version 😄</p>
            </div>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        className={`fixed bottom-4 right-4 sm:right-6 z-50 w-14 h-14 rounded-2xl shadow-2xl transition-all duration-300 active:scale-95 flex items-center justify-center
          ${open
            ? "bg-gradient-to-br from-indigo-600 to-violet-600 shadow-indigo-500/40 rotate-0"
            : "bg-gradient-to-br from-indigo-500 to-violet-500 shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-110"
          }`}
      >
        {open ? (
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <span className="text-2xl">🤖</span>
        )}
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center animate-bounce">
            {unread}
          </span>
        )}
        {!open && (
          <span className="absolute inset-0 rounded-2xl bg-indigo-400/30 animate-ping" style={{ animationDuration: "2s" }} />
        )}
      </button>
    </>
  );
}
