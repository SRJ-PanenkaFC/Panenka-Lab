"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Magnetic({ children }: { children: React.ReactElement }) {
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    if (!rectRef.current && ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
    if (rectRef.current) {
      const { height, width, left, top } = rectRef.current;
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);
      x.set(middleX * 0.2);
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
      className="magnetic-target inline-block"
      style={{ position: "relative", x: springX, y: springY }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  );
}
