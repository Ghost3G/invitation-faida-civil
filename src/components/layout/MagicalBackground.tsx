"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { Sparkles } from "@/components/shared/Sparkles";

interface MagicalBackgroundProps {
  intensity?: "low" | "high";
}

export function MagicalBackground({ intensity = "high" }: MagicalBackgroundProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Fond sauge doux avec chaleur nude */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#6a8570] via-royal to-[#4f6654]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#3d4f42]/50 via-transparent to-peach/10" />

      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-rose-glow/20 blur-3xl"
            animate={{ x: [0, 36, 0], y: [0, 28, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/4 -right-20 h-56 w-56 rounded-full bg-nude/35 blur-3xl"
            animate={{ x: [0, -28, 0], y: [0, 36, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-16 left-1/3 h-64 w-64 rounded-full bg-accent/25 blur-3xl"
            animate={{ x: [0, 22, 0], y: [0, -24, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      {/* Texture légère type papier */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 78%, rgba(240,228,216,0.22) 0%, transparent 45%), radial-gradient(circle at 82% 18%, rgba(212,165,171,0.18) 0%, transparent 48%)",
        }}
      />

      <Sparkles count={intensity === "high" ? 20 : 10} />
    </div>
  );
}
