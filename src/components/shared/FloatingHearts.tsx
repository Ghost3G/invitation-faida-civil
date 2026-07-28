"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface Heart {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
}

interface FloatingHeartsProps {
  count?: number;
}

export function FloatingHearts({ count = 8 }: FloatingHeartsProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const hearts = useMemo<Heart[]>(
    () =>
      Array.from({ length: count }, (_, index) => ({
        id: index,
        x: 10 + Math.random() * 80,
        size: 8 + Math.random() * 10,
        delay: Math.random() * 3,
        duration: 4 + Math.random() * 3,
      })),
    [count],
  );

  if (prefersReducedMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {hearts.map((heart) => (
        <motion.span
          key={heart.id}
          className="absolute bottom-0 text-rose-glow/80"
          style={{
            left: `${heart.x}%`,
            fontSize: heart.size,
          }}
          animate={{
            y: [0, -400],
            opacity: [0, 0.7, 0],
            x: [0, Math.random() > 0.5 ? 20 : -20],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          ♥
        </motion.span>
      ))}
    </div>
  );
}
