import { MetadataRoute } from 'next'
import { projects } from '@/constants/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://your-portfolio-domain.com' // TODO: Replace with actual domain

  // Static routes
  const routes = [
    '',
    '/projects',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Dynamic project routes
  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: project.featured ? 0.9 : 0.7,
  }))

  return [...routes, ...projectRoutes]
}

