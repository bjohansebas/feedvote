'use server'

import type { ActionResponse } from '@/types'
import { type Project, prisma } from '@feedvote/database'
import {
  BAD_REQUEST_CODE,
  CREATED_CODE,
  LOGIN_REQUIRED,
  NOT_FOUND_CODE,
  UNAUTHORIZED_CODE,
  validateSchema,
} from '@feedvote/utils'
import { authOptions } from '@lib/auth'
import { createProjectSchema } from '@lib/schemas/project'
import { getServerSession } from 'next-auth'
import { revalidateTag } from 'next/cache'
import type { z } from 'zod'

export const getProjectsOrganization = async (slug: string): Promise<ActionResponse<Project[]>> => {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return {
      data: null,
      status: UNAUTHORIZED_CODE,
      message: LOGIN_REQUIRED,
    }
  }

  const existOrganization = await prisma.organization.findUnique({
    where: {
      slug,
    },
  })

  if (!existOrganization) {
    return {
      data: null,
      status: NOT_FOUND_CODE,
    }
  }

  const projects = await prisma.project.findMany({
    where: {
      organization: {
        slug: slug,
      },
    },
  })

  return {
    data: projects,
    status: CREATED_CODE,
  }
}

export const createProject = async (
  data: z.infer<typeof createProjectSchema>,
): Promise<ActionResponse<Project & { slug: string }>> => {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return {
      data: null,
      status: UNAUTHORIZED_CODE,
      message: LOGIN_REQUIRED,
    }
  }

  const verifyData = validateSchema(createProjectSchema, data)

  if (!verifyData.success) {
    return {
      data: null,
      status: BAD_REQUEST_CODE,
      message: verifyData.error.errors.map((error) => error.message),
    }
  }

  const existOrganization = await prisma.organization.findUnique({
    where: {
      id: data.organization,
    },
  })

  if (existOrganization == null) {
    return {
      data: null,
      status: BAD_REQUEST_CODE,
    }
  }

  try {
    const responseCreated = await prisma.project.create({
      data: {
        name: data.name,
        organization: {
          connect: {
            id: data.organization,
          },
        },
      },
    })

    revalidateTag('projects')

    return {
      data: {
        slug: existOrganization.slug,
        ...responseCreated,
      },
      status: CREATED_CODE,
    }
  } catch {
    return {
      data: null,
      status: BAD_REQUEST_CODE,
    }
  }
}
