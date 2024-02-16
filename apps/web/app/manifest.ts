import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FeedVote',
    short_name: 'FeedVote',
    lang: 'en',
    description: 'The open source feedback manager',
    start_url: '/',
    display: 'standalone',
    background_color: '#030b0e',
    theme_color: '#00BCD4',
    icons: [
      {
        src: '/favicon.ico',
        type: 'image/x-icon',
        sizes: '16x16 32x32',
      },
      {
        src: '/_static/favicons/icon-192.png',
        type: 'image/png',
        sizes: '192x192',
      },
      {
        src: '/_static/favicons/icon-512.png',
        type: 'image/png',
        sizes: '512x512',
      },
      {
        src: '/_static/favicons/icon-192-maskable.png',
        type: 'image/png',
        sizes: '192x192',
        purpose: 'maskable',
      },
      {
        src: '/_static/favicons/icon-512-maskable.png',
        type: 'image/png',
        sizes: '512x512',
        purpose: 'maskable',
      },
    ],
  }
}
