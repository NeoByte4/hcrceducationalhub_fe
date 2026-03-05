import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8055",
        pathname: "/assets/**",
      },
      {
        protocol: "http",
        hostname: "http://0.0.0.0:8055",
        port: "8055",
        pathname: "/assets/**",
      },
    ],
  },
};

export default nextConfig;
