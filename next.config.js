/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
    unoptimized: true,
  },
  eslint: {
    // Only run ESLint on local development
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig