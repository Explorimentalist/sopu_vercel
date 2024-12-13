/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en-GB', 'es-ES'],
    defaultLocale: 'en-GB',
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
  basePath: '',
  eslint: {
    ignoreDuringBuilds: true,
  }
}

module.exports = nextConfig