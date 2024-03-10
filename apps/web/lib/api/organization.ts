'use server'

import type { ActionResponse } from '@/types'
import { type Organization, prisma } from '@feedvote/database'
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
import { createOrganizationSchema } from '@lib/schemas/organization'

import { getServerSession } from 'next-auth'
import { revalidateTag } from 'next/cache'
import type { z } from 'zod'

export const getOrganizationUser = async (): Promise<ActionResponse<Organization[]>> => {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return {
      data: null,
      status: UNAUTHORIZED_CODE,
      message: LOGIN_REQUIRED,
    }
  }

  const Organization = await prisma.organization.findMany({
    where: {
      users: {
        some: {
          userId: session.user.id,
        },
      },
    },
    include: {
      projects: true,
    },
  })

  return {
    data: Organization,
    status: CREATED_CODE,
  }
}

export const createOrganization = async (
  data: z.infer<typeof createOrganizationSchema>,
): Promise<ActionResponse<Organization>> => {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return {
      data: null,
      status: UNAUTHORIZED_CODE,
      message: LOGIN_REQUIRED,
    }
  }

  const verifyData = validateSchema(createOrganizationSchema, data)

  if (!verifyData.success) {
    return {
      data: null,
      status: BAD_REQUEST_CODE,
      message: verifyData.error.errors.map((error) => error.message),
    }
  }

  const existSlug = await prisma.organization.findUnique({
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
    const responseCreated = await prisma.organization.create({
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

    revalidateTag('organizations')

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
