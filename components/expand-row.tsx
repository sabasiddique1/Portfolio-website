"use client"

import type { ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import type { ProjectKind } from "@/constants/projects"
import { CategoryIcon } from "@/components/category-icon"
import { Chip } from "@/components/chip"
import { cn } from "@/lib/utils"

interface ExpandRowProps {
  id: string
  kind?: ProjectKind
  title: string
  line: string
  meta: string
  chips: string[]
  open: boolean
  onToggle: () => void
  children?: ReactNode
  /** No expandable content: plain title, no chevron, no panel. */
  disabled?: boolean
}

/**
 * One table row: title, one-line summary and meta on the left, chips on the right, panel below.
 * The whole header is the click target; the real toggle is the button inside the heading, so the
 * title stays a heading for assistive tech and keyboard activation bubbles up to the header.
 * The panel is always mounted (server-rendered) and only hidden by height.
 */
export function ExpandRow({
  id,
  kind,
  title,
  line,
  meta,
  chips,
  open,
  onToggle,
  children,
  disabled = false,
}: ExpandRowProps) {
  const reduceMotion = useReducedMotion()
  const panelId = `${id}-panel`
  const transition = reduceMotion ? { duration: 0 } : { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const }

  const heading = (
    <>
      {kind && <CategoryIcon kind={kind} />}
      {title}
    </>
  )

  return (
    <li className={cn("border-b border-border last:border-b-0", open && "bg-surface")}>
      <div
        className={cn(
          "grid grid-cols-1 gap-3 px-4 py-4 transition-colors md:grid-cols-[1fr_auto] md:items-start",
          !disabled && "cursor-pointer hover:bg-surface"
        )}
        onClick={disabled ? undefined : onToggle}
      >
        <div className="min-w-0">
          <h3 className="text-[15px] font-semibold">
            {disabled ? (
              <span className="flex items-center gap-2">{heading}</span>
            ) : (
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                className="flex items-center gap-2 rounded-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {heading}
                <ChevronDown
                  className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")}
                  aria-hidden="true"
                />
              </button>
            )}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{line}</p>
          <p className="mt-1 text-xs text-muted-foreground">{meta}</p>
        </div>

        {chips.length > 0 && (
          <div className="flex flex-wrap gap-1.5 md:justify-end">
            {chips.map((chip) => (
              <Chip key={chip}>{chip}</Chip>
            ))}
          </div>
        )}
      </div>

      {!disabled && (
        <motion.div
          id={panelId}
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={transition}
          className="overflow-hidden"
          aria-hidden={!open}
          inert={!open}
        >
          <div className="px-4 pb-4">{children}</div>
        </motion.div>
      )}
    </li>
  )
}
