export const themeConfig = {
  animation: {
    duration: {
      fast: 0.3,
      normal: 0.6,
      slow: 1.2,
    },
    easing: [0.22, 1, 0.36, 1] as const,
  },
  breakpoints: {
    mobile: 390,
    tablet: 768,
  },
  touchTarget: 48,
} as const;
