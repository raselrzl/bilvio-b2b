import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    documents: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
      },
    ],
  },
};

export default nextConfig;
