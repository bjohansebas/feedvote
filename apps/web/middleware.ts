import { PRIVATE_KEYS, PRIVATE_PATHS, parseUrl } from '@feedvote/utils'
import { auth } from '@lib/auth'
import { type NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
  const { path, key } = parseUrl(req)

  const session = await auth()
  // if there's no session and the path is private route, redirect to /login
  if (!session?.user.email && (PRIVATE_KEYS.has(key) || PRIVATE_PATHS.has(path))) {
    return NextResponse.redirect(new URL(`/login${path !== '/' ? `?next=${encodeURIComponent(path)}` : ''}`, req.url))
  }

  // if there's a session
  if (session?.user.email) {
    // if the user was created in the last 10s and the path isn't /welcome, redirect to /welcome
    // (this is a workaround because the `isNewUser` flag is triggered when a user does `dangerousEmailAccountLinking`)
    if (
      session?.user?.createdAt &&
      new Date(session?.user?.createdAt).getTime() > Date.now() - 10000 &&
      path !== '/register/organization'
    ) {
      return NextResponse.redirect(new URL('/register/organization', req.url))
    }

    // if the path is /login or /register, redirect to "/dashboard"
    if (path === '/login' || path === '/register' || path === '/') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /_proxy/ (special page for OG tags proxying)
     * 4. /_static (inside /public)
     * 5. /_vercel (Vercel internals)
     * 6. Static files (e.g. /favicon.ico, /sitemap.xml, /robots.txt, etc.)
     */
    '/((?!api/|_next/|_proxy/|_static|_vercel|[\\w-]+\\.\\w+).*)',
  ],
}
