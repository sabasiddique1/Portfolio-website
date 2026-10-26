import type { MetadataRoute } from "next"
import { projects } from "@/constants/projects"
import { site } from "@/constants/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const routes: MetadataRoute.Sitemap = [
    { url: site.url, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/projects`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  ]

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${site.url}/projects/${project.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: project.featured ? 0.9 : 0.7,
  }))

  return [...routes, ...projectRoutes]
}
