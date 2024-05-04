/** @type {import('next').NextConfig} */
export default {
  images: {
    remotePatterns: [
      {
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  logging: {
    fetches: { fullUrl: true },
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: false,
      },
    ]
  },
  transpilePackages: ['@feedvote/ui', '@feedvote/ui/components', '@feedvote/ui/icons'],
}
