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

      // 3D Z-Scrolling slides choreography
      const slides = gsap.utils.toArray(".z-slide") as HTMLElement[];
      const totalSlides = slides.length;

      if (totalSlides > 0) {
        // Initialize initial Z positions for slides using autoAlpha (combines opacity & visibility)
        slides.forEach((slide, index) => {
          if (index > 0) {
            gsap.set(slide, { z: -1200, scale: 0.5, autoAlpha: 0 });
          } else {
            gsap.set(slide, { z: 0, scale: 1, autoAlpha: 1 });
          }
        });

        // Master Z-Scroll Timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".z-scroll-container",
            start: "top top",
            end: () => `+=${totalSlides * 130}%`,
            pin: true,
            scrub: 0.3,
            invalidateOnRefresh: true,
          },
        });

        // Sequence slides and their internal scrolls
        for (let i = 0; i < totalSlides; i++) {
          const slide = slides[i];

          // A. Process horizontal scroll inside slide (Special Case)
          const processContainer = slide.querySelector(
            ".process-scroll-container",
          ) as HTMLElement;
          if (processContainer) {
            const scrollWidth = processContainer.scrollWidth;
            const scrollAmount = -(scrollWidth - window.innerWidth + 100);
            if (scrollAmount < 0) {
              tl.to(processContainer, {
                x: scrollAmount,
                duration: 2.5,
                ease: "none",
                force3D: true,
              });
            }
          } else {
            // B. Generic vertical scroll for tall slides (General Case)
            let totalContentHeight = 0;
            const children = Array.from(slide.children) as HTMLElement[];
            children.forEach((child) => {
              totalContentHeight +=
                Math.max(child.scrollHeight, child.offsetHeight) || 0;
            });

            const scrollAmount = totalContentHeight - window.innerHeight;
            if (scrollAmount > 0) {
              // Scroll all children vertically
              tl.to(children, {
                y: -scrollAmount - 60, // Scroll past with safety padding
                duration: 2.5,
                ease: "none",
                force3D: true,
              });
            } else {
              // Center children vertically on screen if content height is less than viewport height
              const centeringOffset =
                (window.innerHeight - totalContentHeight) / 2;
              gsap.set(children, { y: centeringOffset });
            }
          }

          // C. Slide transitions using autoAlpha and hardware acceleration (force3D)
          if (i < totalSlides - 1) {
            const nextSlide = slides[i + 1];

            tl.to(
              slide,
              {
                z: 600,
                scale: 2,
                autoAlpha: 0,
                duration: 1.5,
                ease: "none",
                force3D: true,
              },
              `transition-${i}`,
            );

            tl.to(
              nextSlide,
              {
                z: 0,
                scale: 1,
                autoAlpha: 1,
                duration: 1.5,
                ease: "none",
                force3D: true,
              },
              `transition-${i}`,
            );
          }
        }
      }
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
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full fill-none stroke-blue-500 stroke-[2]"
        >
          <path d="M50 0 L100 50 L50 100 L0 50 Z" />
        </svg>
      </div>

      {/* Floating Interactive Shape 3 (Bottom Right) */}
      <div className="scroll-shape-1 fixed bottom-[10%] right-[10%] w-40 h-40 pointer-events-none z-[-1] opacity-10">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full fill-none stroke-purple-500 stroke-[1]"
        >
          <circle cx="50" cy="50" r="40" strokeDasharray="10 10" />
          <circle cx="50" cy="50" r="20" />
        </svg>
      </div>
    </>
  );
}
