import { z } from 'zod'

export const createProjectSchema = z.object({
  name: z.string().min(1, { message: 'Project name is required' }),
  organization: z.string().cuid(),
})
