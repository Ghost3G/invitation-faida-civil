"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";
import { HiDownload } from "react-icons/hi";
import { Button } from "@/components/ui/Button";
import { SceneCanvas } from "@/components/layout/SceneCanvas";
import { GlassCard } from "@/components/ui/GlassCard";
import { ShimmerText } from "@/components/ui/ShimmerText";
import { FloralDecor } from "@/components/shared/FloralDecor";
import { WeddingRings } from "@/components/shared/WeddingRings";
import { invitationConfig } from "@/config/invitation.config";
import { useScene } from "@/context/SceneContext";
import { useRsvp } from "@/context/RsvpContext";
import { triggerConfetti } from "@/lib/animations/confetti";

export function ConfirmationScene() {
  const { goToNext } = useScene();
  const { submission } = useRsvp();
  const qrWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (submission?.attendance === "yes") {
      triggerConfetti();
    }
  }, [submission]);

  const messages = {
    yes: {
      title: "Merci ! On vous attend !",
      body: `${invitationConfig.couple.displayNames} ont hâte de partager ce jour avec vous.`,
    },
    maybe: {
      title: "Merci pour votre réponse",
      body: "N'hésitez pas à confirmer dès que possible pour qu'on puisse vous réserver une place.",
    },
    no: {
      title: "Merci d'avoir répondu",
      body: `${invitationConfig.couple.displayNames} vous envoient toute leur affection.`,
    },
  };

  const msg = submission ? messages[submission.attendance] : messages.yes;
  const showQr = submission?.attendance === "yes" && submission.qrPayload;

  const downloadQr = () => {
    const canvas = qrWrapRef.current?.querySelector("canvas");
    if (!canvas || !submission) return;

    const link = document.createElement("a");
    const safeName = `${submission.firstName}-${submission.lastName}`
      .toLowerCase()
      .replace(/\s+/g, "-");
    link.download = `qr-acces-${safeName}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <SceneCanvas className="items-center px-5 text-center" scroll>
      <FloralDecor petals={false} className="opacity-50" />
      <div className="relative z-10 flex w-full max-w-sm flex-col items-center py-6">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", bounce: 0.5, duration: 1 }}
          className="glow-ring mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-rose-glow/20"
        >
          <WeddingRings size={48} />
        </motion.div>

        <GlassCard className="relative overflow-hidden text-center">
          <FloralDecor corners petals={false} className="opacity-30" />
          <div className="relative z-10">
            <ShimmerText as="h2" className="text-2xl">
              {msg.title}
            </ShimmerText>
            <p className="mt-4 text-sm leading-relaxed text-text-muted">{msg.body}</p>
            {submission && (
              <p className="mt-4 text-xs text-rose-glow">
                {submission.firstName} {submission.lastName}
              </p>
            )}

            {showQr && (
              <div className="mt-6">
                <p className="mb-3 text-xs font-medium tracking-widest text-text-muted uppercase">
                  Votre QR d&apos;accès — jour J
                </p>
                <div
                  ref={qrWrapRef}
                  className="mx-auto inline-block rounded-xl bg-white p-3"
                >
                  <QRCodeCanvas
                    value={submission.qrPayload!}
                    size={180}
                    level="M"
                    includeMargin
                  />
                </div>
                <p className="mt-3 text-xs text-text-muted">
                  Présentez ce code à l&apos;entrée de la salle
                </p>
                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  onClick={downloadQr}
                  className="mt-4 gap-2"
                >
                  <HiDownload className="h-4 w-4" />
                  Télécharger le QR code
                </Button>
              </div>
            )}
          </div>
        </GlassCard>

        <Button onClick={goToNext} className="mt-8 shrink-0" size="lg">
          Terminer
        </Button>
      </div>
    </SceneCanvas>
  );
}
