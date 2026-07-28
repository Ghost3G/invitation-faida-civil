"use client";

import { useEffect, useRef } from "react";
import { useScene } from "@/context/SceneContext";
import { useDeviceDetect } from "@/hooks/useDeviceDetect";

const SWIPE_THRESHOLD = 72;
const EDGE_ZONE = 40;

/** Swipe depuis le bord gauche pour revenir en arrière (mobile) */
export function useSwipeBack() {
  const { goToPrevious, canGoPrevious } = useScene();
  const { isTouch } = useDeviceDetect();
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!isTouch || !canGoPrevious) return;

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch.clientX <= EDGE_ZONE) {
        touchStart.current = { x: touch.clientX, y: touch.clientY };
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (!touchStart.current) return;

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStart.current.x;
      const deltaY = Math.abs(touch.clientY - touchStart.current.y);

      if (deltaX > SWIPE_THRESHOLD && deltaY < 80) {
        goToPrevious();
      }

      touchStart.current = null;
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [isTouch, canGoPrevious, goToPrevious]);
}
