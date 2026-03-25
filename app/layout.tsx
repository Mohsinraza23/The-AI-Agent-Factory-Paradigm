import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MCQ Quiz App - By Mohsin Raza",
  description: "Exam preparation quiz app created by Mohsin Raza",
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
