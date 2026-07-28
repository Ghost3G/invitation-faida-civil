"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ScriptText } from "@/components/ui/ScriptText";
import { FloatingHearts } from "@/components/shared/FloatingHearts";
import { FloralDecor } from "@/components/shared/FloralDecor";
import { PhotoHalfScreen } from "@/components/shared/PhotoHalfScreen";
import { WeddingFlourish } from "@/components/shared/WeddingFlourish";
import { WeddingRings } from "@/components/shared/WeddingRings";
import { SceneCanvas } from "@/components/layout/SceneCanvas";
import { invitationConfig } from "@/config/invitation.config";
import { useScene } from "@/context/SceneContext";
import { formatEventDate } from "@/lib/utils/date";

export function HeroScene() {
  const { goToNext } = useScene();
  const { couple, event } = invitationConfig;

  return (
    <SceneCanvas
      className="relative h-full min-h-0"
      intensity="low"
      noChromePadding
    >
      <FloralDecor petals petalCount={4} />
      <FloatingHearts count={6} />
      <PhotoHalfScreen
        fullScreen
        showCrown={false}
        src={couple.ceremonyPhoto}
        overlay={
          <div className="relative mx-auto w-full max-w-sm space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.55 }}
                className="mb-2 flex justify-center"
              >
                <WeddingRings size={88} animated variant="photo" />
              </motion.div>

              <p className="font-display text-[11px] tracking-[0.35em] text-nude uppercase">
                Mariage civil
              </p>

              <ScriptText
                as="h2"
                className="mt-2 text-[2.7rem] leading-none text-rose-glow drop-shadow-sm max-[380px]:text-[2.2rem]"
              >
                {couple.displayNames}
              </ScriptText>

              <WeddingFlourish className="my-3" />

              <p className="font-display text-sm tracking-wide text-cream">
                {couple.fullNames}
              </p>

              <div className="soft-divider mx-auto my-4 w-20" />

              <p className="font-body text-xs leading-relaxed text-cream/90">
                {formatEventDate(event.date)}
              </p>
              <p className="mt-2 font-display text-sm text-nude">{event.venue}</p>
              <p className="mt-1 font-body text-xs text-text-muted">
                {event.address}
              </p>
              <p className="font-body text-xs text-text-muted">{event.city}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.55 }}
            >
              <Button size="lg" onClick={goToNext} className="w-full">
                Le compte à rebours
              </Button>
            </motion.div>
          </div>
        }
      />
    </SceneCanvas>
  );
}
