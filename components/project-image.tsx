import Image from "next/image"
import type { Project } from "@/constants/projects"
import { cn } from "@/lib/utils"

interface ProjectImageProps {
  project: Pick<Project, "title" | "image" | "imageAlt">
  /** Whether `project.image` exists under public/ (checked on the server). */
  available: boolean
  className?: string
}

/**
 * Project screenshot, or a neutral placeholder until the PNG lands in public/.
 * Never emits an <img> for a file that is not there.
 */
export function ProjectImage({ project, available, className }: ProjectImageProps) {
  if (project.image && available) {
    return (
      <div className={cn("relative w-full aspect-[3/2] overflow-hidden rounded-lg bg-muted", className)}>
        <Image
          src={project.image}
          alt={project.imageAlt ?? project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    )
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex w-full aspect-[3/2] items-center justify-center rounded-lg border border-border/50 bg-muted/40",
        className
      )}
    >
      <span className="px-4 text-center text-xs text-muted-foreground">{project.title}</span>
    </div>
  )
}
