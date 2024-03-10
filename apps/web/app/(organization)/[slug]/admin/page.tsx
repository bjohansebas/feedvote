import { Button } from '@feedvote/ui'
import { getProjectsOrganization } from '@lib/api/project'
import { unstable_cache as cache } from 'next/cache'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const getProjects = cache(getProjectsOrganization, ['projects'], { tags: ['projects'] })

export default async function AdminWorkspacePage({ params }: { params: { slug: string } }) {
  const projects = await getProjects(params.slug)

  if (projects.data == null) {
    notFound()
  }

  return (
    <main className="mx-auto max-w-4xl pt-10">
      <section className="flex flex-col gap-8 px-4">
        <header className="flex flex-wrap items-center justify-between gap-y-4">
          <h2 className="font-semibold text-xl">Your projects</h2>
          <Button size="sm" variant="outline" asChild>
            <Link href={`/register/project?og=${encodeURIComponent(params.slug)}`}>Create new project</Link>
          </Button>
        </header>

        {projects.data.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(330px,1fr))] gap-4">
            {projects.data.map(({ description, name, id }) => (
              <article
                key={id}
                className="relative rounded-md border bg-card px-8 py-6 transition-all hover:border-primary"
              >
                <h3 className="font-semibold">{name}</h3>
                <p className="text-muted-foreground">{description}</p>
                <Link href={`${params.slug}/${name}`} className="absolute inset-0 z-10 block" />
              </article>
            ))}
          </div>
        ) : (
          <article className="mt-40 flex flex-col items-center justify-center gap-y-6">
            <h2 className="text-balance text-center font-semibold text-2xl">
              No projects were found for this organization.
            </h2>
            <Button asChild>
              <Link href={`/register/project?og=${encodeURIComponent(params.slug)}`}>Create new project</Link>
            </Button>
          </article>
        )}
      </section>
    </main>
  )
}
