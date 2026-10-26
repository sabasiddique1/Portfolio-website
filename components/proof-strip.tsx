// DEMO — remove by deleting <ProofStrip /> in page.tsx
"use client"

import { ArrowUpRight } from "lucide-react"
import { proofChips } from "@/constants/proof"

/** One thin row of external pill links between the featured work and the timeline. */
export function ProofStrip() {
  return (
    <div className="border-y border-border/40 py-6">
      <div className="container px-4 md:px-6">
        <ul className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {proofChips.map((chip) => (
            <li key={chip.url}>
              <a
                href={chip.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-muted/30 px-3 py-1.5 text-xs transition-colors hover:border-primary/40 hover:text-primary md:text-sm"
              >
                {chip.label}
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
