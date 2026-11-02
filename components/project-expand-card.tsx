"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react"
import { getProjectKind, getProjectLinks, type Project } from "@/constants/projects"
import { CategoryIcon, categoryIcons } from "@/components/category-icon"
import { Chip } from "@/components/chip"
import { SpotlightCard } from "@/components/fx/spotlight-card"
import { ProjectImage } from "@/components/project-image"
import { cn } from "@/lib/utils"

interface ProjectExpandCardProps {
  project: Project
  open: boolean
  onToggle: () => void
  /** Whether `project.image` exists under public/. */
  imageAvailable: boolean
}

const subheadingClass = "mb-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground"
const linkChipClass = "gap-1 transition-colors hover:border-border-strong hover:text-foreground"
const bulletClass =
  "relative pl-5 before:absolute before:left-0 before:top-[0.72em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-lime"

/**
 * Feature card. Collapsed: 4:3 visual shown in full, a meta row (category chip, label and period), title,
 * two-line description, three stack chips, "Expand". The whole header is a click target; the real
 * toggle is the button inside the heading, so the title stays a heading for assistive tech and
 * keyboard users get a focusable control. The panel is always in the DOM and only hidden by height.
 * The surface is a SpotlightCard: the accent glow follows the cursor.
 */
export function ProjectExpandCard({ project, open, onToggle, imageAvailable }: ProjectExpandCardProps) {
  const reduceMotion = useReducedMotion()
  const panelId = `project-panel-${project.slug}`
  const kind = getProjectKind(project)
  const links = getProjectLinks(project)
  const transition = reduceMotion ? { duration: 0 } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }
  // Right side of the meta row: who it was for / what kind of project, then when.
  const meta = [project.label ?? project.projectType, project.period].filter(Boolean).join(" · ")

  return (
    <SpotlightCard
      as="article"
      className={cn(
        "group/card overflow-hidden rounded-lg border bg-card transition-[transform,border-color] duration-200 motion-safe:hover:-translate-y-1 hover:border-border-strong",
        open ? "border-border-strong" : "border-border"
      )}
    >
      {/* 2px accent bar on the left edge, hover only. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-0.5 bg-lime opacity-0 transition-opacity duration-200 group-hover/card:opacity-100"
      />

      {/* A click anywhere in the header toggles; the button's own keyboard activation bubbles here too. */}
      <div className="group cursor-pointer" onClick={onToggle}>
        <ProjectImage project={project} kind={kind} available={imageAvailable} />

        <div className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
            <Chip tone={categoryIcons[kind].tone} className="gap-1.5 whitespace-nowrap">
              <CategoryIcon kind={kind} className="h-3 w-3" />
              {project.category}
            </Chip>
            {meta && <span className="text-xs text-muted-foreground">{meta}</span>}
          </div>

          <h3 className="mt-3 text-lg font-semibold">
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              className="flex w-full items-start justify-between gap-3 rounded-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            >
              <span>{project.title}</span>
              <ChevronDown
                className={cn(
                  "mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300",
                  open && "rotate-180"
                )}
                aria-hidden="true"
              />
            </button>
          </h3>

          <p className="mt-2 line-clamp-2 min-h-[52px] text-base leading-relaxed text-text-2">{project.description}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 3).map((tech) => (
              <Chip key={tech}>{tech}</Chip>
            ))}
          </div>

          {/* Visual affordance only; the heading button is the control. */}
          <span
            aria-hidden="true"
            className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-text-2 transition-colors group-hover:text-foreground"
          >
            {open ? "Collapse" : "Expand"}
            <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-300", open && "rotate-180")} />
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
        <div className="space-y-6 border-t border-border px-6 pb-6 pt-5">
          {project.problem && (
            <div>
              <h4 className={subheadingClass}>Problem</h4>
              <p className="text-base leading-relaxed text-text-2">{project.problem}</p>
            </div>
          )}

          {project.built && project.built.length > 0 && (
            <div>
              <h4 className={subheadingClass}>What I built</h4>
              <ul className="space-y-2.5 text-base leading-relaxed text-text-2">
                {project.built.map((item) => (
                  <li key={item} className={bulletClass}>
                    {item}
                  </li>
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
    </SpotlightCard>
  )
}
