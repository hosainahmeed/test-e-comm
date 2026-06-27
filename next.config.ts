import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized:true
  },
  allowedDevOrigins: ['192.168.0.105'],
};

export default nextConfig;
