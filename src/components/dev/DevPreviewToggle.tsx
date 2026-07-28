"use client";

import { useMobilePreview } from "@/context/MobilePreviewContext";

export function DevPreviewToggle() {
  const { isPreview, togglePreview } = useMobilePreview();

  if (isPreview) return null;

  return (
    <button
      type="button"
      onClick={togglePreview}
      className="fixed bottom-4 left-4 z-[100] rounded-full border border-white/15 bg-royal/90 px-4 py-2 text-xs text-cream shadow-lg backdrop-blur-sm transition hover:border-accent/40"
    >
      📱 Aperçu téléphone
    </button>
  );
}
