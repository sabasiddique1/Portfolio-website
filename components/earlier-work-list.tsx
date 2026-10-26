import Link from "next/link"
import { ArrowUpRight, ExternalLink, Github } from "lucide-react"
import { getProjectLinks, type Project, type ProjectLink } from "@/constants/projects"

function LinkIcon({ label }: { label: ProjectLink["label"] }) {
  const className = "h-3.5 w-3.5"
  if (label === "Repo") return <Github className={className} aria-hidden="true" />
  if (label === "Live") return <ExternalLink className={className} aria-hidden="true" />
  return <ArrowUpRight className={className} aria-hidden="true" />
}

/** Compact divided list for earlier work: title, one clamped description line, small repo/live links. */
export function EarlierWorkList({ projects }: { projects: Project[] }) {
  return (
    <ul className="divide-y divide-border/40">
      {projects.map((project) => {
        const links = getProjectLinks(project)

        return (
          <li key={project.id} className="py-4 md:flex md:items-baseline md:gap-4">
            {/* On md+ the wrapper dissolves so title, description and links sit on one row. */}
            <div className="flex items-baseline justify-between gap-4 md:contents">
              <Link
                href={`/projects/${project.slug}`}
                className="font-medium transition-colors hover:text-primary md:shrink-0"
              >
                {project.title}
              </Link>
              {links.length > 0 && (
                <div className="flex shrink-0 items-center gap-3 md:order-last md:ml-auto">
                  {links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title}: ${link.label}`}
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary"
                    >
                      <LinkIcon label={link.label} />
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground md:mt-0 md:line-clamp-1 md:min-w-0 md:flex-1">
              {project.description}
            </p>
          </li>
        )
      })}
    </ul>
  )
}
