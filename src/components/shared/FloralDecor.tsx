"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { cn } from "@/lib/utils/cn";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface FloralDecorProps {
  className?: string;
  corners?: boolean;
  petals?: boolean;
  petalCount?: number;
}

function FlowerSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
      <circle cx="32" cy="32" r="5" fill="#D4A5AB" opacity="0.9" />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <ellipse
          key={deg}
          cx="32"
          cy="18"
          rx="7"
          ry="11"
          fill="#E8C5C9"
          opacity="0.75"
          transform={`rotate(${deg} 32 32)`}
        />
      ))}
      <circle cx="32" cy="32" r="3.5" fill="#F7EFE6" opacity="0.85" />
    </svg>
  );
}

function LeafSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden>
      <path
        d="M8 28 C14 10, 28 6, 34 8 C30 22, 18 32, 8 28Z"
        fill="#B5C4A8"
        opacity="0.5"
      />
      <path
        d="M10 27 C18 16, 28 12, 32 11"
        stroke="#9AAD90"
        strokeWidth="0.8"
        opacity="0.4"
      />
    </svg>
  );
}

/** Fleurs & feuillage pour ambiance mariage civil */
export function FloralDecor({
  className,
  corners = true,
  petals = true,
  petalCount = 5,
}: FloralDecorProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const floating = useMemo(
    () =>
      Array.from({ length: petalCount }, (_, i) => ({
        id: i,
        left: 10 + ((i * 19) % 80),
        delay: i * 0.55,
        duration: 8 + (i % 4),
        size: 16 + (i % 3) * 5,
        kind: (i % 3 === 0 ? "leaf" : "flower") as "leaf" | "flower",
      })),
    [petalCount],
  );

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      {corners && (
        <>
          <div className="absolute top-0 left-0 opacity-65">
            <FlowerSvg className="h-14 w-14 -rotate-12" />
            <LeafSvg className="absolute top-9 left-9 h-9 w-9 rotate-45" />
          </div>
          <div className="absolute top-0 right-0 opacity-65">
            <FlowerSvg className="ml-auto h-14 w-14 rotate-12 scale-x-[-1]" />
            <LeafSvg className="absolute top-9 right-9 h-9 w-9 -rotate-45 scale-x-[-1]" />
          </div>
          <div className="absolute bottom-0 left-0 opacity-50">
            <LeafSvg className="h-11 w-11 rotate-12" />
            <FlowerSvg className="absolute bottom-1 left-5 h-10 w-10 -rotate-6" />
          </div>
          <div className="absolute right-0 bottom-0 opacity-50">
            <LeafSvg className="ml-auto h-11 w-11 -rotate-12 scale-x-[-1]" />
            <FlowerSvg className="absolute right-5 bottom-1 h-10 w-10 rotate-6 scale-x-[-1]" />
          </div>
        </>
      )}

      {petals &&
        !prefersReducedMotion &&
        floating.map((p) => (
          <motion.div
            key={p.id}
            className="absolute"
            style={{ left: `${p.left}%`, top: "-10%", width: p.size, height: p.size }}
            animate={{
              y: ["0vh", "115vh"],
              x: [0, p.id % 2 === 0 ? 20 : -18],
              rotate: [0, p.id % 2 === 0 ? 50 : -40],
              opacity: [0, 0.65, 0.65, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {p.kind === "leaf" ? (
              <LeafSvg className="h-full w-full" />
            ) : (
              <FlowerSvg className="h-full w-full" />
            )}
          </motion.div>
        ))}
    </div>
  );
}
