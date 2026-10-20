import type { NextConfig } from "next";

// Static export for GitHub Pages (spec §6.1). No basePath: the site lives at the domain root.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
