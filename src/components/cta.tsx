"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Magnetic } from "@/components/magnetic";
import { ScrambleText } from "@/components/scramble-text";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export function CTA() {
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    // True parallax: move the background image at a different speed than the section scrolls
    gsap.to(bgRef.current, {
      y: "40%", // Background moves down slowly
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // Text parallax: text moves up faster than the section
    gsap.to(".cta-text", {
      y: -150,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: containerRef });

  return (
    <section id="contact" ref={containerRef} className="py-40 relative overflow-hidden bg-[#050505]">
      {/* High-Performance Image Parallax Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          ref={bgRef}
          src="/bg-parallax.png"
          alt="Abstract Background"
          fill
          className="object-cover opacity-30 scale-125 origin-top"
          // scale-125 ensures we have extra image height/width to move around without exposing the edges
        />
        {/* Overlay gradient to blend it into the dark theme */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
      </div>

      <div className="relative w-full h-full z-10">
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center cta-text">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6"
          >
            Ready to build something <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              extraordinary?
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Let's discuss how we can help you achieve your business goals through world-class software engineering and design.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Magnetic>
              <Link
                href="mailto:hello@studio.com"
                className="group relative inline-flex items-center justify-center gap-2 px-10 py-5 text-lg font-medium text-black bg-white rounded-full overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                  <ScrambleText text="Start a Conversation" />
                </span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:text-white group-hover:translate-x-1 transition-all duration-500" />
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
