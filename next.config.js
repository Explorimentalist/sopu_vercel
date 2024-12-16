/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
    unoptimized: true,
  },
  i18n: {
    locales: ['en-GB', 'es-ES'],
    defaultLocale: 'en-GB',
  },
}

module.exports = nextConfig