"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const stats = [
  { value: "150+", label: "Products Launched" },
  { value: "40+", label: "Enterprise Clients" },
  { value: "$2B+", label: "Capital Flow Handled" },
  { value: "10+", label: "Years of Engineering" },
];

const partnerLogos = ["OpenAI", "Vercel", "Stripe", "Anthropic", "Apple", "Github", "AWS", "Google"];

function Counter({ value }: { value: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);
  
  // Extract number and suffix/prefix
  const match = value.match(/(\$?)([0-9]+)(\+?)/);
  const prefix = match ? match[1] : "";
  const target = match ? parseInt(match[2], 10) : 0;
  const suffix = match ? match[3] : "";

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepTime = duration / steps;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

function LogoMarquee() {
  return (
    <div className="w-full overflow-hidden border-t border-white/5 py-12 relative z-10 select-none bg-black/20">
      <div className="flex w-max">
        <motion.div
          animate={{ x: [0, "-50%"] }}
          transition={{
            ease: "linear",
            duration: 30,
            repeat: Infinity,
          }}
          className="flex gap-20 pr-20 whitespace-nowrap"
        >
          {/* Repeat logos to cover the full marquee sliding width */}
          {[...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos].map((logo, i) => (
            <span key={i} className="text-xs font-display font-bold tracking-[0.25em] text-white/20 uppercase hover:text-purple-400 transition-colors duration-300">
              {logo}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export function Trust() {
  return (
    <section className="py-12 md:py-24 border-y border-white/5 bg-[#020205] relative overflow-hidden">
      {/* Grid Pattern Background */}
      <div 
        className="absolute inset-[-20%] z-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#020205] via-transparent to-[#020205] z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-white/10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center text-center px-6 py-4"
            >
              <div className="text-5xl md:text-6xl font-extrabold tracking-tighter text-white mb-3 font-display">
                <Counter value={stat.value} />
              </div>
              <div className="text-[10px] font-bold text-purple-400 uppercase tracking-[0.2em] font-sans">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Partner Logos Marquee */}
      <LogoMarquee />
    </section>
  );
}
