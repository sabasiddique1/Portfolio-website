"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { ArrowUpRight, ChevronDown } from "lucide-react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { journey, type JourneyStep } from "@/constants/journey"
import { SectionHeading } from "@/components/section-heading"
import { SectionReveal } from "@/components/section-reveal"
import { cn } from "@/lib/utils"

export function JourneyTimeline() {
  const listRef = useRef<HTMLOListElement>(null)
  const reduceMotion = useReducedMotion()

  // The line draws from the list entering 80% down the viewport until its end passes 60%.
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 80%", "end 60%"] })
  // Overdamped, so it never overshoots past the end of the track.
  const drawn = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.5 })
  // Fully drawn under reduced motion. Read inside the transform so the first client render matches the server.
  const scaleY = useTransform(drawn, (value) => (reduceMotion ? 1 : value))

  return (
    <section id="journey" className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <SectionHeading title="From frontend to AI" />

        <ol ref={listRef} className="relative mx-auto max-w-3xl pl-8 sm:pl-10">
          {/* Track, and the line that draws over it as the user scrolls */}
          <div
            aria-hidden="true"
            className="absolute bottom-1 left-[5.5px] top-1 w-px bg-gradient-to-b from-border via-border via-85% to-transparent"
          />
          <motion.div
            aria-hidden="true"
            className="absolute bottom-1 left-[5.5px] top-1 w-px bg-gradient-to-b from-primary via-primary via-85% to-transparent"
            style={{ scaleY, transformOrigin: "top" }}
          />

          {journey.map((step) => (
            <JourneyStepItem key={step.id} step={step} />
          ))}
        </ol>
      </div>
    </section>
  )
}

function JourneyStepItem({ step }: { step: JourneyStep }) {
  const reduceMotion = useReducedMotion()
  const [open, setOpen] = useState(false)

  const details = step.details ?? []
  const links = step.links ?? []
  const hasExtras = details.length > 0 || links.length > 0 || Boolean(step.footnote)
  const panelId = `journey-${step.id}-details`

  return (
    <li className="pb-8 last:pb-0">
      <SectionReveal className="relative">
        <span
          aria-hidden="true"
          className="absolute -left-8 top-1 h-3 w-3 rounded-full bg-primary ring-4 ring-background sm:-left-10"
        />
        <p className="text-xs leading-5 text-muted-foreground">{step.period}</p>
        <h3 className="mt-1 text-base font-semibold leading-snug text-foreground sm:text-lg">{step.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{step.summary}</p>

        {hasExtras && (
          <>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen((value) => !value)}
              className="mt-2 inline-flex items-center gap-1 rounded-md text-xs font-medium text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Details
              <ChevronDown
                className={cn("h-3.5 w-3.5 shrink-0 transition-transform duration-200", open && "rotate-180")}
              />
            </button>

            {/* Always mounted so the details are in the server HTML; collapsed with height, not display */}
            <motion.div
              id={panelId}
              initial={false}
              animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
              aria-hidden={!open}
              inert={!open}
            >
              <div className="space-y-3 pt-3">
                {details.map((line) => (
                  <p key={line} className="text-sm text-muted-foreground">
                    {line}
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
                          className="inline-flex items-center gap-1 rounded-full border border-border/50 bg-muted/30 px-2.5 py-1 text-xs text-foreground/90 transition-colors hover:border-primary/40 hover:text-foreground"
                        >
                          {link.label}
                          <ArrowUpRight className="h-3 w-3 shrink-0 opacity-70" />
                        </a>
                      </li>
                    ))}
                  </ul>
                )}

                {step.footnote && <p className="text-xs text-muted-foreground">{step.footnote}</p>}
              </div>
            </motion.div>
          </>
        )}
      </SectionReveal>
    </li>
  )
}
