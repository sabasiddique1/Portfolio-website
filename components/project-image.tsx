import Image from "next/image"
import type { Project, ProjectKind } from "@/constants/projects"
import { ProjectCover } from "@/components/project-cover"
import { cn } from "@/lib/utils"

interface ProjectImageProps {
  project: Pick<Project, "title" | "image" | "imageAlt">
  kind: ProjectKind
  /** Whether `project.image` exists under public/ (checked on the server). */
  available: boolean
  className?: string
}

// Slow 4% zoom while the card header (`group`) is hovered; the wrapper clips it.
const zoomClass = "transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"

/**
 * 4:3 visual at the top of a feature card, shown in full: the card images are 1600x1200, so
 * `object-cover` crops nothing. A generated cover of the same size fills in while a file is missing,
 * so the grid stays even. Nothing is overlaid on the image; the meta line sits under it.
 * Never emits an <img> for a missing file.
 */
export function ProjectImage({ project, kind, available, className }: ProjectImageProps) {
  return (
    <div className={cn("relative aspect-[4/3] w-full overflow-hidden border-b border-border bg-card-2", className)}>
      {project.image && available ? (
        <>
          <Image
            src={project.image}
            alt={project.imageAlt ?? project.title}
            fill
            className={cn("object-cover", zoomClass)}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Light screenshots get a thin dark veil so they sit closer to the page background. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-background/15" />
        </>
      ) : (
        <ProjectCover title={project.title} kind={kind} className={zoomClass} />
      )}
    </div>
  )
}
