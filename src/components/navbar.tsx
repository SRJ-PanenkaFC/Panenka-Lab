"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 py-4 md:px-12",
          scrolled
            ? "bg-[#020205]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl py-3"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-display text-2xl font-extrabold tracking-tighter text-white uppercase">
              PANENKA
              <span className="text-stroke font-light ml-1 text-white/50 group-hover:text-white/90 transition-colors duration-300">LAB</span>
            </span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
          </Link>

          <nav 
            onMouseLeave={() => setHoveredIndex(null)}
            className="hidden md:flex items-center gap-1 bg-white/5 border border-white/5 rounded-full px-2 py-1.5 backdrop-blur-md shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
          >
            {navLinks.map((link, index) => (
              <Magnetic key={link.name}>
                <Link
                  href={link.href}
                  onMouseEnter={() => setHoveredIndex(index)}
                  className="relative text-xs font-semibold text-gray-300 hover:text-white transition-colors uppercase tracking-widest px-5 py-2.5"
                >
                  {hoveredIndex === index && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/10 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <ScrambleText text={link.name} />
                </Link>
              </Magnetic>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Magnetic>
              <Link
                href="#contact"
                className="hidden md:inline-flex items-center justify-center px-6 py-3 text-xs font-bold uppercase tracking-widest text-black transition-all bg-white rounded-full hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                Start Project
              </Link>
            </Magnetic>
            
            {/* Hamburger Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden z-50 p-2 text-white hover:text-purple-400 transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between items-end">
                <span className={cn("h-[2px] bg-white transition-all duration-300 origin-right", 
                  isOpen ? "w-6 -rotate-45 -translate-y-[1px]" : "w-6"
                )} />
                <span className={cn("h-[2px] bg-white transition-all duration-300", 
                  isOpen ? "w-0 opacity-0" : "w-4"
                )} />
                <span className={cn("h-[2px] bg-white transition-all duration-300 origin-right", 
                  isOpen ? "w-6 rotate-45 translate-y-[1px]" : "w-5"
                )} />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full-Screen Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#020205] flex flex-col justify-between px-8 pt-36 pb-12 md:hidden"
          >
            {/* Grid background overlay inside mobile menu */}
            <div className="absolute inset-0 z-0 opacity-10 bg-noise pointer-events-none" />
            <div 
              className="absolute inset-0 z-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />
            
            <div className="relative z-10 flex flex-col gap-10">
              <span className="text-[10px] font-bold tracking-widest text-purple-400 uppercase border-b border-white/10 pb-2">
                NAVIGATIONAL ARCHITECTURE
              </span>
              <nav className="flex flex-col gap-6">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="font-display text-4xl font-extrabold tracking-tighter text-white hover:text-purple-400 transition-colors uppercase block"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            <div className="relative z-10 border-t border-white/10 pt-8 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                  Direct Line
                </span>
                <a href="mailto:hello@panenkalab.com" className="text-sm font-medium text-white hover:text-purple-400 transition-colors">
                  hello@panenkalab.com
                </a>
              </div>
              <div className="flex justify-between items-center text-xs text-gray-500 font-semibold tracking-widest">
                <span>NEW YORK</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>LONDON</span>
                <span className="w-1 h-1 rounded-full bg-white/20" />
                <span>SAN FRANCISCO</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

