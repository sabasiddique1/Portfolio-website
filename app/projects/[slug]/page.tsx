import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { projects, type Project } from "@/constants/projects"
import { site } from "@/constants/site"
import { getAvailableProjectImages } from "@/lib/project-images"
import { ProjectCaseStudy } from "@/components/project-case-study"

type Params = Promise<{ slug: string }>

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

function hasOwnImage(project: Project): boolean {
  return Boolean(project.image && getAvailableProjectImages().includes(project.image))
}

/** Share image: the project PNG once it exists in public/, else the first screenshot. */
function shareImage(project: Project): string | undefined {
  return hasOwnImage(project) ? project.image : project.images?.[0]
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return { title: "Project not found" }

  const path = `/projects/${project.slug}`
  const image = shareImage(project)

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: path },
    openGraph: {
      url: path,
      siteName: site.name,
      locale: "en_US",
      type: "website",
      // A page-level openGraph replaces the root one, so fall back to the site image explicitly.
      images: [
        image
          ? { url: image, alt: project.imageAlt ?? project.title }
          : { url: "/opengraph-image", width: 1200, height: 630, alt: site.seo.ogImageAlt },
      ],
    },
  }
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  return <ProjectCaseStudy project={project} imageAvailable={hasOwnImage(project)} />
}
