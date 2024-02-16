import { MetadataRoute } from 'next'
import { headers } from 'next/headers'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = headers()
  const domain = headersList.get('host') as string

  return [
    {
      url: `https://${domain}`,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `https://${domain}/register`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: 'yearly',
    },
  ]
}
