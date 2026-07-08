"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "150+", label: "Products Launched" },
  { value: "40+", label: "Enterprise Clients" },
  { value: "$2B+", label: "Client Revenue Generated" },
  { value: "10+", label: "Years of Excellence" },
];

export function Trust() {
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(gridRef.current, {
      y: "15%",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.fromTo(".stat-item",
      { y: 80, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "center center",
          scrub: 1,
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 border-y border-white/10 bg-[#050505] relative overflow-hidden">
      {/* CSS Grid Pattern Parallax Background */}
      <div 
        ref={gridRef}
        className="absolute inset-[-20%] z-0 opacity-20 pointer-events-none mix-blend-screen"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-white/10">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-item flex flex-col items-center justify-center text-center px-4"
            >
              <div className="text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-2">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm font-semibold text-purple-400 uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
