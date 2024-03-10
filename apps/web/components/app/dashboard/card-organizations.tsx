import { Avatar, AvatarFallback, AvatarImage } from '@feedvote/ui'
import { stringAvatar } from '@feedvote/utils'
import { getProjectsOrganization } from '@lib/api/project'
import { FolderKanbanIcon } from 'lucide-react'

import { unstable_cache as cache } from 'next/cache'
import Link from 'next/link'

const getProjects = cache(getProjectsOrganization, ['projects'], { tags: ['projects'] })

export const CardOrganization = async ({ logo, name, slug }: { logo: string | null; name: string; slug: string }) => {
  const projects = await getProjects(slug)

  return (
    <section className="relative flex flex-col gap-6 rounded-md border bg-card px-5 pt-6 pb-5 transition-all hover:border-primary">
      <header className="flex items-center gap-x-4">
        <Avatar className="size-10">
          <AvatarImage src={logo ?? '/_static/logo.svg'} className="size-10" />
          <AvatarFallback>{stringAvatar(name)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h2 className="font-bold">{name}</h2>
          <p className="font-medium text-muted-foreground">/{slug}</p>
        </div>
      </header>
      <footer className="flex gap-2 px-2">
        <div className="flex items-center gap-2 font-medium">
          <FolderKanbanIcon className="size-5" />
          Projects {projects.data?.length}
        </div>
      </footer>
      <Link href={`/${slug}/admin`} className="absolute inset-0 z-10 block" />
    </section>
  )
}
