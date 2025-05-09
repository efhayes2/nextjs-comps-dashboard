import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'storage.googleapis.com',
        protocol: 'https',
        pathname: '/mrgn-public/**/*',
      },
    ],
  },
}

export default nextConfig
