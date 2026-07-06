"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Hide default cursor on body
    document.body.style.cursor = "none";

    const mouseMove = (e: MouseEvent) => {
      // Small fast dot
      gsap.to(cursorDotRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0,
      });

      // Larger lagging circle
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    const mouseHover = () => {
      gsap.to(cursorRef.current, {
        scale: 2.5,
        backgroundColor: "rgba(139, 92, 246, 0.1)", // Purple glow
        borderWidth: "1px",
        duration: 0.3,
      });
      gsap.to(cursorDotRef.current, {
        opacity: 0,
        duration: 0.2,
      });
    };

    const mouseLeave = () => {
      gsap.to(cursorRef.current, {
        scale: 1,
        backgroundColor: "transparent",
        borderWidth: "2px",
        duration: 0.3,
      });
      gsap.to(cursorDotRef.current, {
        opacity: 1,
        duration: 0.2,
      });
    };

    window.addEventListener("mousemove", mouseMove);

    // Add listeners to all interactive elements
    const interactiveElements = document.querySelectorAll("a, button, .magnetic-target");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", mouseHover);
      el.addEventListener("mouseleave", mouseLeave);
      // Ensure element removes custom cursor if it overrides it
      (el as HTMLElement).style.cursor = "none";
    });

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", mouseHover);
        el.removeEventListener("mouseleave", mouseLeave);
      });
      document.body.style.cursor = "auto";
    };
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-purple-500 pointer-events-none z-[9999] -ml-4 -mt-4 mix-blend-difference hidden md:block"
      />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-blue-400 pointer-events-none z-[10000] -ml-1 -mt-1 hidden md:block"
      />
    </>
  );
}
