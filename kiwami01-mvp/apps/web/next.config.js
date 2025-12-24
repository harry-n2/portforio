/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@kiwami/ui"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
