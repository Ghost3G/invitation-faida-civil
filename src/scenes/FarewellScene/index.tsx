"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";
import { SceneCanvas } from "@/components/layout/SceneCanvas";
import { GlassCard } from "@/components/ui/GlassCard";
import { ShimmerText } from "@/components/ui/ShimmerText";
import { FloralDecor } from "@/components/shared/FloralDecor";
import { WeddingFlourish } from "@/components/shared/WeddingFlourish";
import { WeddingRings } from "@/components/shared/WeddingRings";
import { WhatsAppShareButton } from "@/components/ui/WhatsAppShareButton";
import { Button } from "@/components/ui/Button";
import { invitationConfig } from "@/config/invitation.config";
import { mobileConfig } from "@/config/mobile.config";
import { useRsvp } from "@/context/RsvpContext";
import { useScene } from "@/context/SceneContext";

export function FarewellScene() {
  const { submission } = useRsvp();
  const { goToScene } = useScene();
  const [url, setUrl] = useState(
    process.env.NEXT_PUBLIC_INVITATION_URL ?? "",
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.origin);
    }
  }, []);

  return (
    <SceneCanvas className="items-center px-5 text-center" scroll>
      <FloralDecor petals petalCount={4} className="opacity-60" />
      <div className="relative z-10 flex w-full max-w-sm flex-col items-center py-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="mb-3 flex justify-center">
            <WeddingRings size={52} animated />
          </div>
          <ShimmerText as="h2" className="text-3xl">
            À bientôt !
          </ShimmerText>
          <WeddingFlourish className="my-3" />
          <p className="mt-1 text-sm text-text-muted">
            {invitationConfig.couple.displayNames} vous disent à très bientôt
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-8 w-full space-y-3"
        >
          <GlassCard className="inline-block w-full p-5">
            <QRCodeSVG
              value={url || "https://localhost"}
              size={140}
              bgColor="transparent"
              fgColor="#D4A5AB"
              level="M"
            />
            <p className="mt-3 text-[10px] tracking-widest text-text-muted uppercase">
              Lien de l&apos;invitation
            </p>
          </GlassCard>

          <WhatsAppShareButton />

          {submission?.attendance === "yes" && submission.qrPayload && (
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => goToScene("confirmation")}
            >
              Retrouver mon QR d&apos;accès
            </Button>
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-xs text-text-muted"
        >
          {mobileConfig.whatsapp.shareText}
        </motion.p>
      </div>
    </SceneCanvas>
  );
}
