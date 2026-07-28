export type SceneId =
  | "loading"
  | "opening"
  | "envelope"
  | "hero"
  | "countdown"
  | "program"
  | "theme"
  | "gallery"
  | "location"
  | "rsvp"
  | "confirmation"
  | "farewell";

export interface SceneConfig {
  id: SceneId;
  label: string;
  showInProgress: boolean;
}

export interface SceneContextValue {
  currentScene: SceneId;
  sceneIndex: number;
  totalScenes: number;
  isFirstScene: boolean;
  isLastScene: boolean;
  goToNext: () => void;
  goToPrevious: () => void;
  goToScene: (scene: SceneId) => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}
