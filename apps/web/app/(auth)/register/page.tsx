import { Button, buttonVariants } from '@feedvote/ui'
import { cn } from '@feedvote/utils'
import Link from 'next/link'
import { RegisterForm } from './form'
export default function RegisterPage() {
  return (
    <div className="w-full max-w-lg bg-card border py-16 xs:py-8 px-8 rounded-xl shadow">
      <div className="flex flex-col items-center">
        <header className="flex flex-col justify-center w-full">
          <h1 className="text-2xl xs:text-xl font-semibold text-foreground text-center">Get started</h1>
          <h2 className="text-sm text-muted-foreground mt-1 mb-6 text-center">Create a new account</h2>
        </header>

        <RegisterForm />

        <p className="text-sm xs:text-xs mt-5 text-center">
          Already have an account?{' '}
          <Link href="/login" className={cn(buttonVariants({ variant: 'link' }), 'px-0')}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
