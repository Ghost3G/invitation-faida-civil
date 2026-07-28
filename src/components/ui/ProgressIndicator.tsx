"use client";

import { progressScenes } from "@/config/scenes.config";
import { useSceneNavigation } from "@/hooks";
import { cn } from "@/lib/utils/cn";

export function ProgressIndicator() {
  const { currentScene } = useSceneNavigation();

  const currentProgressIndex = progressScenes.findIndex(
    (scene) => scene.id === currentScene,
  );

  if (currentProgressIndex === -1) return null;

  return (
    <div className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 z-40 flex -translate-x-1/2 gap-2">
      {progressScenes.map((scene, index) => (
        <span
          key={scene.id}
          className={cn(
            "h-1.5 rounded-full transition-all duration-500",
            index === currentProgressIndex
              ? "w-8 bg-accent shadow-sm shadow-accent/50"
              : index < currentProgressIndex
                ? "w-2 bg-accent/70"
                : "w-2 bg-white/20",
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
