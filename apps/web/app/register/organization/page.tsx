import { RegisterWorkspaceForm } from './form'

export default function RegisterWorkspacePage() {
  return (
    <div className="w-full max-w-lg bg-card border py-10 xs:pt-8 rounded-xl shadow">
      <div className="flex flex-col items-center gap-3">
        <header className="flex flex-col justify-center w-full gap-2 px-2">
          <h1 className="text-2xl xs:text-xl font-semibold text-foreground text-center text-balance">
            Create a new workspace
          </h1>
          <h2 className="text-sm text-muted-foreground mt-1 mb-6 text-center text-balance">
            Workspaces are shared environments where teams can manage feedback across various projects.
          </h2>
        </header>
        <RegisterWorkspaceForm />
      </div>
    </div>
  )
}
