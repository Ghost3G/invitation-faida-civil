"use client";

import { useMobilePreview } from "@/context/MobilePreviewContext";
import { cn } from "@/lib/utils/cn";

const PHONE_WIDTH = 390;
const PHONE_HEIGHT = 844;

interface MobilePreviewFrameProps {
  children: React.ReactNode;
}

export function MobilePreviewFrame({ children }: MobilePreviewFrameProps) {
  const { isPreview, togglePreview } = useMobilePreview();

  if (!isPreview) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-[#0c0c10] px-4 py-8">
      <div className="mb-4 flex items-center gap-3">
        <p className="text-xs tracking-wide text-zinc-500">
          Aperçu téléphone · iPhone 14 ({PHONE_WIDTH}×{PHONE_HEIGHT})
        </p>
        <button
          type="button"
          onClick={togglePreview}
          className="rounded-full border border-zinc-700 px-3 py-1 text-[11px] text-zinc-400 transition hover:border-zinc-500 hover:text-zinc-200"
        >
          Plein écran
        </button>
      </div>

      <div
        className={cn(
          "relative rounded-[3rem] border-[10px] border-zinc-800 bg-zinc-900 p-2",
          "shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_30px_80px_rgba(0,0,0,0.65)]",
        )}
        style={{ width: PHONE_WIDTH + 24, height: PHONE_HEIGHT + 24 }}
      >
        <div className="pointer-events-none absolute left-1/2 top-4 z-[60] h-7 w-32 -translate-x-1/2 rounded-full bg-zinc-950" />

        <div
          className="relative overflow-hidden rounded-[2.35rem] bg-royal"
          style={{ width: PHONE_WIDTH, height: PHONE_HEIGHT }}
        >
          {children}
        </div>

        <div className="pointer-events-none absolute bottom-2 left-1/2 h-1 w-28 -translate-x-1/2 rounded-full bg-zinc-700/80" />
      </div>

      <p className="mt-4 max-w-sm text-center text-[11px] leading-relaxed text-zinc-600">
        Mode développement uniquement. Sur un vrai téléphone, l&apos;invitation
        s&apos;affiche en plein écran.
      </p>
    </div>
  );
}
