import { z } from 'zod'

const envs = z.object({
  APTABASE_APP_KEY: z.string(),
  AUTH_GITHUB_ID: z.string(),
  AUTH_GITHUB_SECRET: z.string(),
  AUTH_SECRET: z.string(),
  DIRECT_URL: z.string(),
  DATABASE_URL: z.string(),
})

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envs> {}
  }
}

envs.parse(process.env)
