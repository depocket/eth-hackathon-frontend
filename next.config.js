/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'app.depocket.com',
        port: '',
        pathname: '/icons/**',
      }
    ]
  },
  reactStrictMode: true,
}

module.exports = nextConfig
