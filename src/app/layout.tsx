import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import UniverseBackground from "@/components/UniverseBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CODEVERSE | The Ultimate Social Coding Universe",
  description: "A complete developer growth ecosystem with AI learning, gamified battles, and debugging arena.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <body className={`${inter.className} min-h-screen bg-space-950 text-slate-100 selection:bg-neon-cyan/30 selection:text-neon-cyan`}>
        <UniverseBackground />
        <Navbar />
        <main className="relative pt-24 px-6 pb-20">
          {children}
        </main>
      </body>
    </html>
  );
}
