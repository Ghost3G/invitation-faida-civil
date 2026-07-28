"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { sceneOrder } from "@/config/scenes.config";
import type { SceneContextValue, SceneId } from "@/types/scene";

/** Scènes vers lesquelles on ne revient pas (ex. chargement auto) */
const NON_RETURNABLE: SceneId[] = ["loading"];

const SceneContext = createContext<SceneContextValue | null>(null);

interface SceneProviderProps {
  children: ReactNode;
  initialScene?: SceneId;
}

export function SceneProvider({
  children,
  initialScene = "opening",
}: SceneProviderProps) {
  const [currentScene, setCurrentScene] = useState<SceneId>(initialScene);

  const sceneIndex = sceneOrder.indexOf(currentScene);
  const totalScenes = sceneOrder.length;

  const goToScene = useCallback((scene: SceneId) => {
    setCurrentScene(scene);
  }, []);

  const goToNext = useCallback(() => {
    const nextIndex = sceneIndex + 1;
    if (nextIndex < sceneOrder.length) {
      setCurrentScene(sceneOrder[nextIndex]);
    }
  }, [sceneIndex]);

  const goToPrevious = useCallback(() => {
    let prevIndex = sceneIndex - 1;
    while (prevIndex >= 0 && NON_RETURNABLE.includes(sceneOrder[prevIndex])) {
      prevIndex -= 1;
    }
    if (prevIndex >= 0) {
      setCurrentScene(sceneOrder[prevIndex]);
    }
  }, [sceneIndex]);

  const canGoPrevious = useMemo(() => {
    let prevIndex = sceneIndex - 1;
    while (prevIndex >= 0 && NON_RETURNABLE.includes(sceneOrder[prevIndex])) {
      prevIndex -= 1;
    }
    return prevIndex >= 0;
  }, [sceneIndex]);

  const value = useMemo<SceneContextValue>(
    () => ({
      currentScene,
      sceneIndex,
      totalScenes,
      isFirstScene: sceneIndex === 0,
      isLastScene: sceneIndex === totalScenes - 1,
      goToNext,
      goToPrevious,
      goToScene,
      canGoNext: sceneIndex < totalScenes - 1,
      canGoPrevious,
    }),
    [
      currentScene,
      sceneIndex,
      totalScenes,
      goToNext,
      goToPrevious,
      goToScene,
      canGoPrevious,
    ],
  );

  return (
    <SceneContext.Provider value={value}>{children}</SceneContext.Provider>
  );
}

export function useScene() {
  const context = useContext(SceneContext);
  if (!context) {
    throw new Error("useScene must be used within a SceneProvider");
  }
  return context;
}
