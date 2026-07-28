"use client";

import { forwardRef } from "react";
import { invitationConfig } from "@/config/invitation.config";
import { formatEventDate } from "@/lib/utils/date";
import { cn } from "@/lib/utils/cn";
import { WeddingFlourish } from "@/components/shared/WeddingFlourish";
import { WeddingRings } from "@/components/shared/WeddingRings";

interface LetterProps {
  className?: string;
  visible?: boolean;
}

export const Letter = forwardRef<HTMLDivElement, LetterProps>(
  function Letter({ className, visible = false }, ref) {
    const { envelope, event, couple } = invitationConfig;

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-[1.5rem] border border-rose-glow/35 shadow-lg",
          className,
        )}
        style={{ backgroundColor: envelope.paperColor }}
      >
        <div className="mb-2 flex justify-center">
          <WeddingRings size={36} />
        </div>
        <WeddingFlourish className="mb-2 text-accent" />
        <p className="font-display text-[10px] tracking-[0.22em] text-accent uppercase">
          {envelope.recipientLabel}
        </p>
        <h3 className="mt-2 font-script text-2xl leading-snug text-[#5c7360]">
          {couple.displayNames}
        </h3>
        <p className="mt-1 font-display text-sm text-[#3d4a40]/80">Mariage civil</p>
        <p className="mt-3 text-xs leading-relaxed text-[#5c6b60]">
          {envelope.letterMessage ?? event.description}
        </p>
        <div className="mt-3 space-y-1 border-t border-rose-glow/30 pt-3 text-xs text-[#6b7a6e]">
          <p>{formatEventDate(event.date)}</p>
          <p className="font-medium text-[#5c7360]">{event.venue}</p>
          <p>{event.address}</p>
          <p>{event.city}</p>
        </div>
        {visible && (
          <p className="mt-3 text-center font-display text-[10px] tracking-[0.2em] text-accent uppercase">
            Avec tout notre amour
          </p>
        )}
      </div>
    );
  },
);
