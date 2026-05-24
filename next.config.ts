import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wp.takeharatatamiten.com",
      },
    ],
  },
};

export default nextConfig;
