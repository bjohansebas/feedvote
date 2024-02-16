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
  transpilePackages: ['@feedvote/ui', '@feedvote/ui/components', '@feedvote/ui/icons'],
}
