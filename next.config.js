/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['media.rawg.io'],
  },

  async redirects() {
    return [
      {
        source: '/games',
        destination: '/games/1',
        permanent: false,
      },
      {
        source: '/',
        destination: '/games/1',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
