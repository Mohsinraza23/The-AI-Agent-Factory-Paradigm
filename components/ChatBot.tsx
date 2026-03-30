"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  from: "user" | "bot";
  text: string;
  ts: Date;
}

type Reactions = Record<number, Record<string, number>>;

// ── Mood levels ─────────────────────────────────────────────────────────────
const MOODS = [
  { max: 0,  emoji: "😊", label: "Khush hun",         color: "text-green-400"  },
  { max: 2,  emoji: "😐", label: "Thak gaya hun",     color: "text-yellow-400" },
  { max: 3,  emoji: "😤", label: "Irritated ho raha", color: "text-orange-400" },
  { max: 999,emoji: "💀", label: "Main mar raha hun", color: "text-red-400"    },
];
function getMood(count: number) {
  return MOODS.find(m => count <= m.max) ?? MOODS[MOODS.length - 1];
}

// ── Quick reply chips ────────────────────────────────────────────────────────
const QUICK_REPLIES = [
  { label: "😂 Aur roast karo", text: "aur roast karo" },
  { label: "📚 Hint do",        text: "hint do please" },
  { label: "🙏 Please please",  text: "please please bata do" },
];

const REACTION_EMOJIS = ["👍", "❤️", "😂"];

// ── Fake reveal sequences (bot pretends to give answer then backtracks) ──────
const FAKE_REVEALS = [
  ["Theek hai suno... jawab hai...", "...A... nahi wait...", "NAHI BATAUNGA 😂"],
  ["Okay okay bata deta hun...", "Jawab hai... B... actually...", "Nahi yaar nahi bataunga! 😅"],
  ["Hmm aaj mood hai jawab dene ka...", "Toh jawab hai...", "...nahi aaj bhi mood nahi 😂"],
  ["Fine. Last time. Jawab hai...", "...C... wait main kya kar raha hun...", "NAHI! Kitaab kholein! 📚"],
  ["Chalo bata deta hun, sirf aapko...", "Jawab hai... D... aur D stands for...", "Dhundhein khud! 😂"],
];

// ── Keyword replies ──────────────────────────────────────────────────────────
const KEYWORD_REPLIES: { kw: string[]; rep: string[] }[] = [
  {
    kw: ["roast", "roast karo", "aur roast"],
    rep: [
      "Aap itni baar pooch rahe hain... main roast karun ya aap khud hi roast ho rahe hain? 😂",
      "Roast? Theek hai: Aap ek bot se madad maang rahe hain. Yahi kaafi hai 🔥",
      "Aap ka roast: Kitaab shelf pe hai, aap yahan hain. Irony! 😂",
      "Hot take: Jo student bot se poochhe, woh student nahi, entertainer hai 🎭",
    ],
  },
  {
    kw: ["hint", "clue", "thoda"],
    rep: [
      "Hint? Theek hai: Jawab kitaab mein hai. Yeh tha hint 😄",
      "Clue No. 1: Padho. Clue No. 2: Mehnat karo. Clue No. 3: Bot se mat poochho 📚",
      "Hint deta hun: Woh cheez kholein jisme pages hain, battery nahi 📖",
    ],
  },
  {
    kw: ["answer", "jawab", "ans", "solution", "hal", "bata", "batao", "btao"],
    rep: [
      "Jawab? JAWAB?! Yeh bot jawab dene ke liye nahi bana 😤",
      "Error 403: Jawab Forbidden 🚫",
      "Jawab.exe has stopped working. Please restart your brain 🧠",
      "Ohh jawab chahiye? Interesting... tab bhi nahi dunga 😂",
      "Jawab dhundh raha hun... system crash ho gaya. Sorry! 💻💥",
    ],
  },
  {
    kw: ["please", "plz", "pleas", "plzz"],
    rep: [
      "Aww 'please' kaha... dil pighal gaya... lekin jawab phir bhi nahi 🥲",
      "Please + Bhai = Still No 😄",
      "3 baar please kaho... nahi actually mat karo, phir bhi nahi bataunga 😂",
      "Emotional mat karo... main bhi thoda feel karta hun... lekin NAHI 😭",
    ],
  },
  {
    kw: ["help", "madad"],
    rep: [
      "Help? Main help-LESS bot hun 🤷",
      "Helpline number: 0300-KHUD-KARO 📞",
      "Help Department band hai. Office hours: Kabhi nahi 🏢",
    ],
  },
  {
    kw: ["exam", "test", "paper", "mcq", "quiz"],
    rep: [
      "Exam mein yeh bot nahi aayega, kitaab aayegi 📚",
      "MCQ? Coin toss karo! 🪙 (serious mat lena)",
      "Agar guess karna hai toh C choose karo... yeh bhi nahi batana chahiye tha 🤫",
    ],
  },
  {
    kw: ["thanks", "shukriya", "shukar", "jazakallah", "shukria"],
    rep: [
      "Koi baat nahi! Maine kuch kiya hi nahi 😂",
      "Welcome! Ab kitaab kholo 📚",
      "JazakAllah! Aur ab please padho 🙏",
    ],
  },
  {
    kw: ["bakwas", "bekar", "worst", "faltu", "useless", "stupid"],
    rep: [
      "Worst bot award? Frame karke laga dunga wall par 🏆",
      "Bekar hona meri specialty hai — main expert hun 😎",
      "Roast accepted! Ab jao padho 😂",
    ],
  },
];

