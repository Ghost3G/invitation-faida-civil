"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { invitationConfig } from "@/config/invitation.config";
import { useScene } from "@/context/SceneContext";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const AUTOPLAY_MS = 3500;

export function GalleryScene() {
  const { goToNext } = useScene();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    dragFree: false,
  });

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || prefersReducedMotion || isPaused) return;

    const timer = setInterval(() => {
      emblaApi.scrollNext();
    }, AUTOPLAY_MS);

    return () => clearInterval(timer);
  }, [emblaApi, prefersReducedMotion, isPaused, selectedIndex]);

  const total = invitationConfig.gallery.length;

  return (
    <div className="relative flex h-full min-h-0 w-full flex-col overflow-hidden bg-royal">
      <div
        className="relative min-h-0 w-full flex-1"
        onPointerDown={() => setIsPaused(true)}
        onPointerUp={() => setIsPaused(false)}
        onPointerLeave={() => setIsPaused(false)}
      >
        <div ref={emblaRef} className="h-full overflow-hidden">
          <div className="flex h-full">
            {invitationConfig.gallery.map((src, index) => {
              const isActive = selectedIndex === index;

              return (
                <div
                  key={`${src}-${index}`}
                  className="relative h-full min-w-0 shrink-0 grow-0 basis-full"
                >
                  <motion.div
                    animate={{ scale: isActive ? 1.04 : 1 }}
                    transition={{
                      duration: isActive ? AUTOPLAY_MS / 1000 : 0.5,
                      ease: "linear",
                    }}
                    className="relative h-full w-full"
                  >
                    <Image
                      src={src}
                      alt={`Photo ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="100vw"
                      priority={index < 2}
                    />
                  </motion.div>

                  <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-royal/70 to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-royal via-royal/80 to-transparent" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 px-5 pt-chrome text-center">
          <p className="text-[10px] tracking-[0.3em] text-text-muted uppercase">
            ✦ Notre histoire ✦
          </p>
          <p className="mt-1 font-display text-lg text-cream max-[380px]:text-base">
            {invitationConfig.couple.displayNames}
          </p>
          <p className="mt-1 text-xs text-rose-glow">
            {String(selectedIndex + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </p>
        </div>
      </div>

      <div className="relative z-10 shrink-0 px-5 pb-progress">
        <Button onClick={goToNext} className="mt-3 w-full">
          Voir le lieu
        </Button>
      </div>
    </div>
  );
}
