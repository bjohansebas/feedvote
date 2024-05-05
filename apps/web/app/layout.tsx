import '@styles/globals.css'

import { AptabaseProvider } from '@aptabase/react'

import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'

import { Toaster } from '@feedvote/ui'

import { APTABASE_APP_KEY } from '@feedvote/utils/constants'
import { cn } from '@feedvote/utils/functions'
import '@lib/env'

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
        <AptabaseProvider appKey={APTABASE_APP_KEY}>{children}</AptabaseProvider>
        <Toaster />
      </body>
    </html>
  )
}
