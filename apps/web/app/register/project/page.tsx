import { getOrganizationUser } from '@lib/api/organization'
import { RegisterProjectForm } from './form'

export default async function RegisterProjectPage() {
  const organizations = await getOrganizationUser()

  return (
    <div className="w-full max-w-lg rounded-xl border bg-card py-10 shadow xs:pt-8">
      <div className="flex flex-col items-center gap-3">
        <header className="flex w-full flex-col justify-center gap-2 px-2">
          <h1 className="text-balance text-center font-semibold text-2xl text-foreground xs:text-xl">
            Create a new project
          </h1>
        </header>
        <RegisterProjectForm organizations={organizations.data} />
      </div>
    </div>
  )
}
