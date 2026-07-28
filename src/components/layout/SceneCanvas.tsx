"use client";

import { progressScenes } from "@/config/scenes.config";
import { useScene } from "@/context/SceneContext";
import { cn } from "@/lib/utils/cn";
import { MagicalBackground } from "./MagicalBackground";

interface SceneCanvasProps {
  children: React.ReactNode;
  className?: string;
  intensity?: "low" | "high";
  /** Contenu défilable sur petits écrans */
  scroll?: boolean;
  /** Désactive le padding haut (ex. scènes avec photo pleine largeur en tête) */
  noChromePadding?: boolean;
  /** Désactive le padding bas pour la barre de progression */
  noProgressPadding?: boolean;
}

export function SceneCanvas({
  children,
  className,
  intensity = "high",
  scroll = false,
  noChromePadding = false,
  noProgressPadding = false,
}: SceneCanvasProps) {
  const { canGoPrevious, currentScene } = useScene();
  const showProgress = progressScenes.some((scene) => scene.id === currentScene);

  return (
    <div className="relative flex h-full min-h-0 w-full flex-col overflow-hidden">
      <MagicalBackground intensity={intensity} />
      <div
        className={cn(
          "relative z-10 flex h-full min-h-0 w-full flex-col",
          canGoPrevious && !noChromePadding && "pt-chrome",
          showProgress && !noProgressPadding && "pb-progress",
          scroll && "scene-scroll",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
