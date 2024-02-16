'use client'

import { Button } from '@feedvote/ui/components'
import { GithubIcon } from '@feedvote/ui/icons'

import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

export function RegisterForm() {
  const searchParams = useSearchParams()
  const next = searchParams?.get('next')

  return (
    <Button
      onClick={() => {
        signIn('github', {
          ...(next && next.length > 0 ? { callbackUrl: next } : {}),
        })
      }}
      className="w-full"
      size="lg"
    >
      <GithubIcon className="w-5 h-5" />
      Continue with Github
    </Button>
  )
}
