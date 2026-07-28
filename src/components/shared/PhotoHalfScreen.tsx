"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { invitationConfig } from "@/config/invitation.config";
import { WeddingRings } from "@/components/shared/WeddingRings";
import { cn } from "@/lib/utils/cn";

interface PhotoHalfScreenProps {
  overlay?: React.ReactNode;
  showCrown?: boolean;
  fullScreen?: boolean;
  /** Photo à afficher (défaut : photo couple ouverture) */
  src?: string;
  className?: string;
  /** Priorité réseau — uniquement pour la première scène visible */
  priority?: boolean;
}

export function PhotoHalfScreen({
  overlay,
  showCrown = true,
  fullScreen = false,
  src,
  className,
  priority = false,
}: PhotoHalfScreenProps) {
  const imageSrc = src ?? invitationConfig.couple.photo;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        fullScreen
          ? "absolute inset-0 h-full min-h-0"
          : "organic-photo photo-half-height shrink-0",
        className,
      )}
    >
      <Image
        src={imageSrc}
        alt={invitationConfig.couple.fullNames}
        fill
        priority={priority}
        className={cn(
          "object-cover",
          fullScreen ? "object-[center_22%]" : "object-center",
        )}
        sizes="100vw"
        quality={75}
      />

      <div
        className={cn(
          "absolute inset-x-0 top-0 bg-gradient-to-b from-royal/70 to-transparent",
          fullScreen ? "h-28" : "h-20 max-h-[25%]",
        )}
      />
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 bg-gradient-to-t from-royal via-royal/90 to-transparent",
          fullScreen ? "h-[58%] from-25%" : "h-[65%] from-25% via-royal/85",
        )}
      />

      {showCrown && (
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[max(0.5rem,env(safe-area-inset-top))] left-1/2 z-10 -translate-x-1/2"
        >
          <div className="glow-ring flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border border-rose-glow/40 bg-royal/55 p-1.5 shadow-lg backdrop-blur-md">
            <WeddingRings size={58} variant="photo" />
          </div>
        </motion.div>
      )}

      {overlay && (
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 z-10 px-5 text-center",
            fullScreen
              ? "pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-8"
              : "rounded-t-[2rem] bg-royal/80 py-5 backdrop-blur-sm",
          )}
        >
          {overlay}
        </div>
      )}
    </div>
  );
}
