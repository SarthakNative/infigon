import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    domains: ['fakestoreapi.com'],
    remotePatterns: [new URL('https://fakestoreapi.com/**')],
  },
   compiler: {
    styledComponents: true,
  }
};

export default nextConfig;
