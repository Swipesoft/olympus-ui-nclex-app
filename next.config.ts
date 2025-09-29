import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ⚠️ This allows production builds to succeed
    // even if there are ESLint errors.
    ignoreDuringBuilds: true,
  },
  // you can add other Next.js config options here

};

export default nextConfig;
