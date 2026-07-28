export const mobileConfig = {
  /** Invitation partagée via WhatsApp — mobile & tablette uniquement */
  targetDevices: ["mobile", "tablet"] as const,
  maxWidth: 480,
  safeArea: true,
  touchTarget: 48,
  gestures: {
    swipeToContinue: true,
    tapToOpen: true,
  },
  whatsapp: {
    shareText:
      "Vous êtes invité(e) au mariage civil de Lumière & Faïda. 💍",
    ogImage: "/images/og/invitation.png",
  },
  performance: {
    maxImageWeight: 200,
    preloadCount: 3,
    reducedMotionOnLowEnd: true,
  },
} as const;
