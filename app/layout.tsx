import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://the-ai-agent-factory-paradigm.vercel.app"),
  title: "The AI Agent Factory Paradigm — MCQ Quiz",
  description:
    "Chapter 12 exam preparation quiz on AI Agents, LLMs, AIDD, and the future of software development. Created by Mohsin Raza — Code with Mohsin.",
  openGraph: {
    title: "The AI Agent Factory Paradigm — MCQ Quiz",
    description:
      "AI, Agents, LLMs aur AIDD ke baray mein apni knowledge test karein. 69 sawal — by Mohsin Raza (Code with Mohsin)",
    url: "https://the-ai-agent-factory-paradigm.vercel.app",
    siteName: "Code with Mohsin",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The AI Agent Factory Paradigm Quiz — Code with Mohsin",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The AI Agent Factory Paradigm — MCQ Quiz",
    description:
      "AI, Agents, LLMs aur AIDD ke baray mein apni knowledge test karein — by Mohsin Raza",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
