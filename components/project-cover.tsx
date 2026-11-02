import type { ProjectKind } from "@/constants/projects"
import { categoryIcons } from "@/components/category-icon"
import { cn } from "@/lib/utils"

interface ProjectCoverProps {
  title: string
  kind: ProjectKind
  className?: string
}

/** Tone wash per category, for covers of projects that have no screenshot yet. */
const washByKind: Record<ProjectKind, string> = {
  agents: "from-tone-green-text/25",
  healthcare: "from-tone-orange-text/25",
  ml: "from-tone-blue-text/25",
  research: "from-tone-purple-text/25",
  voice: "from-tone-teal-text/25",
  fullstack: "from-tone-grey-text/20",
}

/** First letters of the first two words: "Clinical Review Intelligence System" → "CR". */
function monogram(title: string): string {
  return title
    .split(/\s+/)
    .filter((word) => /^[A-Za-z]/.test(word))
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("")
}

/**
 * Generated cover for a project without a screenshot: category-toned wash over a dot grid, the
 * category icon and a large monogram. Decorative only; the title follows in text on the card.
 */
export function ProjectCover({ title, kind, className }: ProjectCoverProps) {
  const { Icon, colorClass } = categoryIcons[kind]

  return (
    <div
      aria-hidden="true"
      className={cn("relative flex h-full w-full items-center justify-center overflow-hidden bg-card-2", className)}
    >
      <div className={cn("absolute inset-0 bg-gradient-to-br via-transparent to-transparent", washByKind[kind])} />
      <div className="bg-dot-grid mask-radial absolute inset-0 opacity-90" />
      {/* Oversized monogram, cut off by the frame, like a watermark. */}
      <span
        className={cn(
          "pointer-events-none absolute -bottom-8 -right-3 select-none font-heading text-[160px] font-bold leading-none tracking-tighter opacity-[0.14]",
          colorClass
        )}
      >
        {monogram(title)}
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-border-strong bg-card/90 shadow-lift">
        <Icon className={cn("h-6 w-6", colorClass)} strokeWidth={1.5} />
      </span>
    </div>
  )
}
