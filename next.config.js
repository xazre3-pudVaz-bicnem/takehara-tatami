/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wp.takeharatatamiten.com",
      },
    ],
  },
};

module.exports = nextConfig;
