import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Évite que Next prenne le package-lock du dossier parent en local
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
