"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    href: "/",
    label: "Home",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href: "/stats",
    label: "Stats",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    href: "/bookmarks",
    label: "Saved",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  // Hide on quiz / practice / result / study / flashcard pages
  const hidden = ["/quiz/", "/practice/", "/result/", "/study/", "/flashcard/"].some(p =>
    pathname.startsWith(p)
  );
  if (hidden) return null;

  return (
    <nav className="bottom-nav md:hidden fixed bottom-0 left-0 right-0 z-50
      bg-[#07080f]/90 backdrop-blur-xl border-t border-white/8
      flex items-center justify-around px-2 pt-2 pb-3 safe-area-bottom">

      {/* top edge glow */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      {navItems.map(item => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`relative flex flex-col items-center gap-1 px-6 py-1.5 rounded-2xl transition-all duration-200 active:scale-90
              ${isActive
                ? "text-indigo-400"
                : "text-gray-600 hover:text-gray-400"
              }`}
          >
            {isActive && (
              <span className="absolute inset-0 rounded-2xl bg-indigo-500/10 border border-indigo-500/20" />
            )}
            <span className="relative">{item.icon}</span>
            <span className="relative text-[10px] font-bold tracking-wide">{item.label}</span>
            {isActive && (
              <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-indigo-400" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
