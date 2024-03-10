import { buttonVariants } from '@feedvote/ui/components'
import { FeedVoteIcon } from '@feedvote/ui/icons'
import { cn } from '@feedvote/utils'

import Link from 'next/link'

import { OAuthForm, OAuthFormPlaceholder } from '@ui/auth/oauth-form'
import { Suspense } from 'react'

export default function RegisterPage() {
  return (
    <div className="w-full max-w-lg rounded-xl border bg-card pt-16 shadow xs:pt-8">
      <div className="flex flex-col items-center gap-5">
        <Link href="/" className="text-scooter-600">
          <FeedVoteIcon className="h-12 w-12" />
        </Link>
        <header className="flex w-full flex-col justify-center gap-2">
          <h1 className="text-balance text-center font-semibold text-2xl text-foreground xs:text-xl">
            Create your FeedVote account
          </h1>
          <h2 className="mt-1 mb-6 text-balance text-center text-muted-foreground text-sm">
            Get started for free. No credit card required.
          </h2>
        </header>
        <div className="flex w-full flex-col gap-3 rounded-b-xl border-t bg-background/50 px-4 py-8 backdrop-blur-xl sm:px-16">
          <Suspense fallback={<OAuthFormPlaceholder />}>
            <OAuthForm />
          </Suspense>
          <p className="text-center text-sm xs:text-xs">
            Already have an account?{' '}
            <Link href="/login" className={cn(buttonVariants({ variant: 'link' }), 'px-0')}>
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
