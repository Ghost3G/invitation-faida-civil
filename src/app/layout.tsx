import type { Metadata, Viewport } from "next";
import { Allura, Cormorant_Garamond, Outfit } from "next/font/google";
import { invitationConfig } from "@/config/invitation.config";
import "./globals.css";

/** Nettoie une URL publique (évite les valeurs collées en double dans Vercel). */
function getSiteUrl() {
  const raw =
    process.env.NEXT_PUBLIC_INVITATION_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "") ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
    "https://invitation-faida-civil.vercel.app";

  // Si quelqu'un a collé l'URL 2x, on garde le premier https://... valide
  const match = raw.match(/https?:\/\/[^\s/]+(?:\/[^\s]*)?/i);
  let url = (match?.[0] ?? raw).trim().replace(/\/$/, "");

  try {
    const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
    return `${parsed.protocol}//${parsed.host}`;
  } catch {
    return "https://invitation-faida-civil.vercel.app";
  }
}

const siteUrl = getSiteUrl();
const ogImageUrl = `${siteUrl}/images/hero/couple.png`;

/** Corps — moderne, lisible, élégant */
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

/** Titres — sérif mariage classique */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

/** Script — calligraphie mariage douce */
const allura = Allura({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-allura",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: invitationConfig.event.title,
  description: invitationConfig.event.description,
  openGraph: {
    title: invitationConfig.event.title,
    description: invitationConfig.event.description,
    url: siteUrl,
    siteName: invitationConfig.couple.displayNames,
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: invitationConfig.couple.displayNames,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: invitationConfig.event.title,
    description: invitationConfig.event.description,
    images: [ogImageUrl],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: invitationConfig.couple.displayNames,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: invitationConfig.theme.cream,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${outfit.variable} ${cormorant.variable} ${allura.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
