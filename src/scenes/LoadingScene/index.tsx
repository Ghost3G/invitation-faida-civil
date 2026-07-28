"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FloatingHearts } from "@/components/shared/FloatingHearts";
import { FloralDecor } from "@/components/shared/FloralDecor";
import { PhotoHalfScreen } from "@/components/shared/PhotoHalfScreen";
import { WeddingFlourish } from "@/components/shared/WeddingFlourish";
import { WeddingRings } from "@/components/shared/WeddingRings";
import { SceneCanvas } from "@/components/layout/SceneCanvas";
import { ScriptText } from "@/components/ui/ScriptText";
import { invitationConfig } from "@/config/invitation.config";
import { useScene } from "@/context/SceneContext";

const PRELOAD_ASSETS = [
  invitationConfig.couple.photo,
  invitationConfig.couple.ceremonyPhoto,
];

export function LoadingScene() {
  const { goToScene } = useScene();
  const [progress, setProgress] = useState(0);
  const didNavigate = useRef(false);

  useEffect(() => {
    let loaded = 0;
    const total = PRELOAD_ASSETS.length;
    let cancelled = false;

    const finish = () => {
      if (cancelled || didNavigate.current) return;
      didNavigate.current = true;
      setProgress(100);
      // Toujours aller à l'ouverture (page principale), une seule fois
      window.setTimeout(() => {
        if (!cancelled) goToScene("opening");
      }, 280);
    };

    const handleLoad = () => {
      loaded += 1;
      setProgress(Math.round((loaded / Math.max(total, 1)) * 100));
      if (loaded >= total) finish();
    };

    PRELOAD_ASSETS.forEach((src) => {
      const img = new window.Image();
      img.onload = handleLoad;
      img.onerror = handleLoad;
      img.src = src;
    });

    if (total === 0) finish();

    const fallback = window.setTimeout(finish, 2500);

    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
    };
  }, [goToScene]);

  return (
    <SceneCanvas
      className="h-full min-h-0 items-stretch justify-start"
      intensity="high"
    >
      <FloralDecor petals={false} />
      <FloatingHearts count={6} />
      <PhotoHalfScreen showCrown priority />

      <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center px-6 pb-safe">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="organic-panel relative w-full max-w-sm overflow-hidden px-6 py-6 text-center"
        >
          <FloralDecor corners petals={false} className="opacity-40" />
          <div className="relative z-10">
            <div className="mb-2 flex justify-center">
              <WeddingRings size={56} variant="photo" priority />
            </div>
            <p className="font-display text-[11px] tracking-[0.35em] text-nude uppercase">
              Mariage civil
            </p>
            <ScriptText as="h1" className="mt-2 text-[2.6rem] leading-none text-rose-glow">
              {invitationConfig.couple.displayNames}
            </ScriptText>
            <WeddingFlourish className="my-4" />
            <p className="font-display text-sm text-cream/90">
              {invitationConfig.couple.fullNames}
            </p>

            <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-rose-glow via-nude to-accent"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="mt-4 font-body text-[10px] tracking-[0.25em] text-text-muted uppercase">
              Préparation {progress}%
            </p>
          </div>
        </motion.div>
      </div>
    </SceneCanvas>
  );
}
