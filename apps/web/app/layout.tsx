import '@styles/globals.css'

import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'

import { cn } from '@feedvote/utils'

export const metadata: Metadata = {
  title: 'FeedVote',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang="en">
      <body className={cn('dark bg-background font-sans antialiased', GeistSans.variable)}>{children}</body>
    </html>
  )
}
