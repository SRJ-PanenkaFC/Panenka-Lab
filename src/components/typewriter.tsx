"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function Typewriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    if (isWaiting) return;

    const timeout = setTimeout(() => {
      if (!isDeleting && subIndex === words[index].length) {
        // Finished typing the word, wait a bit before deleting
        setIsWaiting(true);
        setTimeout(() => {
          setIsWaiting(false);
          setIsDeleting(true);
        }, 1500); // Wait 1.5s
        return;
      }

      if (isDeleting && subIndex === 0) {
        // Finished deleting, move to next word
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
        return;
      }

      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, isDeleting ? 50 : 100); // Faster delete than type

    return () => clearTimeout(timeout);
  }, [subIndex, index, isDeleting, isWaiting, words]);

  return (
    <div className="inline-flex items-center min-w-[2ch]">
      <span>{words[index].substring(0, subIndex)}</span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block w-[0.1em] h-[1em] bg-purple-500 ml-2"
      />
    </div>
  );
}
