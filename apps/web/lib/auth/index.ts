import { prisma } from '@feedvote/database'

import { PrismaAdapter } from '@auth/prisma-adapter'
import type { NextAuthConfig } from 'next-auth'
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

const config: NextAuthConfig = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    GithubProvider({
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  adapter: PrismaAdapter(prisma),
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

export const { handlers, auth, signIn, signOut, unstable_update: update } = NextAuth(config)
