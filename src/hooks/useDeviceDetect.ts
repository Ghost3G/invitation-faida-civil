"use client";

import { useEffect, useState } from "react";

interface DeviceInfo {
  isMobile: boolean;
  isTouch: boolean;
}

export function useDeviceDetect(): DeviceInfo {
  const [device, setDevice] = useState<DeviceInfo>({
    isMobile: false,
    isTouch: false,
  });

  useEffect(() => {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    setDevice({ isMobile, isTouch });

    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handler = (event: MediaQueryListEvent) => {
      setDevice((prev) => ({ ...prev, isMobile: event.matches }));
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return device;
}
