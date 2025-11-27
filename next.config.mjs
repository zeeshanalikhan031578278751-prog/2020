/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true
  },
  images: {
    // You can add remote image domains here if needed
    remotePatterns: []
  }
};

export default nextConfig;