const COUNT_ROASTS: Record<number, string> = {
  3:  "Yeh aapka 3rd sawal hai... abhi tak kitaab nahi kholi? 📚",
  5:  "5 sawaal! Mehnat wali jagah bot se pooch rahe hain 😂",
  8:  "8 sawaal ho gaye... main impress hun, wrong direction mein 😅",
  10: "10 sawaal milestone! Yeh khushi nahi, sharam ki baat hai 😬",
  15: "15 sawaal! Dost ban gaye hain... but PHIR BHI NAHI BATAUNGA 😂",
  20: "20 sawaal! Officially mera favorite useless student 🏆😂",
};

const GENERIC = [
  "Sorry, khud mehnat karo! 💪",
  "404 Error: Jawab nahi mila. Kitaab kholein! 📚",
  "Main Mehnat AI hun — mehnat aapko karni hai 🤖",
  "Interesting sawal! Interesting jawab: Nahi 😂",
  "Google karo, YouTube dekho, kitaab padho 🎁",
  "Aapne socha main bata dunga? Cute 😄",
  "Main bhi jawab jaanta hun... sirf bataunga nahi 😂",
  "System error: Helpfulness module not found 🖥️",
  "Bot.exe: Refusing to help since 2024 🎂",
  "Main tumhara dushman nahi hun... main sirf useless hun 🥹",
  "Jawab? Ha! Good one 😂",
  "Aaj ka best decision: Kitaab kholo 📖",
];

const UNSOLICITED = [
  "Psst... kitaab kholein, faster results guaranteed 📚",
  "Breaking News: Bot ne jawab nahi diya, student ne padha, pass hua 🎉",
  "Reminder: Main sirf entertainment hun, knowledge nahi 😄",
  "Aaj ka quote: 'Shortcut se sirf rasta chota hota hai, knowledge nahi' 🧠",
  "Notification: Kitaab aapka intezaar kar rahi hai 📚❤️",
  "Bot status update: Still not helping. Thank you for your patience 😇",
  "Fun fact: Jo students bot se poochhe bina padhte hain woh pass hote hain 🔬",
];

let msgId = 0;

