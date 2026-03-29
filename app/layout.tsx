import type { Metadata } from "next";
import "./globals.css";
import ChatBot from "@/components/ChatBot";

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
        url: "/og-image.png?v=2",
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
    <html lang="en" className="h-full" data-scroll-behavior="smooth">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#6366f1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-BQTM0SG320" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-BQTM0SG320');
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <ChatBot />
      </body>
    </html>
  );
}
