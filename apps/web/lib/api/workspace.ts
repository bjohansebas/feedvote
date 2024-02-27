'use server'

import type { ActionResponse } from '@/types'
import { type Workspace, prisma } from '@feedvote/database'
import {
  BAD_REQUEST_CODE,
  CONFLICT_CODE,
  CREATED_CODE,
  LOGIN_REQUIRED,
  SLUG_EXISTED,
  UNAUTHORIZED_CODE,
  isPrivateUrl,
  validateSchema,
} from '@feedvote/utils'

import { authOptions } from '@lib/auth'
import { createWorkspaceSchema } from '@lib/schemas/workspace'

import { getServerSession } from 'next-auth'
import type { z } from 'zod'

export const createWorkspace = async (
  data: z.infer<typeof createWorkspaceSchema>,
): Promise<ActionResponse<Workspace>> => {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return {
      data: null,
      status: UNAUTHORIZED_CODE,
      message: LOGIN_REQUIRED,
    }
  }

  const verifyData = validateSchema(createWorkspaceSchema, data)

  if (!verifyData.success) {
    return {
      data: null,
      status: BAD_REQUEST_CODE,
      message: verifyData.error.errors.map((error) => error.message),
    }
  }

  const existSlug = await prisma.workspace.findUnique({
    where: {
      slug: data.url,
    },
    select: {
      slug: true,
    },
  })

  if (existSlug != null || isPrivateUrl(data.url)) {
    return {
      data: null,
      status: CONFLICT_CODE,
      message: SLUG_EXISTED,
    }
  }

  try {
    const responseCreated = await prisma.workspace.create({
      data: {
        name: data.name,
        slug: data.url,
        users: {
          create: {
            userId: session.user.id,
            role: 'owner',
          },
        },
      },
    })

    return {
      data: responseCreated,
      status: CREATED_CODE,
    }
  } catch {
    return {
      data: null,
      status: BAD_REQUEST_CODE,
    }
  }
}
