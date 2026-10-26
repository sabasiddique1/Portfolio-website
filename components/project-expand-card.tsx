"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react"
import { getProjectLinks, type Project } from "@/constants/projects"
import { ProjectImage } from "@/components/project-image"
import { cn } from "@/lib/utils"

interface ProjectExpandCardProps {
  project: Project
  open: boolean
  onToggle: () => void
  /** Whether `project.image` exists under public/. */
  imageAvailable: boolean
}

const subheadingClass = "mb-2 text-xs font-medium uppercase tracking-wider text-primary"
const tagClass = "rounded-md border border-border/50 bg-muted/40 px-2 py-1 text-xs text-muted-foreground"
const linkClass =
  "inline-flex items-center gap-1 rounded-full border border-border/50 bg-muted/30 px-3 py-1 text-xs transition-colors hover:border-primary/40 hover:text-primary"

/**
 * Collapsed: image, label, title, one-line description, one highlight chip, four stack tags.
 * The whole header is a click target; the real toggle is the button inside the heading, so the
 * title stays a heading for assistive tech and keyboard users get a focusable control.
 * Expanded panel is always in the DOM (server-rendered) and only hidden by height.
 */
export function ProjectExpandCard({ project, open, onToggle, imageAvailable }: ProjectExpandCardProps) {
  const reduceMotion = useReducedMotion()
  const panelId = `project-panel-${project.slug}`
  const links = getProjectLinks(project)
  const transition = reduceMotion ? { duration: 0 } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }

  return (
    <article
      className={cn(
        "rounded-lg border border-border/50 bg-background/50 transition-all duration-300 hover:border-primary/30 hover:shadow-lg",
        open && "border-primary/30 shadow-lg"
      )}
    >
      {/* A click anywhere in the header toggles; the button's own keyboard activation bubbles here too. */}
      <div className="group cursor-pointer p-6" onClick={onToggle}>
        <ProjectImage project={project} available={imageAvailable} className="mb-4" />

        {(project.label || project.period) && (
          <p className="mb-2 flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
            {project.label && <span>{project.label}</span>}
            {project.label && project.period && <span aria-hidden="true">·</span>}
            {project.period && <span>{project.period}</span>}
          </p>
        )}

        <h3 className="text-lg font-semibold">
          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            className="flex w-full items-start justify-between gap-3 rounded-md text-left transition-colors group-hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span>{project.title}</span>
            <motion.span
              initial={false}
              animate={{ rotate: open ? 180 : 0 }}
              transition={transition}
              className="mt-0.5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
              aria-hidden="true"
            >
              <ChevronDown className="h-5 w-5" />
            </motion.span>
          </button>
        </h3>

        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{project.description}</p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {project.highlight && (
            <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {project.highlight}
            </span>
          )}
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className={tagClass}>
              {tech}
            </span>
          ))}
        </div>
      </div>

      <motion.div
        id={panelId}
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={transition}
        className="overflow-hidden"
        aria-hidden={!open}
        inert={!open}
      >
        <div className="space-y-5 border-t border-border/30 px-6 pb-6 pt-5">
          {project.problem && (
            <div>
              <h4 className={subheadingClass}>Problem</h4>
              <p className="text-sm leading-relaxed text-muted-foreground">{project.problem}</p>
            </div>
          )}

          {project.built && project.built.length > 0 && (
            <div>
              <h4 className={subheadingClass}>What I built</h4>
              <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground marker:text-primary/60">
                {project.built.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h4 className={subheadingClass}>Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className={tagClass}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className={subheadingClass}>Links</h4>
            <div className="flex flex-wrap gap-2">
              {links.map((link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {link.label}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ))}
              <Link href={`/projects/${project.slug}`} className={linkClass}>
                Case study
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </article>
  )
}
