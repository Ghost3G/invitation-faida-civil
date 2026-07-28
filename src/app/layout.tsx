import type { Metadata, Viewport } from "next";
import { Allura, Cormorant_Garamond, Outfit } from "next/font/google";
import { invitationConfig } from "@/config/invitation.config";
import "./globals.css";

function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_INVITATION_URL) {
    return process.env.NEXT_PUBLIC_INVITATION_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

const siteUrl = getSiteUrl();

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
    type: "website",
    locale: "fr_FR",
    images: ["/images/og/invitation.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: invitationConfig.event.title,
    description: invitationConfig.event.description,
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
