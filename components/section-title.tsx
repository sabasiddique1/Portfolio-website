import Link from "next/link"
import { ArrowRight, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface SectionTitleProps {
  title: string
  /** 16px lucide icon, coloured via `iconClassName` (e.g. "text-cat-agents"). */
  icon: LucideIcon
  iconClassName: string
  /** 12px muted line under the title. */
  subtitle?: string
  /** Right-aligned "Label →" link. */
  action?: { label: string; href: string }
  /** "sm" = 14px row header (like "Featured Models"); "md" = 18px section title (like "Agents & tools"). */
  size?: "sm" | "md"
  as?: "h1" | "h2" | "h3"
  /** Forwarded to the heading element, for `aria-labelledby`. */
  id?: string
  className?: string
}

/** Section header: coloured icon + title left, optional subline and action link. Flat, no decoration. */
export function SectionTitle({
  title,
  icon: Icon,
  iconClassName,
  subtitle,
  action,
  size = "md",
  as: Heading = "h2",
  id,
  className,
}: SectionTitleProps) {
  return (
    <div className={cn("mb-6 flex items-end justify-between gap-4", className)}>
      <div className="min-w-0">
        <Heading
          id={id}
          className={cn(
            "flex items-center gap-2 font-semibold text-foreground",
            size === "md" ? "text-lg leading-7" : "text-[14px] leading-6"
          )}
        >
          <Icon className={cn("h-4 w-4 shrink-0", iconClassName)} strokeWidth={1.75} aria-hidden="true" />
          {title}
        </Heading>
        {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="inline-flex shrink-0 items-center gap-1 text-sm text-text-2 transition-colors hover:text-foreground"
        >
          {action.label}
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      )}
    </div>
  )
}
