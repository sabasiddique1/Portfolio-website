import { cn } from "@/lib/utils"

interface GridBackgroundProps {
  className?: string
  /** Show the two drifting accent blobs (hero only; expensive-ish, so off by default). */
  aurora?: boolean
}

/**
 * Decorative backdrop: a dot grid that fades out radially, plus (optionally) two soft colour fields
 * that drift slowly. Transform-only animation on pre-blurred elements; parked under reduced motion.
 * Absolutely positioned: the parent needs `relative` (and usually `overflow-hidden`).
 */
export function GridBackground({ className, aurora = false }: GridBackgroundProps) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <div className="bg-dot-grid mask-radial absolute inset-0 opacity-70" />
      {aurora && (
        <>
          <div className="absolute -left-[10%] top-[-20%] h-[60vh] w-[60vw] rounded-full bg-lime/15 blur-[120px] will-change-transform motion-safe:animate-aurora" />
          <div className="absolute -right-[15%] top-[10%] h-[50vh] w-[50vw] rounded-full bg-tone-purple-text/10 blur-[120px] will-change-transform motion-safe:animate-aurora-slow" />
        </>
      )}
      {/* Fades the whole backdrop into the page towards the bottom. */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
    </div>
  )
}
