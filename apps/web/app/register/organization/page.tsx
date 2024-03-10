import { RegisterWorkspaceForm } from './form'

export default function RegisterWorkspacePage() {
  return (
    <div className="w-full max-w-lg rounded-xl border bg-card py-10 shadow xs:pt-8">
      <div className="flex flex-col items-center gap-3">
        <header className="flex w-full flex-col justify-center gap-2 px-2">
          <h1 className="text-balance text-center font-semibold text-2xl text-foreground xs:text-xl">
            Create a new workspace
          </h1>
          <h2 className="mt-1 mb-6 text-balance text-center text-muted-foreground text-sm">
            Workspaces are shared environments where teams can manage feedback across various projects.
          </h2>
        </header>
        <RegisterWorkspaceForm />
      </div>
    </div>
  )
}
