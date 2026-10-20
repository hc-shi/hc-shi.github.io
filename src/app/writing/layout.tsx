import { JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";
import "katex/dist/katex.min.css";

// Code font and KaTeX styles load only under /writing/ (spec §3.6).
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });

export default function WritingLayout({ children }: { children: ReactNode }) {
  return <div className={mono.variable}>{children}</div>;
}
