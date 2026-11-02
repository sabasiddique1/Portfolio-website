import { cn } from "@/lib/utils"

interface MarqueeProps {
  items: readonly string[]
  className?: string
  label?: string
}

/**
 * Endless horizontal strip of labels (the stack). Pure CSS: the track holds two copies and translates
 * by half its width, so the loop is seamless; it pauses on hover and, under reduced motion, becomes a
 * static wrapping row with the duplicate copy removed.
 */
export function Marquee({ items, className, label = "Stack" }: MarqueeProps) {
  const row = (ariaHidden: boolean) => (
    <ul
      aria-hidden={ariaHidden || undefined}
      className={cn(
        "flex shrink-0 items-center gap-3 pr-3 motion-reduce:flex-wrap motion-reduce:justify-center",
        ariaHidden && "motion-reduce:hidden"
      )}
    >
      {items.map((item) => (
        <li
          key={item}
          className="inline-flex items-center gap-3 whitespace-nowrap rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium text-text-2"
        >
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-lime" />
          {item}
        </li>
      ))}
    </ul>
  )

  return (
    <div className={cn("mask-fade-x group/marquee w-full overflow-hidden", className)} aria-label={label}>
      <div className="flex w-max motion-safe:animate-marquee motion-safe:group-hover/marquee:[animation-play-state:paused] motion-reduce:w-full">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
