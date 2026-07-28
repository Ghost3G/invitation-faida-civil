"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SceneCanvas } from "@/components/layout/SceneCanvas";
import { ScriptText } from "@/components/ui/ScriptText";
import { FloralDecor } from "@/components/shared/FloralDecor";
import { WeddingFlourish } from "@/components/shared/WeddingFlourish";
import { WeddingRings } from "@/components/shared/WeddingRings";
import { invitationConfig } from "@/config/invitation.config";
import { useScene } from "@/context/SceneContext";

export function ProgramScene() {
  const { goToNext } = useScene();
  const { program, couple } = invitationConfig;

  return (
    <SceneCanvas className="relative px-5" intensity="low" scroll>
      <FloralDecor petals={false} className="opacity-40" />

      <div className="relative z-10 mx-auto flex w-full max-w-sm flex-col py-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-6 shrink-0 text-center"
        >
          <div className="mb-3 flex justify-center">
            <WeddingRings size={72} variant="photo" />
          </div>

          <p className="font-display text-[11px] tracking-[0.35em] text-nude uppercase">
            Notre journée
          </p>

          <ScriptText
            as="h2"
            className="mt-2 text-[2.6rem] leading-none text-rose-glow max-[380px]:text-[2.15rem]"
          >
            Déroulement
          </ScriptText>

          <WeddingFlourish className="my-4" />

          <p className="mx-auto max-w-[16rem] font-body text-sm leading-relaxed text-cream/85">
            Un moment simple, sincère et plein d&apos;amour —
            <span className="text-nude"> {couple.displayNames}</span> vous
            attendent.
          </p>
        </motion.div>

        <div className="relative flex-1 space-y-0 pb-4">
          {/* Ligne verticale douce */}
          <div
            className="absolute top-3 bottom-3 left-[1.15rem] w-px bg-gradient-to-b from-transparent via-rose-glow/40 to-transparent"
            aria-hidden
          />

          {program.map((item, index) => (
            <motion.div
              key={`${item.time}-${item.label}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.1 }}
              className="relative flex gap-4 pb-6 last:pb-0"
            >
              <div className="relative z-10 mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-rose-glow/45 bg-royal/70 shadow-[0_0_18px_rgba(212,165,171,0.25)]">
                <span className="h-2 w-2 rounded-full bg-rose-glow" />
              </div>

              <div className="min-w-0 flex-1 rounded-[1.5rem] border border-white/12 bg-cream/8 px-4 py-3.5 backdrop-blur-sm">
                <p className="font-display text-sm tracking-wide text-rose-glow">
                  {item.time}
                </p>
                <p className="mt-1 font-body text-sm text-cream">{item.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mb-5 text-center font-script text-xl text-nude"
        >
          Avec tout notre amour
        </motion.p>

        <Button onClick={goToNext} className="w-full shrink-0" size="lg">
          Le thème
        </Button>
      </div>
    </SceneCanvas>
  );
}
