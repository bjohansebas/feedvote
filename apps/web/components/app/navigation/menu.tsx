import { Button, FeedVoteIcon, Skeleton } from '@feedvote/ui'

import Link from 'next/link'
import { Suspense } from 'react'

import UserDropdown from './user-dropdown'

const links = [
  {
    name: 'Home',
    href: '/dashboard',
  },
]

export const MenuApp = () => {
  return (
    <header className="bg-card border-b-2 h-16 flex items-center px-6 md:px-12 gap-3">
      <div className="flex items-center gap-6">
        <Link href="/">
          <FeedVoteIcon className="h-7 w-7" />
        </Link>
        <ul className="flex items-center gap-1">
          {links.map(({ href, name }) => (
            <li key={name}>
              <Button asChild variant="link" size="sm" className="text-card-foreground">
                <Link href={href}>{name}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <nav className="w-full flex justify-between items-center">
        <div className="flex gap-2 items-center"> </div>
        <div className="flex items-center">
          <Suspense fallback={<Skeleton className="rounded-full w-9 h-9" />}>
            <UserDropdown />
          </Suspense>
        </div>
      </nav>
    </header>
  )
}
