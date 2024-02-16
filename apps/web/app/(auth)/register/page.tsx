import { Skeleton, buttonVariants } from '@feedvote/ui/components'
import { FeedVoteIcon } from '@feedvote/ui/icons'
import { cn } from '@feedvote/utils'

import Link from 'next/link'

import { Suspense } from 'react'
import { RegisterForm } from './form'

export default function RegisterPage() {
  return (
    <div className="w-full max-w-lg bg-card border pt-16 xs:pt-8 rounded-xl shadow">
      <div className="flex flex-col items-center gap-5">
        <Link href="/" className="text-scooter-600">
          <FeedVoteIcon className="w-12 h-12" />
        </Link>
        <header className="flex flex-col justify-center w-full gap-2">
          <h1 className="text-2xl xs:text-xl font-semibold text-foreground text-center text-balance">
            Create your FeedVote account
          </h1>
          <h2 className="text-sm text-muted-foreground mt-1 mb-6 text-center text-balance">
            Get started for free. No credit card required.
          </h2>
        </header>
        <div className="flex flex-col gap-3 bg-background/50 backdrop-blur-xl border-t w-full px-4 py-8 sm:px-16 rounded-b-xl">
          <Suspense fallback={<Skeleton className="w-full h-11" />}>
            <RegisterForm />
          </Suspense>
          <p className="text-sm xs:text-xs text-center">
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
