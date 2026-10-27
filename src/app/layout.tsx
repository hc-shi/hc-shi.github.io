import type { Metadata, Viewport } from "next";
import { Newsreader } from "next/font/google";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { profile } from "@/data/profile";
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

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: profile.name, template: `%s · ${profile.name}` },
  description: profile.description,
  openGraph: {
    type: "website",
    url: "/",
    siteName: profile.name,
    title: profile.name,
    description: profile.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: profile.name }],
  },
  // Only the card type: Next fills twitter title, description and image from each page's openGraph.
  twitter: { card: "summary_large_image" },
  // No favicon, by the owner's choice; an empty icon stops browsers from requesting /favicon.ico.
  icons: { icon: "data:," },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0e" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${newsreader.variable} ${nameZh.variable}`}>
      <body className="bg-paper font-serif leading-[1.15] text-ink antialiased">
        <div className="mx-auto w-full max-w-[820px] px-4 pb-[30px]">
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
