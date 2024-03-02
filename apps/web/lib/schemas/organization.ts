import { z } from 'zod'

export const createOrganizationSchema = z.object({
  name: z.string().min(1, { message: 'Organization name is required' }),
  url: z
    .string({ required_error: '' })
    .max(48, { message: 'Organization URL must be less than 48 characters' })
    .regex(/^[a-zA-Z0-9\-]+$/, { message: 'Invalid url' }),
})
