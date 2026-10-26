"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { ReactNode } from "react"
import { Button, buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { CategoryIcon } from "@/components/category-icon"
import { Chip } from "@/components/chip"
import { ProjectImageCarousel } from "@/components/project-image-carousel"
import { getProjectKind, getProjectLinks, type Project } from "@/constants/projects"

interface ProjectCaseStudyProps {
  project: Project
  /** Whether `project.image` exists in public/ (checked on the server). */
  imageAvailable: boolean
}

type Section = { key: string; title: string; body: ReactNode }

export function ProjectCaseStudy({ project, imageAvailable }: ProjectCaseStudyProps) {
  const reduceMotion = useReducedMotion()
  const links = getProjectLinks(project)
  const screenshots = project.images ?? []
  const meta = [project.label, project.period].filter(Boolean).join(" · ")
  const built = project.built ?? []

  // Entrance is a plain fade; the delay follows the rendered order.
  const fade = (delay: number) => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: reduceMotion ? { duration: 0 } : { duration: 0.3, delay },
  })

  // Only sections with data render.
  const sections: Section[] = []
  if (project.problem) {
    sections.push({
      key: "problem",
      title: "Problem",
      body: <p className="text-text-2">{project.problem}</p>,
    })
  }
  if (built.length > 0) {
    sections.push({
      key: "built",
      title: "What I built",
      body: (
        <ul className="list-disc space-y-2 pl-5 text-text-2 marker:text-muted-foreground">
          {built.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ),
    })
  }
  if (project.technologies.length > 0) {
    sections.push({
      key: "stack",
      title: "Stack",
      body: (
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <Chip key={tech}>{tech}</Chip>
          ))}
        </div>
      ),
    })
  }

  return (
    <main className="container max-w-5xl pt-24 pb-16 md:pb-24">
      <motion.div {...fade(0)}>
        <Link href="/projects" className={buttonVariants({ variant: "ghost", size: "sm" })}>
          <ArrowLeft aria-hidden="true" />
          Back to Projects
        </Link>
      </motion.div>

      <motion.div {...fade(0.05)} className="mt-6 mb-10">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <CategoryIcon kind={getProjectKind(project)} />
          <Badge variant="outline">{project.category}</Badge>
          <Badge variant="outline">{project.projectType}</Badge>
        </div>
        {meta && <p className="mb-2 text-xs text-muted-foreground">{meta}</p>}
        <h1 className="text-[32px] leading-tight">{project.title}</h1>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground">{project.description}</p>

        {screenshots.length > 0 ? (
          <ProjectImageCarousel
            images={screenshots}
            title={project.title}
            autoSwitchInterval={4000}
            className="mt-8 rounded-lg border border-border"
          />
        ) : project.image && imageAvailable ? (
          <div className="relative mt-8 aspect-[3/2] w-full overflow-hidden rounded-lg border border-border bg-card-2">
            <Image
              src={project.image}
              alt={project.imageAlt ?? project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
          </div>
        ) : null}

        {links.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {links.map((link) => {
              const Icon = link.label === "Repo" ? Github : ExternalLink
              return (
                <Button key={link.url} asChild variant={link.label === "Live" ? "default" : "outline"}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    <Icon aria-hidden="true" />
                    {link.label}
                  </a>
                </Button>
              )
            })}
          </div>
        )}
      </motion.div>

      {sections.length > 0 && (
        <div className="space-y-4">
          {sections.map((section, index) => (
            <motion.section key={section.key} {...fade(0.1 + 0.05 * index)}>
              <Card className="p-6">
                <h2 className="mb-4 text-lg font-semibold">{section.title}</h2>
                {section.body}
              </Card>
            </motion.section>
          ))}
        </div>
      )}
    </main>
  )
}
