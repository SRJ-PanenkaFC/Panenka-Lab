# Panenka Lab - Animation Blueprint & Implementation Reference

This document serves as an exact technical specification and code blueprint for the animation systems implemented in the Panenka Lab platform. 

If you copy and paste this file into an LLM/AI coding assistant, it will have all the exact math, logic, configurations, and code blocks needed to replicate these highly optimized animations on another site.

---

## 🚀 1. Smooth Scrolling & GSAP Ticker Synchronization

To achieve buttery-smooth scroll animations without frame-jitter or memory leaks, Lenis scroll updates are synced directly to the GSAP tick loop using named function references.

### Implementation Blueprint:
```typescript
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrolling({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 1. Initialize Lenis with Exponential easing
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // Expo ease-out deceleration curve
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
      infinite: false,
    });

    // 2. Register Lenis updates with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // 3. Named callback syncs Lenis with GSAP ticker loop
    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0); // Prevents sudden jumps after frame rate drops

    // Cleanup ensures no duplicate loop callbacks accumulate in memory
    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

---

## 📦 2. GPU & RAM Friendly 2D Zoom Scrolling

Instead of rendering heavy 3D layout trees (`perspective` + `transform-style: preserve-3d`), this system uses flat **2D scale and opacity transitions** coupled with **dynamic `display: none`/`display: block` toggling**. 

*Only the currently active slide (and the transitioning slide) is active in the DOM layout tree, freeing up VRAM/RAM.*

### CSS Blueprint (`globals.css`):
```css
.z-scroll-container {
  position: relative;
  width: 100vw;
  height: 100dvh;
  overflow: hidden;
  background-color: #020205;
  touch-action: pan-y;
}

.z-slide {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  background-color: transparent;
  will-change: transform, opacity;
}
```

### JS/React Blueprint (`scroll-effects.tsx`):
```typescript
import { useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export function ScrollEffects() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray(".z-slide") as HTMLElement[];
      const totalSlides = slides.length;

      if (totalSlides > 0) {
        // 1. Read slide dimensions first while elements are visible
        const slideData = slides.map((slide) => {
          const processContainer = slide.querySelector(".process-scroll-container") as HTMLElement;

          if (processContainer) {
            const scrollWidth = processContainer.scrollWidth;
            const scrollAmount = -(scrollWidth - window.innerWidth + 100);
            return {
              type: "horizontal",
              container: processContainer,
              scrollAmount,
            };
          } else {
            let totalContentHeight = 0;
            const children = Array.from(slide.children) as HTMLElement[];
            children.forEach((child) => {
              totalContentHeight += Math.max(child.scrollHeight, child.offsetHeight) || 0;
            });
            const scrollAmount = totalContentHeight - window.innerHeight;
            const centeringOffset = (window.innerHeight - totalContentHeight) / 2;
            return {
              type: "vertical",
              children,
              scrollAmount,
              centeringOffset,
            };
          }
        });

        // 2. Hide inactive slides immediately to free GPU memory
        slides.forEach((slide, index) => {
          if (index > 0) {
            gsap.set(slide, { display: "none", scale: 0.1, opacity: 0 });
          } else {
            gsap.set(slide, { display: "block", scale: 1, opacity: 1 });
          }
        });

        // 3. Build pinned scroll timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".z-scroll-container",
            start: "top top",
            end: () => `+=${totalSlides * 130}%`,
            pin: true,
            pinType: "transform", // Eliminates jitter under custom scroll wrappers
            scrub: 0.5,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        // 4. Choreograph the slide sequences and transitions
        for (let i = 0; i < totalSlides; i++) {
          const slide = slides[i];
          const data = slideData[i];

          // Internal slide scroll animations
          if (data.type === "horizontal" && data.container && data.scrollAmount < 0) {
            tl.to(data.container, {
              x: data.scrollAmount,
              duration: 2.5,
              ease: "none",
              force3D: true,
            });
          } else if (data.type === "vertical" && data.children) {
            if (data.scrollAmount > 0) {
              tl.to(data.children, {
                y: -data.scrollAmount - 60,
                duration: 2.5,
                ease: "none",
                force3D: true,
              });
            } else {
              gsap.set(data.children, { y: data.centeringOffset });
            }
          }

          // Slide transitions (Zoom out previous, Zoom in next)
          if (i < totalSlides - 1) {
            const nextSlide = slides[i + 1];

            // Turn next slide display block at start of transition
            tl.set(nextSlide, { display: "block" }, `transition-${i}`);

            tl.to(
              slide,
              {
                scale: 2.2,
                opacity: 0,
                duration: 1.5,
                ease: "none",
                force3D: true,
              },
              `transition-${i}`,
            );

            tl.to(
              nextSlide,
              {
                scale: 1,
                opacity: 1,
                duration: 1.5,
                ease: "none",
                force3D: true,
              },
              `transition-${i}`,
            );

            // Hide previous slide at the end of transition
            tl.set(slide, { display: "none" }, `transition-${i}+=1.5`);
          }
        }
      }
    });

    return () => ctx.revert();
  }, []);

  if (!mounted) return null;
  return null; // Return scroll elements JSX container
}
```

---

## 🌌 3. Interactive Starfield Background (Canvas Warp Effect)

An HTML5 canvas animation running custom 3D projection algorithms. It calculates scroll delta speed and changes the stars into streak-lines, simulating a warp-drive space travel effect.

### Math & Canvas implementation:
```typescript
import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  prevX: number;
  prevY: number;
}

