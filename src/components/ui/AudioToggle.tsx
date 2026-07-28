"use client";

import { HiExclamation, HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import { useAudio } from "@/hooks";
import { cn } from "@/lib/utils/cn";

interface AudioToggleProps {
  className?: string;
}

export function AudioToggle({ className }: AudioToggleProps) {
  const { isMuted, isAvailable, isLoading, toggleMute } = useAudio();

  const label = !isAvailable
    ? "Fichier musique manquant — ajoute public/audio/violon-douce.m4a"
    : isMuted
      ? "Activer la musique"
      : "Couper la musique";

  return (
    <button
      type="button"
      onClick={toggleMute}
      disabled={!isAvailable || isLoading}
      aria-label={label}
      title={label}
      className={cn(
        "fixed right-4 top-[max(1rem,env(safe-area-inset-top))] z-50 flex h-12 w-12 items-center justify-center rounded-full glass-card transition-all active:scale-95",
        !isAvailable
          ? "cursor-not-allowed text-rose-glow/80 opacity-70"
          : "text-accent",
        className,
      )}
    >
      {!isAvailable ? (
        <HiExclamation className="h-5 w-5" />
      ) : isMuted ? (
        <HiVolumeOff className="h-5 w-5" />
      ) : (
        <HiVolumeUp className="h-5 w-5" />
      )}
    </button>
  );
}
