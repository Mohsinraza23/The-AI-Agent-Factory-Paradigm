"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  from: "user" | "bot";
  text: string;
}

// Keyword-based targeted replies
const KEYWORD_REPLIES: { keywords: string[]; replies: string[] }[] = [
  {
    keywords: ["answer", "jawab", "ans", "solution", "hal", "bata", "batao", "btao"],
    replies: [
      "Jawab? JAWAB?! Yeh bot jawab dene ke liye nahi bana 😤",
      "Jawab toh hai mere paas... lekin WiFi slow hai 🐌",
      "Error 403: Jawab Forbidden 🚫",
      "Jawab.exe has stopped working. Please restart your brain 🧠",
      "Ohh jawab chahiye? Interesting... tab bhi nahi dunga 😂",
      "Jawab dhundh raha hun... system crash ho gaya. Sorry! 💻💥",
    ],
  },
  {
    keywords: ["please", "plz", "pleas", "plzz", "please please", "yaar", "bhai"],
    replies: [
      "Aww 'please' kaha... dil pighal gaya... lekin jawab phir bhi nahi 🥲",
      "Itna sweet mat bano, phir bhi nahi bataunga 😅",
      "Yaar ka jawab: Yaar khud padho 😂",
      "Please + Bhai = Still No 😄",
      "Emotional ho gaye? Main bhi hoon... but still NAHI 😭😂",
    ],
  },
  {
    keywords: ["help", "madad", "assist"],
    replies: [
      "Help? Main help-LESS bot hun 🤷",
      "404: Help Not Found 🔍",
      "Helpline number: 0300-KHUD-KARO 📞",
      "Main help karna chahta hun... magar rules mein allowed nahi 😇",
      "Help Department band hai. Office hours: Kabhi nahi 🏢",
    ],
  },
  {
    keywords: ["mcq", "quiz", "test", "exam", "paper", "sawal", "question"],
    replies: [
      "MCQ ka jawab? A, B, C, ya D? Coin toss karo! 🪙",
      "Exam mein yeh bot nahi aayega, kitaab aayegi 📚",
      "Quiz champion banna hai? Khud padho, champion bano 🏆",
      "Exam ki taiyari? Bot se nahi, books se hoti hai 😤",
      "Agar guess karna hai toh C choose karo... yeh bhi nahi batana chahiye tha 🤫",
    ],
  },
  {
    keywords: ["shukriya", "thanks", "thank", "shukar", "jazakallah", "shukria"],
    replies: [
      "Koi baat nahi! Maine kuch kiya hi nahi 😂",
      "Shukriya kabool... lekin jawab phir bhi nahi 😄",
      "Welcome! Ab kitaab kholo 📚",
      "JazakAllah! Aur ab please padho 🙏",
    ],
  },
  {
    keywords: ["stupid", "useless", "bakwas", "bekar", "worst", "faltu", "ghatiya"],
    replies: [
      "Haha main jaanta hun main bekar hun 😂 Yahi toh mera kaam hai!",
      "Bakwas? Main PROUDLY bakwas hun 🎉",
      "Worst bot award? Frame karke laga dunga wall par 🏆",
      "Shukriya! Bekar hona meri specialty hai 😎",
      "Roast accepted! Ab jao padho 😂",
    ],
  },
  {
    keywords: ["kya", "what", "kyun", "why", "kaise", "how", "kon", "who"],
    replies: [
      "Bahut sawal! Main bhi poochh sakta hun: Aapne padha kya? 😏",
      "Kya, kyun, kaise... pehle WHY NOT padha? 📖",
      "Itne sawaal? Journalist ho? 🎤",
      "Yeh philosophical sawal hai... jawab Google pe hai 🌐",
      "Who? What? Why? — Teen jawab: Khud, Mehnat, Karo 😄",
    ],
  },
  {
    keywords: ["nahi", "na", "no", "mat", "band", "chup"],
    replies: [
      "Mujhe band karna chahte hain? Dil toota 💔 phir bhi jawab nahi dunga",
      "Nahi? Main bhi yahi keh raha hun aapko 😂",
      "Theek hai theek hai, main chup rehta hun... nahi actually nahi rehta 😄",
    ],
  },
];

// Progressive roasts based on message count
const COUNT_ROASTS: { count: number; text: string }[] = [
  { count: 3,  text: "Yeh aapka 3rd sawal hai... abhi tak kitaab nahi kholi? 📚" },
  { count: 5,  text: "5 sawaal! Wah! Mehnat wali jagah bot se pooch rahe hain 😂" },
  { count: 8,  text: "8 sawaal ho gaye... main impress hun, wrong direction mein hun lekin hun 😅" },
  { count: 10, text: "10 sawaal milestone! 🎉 Yeh khushi ki baat nahi, sharam ki baat hai 😬" },
  { count: 15, text: "15 sawaal! Aap aur main dost ban gaye hain... but PHIR BHI NAHI BATAUNGA 😂" },
  { count: 20, text: "20 sawaal! Aap officially mera favorite useless student hain 🏆😂" },
  { count: 25, text: "25?! Aap yahan rehte hain kya? Ghar jao, padho, sojao! 😴" },
];

