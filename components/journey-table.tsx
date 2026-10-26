"use client"

import { useState } from "react"
import { ArrowUpRight, Route } from "lucide-react"
import { journey } from "@/constants/journey"
import { ExpandRow } from "@/components/expand-row"
import { SectionReveal } from "@/components/section-reveal"
import { SectionTitle } from "@/components/section-title"
import { badgeVariants } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export function JourneyTable() {
  // One step open at a time; null = all collapsed.
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section id="journey" className="container py-16 md:py-24">
      <SectionTitle title="From frontend to AI" icon={Route} iconClassName="text-cat-agents" />

      <SectionReveal>
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <div className="grid grid-cols-[1fr_auto] border-b border-border px-4 py-2 text-2xs uppercase tracking-wider text-muted-foreground">
            <span>Step</span>
            <span className="hidden md:block">Focus</span>
          </div>

          <ol>
            {journey.map((step) => {
              const details = step.details ?? []
              const links = step.links ?? []
              const hasExtras = details.length > 0 || links.length > 0 || Boolean(step.footnote)
              const open = openId === step.id

              return (
                <ExpandRow
                  key={step.id}
                  id={`journey-${step.id}`}
                  title={step.title}
                  line={step.summary}
                  meta={step.period}
                  chips={step.chips ?? []}
                  open={open}
                  onToggle={() => setOpenId(open ? null : step.id)}
                  disabled={!hasExtras}
                >
                  <div className="space-y-3">
                    {details.map((text) => (
                      <p key={text} className="text-sm text-muted-foreground">
                        {text}
                      </p>
                    ))}

                    {links.length > 0 && (
                      <ul className="flex flex-wrap gap-2">
                        {links.map((link) => (
                          <li key={link.url}>
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={cn(badgeVariants(), "gap-1 ring-offset-background hover:text-foreground")}
                            >
                              {link.label}
                              <ArrowUpRight className="h-3 w-3 shrink-0" aria-hidden="true" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}

                    {step.footnote && <p className="text-xs text-muted-foreground">{step.footnote}</p>}
                  </div>
                </ExpandRow>
              )
            })}
          </ol>
        </div>
      </SectionReveal>
    </section>
  )
}
