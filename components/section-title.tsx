import Link from "next/link"
import { ArrowRight, type LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface SectionTitleProps {
  title: string
  /** 16px lucide icon, coloured via `iconClassName` (e.g. "text-tone-green-text"). */
  icon: LucideIcon
  iconClassName: string
  /** 12px muted line under the title. */
  subtitle?: string
  /** Right-aligned "Label →" link (left-aligned headers only). */
  action?: { label: string; href: string }
  /** "sm" = 14px row header (like "Featured Models"); "md" = 18px section title (like "Agents & tools"). */
  size?: "sm" | "md"
  as?: "h1" | "h2" | "h3"
  /** Forwarded to the heading element, for `aria-labelledby`. */
  id?: string
  align?: "left" | "center"
  className?: string
}

/** Section header: coloured icon + title, optional subline and action link. 24px below it. Flat, no decoration. */
export function SectionTitle({
  title,
  icon: Icon,
  iconClassName,
  subtitle,
  action,
  size = "md",
  as: Heading = "h2",
  id,
  align = "left",
  className,
}: SectionTitleProps) {
  const centered = align === "center"

  return (
    <div
      className={cn(
        "mb-6 flex gap-4",
        centered ? "flex-col items-center text-center" : "items-end justify-between",
        className
      )}
    >
      <div className="min-w-0">
        <Heading
          id={id}
          className={cn(
            "flex items-center gap-2 font-semibold text-foreground",
            centered && "justify-center",
            size === "md" ? "text-lg leading-7" : "text-[14px] leading-6"
          )}
        >
          <Icon className={cn("h-4 w-4 shrink-0", iconClassName)} strokeWidth={1.75} aria-hidden="true" />
          {title}
        </Heading>
        {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      {action && !centered && (
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
