"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/magnetic";
import { ScrambleText } from "@/components/scramble-text";

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "Work", href: "#work" },
  { name: "Process", href: "#process" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 py-4",
        scrolled
          ? "bg-[#050505]/70 backdrop-blur-md border-b border-white/10 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter text-white">
          Panenka<span className="text-purple-500">Lab.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 bg-white/5 border border-white/10 rounded-full px-8 py-3 backdrop-blur-md shadow-lg">
          {navLinks.map((link) => (
            <Magnetic key={link.name}>
              <Link
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors uppercase tracking-wider"
              >
                <ScrambleText text={link.name} />
              </Link>
            </Magnetic>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Magnetic>
            <Link
              href="#contact"
              className="hidden md:inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium text-black transition-all bg-white rounded-full hover:bg-gray-200"
            >
              Start a Project
            </Link>
          </Magnetic>
          <button className="md:hidden p-2 text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