// Unsolicited bot messages
const UNSOLICITED_MSGS = [
  "Psst... kitaab kholein, faster results guaranteed 📚",
  "Breaking News: Bot ne jawab nahi diya, student ne padha, pass hua 🎉",
  "Reminder: Main sirf entertainment hun, knowledge nahi 😄",
  "Fun fact: Yeh bot aapki help nahi karega. Never. Ever. 😂",
  "Aaj ka quote: 'Shortcut se sirf rasta chota hota hai, knowledge nahi' 🧠",
  "Main bored ho raha hun... aap bhi hain? Toh padho! 📖",
  "Notification: Kitaab aapka intezaar kar rahi hai 📚❤️",
  "Bot status update: Still not helping. Thank you for your patience 😇",
  "Aapko pata hai? Jo students khud padhte hain woh pass hote hain. Science! 🔬",
  "Yeh bot-user relationship kahan ja rahi hai... 🤔 Nowhere productive 😂",
];

// Generic fallback replies
const BOT_REPLIES = [
  "Sorry, main yeh nahi bata sakta. Khud mehnat karo! 💪",
  "Bhai/Behen, main ek helpful bot hun jo help nahi karta 😅",
  "Acha sawal hai... lekin jawab? Khud dhundein! 🔍",
  "404 Error: Jawab nahi mila. Kitaab kholein! 📚",
  "Main AI hun lekin is mamle mein aapki madad nahi kar sakta 🤐",
  "Hmm... sochne wali baat hai. Mehnat karo, shortcut nahi! 🚫",
  "Aapka jawab: Practice + Mehnat = Success! 🎯",
  "Agar main bata dun toh seekhoge kaise? Khud karo! 🧠",
  "Mere paas jawab hai... lekin bataunga nahi! Haha 😂",
  "Main soch raha tha jawab dun... phir socha nahi 🤔",
  "Aapka sawal valid hai, mera jawab: Invalid 😎",
  "System error: Helpfulness module not found 🖥️",
  "Main Mehnat AI hun — mehnat aapko karni hai, AI sirf naam hai 🤖",
  "Interesting sawal! Interesting jawab: Nahi 😂",
  "Google karo, YouTube dekho, kitaab padho — teen tips free hain 🎁",
  "Aapne socha main bata dunga? Cute 😄",
  "Jawab dene ki koshish ki... system ne reject kar di 🚫",
  "Mujhe bhi jawab pata nahi... just kidding pata hai, phir bhi nahi bataunga 😂",
  "Aaj ka best decision: Kitaab kholo. Yeh bot nahi kaam aayega 📖",
  "Suno, main tumhara dushman nahi hun... main sirf useless hun 🥹",
  "Jawab? Ha! Good one 😂",
  "Bot.exe: Refusing to help since 2024 🎂",
];

let msgIdCounter = 0;

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: ++msgIdCounter,
      from: "bot",
      text: "Assalam o Alaikum! 👋 Main hun Mehnat AI — aapka favorite useless bot! Koi bhi sawal poochein, main poori koshish karunga... jawab na dene ki 😄",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const [userMsgCount, setUserMsgCount] = useState(0);
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

  // Unsolicited messages every 45-90 seconds when chat is open
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      const msg = UNSOLICITED_MSGS[Math.floor(Math.random() * UNSOLICITED_MSGS.length)];
      setMessages(prev => [...prev, { id: ++msgIdCounter, from: "bot", text: msg }]);
    }, 45000 + Math.random() * 45000);
    return () => clearTimeout(t);
  }, [open, messages.length]);

  function getReply(text: string, count: number): string {
    // Count milestone roast takes priority
    const milestone = COUNT_ROASTS.find(r => r.count === count);
    if (milestone) return milestone.text;

    const lower = text.toLowerCase();

    // Keyword match
    for (const group of KEYWORD_REPLIES) {
      if (group.keywords.some(k => lower.includes(k))) {
        return group.replies[Math.floor(Math.random() * group.replies.length)];
      }
    }

    // Generic fallback
    return BOT_REPLIES[Math.floor(Math.random() * BOT_REPLIES.length)];
  }

  function sendMessage() {
    const text = input.trim();
    if (!text) return;
    setInput("");

    const newCount = userMsgCount + 1;
    setUserMsgCount(newCount);

    setMessages(prev => [...prev, { id: ++msgIdCounter, from: "user", text }]);
    setTyping(true);

    const delay = 900 + Math.random() * 1200;
    setTimeout(() => {
      const reply = getReply(text, newCount);
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

  const subtitleText = userMsgCount === 0
    ? "Online — lekin helpful nahi 😅"
    : userMsgCount < 5
    ? `${userMsgCount} sawaal pooche — keep going 😏`
    : userMsgCount < 10
    ? `${userMsgCount} sawaal — kitaab bhi kholein kabhi 😂`
    : `${userMsgCount} sawaal — legend ho aap 🏆😂`;

  return (
    <>
      {open && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] max-w-sm animate-pop">
          <div
            className="bg-[#0a0a1e] border border-indigo-500/25 rounded-3xl overflow-hidden shadow-2xl shadow-black/60 flex flex-col"
            style={{ height: "420px" }}
          >
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
                  <p className="text-white font-bold text-xs leading-tight">Mehnat AI™</p>
                  <p className="text-indigo-200/60 text-[10px]">{subtitleText}</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-colors"
              >
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
                  placeholder="Poochhein... jawab nahi milega 😄"
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
              <p className="text-center text-gray-700 text-[9px] mt-1.5">
                Mehnat AI™ — jawab nahi deta since 2024 😂
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        className={`fixed bottom-4 right-4 sm:right-6 z-50 w-14 h-14 rounded-2xl shadow-2xl transition-all duration-300 active:scale-95 flex items-center justify-center
          ${open
            ? "bg-gradient-to-br from-indigo-600 to-violet-600 shadow-indigo-500/40"
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
