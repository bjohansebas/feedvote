import { prisma } from '@feedvote/database'
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '@feedvote/utils/constants'

import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { AuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL

export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    GithubProvider({
      clientId: GITHUB_CLIENT_ID as string,
      clientSecret: GITHUB_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  cookies: {
    sessionToken: {
      name: `${VERCEL_DEPLOYMENT ? '__Secure-' : ''}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        // When working on localhost, the cookie domain must be omitted entirely (https://stackoverflow.com/a/1188145)
        domain: VERCEL_DEPLOYMENT ? `.${process.env.NEXT_PUBLIC_APP_DOMAIN}` : undefined,
        secure: VERCEL_DEPLOYMENT,
      },
    },
  },
  pages: {
    error: '/login',
  },
  callbacks: {
    jwt: async ({ token, user, trigger }) => {
      if (!token.email) {
        return {}
      }

      if (user) {
        token.user = user
      }

      if (trigger === 'update') {
        const refreshedUser = await prisma.user.findUnique({
          where: { id: token.sub },
        })

        if (refreshedUser) {
          token = refreshedUser
        } else {
          return {}
        }
      }

      return token
    },
    session: async ({ session, token }) => {
      session.user = {
        id: token.sub,
        // @ts-ignore
        ...(token || session).user,
      }

      return session
    },
  },
}
