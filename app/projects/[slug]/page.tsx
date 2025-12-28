import { notFound } from "next/navigation"
import { projects } from "@/constants/projects"
import { generateSlug } from "@/lib/utils"
import { ProjectCaseStudy } from "@/components/project-case-study"
import type { Metadata } from "next"

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  const baseUrl = "https://your-portfolio-domain.com" // TODO: Replace with actual domain

  return {
    title: `${project.title} | Case Study | Sabaa Siddique`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Case Study`,
      description: project.description,
      url: `${baseUrl}/projects/${project.slug}`,
      type: "website",
      images: project.images && project.images.length > 0 
        ? [{ url: project.images[0], width: 1200, height: 630, alt: project.title }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Case Study`,
      description: project.description,
      images: project.images && project.images.length > 0 ? [project.images[0]] : [],
    },
  }
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  return <ProjectCaseStudy project={project} />
}

