import { parseUrl } from '@feedvote/utils'

import { User } from 'next-auth'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
  const { path, key } = parseUrl(req)

  const session = (await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })) as {
    email?: string
    user?: User
  }

  // if there's no session and the path is /dashboard, redirect to /login
  if (!session?.email && key === 'dashboard') {
    return NextResponse.redirect(new URL(`/login${path !== '/' ? `?next=${encodeURIComponent(path)}` : ''}`, req.url))
  }

  // if there's a session
  if (session?.email) {
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
