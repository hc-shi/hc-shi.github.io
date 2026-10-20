import { Newsreader } from "next/font/google";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-newsreader",
  display: "swap",
});

// Only 史皓琛, subset from Noto Serif SC 500 (OFL, see ./fonts/OFL.txt).
const nameZh = localFont({
  src: "./fonts/haochen-zh.woff2",
  weight: "500",
  variable: "--font-name-zh",
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${nameZh.variable}`}>
      <body className="bg-paper font-serif leading-[1.15] text-ink antialiased">
        <div className="mx-auto w-full max-w-[704px] px-4 pb-[30px]">
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
