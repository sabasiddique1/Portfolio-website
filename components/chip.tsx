import type { ReactNode } from "react"
import { chipToneClasses, getChipTone, type ChipTone } from "@/lib/chip-tone"
import { cn } from "@/lib/utils"

interface ChipProps {
  children: ReactNode
  /** Colour tone; derived from the text when the chip's content is a plain string. */
  tone?: ChipTone
  /** Active state: lime text on lime-dim. The only place lime appears outside primary buttons. */
  active?: boolean
  className?: string
}

/** Stack / highlight chip: 11px/500, 2px 8px padding, 6px radius, 1px border, toned by keyword. */
export function Chip({ children, tone, active = false, className }: ChipProps) {
  const resolved = tone ?? (typeof children === "string" ? getChipTone(children) : "default")

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium leading-4",
        active ? "border-transparent bg-lime-dim text-lime" : chipToneClasses[resolved],
        className
      )}
    >
      {children}
    </span>
  )
}
