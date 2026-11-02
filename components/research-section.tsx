import { FlaskConical } from "lucide-react"
import { site } from "@/constants/site"
import type { ChipTone } from "@/lib/chip-tone"
import { Chip } from "@/components/chip"
import { SpotlightCard } from "@/components/fx/spotlight-card"
import { SectionReveal } from "@/components/section-reveal"
import { SectionTitle } from "@/components/section-title"

/** Research as an interest: one card, a line and the topics. Nothing here claims specific or ongoing work. */
export function ResearchSection() {
  return (
    <section id="research" className="section container">
      <SectionReveal>
        <SectionTitle
          title={site.research.title}
          kicker="05 · Interests"
          icon={FlaskConical}
          iconClassName="text-tone-purple-text"
          subtitle={site.sections.research}
        />
      </SectionReveal>

      <SectionReveal>
        <SpotlightCard className="flex flex-col gap-5 rounded-lg border border-border bg-card p-6 transition-[transform,border-color] duration-200 motion-safe:hover:-translate-y-1 hover:border-border-strong md:flex-row md:items-start md:gap-6 md:p-8">
          <span
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface"
          >
            <FlaskConical className="h-5 w-5 text-tone-purple-text" strokeWidth={1.75} />
          </span>
          <div className="min-w-0">
            <p className="max-w-2xl text-lg leading-snug text-foreground md:text-xl">{site.research.line}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {site.research.topics.map(({ label, tone }) => (
                <Chip key={label} tone={tone as ChipTone}>
                  {label}
                </Chip>
              ))}
            </div>
          </div>
        </SpotlightCard>
      </SectionReveal>
    </section>
  )
}
