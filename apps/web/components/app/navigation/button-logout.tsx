'use client'

import { Button } from '@feedvote/ui/components'
import { LogOutIcon } from 'lucide-react'
import { signOut } from 'next-auth/react'

export function ButtonLogout() {
  return (
    <Button
      variant="ghost"
      className="w-full justify-start"
      onClick={async () => {
        await signOut({
          callbackUrl: '/login',
        })
      }}
    >
      <LogOutIcon className="h-4 w-4" />
      Logout
    </Button>
  )
}
