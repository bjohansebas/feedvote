'use client'

import type { Organization } from '@feedvote/database'
import { Avatar, AvatarFallback, AvatarImage, Button, Popover, PopoverContent, PopoverTrigger } from '@feedvote/ui'
import { parsePath, stringAvatar } from '@feedvote/utils'
import { PlusIcon } from 'lucide-react'
import type { Session } from 'next-auth'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const SelectOrganization = ({
  session,
  organizations,
}: { session: Session | null; organizations: Organization[] | null }) => {
  const pathname = usePathname()
  const pathKey = parsePath(pathname).key

  const organizationPath =
    pathKey !== 'dashboard' && organizations != null
      ? organizations.find(({ slug }) => slug === pathKey)
      : {
          name: session?.user.name,
          slug: '/dashboard',
          logo: session?.user.image || null,
        }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="ghost" className="font-bold">
          <Avatar className="size-6">
            <AvatarImage src={organizationPath?.logo ?? '/_static/logo.png'} className="size-6" />
            <AvatarFallback>{stringAvatar(organizationPath?.name || 'l')}</AvatarFallback>
          </Avatar>
          {pathKey === 'dashboard' ? session?.user?.name : pathKey}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2">
        <h2 className="text-sm font-bold">My organizations</h2>
        {organizations?.map(({ name, slug, logo }) => (
          <Button key={name} variant="ghost" size="sm" className="w-full justify-start font-semibold" asChild>
            <Link href={`/${slug}/admin`}>
              <Avatar className="size-5">
                <AvatarImage src={logo != null ? logo : '/_static/logo.png'} className="size-5" />
                <AvatarFallback>{stringAvatar(name)}</AvatarFallback>
              </Avatar>
              {name}
            </Link>
          </Button>
        ))}
        <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
          <Link href="/register/organization">
            <PlusIcon className="size-5" />
            Create new organization
          </Link>
        </Button>
      </PopoverContent>
    </Popover>
  )
}
