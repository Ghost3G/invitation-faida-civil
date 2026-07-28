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
import { useCountdown } from "@/hooks/useCountdown";
import { formatEventDate } from "@/lib/utils/date";
import { cn } from "@/lib/utils/cn";

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex min-h-[4.25rem] flex-col items-center justify-center rounded-2xl border border-white/15 bg-royal/45 px-1.5 py-2.5 backdrop-blur-md max-[380px]:min-h-[3.75rem]">
      <motion.span
        key={value}
        initial={{ scale: 0.75, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="font-display text-3xl leading-none text-rose-glow max-[380px]:text-2xl"
      >
        {String(value).padStart(2, "0")}
      </motion.span>
      <span className="mt-1.5 text-[9px] tracking-[0.18em] text-text-muted uppercase">
        {label}
      </span>
    </div>
  );
}

export function CountdownScene() {
  const { goToNext } = useScene();
  const countdown = useCountdown(invitationConfig.event.date);
  const { couple, event } = invitationConfig;

  return (
    <SceneCanvas
      className="relative h-full min-h-0"
      intensity="low"
      noChromePadding
    >
      <FloralDecor petals petalCount={4} />
      <FloatingHearts count={5} />
      <PhotoHalfScreen
        fullScreen
        showCrown={false}
        src={couple.countdownPhoto}
        overlay={
          <div className="relative mx-auto w-full max-w-sm space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.12, duration: 0.55 }}
                className="mb-2 flex justify-center"
              >
                <WeddingRings size={80} animated variant="photo" />
              </motion.div>

              <p className="font-display text-[11px] tracking-[0.35em] text-nude uppercase">
                Le grand jour
              </p>

              <ScriptText
                as="h2"
                className="mt-2 text-[2.5rem] leading-none text-rose-glow drop-shadow-sm max-[380px]:text-[2.1rem]"
              >
                Compte à rebours
              </ScriptText>

              <WeddingFlourish className="my-3" />

              {countdown.isExpired ? (
                <motion.p
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={cn(
                    "font-display text-2xl text-cream",
                    "max-[380px]:text-xl",
                  )}
                >
                  C&apos;est aujourd&apos;hui !
                </motion.p>
              ) : (
                <div className="grid grid-cols-4 gap-2 max-[380px]:gap-1.5">
                  <TimeBlock value={countdown.days} label="Jours" />
                  <TimeBlock value={countdown.hours} label="Hrs" />
                  <TimeBlock value={countdown.minutes} label="Min" />
                  <TimeBlock value={countdown.seconds} label="Sec" />
                </div>
              )}

              <p className="mt-4 font-body text-xs text-cream/90">
                {formatEventDate(event.date)}
              </p>
              <p className="mt-1 font-body text-[11px] text-text-muted">
                {event.venue}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.55 }}
            >
              <Button size="lg" onClick={goToNext} className="w-full">
                Voir le programme
              </Button>
            </motion.div>
          </div>
        }
      />
    </SceneCanvas>
  );
}
