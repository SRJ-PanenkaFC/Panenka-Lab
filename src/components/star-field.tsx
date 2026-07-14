"use client";

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

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize stars spread across 3D space
    const initStars = () => {
      starsRef.current = Array.from({ length: NUM_STARS }, () => ({
        x: Math.random() * window.innerWidth - window.innerWidth / 2,
        y: Math.random() * window.innerHeight - window.innerHeight / 2,
        z: Math.random() * window.innerWidth,
        prevX: 0,
        prevY: 0,
      }));
    };
    initStars();

    // Track scroll velocity
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = Math.abs(currentY - lastScrollY.current);
      // Map scroll delta to warp speed 0→1
      targetVelocityRef.current = Math.min(delta * 0.04, 1);
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const resetStar = (star: Star) => {
      star.x = Math.random() * window.innerWidth - window.innerWidth / 2;
      star.y = Math.random() * window.innerHeight - window.innerHeight / 2;
      star.z = window.innerWidth;
      star.prevX = star.x;
      star.prevY = star.y;
    };

    const animate = () => {
      // Ease velocity toward target
      velocityRef.current += (targetVelocityRef.current - velocityRef.current) * 0.08;
      // Decay target velocity
      targetVelocityRef.current *= 0.88;

      const speed = SPEED_BASE + velocityRef.current * 14;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Semi-transparent clear for motion trail
      ctx.fillStyle = "rgba(2, 2, 5, 0.25)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      starsRef.current.forEach((star) => {
        star.prevX = (star.x / star.z) * canvas.width + cx;
        star.prevY = (star.y / star.z) * canvas.height * 0.6 + cy;

        star.z -= speed;

        if (star.z <= 0) {
          resetStar(star);
          return;
        }

        const sx = (star.x / star.z) * canvas.width + cx;
        const sy = (star.y / star.z) * canvas.height * 0.6 + cy;

        if (sx < 0 || sx > canvas.width || sy < 0 || sy > canvas.height) {
          resetStar(star);
          return;
        }

        // Star size grows as it approaches
        const size = Math.max(0.3, (1 - star.z / canvas.width) * 3);
        // Brightness increases as star approaches
        const brightness = Math.floor((1 - star.z / canvas.width) * 255);
        const alpha = (1 - star.z / canvas.width) * 0.9 + 0.1;

        // Warp streak when fast, dot when slow
        const warp = velocityRef.current;
        if (warp > 0.08) {
          // Draw streak line
          ctx.beginPath();
          ctx.moveTo(star.prevX, star.prevY);
          ctx.lineTo(sx, sy);
          ctx.strokeStyle = `rgba(${brightness}, ${Math.floor(brightness * 0.85)}, 255, ${alpha * warp})`;
          ctx.lineWidth = size * 0.8;
          ctx.stroke();
        }

        // Draw star dot
        ctx.beginPath();
        ctx.arc(sx, sy, size * 0.6, 0, Math.PI * 2);
        const hue = Math.random() > 0.92 ? `${brightness}, ${Math.floor(brightness * 0.6)}, 255` : `${brightness}, ${brightness}, ${brightness}`;
        ctx.fillStyle = `rgba(${hue}, ${alpha})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.75 }}
    />
  );
}
