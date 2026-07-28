"use client";

import dynamic from "next/dynamic";
import { AudioToggle } from "@/components/ui/AudioToggle";
import { ProgressIndicator } from "@/components/ui/ProgressIndicator";
import { SceneNavigation } from "@/components/layout/SceneNavigation";
import { SceneWrapper } from "@/components/layout/SceneWrapper";
import { AudioProvider } from "@/context/AudioContext";
import { useMobilePreview } from "@/context/MobilePreviewContext";
import { RsvpProvider } from "@/context/RsvpContext";
import { SceneProvider, useScene } from "@/context/SceneContext";
import { cn } from "@/lib/utils/cn";
import type { SceneId } from "@/types/scene";

const LoadingScene = dynamic(() => import("@/scenes/LoadingScene").then((m) => m.LoadingScene));
const OpeningScene = dynamic(() => import("@/scenes/OpeningScene").then((m) => m.OpeningScene));
const EnvelopeScene = dynamic(() => import("@/scenes/EnvelopeScene").then((m) => m.EnvelopeScene));
const HeroScene = dynamic(() => import("@/scenes/HeroScene").then((m) => m.HeroScene));
const CountdownScene = dynamic(() => import("@/scenes/CountdownScene").then((m) => m.CountdownScene));
const ProgramScene = dynamic(() => import("@/scenes/ProgramScene").then((m) => m.ProgramScene));
const ThemeScene = dynamic(() => import("@/scenes/ThemeScene").then((m) => m.ThemeScene));
const GalleryScene = dynamic(() => import("@/scenes/GalleryScene").then((m) => m.GalleryScene));
const LocationScene = dynamic(() => import("@/scenes/LocationScene").then((m) => m.LocationScene));
const RsvpScene = dynamic(() => import("@/scenes/RsvpScene").then((m) => m.RsvpScene));
const ConfirmationScene = dynamic(() => import("@/scenes/ConfirmationScene").then((m) => m.ConfirmationScene));
const FarewellScene = dynamic(() => import("@/scenes/FarewellScene").then((m) => m.FarewellScene));

const sceneComponents: Record<SceneId, React.ComponentType> = {
  loading: LoadingScene,
  opening: OpeningScene,
  envelope: EnvelopeScene,
  hero: HeroScene,
  countdown: CountdownScene,
  program: ProgramScene,
  theme: ThemeScene,
  gallery: GalleryScene,
  location: LocationScene,
  rsvp: RsvpScene,
  confirmation: ConfirmationScene,
  farewell: FarewellScene,
};

function SceneRenderer() {
  const { currentScene } = useScene();
  const SceneComponent = sceneComponents[currentScene];
  return (
    <SceneWrapper sceneKey={currentScene}>
      <SceneComponent />
    </SceneWrapper>
  );
}

export function InvitationExperience() {
  const { isPreview } = useMobilePreview();

  return (
    <SceneProvider>
      <RsvpProvider>
        <AudioProvider>
          <main
            id="invitation-root"
            data-preview={isPreview ? "true" : "false"}
            className={cn(
              "relative w-full overflow-hidden bg-royal",
              isPreview ? "h-full" : "h-dvh",
            )}
          >
            <SceneRenderer />
            <SceneNavigation />
            <AudioToggle />
            <ProgressIndicator />
          </main>
        </AudioProvider>
      </RsvpProvider>
    </SceneProvider>
  );
}
