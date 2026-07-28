"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SceneCanvas } from "@/components/layout/SceneCanvas";
import { ShimmerText } from "@/components/ui/ShimmerText";
import { WeddingFlourish } from "@/components/shared/WeddingFlourish";
import { WeddingRings } from "@/components/shared/WeddingRings";
import { invitationConfig } from "@/config/invitation.config";
import { useScene } from "@/context/SceneContext";

export function ThemeScene() {
  const { goToNext } = useScene();
  const { dressCode } = invitationConfig;

  return (
    <SceneCanvas className="px-5" intensity="low" scroll>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-4 shrink-0 text-center"
      >
        <div className="mb-2 flex justify-center">
          <WeddingRings size={40} />
        </div>
        <p className="font-display text-[11px] tracking-[0.3em] text-text-muted uppercase">
          Ambiance
        </p>
        <ShimmerText as="h2" className="mt-1 text-2xl">
          {dressCode.title}
        </ShimmerText>
        <WeddingFlourish className="mt-3" />
        <p className="mt-3 px-2 font-body text-xs leading-relaxed text-text-muted">
          {dressCode.subtitle}
        </p>
      </motion.div>

      <div className="flex min-h-0 flex-1 flex-col gap-4 pb-4">
        {dressCode.looks.map((look, index) => (
          <motion.article
            key={look.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.08 }}
            className="overflow-hidden rounded-[1.75rem] border border-rose-glow/25 bg-cream/10 shadow-[0_12px_36px_rgba(61,79,66,0.22)]"
          >
            <div className="relative aspect-[4/3] w-full bg-royal-mid/40">
              <Image
                src={look.image}
                alt={look.label}
                fill
                className="object-cover"
                sizes="(max-width: 480px) 100vw, 420px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-royal/85 via-royal/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="font-script text-2xl text-rose-glow">{look.label}</p>
                <p className="mt-1 font-body text-xs text-cream/85">
                  {look.description}
                </p>
              </div>
            </div>
          </motion.article>
        ))}

        <div className="mt-1 flex justify-center gap-2">
          <span className="h-3 w-3 rounded-full bg-nude" title="Beige nude" />
          <span className="h-3 w-3 rounded-full bg-rose-glow" title="Rose poudré" />
          <span className="h-3 w-3 rounded-full bg-accent" title="Vert sauge doux" />
        </div>
      </div>

      <Button onClick={goToNext} className="mt-2 shrink-0" size="lg">
        Galerie photos
      </Button>
    </SceneCanvas>
  );
}
