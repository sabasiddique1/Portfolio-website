import Link from "next/link"
import { ChevronRight, ExternalLink, Github } from "lucide-react"
import { CategoryIcon } from "@/components/category-icon"
import { Chip } from "@/components/chip"
import { getProjectKind, getProjectLinks, type Project } from "@/constants/projects"

/**
 * Table-style list for the /projects "More projects" section: no cards, no images.
 * One row per project; on md+ the title, description and stack chips share a line.
 */
export function ProjectsList({ projects }: { projects: Project[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="grid grid-cols-[1fr_auto] border-b border-border px-5 py-2 text-2xs uppercase tracking-wider text-muted-foreground">
        <span>Project</span>
        <span className="hidden md:block">Links</span>
      </div>

      <ul className="divide-y divide-border">
        {projects.map((project) => {
          const links = getProjectLinks(project)

          return (
            <li
              key={project.id}
              className="grid grid-cols-1 items-center gap-2 px-5 py-4 transition-colors hover:bg-surface md:grid-cols-[minmax(0,1fr)_auto] md:gap-6"
            >
              <div className="flex min-w-0 flex-col gap-1 md:flex-row md:items-center">
                <div className="flex shrink-0 items-center gap-2">
                  <CategoryIcon kind={getProjectKind(project)} />
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-sm font-medium transition-colors hover:text-foreground"
                  >
                    {project.title}
                    {/* Inline so the chevron stays next to the last word when the title wraps. */}
                    <ChevronRight className="ml-1 inline h-3.5 w-3.5 align-[-2px] text-muted-foreground" aria-hidden="true" />
                  </Link>
                </div>
                <p className="line-clamp-1 min-w-0 text-sm text-muted-foreground md:ml-2 md:flex-1">
                  {project.description}
                </p>
                <div className="hidden shrink-0 flex-wrap gap-1.5 md:flex">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Chip key={tech}>{tech}</Chip>
                  ))}
                </div>
              </div>

              {links.length > 0 && (
                <div className="flex items-center gap-3">
                  {links.map((link) => {
                    const Icon = link.label === "Repo" ? Github : ExternalLink
                    return (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title}: ${link.label}`}
                        className="inline-flex h-6 w-6 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </a>
                    )
                  })}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
