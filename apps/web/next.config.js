/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    useDeploymentId: true,
    useDeploymentIdServerActions: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'avatars.githubusercontent.com',
      },
    ],
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
