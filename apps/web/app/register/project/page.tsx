import { getOrganizationUser } from '@lib/api/organization'
import { RegisterProjectForm } from './form'

export default async function RegisterProjectPage() {
  const organizations = await getOrganizationUser()

  return (
    <div className="w-full max-w-lg bg-card border py-10 xs:pt-8 rounded-xl shadow">
      <div className="flex flex-col items-center gap-3">
        <header className="flex flex-col justify-center w-full gap-2 px-2">
          <h1 className="text-2xl xs:text-xl font-semibold text-foreground text-center text-balance">
            Create a new project
          </h1>
        </header>
        <RegisterProjectForm organizations={organizations.data} />
      </div>
    </div>
  )
}
