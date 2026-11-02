import { cn } from "@/lib/utils"

/** Accent light running around the parent's border (parent: `relative` + a border radius). Hidden under reduced motion. */
export function BorderBeam({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn("border-beam", className)} />
}
