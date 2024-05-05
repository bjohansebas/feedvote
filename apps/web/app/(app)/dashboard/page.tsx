import { Button } from '@feedvote/ui'
import { getOrganizationUser } from '@lib/api/organization'
import { CardOrganization } from '@ui/app/dashboard/card-organizations'
import Link from 'next/link'

export default async function DashboardPage() {
  const organization = await getOrganizationUser()

  return (
    <main className="mx-auto mt-10 max-w-5xl space-y-5 px-5 pb-20">
      <header className="flex flex-wrap items-center justify-between gap-y-4">
        <h2 className="font-semibold text-xl">My organizations</h2>
        <Button size="sm" variant="outline" asChild>
          <Link href="/register/organization">Create new organization</Link>
        </Button>
      </header>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(330px,1fr))] gap-4">
        {organization.data?.map(({ logo, name, slug, id }) => (
          <CardOrganization logo={logo} name={name} slug={slug} key={id} />
        ))}
      </div>
    </main>
  )
}
