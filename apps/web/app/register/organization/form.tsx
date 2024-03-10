'use client'

import { LoadingSpinner } from '@feedvote/ui'
import { Button, toast } from '@feedvote/ui/components'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@feedvote/ui/components'
import { Input } from '@feedvote/ui/components'
import { CREATED_CODE } from '@feedvote/utils'

import { createOrganization } from '@lib/api/organization'
import { createOrganizationSchema } from '@lib/schemas/organization'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

export const RegisterWorkspaceForm = () => {
  const { push } = useRouter()

  const form = useForm<z.infer<typeof createOrganizationSchema>>({
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: {
      name: '',
      url: '',
    },
  })

  const { isSubmitting } = form.formState

  async function onSubmit(values: z.infer<typeof createOrganizationSchema>) {
    const { status } = await createOrganization(values)
    if (status === CREATED_CODE) {
      toast.success('The workspace was created successfully!')

      push(`/register/project?og=${encodeURIComponent(values.url)}`)
    } else {
      toast.error('Something went wrong while creating the workspace.')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto w-full max-w-sm space-y-4 px-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workspace name</FormLabel>
              <FormControl>
                <Input {...field} className="bg-background/50" required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workspace URL</FormLabel>
              <FormControl>
                <div className="flex items-center rounded-md border bg-background/50 text-sm">
                  <span className="px-3 text-muted-foreground">feedvote.dev/</span>
                  <Input {...field} required className="rounded-l-none border-0 border-l" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-10 w-full" disabled={isSubmitting}>
          {isSubmitting ? <LoadingSpinner /> : null}
          Create workspace
        </Button>
      </form>
    </Form>
  )
}
