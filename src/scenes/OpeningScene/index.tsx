"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ScriptText } from "@/components/ui/ScriptText";
import { ShimmerText } from "@/components/ui/ShimmerText";
import { FloatingHearts } from "@/components/shared/FloatingHearts";
import { FloralDecor } from "@/components/shared/FloralDecor";
import { PhotoHalfScreen } from "@/components/shared/PhotoHalfScreen";
import { WeddingFlourish } from "@/components/shared/WeddingFlourish";
import { WeddingRings } from "@/components/shared/WeddingRings";
import { SceneCanvas } from "@/components/layout/SceneCanvas";
import { invitationConfig } from "@/config/invitation.config";
import { useScene } from "@/context/SceneContext";
import { useAudio } from "@/hooks";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function OpeningScene() {
  const { goToNext } = useScene();
  const { play } = useAudio();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(
      () => setShowButton(true),
      prefersReducedMotion ? 500 : 1400,
    );
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  const handleContinue = () => {
    play();
    goToNext();
  };

  return (
    <SceneCanvas className="relative h-full min-h-0" intensity="low" noChromePadding>
      <FloralDecor petals petalCount={5} />
      <FloatingHearts count={6} />
      <PhotoHalfScreen
        fullScreen
        showCrown={false}
        priority
        overlay={
          <div className="relative mx-auto w-full max-w-sm space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mb-1 flex justify-center"
              >
                <WeddingRings size={96} animated variant="photo" />
              </motion.div>

              <motion.p
                animate={{ opacity: [0.55, 1, 0.55] }}
                transition={{ duration: 3.2, repeat: Infinity }}
                className="font-display text-[11px] tracking-[0.35em] text-nude uppercase"
              >
                Avec amour
              </motion.p>

              <ScriptText
                as="h1"
                className="mt-2 text-[2.85rem] leading-none text-rose-glow drop-shadow-sm max-[380px]:text-[2.35rem]"
              >
                {invitationConfig.couple.displayNames}
              </ScriptText>

              <WeddingFlourish className="my-3" />

              <ShimmerText as="p" className="font-display text-xl tracking-wide">
                se disent oui
              </ShimmerText>

              <p className="mt-3 font-body text-sm text-cream/90">Mariage civil</p>
              <p className="mt-1 font-body text-xs text-text-muted">
                {invitationConfig.event.city}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: showButton ? 1 : 0, y: showButton ? 0 : 16 }}
              transition={{ duration: 0.6 }}
            >
              <Button size="lg" onClick={handleContinue} className="w-full">
                Ouvrir l&apos;invitation
              </Button>
            </motion.div>
          </div>
        }
      />
    </SceneCanvas>
  );
}
