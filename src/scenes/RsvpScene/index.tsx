"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SceneCanvas } from "@/components/layout/SceneCanvas";
import { Button } from "@/components/ui/Button";
import { ScriptText } from "@/components/ui/ScriptText";
import { FloralDecor } from "@/components/shared/FloralDecor";
import { WeddingFlourish } from "@/components/shared/WeddingFlourish";
import { WeddingRings } from "@/components/shared/WeddingRings";
import { invitationConfig } from "@/config/invitation.config";
import { useScene } from "@/context/SceneContext";
import { useRsvp } from "@/context/RsvpContext";
import type { RsvpFormData } from "@/types/rsvp";
import type { RsvpSchemaData } from "@/lib/validations/rsvp.schema";
import { RsvpForm } from "./RsvpForm";

export function RsvpScene() {
  const { goToScene } = useScene();
  const { submission, setSubmission, clearSubmission } = useRsvp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { couple, rsvp } = invitationConfig;

  if (submission) {
    return (
      <SceneCanvas className="relative items-center px-5 text-center" intensity="low">
        <FloralDecor petals={false} className="opacity-40" />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-sm space-y-4 rounded-[2rem] border border-white/12 bg-cream/8 px-6 py-8 backdrop-blur-sm"
        >
          <div className="flex justify-center">
            <WeddingRings size={72} variant="photo" />
          </div>
          <ScriptText as="h2" className="text-[2.4rem] leading-none text-rose-glow">
            Merci
          </ScriptText>
          <WeddingFlourish />
          <p className="font-body text-sm leading-relaxed text-cream/85">
            {submission.firstName}, votre réponse est bien enregistrée
            {submission.attendance === "yes"
              ? " — votre QR d'accès vous attend."
              : "."}
          </p>
          <p className="font-script text-xl text-nude">
            {couple.displayNames}
          </p>
          <Button
            size="lg"
            className="w-full"
            onClick={() => goToScene("confirmation")}
          >
            Voir ma confirmation
          </Button>
          <button
            type="button"
            onClick={clearSubmission}
            className="w-full py-2 font-body text-xs tracking-wide text-text-muted underline decoration-white/20 underline-offset-4 transition hover:text-nude"
          >
            Modifier ma réponse
          </button>
        </motion.div>
      </SceneCanvas>
    );
  }

  const handleSubmit = async (data: RsvpSchemaData) => {
    setIsSubmitting(true);
    setError(null);

    const payload: RsvpFormData = {
      ...data,
      email: data.email || "",
      guestCount: data.attendance === "yes" ? data.guestCount : 0,
      drinks: data.attendance === "yes" ? data.drinks ?? [] : [],
    };

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const body = await response.json();

      if (!response.ok || !body.success) {
        setError(
          body.message ?? "Impossible d'enregistrer votre réponse. Réessayez.",
        );
        return;
      }

      setSubmission({
        ...payload,
        submittedAt: new Date().toISOString(),
        token: body.data?.token,
        qrPayload: body.data?.qrPayload,
      });
      goToScene("confirmation");
    } catch {
      setError("Erreur de connexion. Vérifiez votre réseau et réessayez.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SceneCanvas className="relative px-5" intensity="low" scroll>
      <FloralDecor petals={false} className="opacity-35" />

      <div className="relative z-10 mx-auto flex w-full max-w-sm flex-col py-3">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 shrink-0 text-center"
        >
          <div className="mb-3 flex justify-center">
            <WeddingRings size={68} variant="photo" />
          </div>

          <p className="font-display text-[11px] tracking-[0.35em] text-nude uppercase">
            RSVP
          </p>

          <ScriptText
            as="h2"
            className="mt-2 text-[2.45rem] leading-none text-rose-glow max-[380px]:text-[2.05rem]"
          >
            Votre présence
          </ScriptText>

          <WeddingFlourish className="my-3" />

          <p className="mx-auto max-w-[17rem] font-body text-sm leading-relaxed text-cream/85">
            Confirmez votre présence pour partager ce jour avec{" "}
            <span className="text-nude">{couple.displayNames}</span>.
          </p>
          <p className="mt-2 font-body text-[11px] text-text-muted">
            Réponse avant le{" "}
            {new Date(rsvp.deadline).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="min-h-0 flex-1 rounded-[1.75rem] border border-white/12 bg-cream/8 p-4 backdrop-blur-sm"
        >
          {error && (
            <p className="mb-4 rounded-2xl border border-rose-glow/35 bg-rose-glow/15 px-4 py-3 text-center text-sm text-cream">
              {error}
            </p>
          )}
          <RsvpForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </motion.div>
      </div>
    </SceneCanvas>
  );
}
