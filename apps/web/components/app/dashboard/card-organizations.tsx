import { Avatar, AvatarFallback, AvatarImage } from '@feedvote/ui'
import { stringAvatar } from '@feedvote/utils'

import Link from 'next/link'

export const CardOrganization = ({ logo, name, slug }: { logo: string | null; name: string; slug: string }) => {
  return (
    <section className="flex flex-col gap-5 bg-card rounded-md relative">
      <header className="p-5 border-b">
        <Link href={`/${slug}/admin`} className="flex gap-3 items-center  ">
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
