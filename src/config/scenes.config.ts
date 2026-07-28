import type { SceneConfig, SceneId } from "@/types/scene";

export const scenesConfig: SceneConfig[] = [
  { id: "loading", label: "Chargement", showInProgress: false },
  { id: "opening", label: "Ouverture", showInProgress: false },
  { id: "envelope", label: "Enveloppe", showInProgress: true },
  { id: "hero", label: "Accueil", showInProgress: true },
  { id: "countdown", label: "Compte à rebours", showInProgress: true },
  { id: "program", label: "Programme", showInProgress: true },
  { id: "theme", label: "Thème", showInProgress: true },
  { id: "gallery", label: "Galerie", showInProgress: true },
  { id: "location", label: "Lieu", showInProgress: true },
  { id: "rsvp", label: "RSVP", showInProgress: true },
  { id: "confirmation", label: "Confirmation", showInProgress: false },
  { id: "farewell", label: "Au revoir", showInProgress: false },
];

export const sceneOrder: SceneId[] = scenesConfig.map((scene) => scene.id);

export const progressScenes = scenesConfig.filter((scene) => scene.showInProgress);
