import { MenuApp } from '@ui/app/navigation/menu'

export default function OrganizationLayout({
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
