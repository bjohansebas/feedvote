import { Avatar, AvatarFallback, AvatarImage } from '@feedvote/ui'
import { stringAvatar } from '@feedvote/utils'

import Link from 'next/link'

export const CardOrganization = ({ logo, name, slug }: { logo: string | null; name: string; slug: string }) => {
  return (
    <section className="relative flex flex-col gap-5 rounded-md bg-card">
      <header className="border-b p-5">
        <Link href={`/${slug}/admin`} className="flex items-center gap-3">
          <Avatar className="size-5">
            <AvatarImage src={logo ?? '/_static/logo.svg'} className="size-5" />
            <AvatarFallback>{stringAvatar(name)}</AvatarFallback>
          </Avatar>
          <h2 className="font-bold">{name}</h2>
        </Link>
      </header>
    </section>
  )
}
