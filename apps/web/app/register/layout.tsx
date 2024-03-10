import { FeedVoteIcon, Skeleton } from '@feedvote/ui'

import UserDropdown from '@ui/app/navigation/user-dropdown'

import Link from 'next/link'
import { Suspense } from 'react'

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex h-svh w-screen items-center justify-center">
      <div className="-z-10 fixed top-0 left-0 h-svh w-full">
        <div className="relative h-svh w-full bg-background">
          <div className="absolute top-0 right-0 bottom-0 left-0 bg-[radial-gradient(circle_500px_at_50%_200px,#22282f,transparent)]" />
        </div>
      </div>
      <div className="fixed top-6 right-10">
        <Suspense fallback={<Skeleton className="h-9 w-9 rounded-full" />}>
          <UserDropdown />
        </Suspense>
      </div>
      <div className="fixed top-6 left-10">
        <Link href="/dashboard">
          <FeedVoteIcon className="h-9 w-9" />
        </Link>
      </div>
      {children}
    </main>
  )
}
