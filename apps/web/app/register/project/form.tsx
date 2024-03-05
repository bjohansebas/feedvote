'use client'

import { LoadingSpinner } from '@feedvote/ui'
import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, toast } from '@feedvote/ui/components'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@feedvote/ui/components'
import { Input } from '@feedvote/ui/components'
import { CREATED_CODE } from '@feedvote/utils'

import { createOrganization } from '@lib/api/organization'

import type { Organization } from '@feedvote/database'
import { zodResolver } from '@hookform/resolvers/zod'
import { createProject } from '@lib/api/project'
import { createProjectSchema } from '@lib/schemas/project'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

export const RegisterProjectForm = ({ organizations }: { organizations: Organization[] | null }) => {
  const searchParams = useSearchParams()

  const og = searchParams?.get('og')
  const { push } = useRouter()

  const form = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: '',
      organization: organizations?.find(({ slug }) => slug === og)?.id || '',
    },
  })

  const { isSubmitting } = form.formState

  async function onSubmit(values: z.infer<typeof createProjectSchema>) {
    console.log(values)
    const { status } = await createProject(values)
    if (status === CREATED_CODE) {
      toast.success('The project was created successfully!')
      push('/dashboard')
    } else {
      toast.error('Something went wrong while creating the project.')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto space-y-4 w-full max-w-sm px-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project name</FormLabel>
              <FormControl>
                <Input {...field} required className="bg-background/50" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="organization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a organization" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {organizations?.map(({ id, slug, name }) => (
                    <SelectItem key={id} value={id}>
                      {name} <span className="text-muted-foreground">/{slug}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-10 w-full" disabled={isSubmitting}>
          {isSubmitting ? <LoadingSpinner /> : null}
          Create project
        </Button>
      </form>
    </Form>
  )
}
