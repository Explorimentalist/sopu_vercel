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
  webpack: (config, { isServer }) => {
    // Add lucide-react to the transpiled modules
    config.module.rules.push({
      test: /lucide-react/,
      sideEffects: false
    })
    
    return config
  },
  // Add this to help with module resolution
  transpilePackages: ['lucide-react']
}

module.exports = nextConfig