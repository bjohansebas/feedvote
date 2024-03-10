import { FeedVoteIcon, Skeleton, SlashIcon } from '@feedvote/ui'

import Link from 'next/link'
import { Suspense } from 'react'

import { getOrganizationUser } from '@lib/api/organization'
import { authOptions } from '@lib/auth'
import { getServerSession } from 'next-auth'
import { SelectOrganization } from './select-organization'
import UserDropdown from './user-dropdown'

export const MenuApp = async () => {
  const session = await getServerSession(authOptions)
  const organizations = await getOrganizationUser()

  return (
    <header className="flex h-16 items-center gap-3 border-b-2 bg-card px-6 md:px-12">
      <div className="flex items-center gap-6">
        <Link href="/">
          <FeedVoteIcon className="h-7 w-7" />
        </Link>
      </div>
      <nav className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <SlashIcon className="size-6" />
          <SelectOrganization session={session} organizations={organizations.data} />
        </div>
        <div className="flex items-center">
          <Suspense fallback={<Skeleton className="h-9 w-9 rounded-full" />}>
            <UserDropdown />
          </Suspense>
        </div>
      </nav>
    </header>
  )
}
