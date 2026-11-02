import Link from "next/link"
import { ArrowRight, type LucideIcon } from "lucide-react"
import { TextReveal } from "@/components/fx/text-reveal"
import { cn } from "@/lib/utils"

interface SectionTitleProps {
  title: string
  /** 16px lucide icon, coloured via `iconClassName` (e.g. "text-tone-green-text"). */
  icon: LucideIcon
  iconClassName: string
  /** Small label above the title, e.g. "01" or "Selected work". Rendered uppercase with the icon. */
  kicker?: string
  /** Muted line under the title. */
  subtitle?: string
  /** Right-aligned "Label →" link (left-aligned headers only). */
  action?: { label: string; href: string }
  /** "sm" = 16px row header; "md" = 28px section title; "lg" = 40px display title. */
  size?: "sm" | "md" | "lg"
  as?: "h1" | "h2" | "h3"
  /** Forwarded to the heading element, for `aria-labelledby`. */
  id?: string
  align?: "left" | "center"
  className?: string
}

const titleSize = {
  sm: "text-base leading-6",
  md: "text-2xl leading-tight md:text-[32px]",
  lg: "text-3xl leading-tight md:text-5xl",
}

/**
 * Section header: eyebrow (icon + kicker), a large title that reveals word by word, a readable
 * subtitle and an optional action link. The eyebrow is the visual cue that tells the reader what
 * kind of section follows before they read the title.
 */
export function SectionTitle({
  title,
  icon: Icon,
  iconClassName,
  kicker,
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
        "mb-10 flex gap-4",
        // Stacks on phones so the title keeps its full width; the action sits beside it from md up.
        centered ? "flex-col items-center text-center" : "flex-col items-start md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <div className={cn("min-w-0", centered && "flex flex-col items-center")}>
        <div className={cn("flex items-center gap-2", size === "sm" ? "mb-1" : "mb-3")}>
          <span
            className={cn(
              "inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card",
              size === "sm" && "h-6 w-6"
            )}
          >
            <Icon className={cn("h-4 w-4 shrink-0", iconClassName)} strokeWidth={1.75} aria-hidden="true" />
          </span>
          {kicker && (
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{kicker}</span>
          )}
        </div>
        <Heading id={id} className={cn("font-semibold text-foreground", titleSize[size], centered && "justify-center")}>
          {size === "sm" ? title : <TextReveal text={title} stagger={0.04} />}
        </Heading>
        {subtitle && (
          <p className={cn("mt-2 max-w-xl text-muted-foreground", size === "sm" ? "text-sm" : "text-base md:text-lg")}>
            {subtitle}
          </p>
        )}
      </div>
      {action && !centered && (
        <Link
          href={action.href}
          className="group inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-sm text-text-2 transition-colors hover:border-border-strong hover:text-foreground"
        >
          {action.label}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      )}
    </div>
  )
}
