"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react"
import { getProjectKind, getProjectLinks, type Project } from "@/constants/projects"
import { CategoryIcon } from "@/components/category-icon"
import { Chip } from "@/components/chip"
import { ProjectImage } from "@/components/project-image"
import { cn } from "@/lib/utils"

interface ProjectExpandCardProps {
  project: Project
  open: boolean
  onToggle: () => void
  /** Whether `project.image` exists under public/. */
  imageAvailable: boolean
}

const subheadingClass = "mb-2 text-2xs uppercase tracking-wider text-muted-foreground"
const linkChipClass = "gap-1 transition-colors hover:border-border-strong hover:text-foreground"

/**
 * Feature card. Collapsed: visual, category icon, title, one-line description, "Learn more".
 * The whole header is a click target; the real toggle is the button inside the heading, so the
 * title stays a heading for assistive tech and keyboard users get a focusable control.
 * Expanded panel is always in the DOM (server-rendered) and only hidden by height.
 */
export function ProjectExpandCard({ project, open, onToggle, imageAvailable }: ProjectExpandCardProps) {
  const reduceMotion = useReducedMotion()
  const panelId = `project-panel-${project.slug}`
  const kind = getProjectKind(project)
  const links = getProjectLinks(project)
  const transition = reduceMotion ? { duration: 0 } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }

  return (
    <article
      className={cn(
        // The 2px lime bar on the left edge only appears on hover.
        "relative overflow-hidden rounded-lg border bg-card transition-[transform,border-color] duration-150 motion-safe:hover:-translate-y-0.5 hover:border-border-strong",
        "before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:bg-lime before:opacity-0 before:transition-opacity before:duration-150 hover:before:opacity-100",
        open ? "border-border-strong" : "border-border"
      )}
    >
      {/* A click anywhere in the header toggles; the button's own keyboard activation bubbles here too. */}
      <div className="group cursor-pointer" onClick={onToggle}>
        <ProjectImage project={project} kind={kind} available={imageAvailable} />

        <div className="p-5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CategoryIcon kind={kind} />
            {(project.label || project.period) && (
              <span>{[project.label, project.period].filter(Boolean).join(" · ")}</span>
            )}
          </div>

          <h3 className="mt-3 text-[15px] font-semibold">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              className="flex w-full items-start justify-between gap-3 rounded-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            >
              <span>{project.title}</span>
              <ChevronDown
                className={cn(
                  "mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300",
                  open && "rotate-180"
                )}
                aria-hidden="true"
              />
            </button>
          </h3>

          <p className="mt-2 min-h-[39px] line-clamp-2 text-sm text-muted-foreground">{project.description}</p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 3).map((tech) => (
              <Chip key={tech}>{tech}</Chip>
            ))}
          </div>

          {/* Visual affordance only; the heading button is the control. */}
          <span
            aria-hidden="true"
            className="mt-4 inline-flex items-center gap-1 text-sm text-text-2 transition-colors group-hover:text-foreground"
          >
            Learn more
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
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
        <div className="space-y-5 border-t border-border px-5 pb-5 pt-4">
          {project.problem && (
            <div>
              <h4 className={subheadingClass}>Problem</h4>
              <p className="text-sm text-muted-foreground">{project.problem}</p>
            </div>
          )}

          {project.built && project.built.length > 0 && (
            <div>
              <h4 className={subheadingClass}>What I built</h4>
              <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground marker:text-muted-foreground">
                {project.built.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h4 className={subheadingClass}>Stack</h4>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <Chip key={tech}>{tech}</Chip>
              ))}
            </div>
          </div>

          <div>
            <h4 className={subheadingClass}>Links</h4>
            <div className="flex flex-wrap gap-1.5">
              {links.map((link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex">
                  <Chip className={linkChipClass}>
                    {link.label}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Chip>
                </a>
              ))}
              <Link href={`/projects/${project.slug}`} className="inline-flex">
                <Chip className={linkChipClass}>
                  Case study
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Chip>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </article>
  )
}
