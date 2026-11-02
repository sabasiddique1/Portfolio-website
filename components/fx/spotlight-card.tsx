"use client"

import { useCallback, useRef, type HTMLAttributes, type MouseEvent } from "react"
import { cn } from "@/lib/utils"

type SpotlightCardProps = HTMLAttributes<HTMLDivElement> & {
  /** Rendered element; `li` for list items so semantics are kept. */
  as?: "div" | "li" | "article" | "a"
  href?: string
  target?: string
  rel?: string
}

/**
 * Surface whose accent glow and border highlight follow the cursor (`.spotlight` in globals.css).
 * This component only writes the cursor position into two CSS variables; the visuals are pure CSS,
 * so there is nothing to animate under reduced motion and nothing runs while the pointer is away.
 */
export function SpotlightCard({ as: Tag = "div", className, children, onMouseMove, ...rest }: SpotlightCardProps) {
  const ref = useRef<HTMLElement>(null)

  const handleMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const element = ref.current
      if (element) {
        const rect = element.getBoundingClientRect()
        element.style.setProperty("--mx", `${event.clientX - rect.left}px`)
        element.style.setProperty("--my", `${event.clientY - rect.top}px`)
      }
      onMouseMove?.(event)
    },
    [onMouseMove]
  )

  const Component = Tag as "div"
  return (
    <Component ref={ref as never} onMouseMove={handleMove} className={cn("spotlight", className)} {...rest}>
      {children}
    </Component>
  )
}
