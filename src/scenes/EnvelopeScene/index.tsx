"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { FloatingHearts } from "@/components/shared/FloatingHearts";
import { SceneCanvas } from "@/components/layout/SceneCanvas";
import { useScene } from "@/context/SceneContext";
import {
  createEnvelopeEntranceTimeline,
  createEnvelopeOpenTimeline,
} from "@/lib/animations/gsap-envelope";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { Letter } from "./Letter";
import { WaxSeal } from "./WaxSeal";

export function EnvelopeScene() {
  const { goToNext } = useScene();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const envelopeRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion || !envelopeRef.current) return;

    createEnvelopeEntranceTimeline({
      envelope: envelopeRef.current,
      flap: flapRef.current!,
      seal: sealRef.current!,
      letter: letterRef.current!,
    });
  }, [prefersReducedMotion]);

  const handleOpen = () => {
    if (isAnimating || isOpen) return;

    if (prefersReducedMotion) {
      setIsOpen(true);
      setShowContinue(true);
      if (letterRef.current) {
        gsap.set(letterRef.current, { opacity: 1, y: -180 });
      }
      return;
    }

    if (
      !envelopeRef.current ||
      !flapRef.current ||
      !sealRef.current ||
      !letterRef.current
    ) {
      return;
    }

    setIsAnimating(true);
    createEnvelopeOpenTimeline(
      {
        envelope: envelopeRef.current,
        flap: flapRef.current,
        seal: sealRef.current,
        letter: letterRef.current,
      },
      () => {
        setIsOpen(true);
        setIsAnimating(false);
        setShowContinue(true);
      },
    );
  };

  return (
    <SceneCanvas className="px-5" intensity="high" scroll>
      <FloatingHearts count={6} />

      <div className="flex min-h-0 flex-1 flex-col items-center justify-center py-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-20 mb-6 shrink-0 px-2 text-center"
        >
          <p className="text-[10px] tracking-[0.3em] text-text-muted uppercase">
            {isOpen ? "✦ Invitation dévoilée ✦" : "Étape 1"}
          </p>
          <h2 className="mt-2 font-display text-lg text-cream max-[380px]:text-base">
            {isOpen ? "Votre invitation" : "Touchez le sceau"}
          </h2>
          {!isOpen && (
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-2 text-xs text-accent"
            >
              Appuyez sur les alliances
            </motion.p>
          )}
        </motion.div>

        <div
          ref={envelopeRef}
          className="relative z-10 h-[clamp(11rem,42vw,15.5rem)] w-[clamp(15rem,88vw,20rem)] shrink-0"
          style={{
            perspective: 1200,
            transformStyle: "preserve-3d",
            WebkitFontSmoothing: "antialiased",
          }}
        >
          <Letter
            ref={letterRef}
            visible={isOpen}
            className="absolute left-3 right-3 top-8 z-[1] rounded-[1.25rem] px-4 py-5 will-change-transform"
          />

          <div
            className="absolute inset-x-0 bottom-0 z-[2] h-[68%] rounded-b-[2rem]"
            style={{
              background: "linear-gradient(165deg, #f7efe6 0%, #e8d5c4 55%, #e8c5c9 100%)",
              border: "2px solid rgba(143,168,138,0.4)",
              boxShadow:
                "0 16px 40px rgba(61,79,66,0.28), inset 0 1px 0 rgba(255,255,255,0.55)",
            }}
          />

          <div className="absolute inset-x-5 top-[46%] z-[3] h-px bg-accent/40" />

          <div
            ref={flapRef}
            className="absolute inset-x-0 top-[14%] z-[4] h-[46%] origin-top will-change-transform"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              background: "linear-gradient(180deg, #d4a5ab 0%, #c49098 100%)",
              clipPath: "polygon(0 0, 50% 100%, 100% 0)",
              boxShadow: "0 4px 12px rgba(61,79,66,0.15)",
            }}
          />

          <div
            ref={sealRef}
            className="absolute left-1/2 top-[44%] z-[5] -translate-x-1/2 -translate-y-1/2"
          >
            {!isOpen && <WaxSeal onClick={handleOpen} />}
          </div>
        </div>

        <AnimatePresence>
          {showContinue && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-20 mt-8 w-full max-w-xs shrink-0"
            >
              <Button size="lg" onClick={goToNext} className="w-full">
                Découvrir la cérémonie
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SceneCanvas>
  );
}
