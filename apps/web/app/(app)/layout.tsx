import { MenuApp } from '@ui/app/navigation/menu'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <MenuApp />
      {children}
    </>
  )
}
