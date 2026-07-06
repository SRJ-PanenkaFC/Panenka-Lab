"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowRight, Code2, Cpu, Layers, Sparkles } from "lucide-react";
import Link from "next/link";
import { MouseEvent, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Magnetic } from "@/components/magnetic";
import { Typewriter } from "@/components/typewriter";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// A reusable glass card component with spotlight effect
function GlassCard({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(139, 92, 246, 0.15),
              transparent 80%
            )
          `
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionMouseX = useMotionValue(0);
  const sectionMouseY = useMotionValue(0);

  function handleSectionMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    sectionMouseX.set(clientX - left);
    sectionMouseY.set(clientY - top);
  }

  useGSAP(() => {
    gsap.to(".hero-content", {
      y: 150,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      onMouseMove={handleSectionMouseMove}
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#030303]"
    >
      {/* Global Interactive Spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-50"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              800px circle at ${sectionMouseX}px ${sectionMouseY}px,
              rgba(59, 130, 246, 0.08),
              transparent 80%
            )
          `
        }}
      />

      {/* Ambient background meshes */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 hero-content w-full relative">
        
        {/* Left Side: Typography & CTA */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white/80 text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            Next-Generation Experiences
          </motion.div>
          
          <div className="mb-6 w-full">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[1.1]"
            >
              PANENKA
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400 block min-h-[1.2em] mt-2 pb-2">
                <Typewriter words={["SOFTWARE", "ENGINEERING", "AI SYSTEMS", "WEB3"]} />
              </span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed mb-10 font-light"
          >
            We bridge the gap between imagination and reality. Designing and engineering next-generation digital products that define tomorrow through interactive aesthetics.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <Magnetic>
              <Link
                href="#contact"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-black bg-white rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">Initialize Project</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:text-white group-hover:translate-x-1 transition-all duration-500" />
              </Link>
            </Magnetic>
            
            <Magnetic>
              <Link
                href="#work"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-medium text-white transition-all bg-white/5 border border-white/10 rounded-full hover:bg-white/10 backdrop-blur-md"
              >
                Explore Our Work
              </Link>
            </Magnetic>
          </motion.div>
        </div>

        {/* Right Side: Floating Glass Cards */}
        <div className="lg:col-span-5 relative h-[500px] hidden lg:block">
          {/* Card 1 */}
          <motion.div
            animate={{ y: [-15, 15, -15] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-4 w-64 z-20"
          >
            <GlassCard delay={0.6}>
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4 border border-purple-500/30">
                <Code2 className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Architecture</h3>
              <p className="text-sm text-white/60">Scalable engineering foundations for modern web applications.</p>
            </GlassCard>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            animate={{ y: [15, -15, 15] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 -left-8 -translate-y-1/2 w-64 z-30"
          >
            <GlassCard delay={0.8} className="border-blue-500/20 bg-blue-500/5">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 border border-blue-500/30">
                <Cpu className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">AI Integration</h3>
              <p className="text-sm text-white/60">Intelligent systems that adapt, learn, and perform seamlessly.</p>
            </GlassCard>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            animate={{ y: [-20, 20, -20] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 right-12 w-64 z-10"
          >
            <GlassCard delay={1.0}>
              <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center mb-4 border border-teal-500/30">
                <Layers className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Interface Design</h3>
              <p className="text-sm text-white/60">Pixel-perfect aesthetics merging form with deep functionality.</p>
            </GlassCard>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
