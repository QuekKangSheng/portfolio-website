import type { Metadata } from "next";
import { Syne, DM_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/* ── Google Fonts via next/font ── */
const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dm-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

/* ── Site Metadata ── */
export const metadata: Metadata = {
  title: "Quek Kang Sheng — Software Developer",
  description:
    "Portfolio of Quek Kang Sheng — Information Systems student at SMU. Building full-stack products with a focus on clean code and great UX.",
  keywords: [
    "Quek Kang Sheng",
    "Software Developer",
    "SMU",
    "Portfolio",
    "Full Stack",
    "Singapore",
  ],
  authors: [{ name: "Quek Kang Sheng" }],
  openGraph: {
    title: "Quek Kang Sheng — Software Developer",
    description:
      "Portfolio of Quek Kang Sheng — Information Systems student at SMU.",
    type: "website",
    locale: "en_SG",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmMono.variable} ${inter.variable}`}
    >
      <body className="bg-bg-primary text-text-primary font-body antialiased overflow-x-hidden">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}