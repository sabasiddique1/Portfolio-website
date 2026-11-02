"use client"

import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Briefcase, ChevronDown } from "lucide-react"
import { experience, type ExperienceRole } from "@/constants/experience"
import { site } from "@/constants/site"
import { Chip } from "@/components/chip"
import { SectionReveal } from "@/components/section-reveal"
import { SectionTitle } from "@/components/section-title"
import { getChipTone, toneBarClasses } from "@/lib/chip-tone"
import { cn } from "@/lib/utils"

const EASE_OUT = [0.16, 1, 0.3, 1] as const

/**
 * Experience as a ledger (deliberately unlike the Journey cards): one wide row per role with the
 * start year as a large marker on the left, the role in the middle and the stack on the right.
 * One role open at a time; rows without bullets are plain.
 */
export function ExperienceTable() {
  // One role open at a time; null = all collapsed.
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section id="experience" className="section container">
      <SectionReveal>
        <SectionTitle
          title="Experience"
          kicker="03 · Roles"
          icon={Briefcase}
          iconClassName="text-tone-blue-text"
          subtitle={site.sections.experience}
        />
      </SectionReveal>

      <SectionReveal>
        <ol role="list" className="border-b border-border">
          {experience.map((role) => {
            const open = openId === role.id
            return (
              <ExperienceRow
                key={role.id}
                role={role}
                open={open}
                onToggle={() => setOpenId(open ? null : role.id)}
              />
            )
          })}
        </ol>
      </SectionReveal>
    </section>
  )
}

interface ExperienceRowProps {
  role: ExperienceRole
  open: boolean
  onToggle: () => void
}

/**
 * One ledger row. The whole header is the click target; the real toggle is the button inside the
 * heading, so the title stays a heading for assistive tech and keyboard activation bubbles up.
 * The panel is always mounted (server-rendered) and only hidden by height.
 */
function ExperienceRow({ role, open, onToggle }: ExperienceRowProps) {
  const reduceMotion = useReducedMotion()
  const disabled = role.bullets.length === 0
  const panelId = `experience-${role.id}-panel`
  const transition = reduceMotion ? { duration: 0 } : { duration: 0.25, ease: EASE_OUT }
  const startYear = role.period.match(/\d{4}/)?.[0] ?? role.period
  // The row's tone bar takes the colour of its first chip.
  const barClass = toneBarClasses[role.chips[0] ? getChipTone(role.chips[0]) : "default"]

  const heading = (
    <>
      {role.title}
      {!disabled && (
        <ChevronDown
          className={cn("mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300", open && "rotate-180")}
          aria-hidden="true"
        />
      )}
    </>
  )

  return (
    <li className={cn("group relative border-t border-border transition-colors", open && "bg-surface")}>
      {/* Tone bar: 40% at rest, full on hover */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute bottom-0 left-0 top-0 w-[3px] opacity-40 transition-opacity duration-150 group-hover:opacity-100",
          barClass
        )}
      />

      <div
        className={cn(
          "grid grid-cols-1 gap-x-8 gap-y-4 px-5 py-6 md:grid-cols-[220px_minmax(0,1fr)_auto] md:items-start md:py-7",
          !disabled && "cursor-pointer hover:bg-surface"
        )}
        onClick={disabled ? undefined : onToggle}
      >
        {/* When: big start year, then the exact period and place. */}
        <div className="flex flex-col items-start gap-1">
          <span className="flex items-center gap-3">
            <span className="text-2xl font-semibold leading-none tabular-nums text-foreground md:text-3xl">{startYear}</span>
            {role.current && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.18em] text-lime">
                <span aria-hidden="true" className="relative flex h-2 w-2">
                  <span className="absolute inset-0 rounded-full bg-lime motion-safe:animate-pulse-ring" />
                  <span className="relative h-2 w-2 rounded-full bg-lime" />
                </span>
                Now
              </span>
            )}
          </span>
          <span className="text-sm text-muted-foreground md:mt-1">
            {role.period}
            <span aria-hidden="true" className="md:hidden">
              {" · "}
            </span>
            <span className="md:block">{role.location}</span>
          </span>
        </div>

        {/* What: title, company, one-line highlight. */}
        <div className="min-w-0">
          <h3 className="text-lg font-semibold leading-snug">
            {disabled ? (
              <span className="flex items-start gap-2">{heading}</span>
            ) : (
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                className="flex items-start gap-2 rounded-md text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {heading}
              </button>
            )}
          </h3>
          <p className="mt-1 text-base font-medium text-text-2">{role.company}</p>
          <p className="mt-2 text-base text-text-2">{role.highlight}</p>
        </div>

        {/* Stack chips, right-aligned on desktop. */}
        {role.chips.length > 0 && (
          <div className="flex flex-wrap gap-1.5 md:max-w-[260px] md:justify-end">
            {role.chips.map((chip) => (
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
          {/* Bullets line up with the middle column on desktop: 220px year column + 32px gap + 20px padding. */}
          <ul className="list-disc space-y-2 px-5 pb-6 pl-10 text-base text-text-2 marker:text-lime md:pl-[292px]">
            {role.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </motion.div>
      )}
    </li>
  )
}