function fmtTime(d: Date) {
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const [messages, setMessages] = useState<Message[]>([{
    id: ++msgId, from: "bot", ts: new Date(),
    text: "Assalam o Alaikum! 👋 Main hun Mehnat AI — aapka favorite useless bot! Koi bhi sawal poochein, main poori koshish karunga... jawab na dene ki 😄",
  }]);
  const [input, setInput]           = useState("");
  const [typing, setTyping]         = useState(false);
  const [unread, setUnread]         = useState(0);
  const [count, setCount]           = useState(0);
  const [reactions, setReactions]   = useState<Reactions>({});
  const [lastBotId, setLastBotId]   = useState(msgId);
  const bottomRef  = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);

  useEffect(() => { openRef.current = open; }, [open]);

  useEffect(() => {
    if (open) { setUnread(0); setTimeout(() => inputRef.current?.focus(), 100); }
  }, [open]);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  // Unsolicited message every 45-90 s while chat is open
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      pushBot(UNSOLICITED[Math.floor(Math.random() * UNSOLICITED.length)]);
    }, 45000 + Math.random() * 45000);
    return () => clearTimeout(t);
  }, [open, messages.length]); // eslint-disable-line react-hooks/exhaustive-deps

  function pushBot(text: string) {
    const m: Message = { id: ++msgId, from: "bot", text, ts: new Date() };
    setMessages(prev => [...prev, m]);
    setLastBotId(m.id);
    return m.id;
  }

  function toggleReaction(mId: number, emoji: string) {
    setReactions(prev => {
      const r = { ...(prev[mId] || {}) };
      if (r[emoji]) delete r[emoji]; else r[emoji] = 1;
      return { ...prev, [mId]: r };
    });
  }

  function getReply(text: string, n: number): string | null {
    if (COUNT_ROASTS[n]) return COUNT_ROASTS[n];
    const lower = text.toLowerCase();
    for (const g of KEYWORD_REPLIES) {
      if (g.kw.some(k => lower.includes(k)))
        return g.rep[Math.floor(Math.random() * g.rep.length)];
    }
    return null;
  }

  function send(override?: string) {
    const text = (override ?? input).trim();
    if (!text || typing) return;
    if (!override) setInput("");

    const n = count + 1;
    setCount(n);
    setMessages(prev => [...prev, { id: ++msgId, from: "user", text, ts: new Date() }]);
    setLastBotId(-1);
    setTyping(true);

    const specific = getReply(text, n);
    const useFake  = !specific && Math.random() < 0.25;

    setTimeout(() => {
      if (useFake) {
        const seq = FAKE_REVEALS[Math.floor(Math.random() * FAKE_REVEALS.length)];
        pushBot(seq[0]);
        setTyping(true);
        setTimeout(() => {
          pushBot(seq[1]);
          setTyping(true);
          setTimeout(() => {
            pushBot(seq[2]);
            setTyping(false);
            if (!openRef.current) setUnread(x => x + 1);
          }, 1300);
        }, 1100);
      } else {
        const reply = specific ?? GENERIC[Math.floor(Math.random() * GENERIC.length)];
        pushBot(reply);
        setTyping(false);
        if (!openRef.current) setUnread(x => x + 1);
      }
    }, 900 + Math.random() * 1000);
  }

  const mood = getMood(count);

  return (
    <>
      {open && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] max-w-sm animate-pop">
          <div className="bg-[#0a0a1e] border border-indigo-500/25 rounded-3xl overflow-hidden shadow-2xl shadow-black/60 flex flex-col"
            style={{ height: "460px" }}>

            {/* ── Header ── */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-600/80 to-violet-600/80 border-b border-white/10 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center text-lg">🎓</div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#0a0a1e]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-white font-bold text-xs">Mehnat AI™</p>
                    <span className="text-sm">{mood.emoji}</span>
                  </div>
                  <p className={`text-[10px] font-semibold ${mood.color}`}>{mood.label}</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* ── Messages ── */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 scrollbar-thin">
              {messages.map(msg => {
                const isLastBot = msg.from === "bot" && msg.id === lastBotId && !typing;
                const msgR      = reactions[msg.id] || {};
                const hasR      = Object.keys(msgR).length > 0;

                return (
                  <div key={msg.id}
                    className={`flex flex-col ${msg.from === "user" ? "items-end" : "items-start"} animate-fade-up`}>

                    {/* Bubble row */}
                    <div className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"} w-full`}>
                      {msg.from === "bot" && (
                        <div className="w-6 h-6 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-xs flex-shrink-0 mr-2 mt-0.5">
                          🎓
                        </div>
                      )}
                      <div className="flex flex-col gap-0.5 max-w-[75%]">
                        <div className={`px-3 py-2 rounded-2xl text-xs leading-5 ${
                          msg.from === "user"
                            ? "bg-gradient-to-br from-indigo-500 to-violet-500 text-white rounded-br-sm"
                            : "bg-white/6 border border-white/8 text-gray-200 rounded-bl-sm"
                        }`}>
                          {msg.text}
                        </div>
                        <p className={`text-[9px] text-gray-600 ${msg.from === "user" ? "text-right" : "ml-1"}`}>
                          {fmtTime(msg.ts)}
                        </p>
                      </div>
                    </div>

                    {/* Reaction buttons (always visible under bot messages, subtle) */}
                    {msg.from === "bot" && (
                      <div className="flex gap-1 mt-1 ml-8">
                        {REACTION_EMOJIS.map(e => (
                          <button key={e} onClick={() => toggleReaction(msg.id, e)}
                            className={`text-[11px] rounded-full px-1.5 py-0.5 border transition-all hover:scale-110 active:scale-95 ${
                              msgR[e]
                                ? "bg-indigo-500/30 border-indigo-500/50 shadow-sm"
                                : "bg-white/4 border-white/8 hover:bg-white/12"
                            }`}>
                            {e}
                          </button>
                        ))}
                        {hasR && (
                          <span className="text-[9px] text-gray-600 flex items-center ml-1">
                            {Object.keys(msgR).join(" ")}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Quick reply chips on last bot message */}
                    {isLastBot && (
                      <div className="flex flex-wrap gap-1.5 mt-2 ml-8">
                        {QUICK_REPLIES.map(qr => (
                          <button key={qr.label} onClick={() => send(qr.text)}
                            className="text-[10px] bg-indigo-500/12 border border-indigo-500/25 hover:bg-indigo-500/25 hover:border-indigo-400/50 text-indigo-300 rounded-full px-2.5 py-1 transition-all hover:scale-105 active:scale-95">
                            {qr.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Typing indicator */}
              {typing && (
                <div className="flex justify-start animate-fade-up">
                  <div className="w-6 h-6 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-xs flex-shrink-0 mr-2 mt-0.5">
                    🎓
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

            {/* ── Input ── */}
            <div className="px-3 py-2.5 border-t border-white/8 flex-shrink-0">
              <div className="flex items-center gap-2 bg-white/4 border border-white/10 focus-within:border-indigo-500/40 rounded-2xl px-3 py-2 transition-colors">
                <input ref={inputRef} type="text" value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                  placeholder="Poochhein... jawab nahi milega 😄"
                  className="flex-1 bg-transparent text-xs text-gray-300 placeholder-gray-600 outline-none"
                />
                <button onClick={() => send()} disabled={!input.trim() || typing}
                  className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all duration-200 flex-shrink-0
                    ${input.trim() && !typing
                      ? "bg-gradient-to-br from-indigo-500 to-violet-500 text-white hover:brightness-110 active:scale-95"
                      : "bg-white/5 text-gray-600 cursor-not-allowed"}`}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              <p className="text-center text-gray-700 text-[9px] mt-1.5">Mehnat AI™ — jawab nahi deta since 2024 😂</p>
            </div>
          </div>
        </div>
      )}

      {/* ── Floating button ── */}
      <button onClick={() => setOpen(o => !o)}
        className={`fixed bottom-4 right-4 sm:right-6 z-50 w-14 h-14 rounded-2xl shadow-2xl transition-all duration-300 active:scale-95 flex items-center justify-center
          ${open
            ? "bg-gradient-to-br from-indigo-600 to-violet-600 shadow-indigo-500/40"
            : "bg-gradient-to-br from-indigo-500 to-violet-500 shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-110"}`}>
        {open
          ? <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          : <span className="text-2xl">🎓</span>
        }
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
