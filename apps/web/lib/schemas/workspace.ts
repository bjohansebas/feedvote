import { z } from 'zod'

export const createWorkspaceSchema = z.object({
  name: z.string().min(1, { message: 'Workspace name is required' }),
  url: z
    .string({ required_error: '' })
    .max(48, { message: 'Workspace URL must be less than 48 characters' })
    .regex(/^[a-zA-Z0-9\-]+$/, { message: 'Invalid url' }),
})
