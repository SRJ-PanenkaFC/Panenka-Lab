"use client";

import { motion } from "framer-motion";

export function Marquee({ text, speed = 20 }: { text: string; speed?: number }) {
  return (
    <div className="relative flex overflow-hidden border-y border-white/10 bg-[#0a0a0a] py-4 md:py-6 whitespace-nowrap">
      <div className="absolute inset-y-0 left-0 w-24 md:w-64 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-64 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-16 md:gap-24 items-center pr-16 md:pr-24 min-w-fit"
        animate={{ x: "-50%" }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Double the content to create seamless loop */}
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-16 md:gap-24 items-center text-xl md:text-3xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-white/30 stroke-white/50">
            <span>{text}</span>
            <span className="text-purple-500">✷</span>
            <span>{text}</span>
            <span className="text-blue-500">✷</span>
            <span>{text}</span>
            <span className="text-teal-500">✷</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
