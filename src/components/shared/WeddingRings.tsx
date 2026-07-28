"use client";

import Image from "next/image";
import { cn } from "@/lib/utils/cn";

interface WeddingRingsProps {
  className?: string;
  size?: number;
  /** Animation douce des alliances */
  animated?: boolean;
  /**
   * `photo` = vraies alliances en or (défaut)
   * `icon` = ornement SVG léger
   */
  variant?: "photo" | "icon";
  /** Charger en priorité (première scène uniquement) */
  priority?: boolean;
}

/** Alliances — photo réaliste en or ou ornement SVG */
export function WeddingRings({
  className,
  size = 56,
  animated = false,
  variant = "photo",
  priority = false,
}: WeddingRingsProps) {
  if (variant === "photo") {
    const height = Math.round(size * 0.83);
    return (
      <div
        className={cn(
          "relative inline-flex items-center justify-center drop-shadow-[0_8px_20px_rgba(0,0,0,0.35)]",
          animated && "animate-[float-petal_5s_ease-in-out_infinite]",
          className,
        )}
        style={{ width: size, height }}
        aria-hidden
      >
        <Image
          src="/images/decor/alliances-or-v5.png"
          alt=""
          width={size * 2}
          height={Math.round(size * 1.66)}
          className="h-full w-full object-contain"
          priority={priority}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        animated && "animate-[float-petal_5s_ease-in-out_infinite]",
        className,
      )}
      style={{ width: size, height: size * 0.72 }}
      aria-hidden
    >
      <svg
        width={size}
        height={size * 0.72}
        viewBox="0 0 80 58"
        fill="none"
        className="overflow-visible"
      >
        <ellipse
          cx="30"
          cy="30"
          rx="18"
          ry="18"
          stroke="#E8C5C9"
          strokeWidth="3.2"
          fill="none"
          opacity="0.95"
        />
        <ellipse
          cx="50"
          cy="30"
          rx="18"
          ry="18"
          stroke="#D4A5AB"
          strokeWidth="3.2"
          fill="none"
          opacity="0.95"
        />
        <path
          d="M22 22 C24 18, 28 16, 32 17"
          stroke="#FAF6F1"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path
          d="M42 22 C44 18, 48 16, 52 17"
          stroke="#FAF6F1"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.55"
        />
      </svg>
    </div>
  );
}
