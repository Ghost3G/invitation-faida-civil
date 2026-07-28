"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { WeddingRings } from "@/components/shared/WeddingRings";

interface WaxSealProps {
  className?: string;
  onClick?: () => void;
  pulsing?: boolean;
}

export function WaxSeal({ className, onClick, pulsing = true }: WaxSealProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Ouvrir l'enveloppe"
      className={cn(
        "relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full active:scale-95",
        className,
      )}
    >
      {pulsing && (
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-rose-glow/50"
          animate={{ scale: [1, 1.35, 1], opacity: [0.8, 0, 0.8] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <span
        className="relative flex h-16 w-16 items-center justify-center rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, #f0e4d8 0%, #e8c5c9 42%, #d4a5ab 100%)",
          boxShadow:
            "0 6px 24px rgba(212,165,171,0.4), inset 0 2px 6px rgba(255,255,255,0.45), inset 0 -3px 6px rgba(74,67,60,0.15)",
        }}
      >
        <WeddingRings size={36} />
      </span>
    </button>
  );
}
