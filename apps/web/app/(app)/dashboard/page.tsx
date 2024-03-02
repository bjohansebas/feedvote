import { getOrganizationUser } from '@lib/api/organization'
import { CardOrganization } from '@ui/app/dashboard/card-organizations'

export default async function DashboardPage() {
  const organization = await getOrganizationUser()

  return (
    <main className="max-w-5xl mx-auto mt-10 px-5">
      <div className="flex flex-col w-full">
        {organization.data?.map(({ logo, name, slug, id }) => (
          <CardOrganization logo={logo} name={name} slug={slug} key={id} />
        ))}
      </div>
    </main>
  )
}
