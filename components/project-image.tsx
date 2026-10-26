import Image from "next/image"
import type { Project, ProjectKind } from "@/constants/projects"
import { CategoryIcon } from "@/components/category-icon"
import { cn } from "@/lib/utils"

interface ProjectImageProps {
  project: Pick<Project, "title" | "image" | "imageAlt">
  kind: ProjectKind
  /** Whether `project.image` exists under public/ (checked on the server). */
  available: boolean
  className?: string
}

// Slow 3% zoom while the card header (`group`) is hovered; the 160px wrapper clips it.
const zoomClass = "transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03]"

/**
 * Fixed 160px visual at the top of a feature card: the screenshot when it exists,
 * otherwise a darker block with the category icon. Never emits an <img> for a missing file.
 */
export function ProjectImage({ project, kind, available, className }: ProjectImageProps) {
  if (project.image && available) {
    return (
      <div className={cn("relative h-40 w-full overflow-hidden bg-card-2", className)}>
        <Image
          src={project.image}
          alt={project.imageAlt ?? project.title}
          fill
          className={cn("object-cover", zoomClass)}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    )
  }

  return (
    <div aria-hidden="true" className={cn("h-40 w-full overflow-hidden bg-card-2", className)}>
      <div className={cn("flex h-full w-full items-center justify-center", zoomClass)}>
        <CategoryIcon kind={kind} className="h-6 w-6" />
      </div>
    </div>
  )
}
