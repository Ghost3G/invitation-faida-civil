"use client";

import { HiArrowLeft } from "react-icons/hi";
import { useScene } from "@/context/SceneContext";
import { cn } from "@/lib/utils/cn";

interface BackButtonProps {
  className?: string;
}

export function BackButton({ className }: BackButtonProps) {
  const { goToPrevious, canGoPrevious, currentScene } = useScene();

  if (!canGoPrevious) return null;

  return (
    <button
      type="button"
      onClick={goToPrevious}
      aria-label="Retour à l'écran précédent"
      className={cn(
        "fixed left-4 top-[max(1rem,env(safe-area-inset-top))] z-50 flex h-12 w-12 items-center justify-center rounded-full glass-card text-cream transition-all active:scale-95",
        className,
      )}
    >
      <HiArrowLeft className="h-5 w-5" />
      <span className="sr-only">Retour depuis {currentScene}</span>
    </button>
  );
}
