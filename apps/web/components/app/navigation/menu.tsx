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
    <header className="bg-card border-b-2 h-16 flex items-center px-6 md:px-12 gap-3">
      <div className="flex items-center gap-6">
        <Link href="/">
          <FeedVoteIcon className="h-7 w-7" />
        </Link>
      </div>
      <nav className="w-full flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <SlashIcon className="size-6" />
          <SelectOrganization session={session} organizations={organizations.data} />
        </div>
        <div className="flex items-center">
          <Suspense fallback={<Skeleton className="rounded-full w-9 h-9" />}>
            <UserDropdown />
          </Suspense>
        </div>
      </nav>
    </header>
  )
}
