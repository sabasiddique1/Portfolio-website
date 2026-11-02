"use client"

import { motion, useReducedMotion } from "framer-motion"
import { ArrowLeft, ArrowRight, ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { ReactNode } from "react"
import { Button, buttonVariants } from "@/components/ui/button"
import { CategoryIcon, categoryIcons } from "@/components/category-icon"
import { Chip } from "@/components/chip"
import { SpotlightCard } from "@/components/fx/spotlight-card"
import { TextReveal } from "@/components/fx/text-reveal"
import { ProjectImageCarousel } from "@/components/project-image-carousel"
import { cardProjects, getProjectKind, getProjectLinks, rowProjects, type Project } from "@/constants/projects"
import { cn } from "@/lib/utils"

interface ProjectCaseStudyProps {
  project: Project
  /** Whether `project.image` exists in public/ (checked on the server). */
  imageAvailable: boolean
}

type Section = { key: string; title: string; body: ReactNode }

const aspectClass: Record<NonNullable<Project["imageAspect"]>, string> = {
  "3/2": "aspect-[3/2]",
  "4/3": "aspect-[4/3]",
  "16/9": "aspect-video",
}

const bulletClass =
  "relative pl-5 before:absolute before:left-0 before:top-[0.72em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-lime"

/** The project after this one in its own list (cards or rows), wrapping around. */
function nextOf(project: Project): Project | null {
  const list = cardProjects.some((p) => p.slug === project.slug) ? cardProjects : rowProjects
  const index = list.findIndex((p) => p.slug === project.slug)
  if (index === -1 || list.length < 2) return null
  return list[(index + 1) % list.length]
}

export function ProjectCaseStudy({ project, imageAvailable }: ProjectCaseStudyProps) {
  const reduceMotion = useReducedMotion()
  const links = getProjectLinks(project)
  const screenshots = project.images ?? []
  const kind = getProjectKind(project)
  const aspect = project.imageAspect ?? "3/2"
  const meta = [project.label, project.period].filter(Boolean).join(" · ")
  const built = project.built ?? []
  const nextProject = nextOf(project)

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
      body: <p className="text-base leading-relaxed text-text-2">{project.problem}</p>,
    })
  }
  if (built.length > 0) {
    sections.push({
      key: "built",
      title: "What I built",
      body: (
        <ul role="list" className="space-y-3 text-base leading-relaxed text-text-2">
          {built.map((item) => (
            <li key={item} className={bulletClass}>
              {item}
            </li>
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
    <main className="container max-w-5xl pb-16 pt-24 md:pb-28">
      <motion.div {...fade(0)}>
        <Link href="/projects" className={buttonVariants({ variant: "ghost", size: "sm" })}>
          <ArrowLeft aria-hidden="true" />
          Back to Projects
        </Link>
      </motion.div>

      <motion.div {...fade(0.05)} className="mb-12 mt-8">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <Chip tone={categoryIcons[kind].tone} className="gap-1.5">
            <CategoryIcon kind={kind} className="h-3 w-3" />
            {project.category}
          </Chip>
          <Chip>{project.projectType}</Chip>
          {meta && <span className="text-sm text-muted-foreground">{meta}</span>}
        </div>
        <h1 className="text-4xl font-semibold md:text-5xl">
          <TextReveal text={project.title} immediate stagger={0.04} />
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-2">{project.description}</p>

        {screenshots.length > 0 ? (
          <ProjectImageCarousel
            images={screenshots}
            title={project.title}
            autoSwitchInterval={4000}
            aspect={aspect}
            fit={aspect === "4/3" ? "contain" : "cover"}
            className="mt-10 rounded-lg border border-border"
          />
        ) : project.image && imageAvailable ? (
          <div className={cn("relative mt-10 w-full overflow-hidden rounded-lg border border-border bg-card-2", aspectClass[aspect])}>
            <Image
              src={project.image}
              alt={project.imageAlt ?? project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
              priority
            />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-background/15" />
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
        <div className="space-y-5">
          {sections.map((section, index) => (
            <motion.section key={section.key} {...fade(0.1 + 0.05 * index)}>
              <SpotlightCard className="rounded-lg border border-border bg-card p-6 transition-colors hover:border-border-strong md:p-8">
                <h2 className="mb-5 text-2xl font-semibold">{section.title}</h2>
                {section.body}
              </SpotlightCard>
            </motion.section>
          ))}
        </div>
      )}

      {nextProject && (
        <motion.div {...fade(0.3)} className="mt-12">
          <SpotlightCard className="rounded-lg border border-border bg-card transition-[transform,border-color] duration-200 motion-safe:hover:-translate-y-1 hover:border-border-strong">
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex items-center justify-between gap-4 rounded-lg p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:p-8"
            >
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Next project</p>
                <p className="mt-2 flex items-center gap-2 text-xl font-semibold md:text-2xl">
                  <CategoryIcon kind={getProjectKind(nextProject)} />
                  <span className="truncate">{nextProject.title}</span>
                </p>
                <p className="mt-1 line-clamp-1 text-sm text-text-2">{nextProject.description}</p>
              </div>
              <ArrowRight
                className="h-6 w-6 shrink-0 text-muted-foreground transition-[transform,color] group-hover:translate-x-1 group-hover:text-lime"
                aria-hidden="true"
              />
            </Link>
          </SpotlightCard>
        </motion.div>
      )}
    </main>
  )
}
