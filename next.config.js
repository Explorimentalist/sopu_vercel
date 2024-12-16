/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
    unoptimized: true,
  },
  // Remove i18n config since it's causing routing issues
  // i18n: {
  //   locales: ['en-GB', 'es-ES'],
  //   defaultLocale: 'en-GB',
  // },
}

module.exports = nextConfig