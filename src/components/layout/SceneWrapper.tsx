"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  fadeVariants,
  sceneTransition,
  slideUpVariants,
} from "@/lib/animations/framer-variants";
import { useMobilePreview } from "@/context/MobilePreviewContext";
import { cn } from "@/lib/utils/cn";

interface SceneWrapperProps {
  sceneKey: string;
  children: React.ReactNode;
  className?: string;
}

export function SceneWrapper({ sceneKey, children, className }: SceneWrapperProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { isPreview } = useMobilePreview();
  const variants = prefersReducedMotion ? fadeVariants : slideUpVariants;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={sceneKey}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={
          prefersReducedMotion ? { duration: 0.2 } : sceneTransition
        }
        className={cn(
          "flex min-h-0 w-full flex-col overflow-hidden",
          isPreview ? "h-full" : "h-dvh",
          className,
        )}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
