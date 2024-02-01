'use client'

import { useSearchParams } from 'next/navigation'

import { Button } from '@feedvote/ui'
import { signIn } from 'next-auth/react'

export function RegisterForm() {
  const searchParams = useSearchParams()
  const next = searchParams?.get('next')

  return (
    <div>
      <Button
        onClick={() => {
          signIn('github', {
            ...(next && next.length > 0 ? { callbackUrl: next } : {}),
          })
        }}
        className="w-full"
        size="lg"
      >
        Continue with Github
      </Button>
    </div>
  )
}
