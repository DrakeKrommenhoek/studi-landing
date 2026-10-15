import type { Metadata, Viewport } from "next";
import { Courier_Prime, DM_Sans, Patrick_Hand } from "next/font/google";
import "./globals.css";

const hand = Patrick_Hand({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-hand",
});
const body = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});
// Courier only appears inside catalog cards, so it never blocks the headline. Its Arial-based
// metric fallback is skipped: it doesn't match a monospace face and adds layout cost on load.
const type = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-type",
  preload: false,
  adjustFontFallback: false,
  fallback: ["Courier New", "monospace"],
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

const description = "One W&L profile, three matches: your study spot, your study group, and your Career Fellow.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Studi | Study groups at W&L",
  description,
  openGraph: { title: "Studi | Study groups at W&L", description, type: "website", siteName: "Studi" },
  twitter: { card: "summary_large_image", title: "Studi | Study groups at W&L", description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#54463a" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1511" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${hand.variable} ${body.variable} ${type.variable}`}>
      <body className="font-body text-[1.125rem] leading-relaxed">
        <a
          href="#main"
          className="sr-only z-50 rounded-hand bg-note px-5 py-3 font-hand text-xl text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:inline-flex focus:min-h-[44px] focus:items-center focus:px-5"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
