"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface MobilePreviewContextValue {
  isPreview: boolean;
  togglePreview: () => void;
}

const MobilePreviewContext = createContext<MobilePreviewContextValue>({
  isPreview: false,
  togglePreview: () => {},
});

export function MobilePreviewProvider({
  children,
  enabled,
}: {
  children: ReactNode;
  enabled: boolean;
}) {
  const [isPreview, setIsPreview] = useState(enabled);

  useEffect(() => {
    if (!enabled) {
      setIsPreview(false);
      return;
    }

    const mq = window.matchMedia("(max-width: 520px)");
    const update = () => setIsPreview(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [enabled]);

  const value = useMemo(
    () => ({
      isPreview,
      togglePreview: () => setIsPreview((prev) => !prev),
    }),
    [isPreview],
  );

  return (
    <MobilePreviewContext.Provider value={value}>
      {children}
    </MobilePreviewContext.Provider>
  );
}

export function useMobilePreview() {
  return useContext(MobilePreviewContext);
}
