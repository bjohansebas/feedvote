import { ReactNode } from 'react'

export default async function AuthLayout({ children }: { children: ReactNode }) {
  return <main className="flex h-svh w-screen justify-center items-center">{children}</main>
}
