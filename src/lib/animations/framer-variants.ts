import { themeConfig } from "@/config/theme.config";

export const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const slideUpVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

export const sceneTransition = {
  duration: themeConfig.animation.duration.normal,
  ease: themeConfig.animation.easing,
};
