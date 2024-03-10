'use client'

import { Button, Skeleton } from '@feedvote/ui/components'
import { GithubIcon } from '@feedvote/ui/icons'

import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

export function OAuthForm() {
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
      <GithubIcon className="h-5 w-5" />
      Continue with Github
    </Button>
  )
}

export function OAuthFormPlaceholder() {
  return <Skeleton className="h-11 w-full" />
}
