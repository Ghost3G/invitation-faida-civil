"use client";

import { motion } from "framer-motion";
import { HiLocationMarker, HiOutlineExternalLink } from "react-icons/hi";
import { Button } from "@/components/ui/Button";
import { SceneCanvas } from "@/components/layout/SceneCanvas";
import { GlassCard } from "@/components/ui/GlassCard";
import { ShimmerText } from "@/components/ui/ShimmerText";
import { WeddingFlourish } from "@/components/shared/WeddingFlourish";
import { WeddingRings } from "@/components/shared/WeddingRings";
import {
  WhatsAppContactButton,
} from "@/components/ui/WhatsAppShareButton";
import { invitationConfig } from "@/config/invitation.config";
import { useScene } from "@/context/SceneContext";
import { getGoogleMapsDirectionsUrl, getGoogleMapsUrl } from "@/lib/utils/maps";

export function LocationScene() {
  const { goToNext } = useScene();
  const { event } = invitationConfig;
  const { lat, lng } = event.coordinates;
  const osmEmbed = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.008}%2C${lat - 0.008}%2C${lng + 0.008}%2C${lat + 0.008}&layer=mapnik&marker=${lat}%2C${lng}`;

  return (
    <SceneCanvas className="px-5" intensity="low" scroll>
      <div className="flex w-full max-w-sm flex-col items-center py-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-5 shrink-0 text-center"
        >
          <div className="mb-2 flex justify-center">
            <WeddingRings size={40} />
          </div>
          <p className="text-xs tracking-[0.25em] text-text-muted uppercase">
            Le lieu
          </p>
          <ShimmerText as="h2" className="mt-1 text-2xl">
            Comment venir
          </ShimmerText>
          <WeddingFlourish className="mt-3" />
        </motion.div>

        <GlassCard className="w-full shrink-0 overflow-hidden p-0">
          <div className="relative h-40 w-full max-[380px]:h-36">
            <iframe
              title="Carte du lieu"
              src={osmEmbed}
              className="h-full w-full border-0"
              loading="lazy"
            />
          </div>
          <div className="space-y-4 p-5">
            <div className="flex items-start gap-3">
              <HiLocationMarker className="mt-0.5 h-5 w-5 shrink-0 text-rose-glow" />
              <div>
                <p className="font-display text-sm text-cream">{event.venue}</p>
                <p className="mt-1 text-sm text-text-muted">{event.address}</p>
                <p className="text-sm text-text-muted">{event.city}</p>
              </div>
            </div>

            {(event.arrivalNote || event.parkingNote || event.dressNote) && (
              <div className="space-y-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-xs leading-relaxed text-text-muted">
                {event.arrivalNote && (
                  <p>
                    <span className="text-rose-glow">Arrivée — </span>
                    {event.arrivalNote}
                  </p>
                )}
                {event.parkingNote && (
                  <p>
                    <span className="text-rose-glow">Parking — </span>
                    {event.parkingNote}
                  </p>
                )}
                {event.dressNote && (
                  <p>
                    <span className="text-rose-glow">Tenue — </span>
                    {event.dressNote}
                  </p>
                )}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <a
                href={getGoogleMapsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-12 items-center justify-center gap-2 rounded-full glass-card py-3 text-sm text-cream transition active:scale-95"
              >
                <HiOutlineExternalLink className="h-4 w-4" />
                Ouvrir dans Google Maps
              </a>
              <a
                href={getGoogleMapsDirectionsUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-rose-glow/25 py-3 text-sm text-cream transition active:scale-95"
              >
                Itinéraire
              </a>
              <WhatsAppContactButton />
            </div>
          </div>
        </GlassCard>

        <Button onClick={goToNext} className="mt-6 shrink-0" size="lg">
          Confirmer ma présence
        </Button>
      </div>
    </SceneCanvas>
  );
}
