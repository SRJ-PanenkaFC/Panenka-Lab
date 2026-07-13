import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Panenka Lab | Next-Level Software Engineering & Experience Design",
  description: "Panenka Lab builds premium digital experiences, high-performance software systems, Web3 architectures, and custom AI integrations.",
};

import { SmoothScrolling } from "@/components/smooth-scrolling";
import { Particles } from "@/components/particles";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${plusJakartaSans.variable} h-full antialiased overflow-x-hidden w-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#030307] text-white overflow-x-hidden w-full font-sans antialiased">
        {/* <Particles /> */}
        <div className="fixed inset-0 bg-noise pointer-events-none z-[100]" />
        <SmoothScrolling>{children}</SmoothScrolling>
      </body>
    </html>
  );
}

