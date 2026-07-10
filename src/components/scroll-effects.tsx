"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function ScrollEffects() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Setup GSAP animations after mount
    const ctx = gsap.context(() => {
      // Global Progress Bar
      gsap.to(".scroll-progress-bar", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      // Shape 1 (Top Right)
      gsap.to(".scroll-shape-1", {
        rotate: 360,
        scale: 1.5,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      // Shape 2 (Mid Left)
      gsap.to(".scroll-shape-2", {
        rotate: -360,
        scale: 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      // 3D Scattering Effect on Sections
      const sections = gsap.utils.toArray("section") as HTMLElement[];
      
      sections.forEach((section) => {
        if (section.id === "process") return;

        // Set perspective on the section itself for 3D transforms
        gsap.set(section, { perspective: 1200, transformStyle: "preserve-3d" });
        
        // Animate the direct children of the section
        const children = section.children;
        
        if (children.length > 0) {
          gsap.fromTo(children,
            {
              x: 0,
              y: 0,
              z: 0,
              rotationX: 0,
              rotationY: 0,
              rotationZ: 0,
              scale: 1,
              opacity: 1
            },
            {
              z: () => gsap.utils.random(100, 300),
              x: () => gsap.utils.random(-100, 100),
              y: () => gsap.utils.random(-100, 100),
              rotationX: () => gsap.utils.random(-30, 30),
              rotationY: () => gsap.utils.random(-30, 30),
              rotationZ: () => gsap.utils.random(-15, 15),
              scale: () => gsap.utils.random(1.05, 1.3),
              opacity: 0,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "bottom bottom",
                end: "bottom top",
                scrub: true,
              }
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Top Progress Bar */}
      <div className="scroll-progress-bar fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 origin-left z-[100] scale-x-0" />

      {/* Floating Interactive Shape 1 (Top Right to Mid) */}
      <div className="scroll-shape-1 fixed top-[20%] right-[5%] w-32 h-32 border border-blue-200/50 rounded-full flex items-center justify-center pointer-events-none z-[-1] opacity-30">
        <div className="w-20 h-20 border border-purple-200/50 rounded-full" />
      </div>

      {/* Floating Interactive Shape 2 (Mid Left) */}
      <div className="scroll-shape-2 fixed top-[50%] left-[5%] w-24 h-24 pointer-events-none z-[-1] opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-blue-500 stroke-[2]">
          <path d="M50 0 L100 50 L50 100 L0 50 Z" />
        </svg>
      </div>

      {/* Floating Interactive Shape 3 (Bottom Right) */}
      <div className="scroll-shape-1 fixed bottom-[10%] right-[10%] w-40 h-40 pointer-events-none z-[-1] opacity-10">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-purple-500 stroke-[1]">
          <circle cx="50" cy="50" r="40" strokeDasharray="10 10" />
          <circle cx="50" cy="50" r="20" />
        </svg>
      </div>
    </>
  );
}
