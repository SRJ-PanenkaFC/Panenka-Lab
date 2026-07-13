"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Magnetic } from "@/components/magnetic";
import Image from "next/image";

export function CTA() {
  return (
    <section id="contact" className="py-44 relative overflow-hidden bg-[#020205]">
      {/* High-Performance Image Parallax Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/bg-parallax.png"
          alt="Abstract Background"
          fill
          className="object-cover opacity-15 scale-125 origin-top pointer-events-none"
        />
        {/* Overlay gradient to blend it into the dark theme */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-transparent to-[#020205]" />
      </div>

      {/* Scrolling Text Ticker behind content */}
      <div className="absolute inset-x-0 top-1/3 overflow-hidden pointer-events-none select-none z-0">
        <motion.div
          animate={{ x: [0, "-50%"] }}
          transition={{
            ease: "linear",
            duration: 25,
            repeat: Infinity,
          }}
          className="flex whitespace-nowrap text-[8vw] md:text-[10vw] font-black text-stroke opacity-[0.03] leading-none uppercase font-display"
        >
          <span>ELEVATE YOUR EXPERIENCE • DESIGN FOR OUTCOMES • EXPERIENCES THAT GROW •&nbsp;</span>
          <span>ELEVATE YOUR EXPERIENCE • DESIGN FOR OUTCOMES • EXPERIENCES THAT GROW •&nbsp;</span>
        </motion.div>
      </div>

      <div className="relative w-full h-full z-10">
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-8 font-display uppercase leading-[0.95]"
          >
            BUILD THE
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400">
              NEXT LEVEL
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base md:text-lg text-gray-400 mb-12 max-w-xl mx-auto font-light leading-relaxed"
          >
            Let's discuss how we can engineer your next-level software experience. From system optimization to custom design systems, we build what's next.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Magnetic>
              <Link
                href="mailto:hello@panenkalab.com"
                className="group relative inline-flex items-center justify-center w-48 h-48 md:w-52 md:h-52 rounded-full border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden text-white font-bold transition-all duration-500 hover:scale-105 hover:border-purple-500/50 hover:shadow-[0_0_50px_rgba(124,58,237,0.25)]"
              >
                {/* Expanding hover fill */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-blue-500 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-500 ease-[0.16,1,0.3,1] z-0" />
                <div className="relative z-10 flex flex-col items-center gap-1">
                  <span className="text-[9px] tracking-widest text-purple-400 group-hover:text-white/60 font-bold uppercase transition-colors duration-500">Ready?</span>
                  <span className="text-sm font-display tracking-widest uppercase">Let's Talk</span>
                  <ArrowRight className="w-4 h-4 mt-2 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
