import { getOrganizationUser } from '@lib/api/organization'
import { CardOrganization } from '@ui/app/dashboard/card-organizations'

export default async function DashboardPage() {
  const organization = await getOrganizationUser()

  return (
    <main className="mx-auto mt-10 max-w-5xl px-5">
      <div className="flex w-full flex-col">
        {organization.data?.map(({ logo, name, slug, id }) => (
          <CardOrganization logo={logo} name={name} slug={slug} key={id} />
        ))}
      </div>
    </main>
  )
}
