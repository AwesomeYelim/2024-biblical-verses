/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactRoot: true,
    optimizeCss: true,
    optimizeImages: true,
    scrollRestoration: true,
    // Enable incremental builds
    incremental: true,
  },
};

module.exports = nextConfig;
