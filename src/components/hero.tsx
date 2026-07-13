"use client";

import { motion, AnimatePresence, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Terminal, Activity } from "lucide-react";
import Link from "next/link";
import { MouseEvent, useState, useEffect } from "react";
import { Magnetic } from "@/components/magnetic";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/marquee";

function LabConsole() {
  const [logs, setLogs] = useState<string[]>([
    "MAPPING USER JOURNEYS...",
    "ESTABLISHING DESIGN LANGUAGE... [COMPLETED]",
    "DEFINING INTERACTION SCHEMAS...",
  ]);

  const [graphPoints, setGraphPoints] = useState<number[]>([30, 45, 35, 60, 50, 75, 65, 80]);

  // Telemetry loop
  useEffect(() => {
    const lines = [
      "OPTIMIZING NAVIGATION PATHS...",
      "POLISHING MICRO-ANIMATIONS...",
      "VERIFYING BRAND ALIGNMENT...",
      "CALIBRATING CONTRAST RATIOS...",
      "LAUNCHING CUSTOMER FEEDBACK CYCLE...",
      "TACTILE FLOW CONFIRMED [OK]",
      "OPTIMIZING CONVERSION LOOPS...",
      "MEASURING BRAND ENGAGEMENT...",
      "EXPERIENCE FLUIDITY: 100/100",
    ];

    let i = 0;
    const interval = setInterval(() => {
      setLogs((prev) => {
        const next = [...prev.slice(1), `[${new Date().toLocaleTimeString()}] ${lines[i]}`];
        i = (i + 1) % lines.length;
        return next;
      });
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  // Animate the line graph points
  useEffect(() => {
    const interval = setInterval(() => {
      setGraphPoints((prev) => {
        const next = [...prev.slice(1), Math.floor(Math.random() * 55) + 25];
        return next;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  // Construct SVG path from points
  const pathD = graphPoints.reduce((acc, point, index) => {
    const x = (index / (graphPoints.length - 1)) * 320;
    const y = 90 - point;
    return index === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, "");

  return (
    <div className="w-full bg-[#05050f]/80 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(124,58,237,0.15)] flex flex-col h-[320px] font-mono text-[10px] md:text-xs glow-border">
      {/* Console Header */}
      <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">
          experience_metrics_dashboard
        </span>
        <Terminal className="w-4 h-4 text-purple-400" />
      </div>

      {/* Console Body */}
      <div className="p-4 flex flex-col gap-4 flex-grow overflow-hidden">
        {/* Graph Preview */}
        <div className="bg-white/5 border border-white/5 rounded-xl p-3 h-[130px] flex flex-col justify-between relative overflow-hidden group">
          <div className="flex items-center justify-between relative z-10">
            <span className="text-[9px] text-gray-400 flex items-center gap-1.5 font-bold tracking-wider uppercase">
              <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              CUSTOMER ENGAGEMENT RATIO
            </span>
            <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              LIVE
            </span>
          </div>

          {/* SVG Line Chart */}
          <div className="h-[70px] w-full mt-2 relative">
            <svg viewBox="0 0 320 100" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d={pathD}
                fill="none"
                stroke="#7c3aed"
                strokeWidth="2"
                className="transition-all duration-1000 ease-in-out"
              />
              <path
                d={`${pathD} L 320 100 L 0 100 Z`}
                fill="url(#chartGradient)"
                className="transition-all duration-1000 ease-in-out"
              />
            </svg>
          </div>
        </div>

        {/* Live terminal logs */}
        <div className="flex-grow bg-[#020205] border border-white/5 rounded-xl p-3 overflow-y-auto flex flex-col gap-2 scrollbar-none font-medium">
          {logs.map((log, index) => (
            <div key={index} className={cn(
              "leading-relaxed transition-all duration-300 truncate",
              log.includes("OK") || log.includes("COMPLETED") || log.includes("100/100")
                ? "text-emerald-400"
                : log.includes("MAPPING") || log.includes("ESTABLISHING") || log.includes("OPTIMIZING")
                ? "text-purple-400"
                : "text-gray-400"
            )}>
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const sectionMouseX = useMotionValue(0);
  const sectionMouseY = useMotionValue(0);

  const [wordIndex, setWordIndex] = useState(0);
  const words = ["EXPERIENCES", "PRODUCTS", "INTERFACES", "GROWTH"];

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  function handleSectionMouseMove({ clientX, clientY }: MouseEvent) {
    sectionMouseX.set(clientX);
    sectionMouseY.set(clientY);
  }

  return (
    <section 
      onMouseMove={handleSectionMouseMove}
      className="relative min-h-screen flex items-center justify-center pt-20 pb-12 overflow-hidden bg-[#020205]"
    >
      {/* Global Interactive Spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-50"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              800px circle at ${sectionMouseX}px ${sectionMouseY}px,
              rgba(124, 58, 237, 0.06),
              transparent 80%
            )
          `
        }}
      />

      {/* Ambient background meshes */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.06)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)] pointer-events-none" />

      {/* SVG grid behind */}
      <div 
        className="absolute inset-0 z-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          backgroundPosition: "center center",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 hero-content w-full relative">
        
        {/* Left Side: Typography & CTA */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white/80 text-xs font-semibold uppercase tracking-widest mb-4"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            Next-Gen Software Lab
          </motion.div>
          
          <div className="mb-4 w-full">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-extrabold tracking-tighter text-white leading-[1.0] font-display"
            >
              NEXT-LEVEL
              <br />
              <span className="text-stroke">EXPERIENCES</span>
              <br />
              <span className="relative inline-flex items-center overflow-hidden h-[1.1em] align-bottom mt-1 min-w-[240px] sm:min-w-[320px] lg:min-w-[380px]">
                <span className="text-stroke select-none mr-2 font-normal">[</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ y: "80%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-80%", opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400 font-extrabold tracking-tighter"
                  >
                    {words[wordIndex]}
                  </motion.span>
                </AnimatePresence>
                <span className="text-stroke select-none ml-2 font-normal">]</span>
              </span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm md:text-base text-white/70 max-w-2xl leading-relaxed mb-6 font-light"
          >
            We serve next-level experiences in software development. We design and build premium digital products that connect with your customers, streamline your business services, and drive measurable outcomes.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto"
          >
            <Magnetic>
              <Link
                href="#contact"
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-widest text-black bg-white rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">Initialize Project</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:text-white group-hover:translate-x-1 transition-all duration-500" />
              </Link>
            </Magnetic>
            
            <Magnetic>
              <Link
                href="#work"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all bg-white/5 border border-white/10 rounded-full hover:bg-white/10 backdrop-blur-md"
              >
                Explore Lab Work
              </Link>
            </Magnetic>
          </motion.div>
        </div>

        {/* Right Side: Lab Console Display */}
        <div className="lg:col-span-5 relative w-full" style={{ perspective: 1200 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 5 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <LabConsole />
          </motion.div>
        </div>

      </div>

      {/* Marquee Divider */}
      <div className="absolute bottom-6 left-0 w-full z-20 pointer-events-none select-none">
        <Marquee text="Design • Engineering • AI Strategy • Web3 • Mobile" speed={30} />
      </div>
    </section>
  );
}
