import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ChipProps {
  children: ReactNode
  /** Active state: lime text on lime-dim. The only place lime appears outside primary buttons. */
  active?: boolean
  className?: string
}

/** Stack / highlight chip: 6px radius, 1px border, 12px text. */
export function Chip({ children, active = false, className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium leading-5",
        active ? "border-transparent bg-lime-dim text-lime" : "border-border bg-surface text-text-2",
        className
      )}
    >
      {children}
    </span>
  )
}
