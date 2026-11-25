import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  async rewrites() {
    const apiServerUrl =
      process.env.API_SERVER_URL ?? "http://localhost:4000";

    return [
      {
        source: "/api/:path*",
        destination: `${apiServerUrl}/:path*`,
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