const NUM_STARS = 320;
const SPEED_BASE = 0.6;

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const velocityRef = useRef(0);
  const targetVelocityRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Track scroll velocity delta to trigger warp
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = Math.abs(currentY - lastScrollY.current);
      targetVelocityRef.current = Math.min(delta * 0.04, 1); // Clamp velocity delta
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initialize stars across 3D coordinates
    starsRef.current = Array.from({ length: NUM_STARS }, () => ({
      x: Math.random() * window.innerWidth - window.innerWidth / 2,
      y: Math.random() * window.innerHeight - window.innerHeight / 2,
      z: Math.random() * window.innerWidth,
      prevX: 0,
      prevY: 0,
    }));

    const animate = () => {
      // Ease warp speed towards target velocity
      velocityRef.current += (targetVelocityRef.current - velocityRef.current) * 0.08;
      targetVelocityRef.current *= 0.88; // Friction decay

      const speed = SPEED_BASE + velocityRef.current * 14;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Draw semi-transparent clear overlay for particle trails
      ctx.fillStyle = "rgba(2, 2, 5, 0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      starsRef.current.forEach((star) => {
        // Project 3D coordinate to 2D screen coordinate
        star.prevX = (star.x / star.z) * canvas.width + cx;
        star.prevY = (star.y / star.z) * canvas.height * 0.6 + cy;

        star.z -= speed; // Move camera closer to stars

        if (star.z <= 0) {
          // Reset star to back of field
          star.x = Math.random() * canvas.width - canvas.width / 2;
          star.y = Math.random() * canvas.height - canvas.height / 2;
          star.z = canvas.width;
          return;
        }

        const sx = (star.x / star.z) * canvas.width + cx;
        const sy = (star.y / star.z) * canvas.height * 0.6 + cy;

        const size = Math.max(0.3, (1 - star.z / canvas.width) * 3);
        const brightness = Math.floor((1 - star.z / canvas.width) * 255);
        const alpha = (1 - star.z / canvas.width) * 0.9 + 0.1;

        // Draw warp streak line when scrolling fast
        const warp = velocityRef.current;
        if (warp > 0.08) {
          ctx.beginPath();
          ctx.moveTo(star.prevX, star.prevY);
          ctx.lineTo(sx, sy);
          ctx.strokeStyle = `rgba(${brightness}, ${Math.floor(brightness * 0.85)}, 255, ${alpha * warp})`;
          ctx.lineWidth = size * 0.8;
          ctx.stroke();
        }

        // Draw standard star particle
        ctx.beginPath();
        ctx.arc(sx, sy, size * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${brightness}, ${brightness}, ${brightness}, ${alpha})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}
```

---

## 🧲 4. Magnetic Hover Spring Target

Forces interactive elements to attract and snap toward the user's cursor within their hover boundary, using smooth springs.

### Implementation Blueprint:
```typescript
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Magnetic({ children }: { children: React.ReactElement }) {
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Set up framer-motion physical springs
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    if (!rectRef.current && ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
    if (rectRef.current) {
      const { width, height, left, top } = rectRef.current;
      // Calculate coordinates relative to element center
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);
      x.set(middleX * 0.2); // Attract by 20% intensity
      y.set(middleY * 0.2);
    }
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    rectRef.current = null;
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ position: "relative", x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
}
```

---

## 🔠 5. Scramble Text Decelerator

Twitchy matrix/hacker text effect that scrambles character sets on hover and decodes character-by-character back to the original word.

### Implementation Blueprint:
```typescript
import { useState, useEffect } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

export function ScrambleText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!isHovering) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    let interval = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index]; // Display decoded letter
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)]; // Random placeholder
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3; // Speeds up/slows down decoding rate
    }, 30);

    return () => clearInterval(interval);
  }, [text, isHovering]);

  return (
    <span onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
      {displayText}
    </span>
  );
}
```

---

## 📖 6. Word-by-Word Text Reveal

Staggers text entry by breaking sentences down into separate word spans, fading and rotating them from the bottom up on scroll trigger visibility.

### Implementation Blueprint:
```typescript
import { motion, Variants } from "framer-motion";
import { useMemo } from "react";

export function TextReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = useMemo(() => text.split(" "), [text]);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 40,
      rotateX: -45, // Rotate in 3D perspective space
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      style={{ perspective: 1000, display: "inline-flex", flexWrap: "wrap" }}
    >
      {words.map((word, index) => (
        <span key={index} style={{ overflow: "hidden", display: "inline-block", marginRight: "0.25em" }}>
          <motion.span variants={child} style={{ display: "inline-block", transformOrigin: "top" }}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
```
