"use client"

import { useState } from "react"
import type { Project } from "@/constants/projects"
import { ProjectExpandCard } from "@/components/project-expand-card"
import { SectionReveal } from "@/components/section-reveal"
import { cn } from "@/lib/utils"

interface ProjectCardGroupProps {
  projects: Project[]
  /** Image paths that exist under public/, from getAvailableProjectImages() on the server. */
  availableImages: string[]
  columns?: 1 | 2
}

/** Grid of expandable cards; one card open at a time, clicking the open card closes it. */
export function ProjectCardGroup({ projects, availableImages, columns = 2 }: ProjectCardGroupProps) {
  const [openId, setOpenId] = useState<number | null>(null)

  return (
    <div className={cn("grid grid-cols-1 items-start gap-4", columns === 2 && "md:grid-cols-2")}>
      {projects.map((project, index) => (
        // Stagger only within a row so cards further down are not held back.
        <SectionReveal key={project.id} delay={(index % columns) * 0.08}>
          <ProjectExpandCard
            project={project}
            open={openId === project.id}
            onToggle={() => setOpenId((current) => (current === project.id ? null : project.id))}
            imageAvailable={Boolean(project.image && availableImages.includes(project.image))}
          />
        </SectionReveal>
      ))}
    </div>
  )
}
