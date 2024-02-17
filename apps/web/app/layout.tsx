import '@styles/globals.css'

import { AptabaseProvider } from '@aptabase/react'

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
      <body className={cn('dark font-sans antialiased', GeistSans.variable)}>
        <AptabaseProvider appKey="A-US-1263066057">{children}</AptabaseProvider>
      </body>
    </html>
  )
}
