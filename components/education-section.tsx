import { GraduationCap } from "lucide-react"
import { education } from "@/constants/experience"
import { site } from "@/constants/site"
import { SpotlightCard } from "@/components/fx/spotlight-card"
import { SectionReveal } from "@/components/section-reveal"
import { SectionTitle } from "@/components/section-title"

/** First letter of the first two alphabetic words: "Atomcamp × NUST" → "AN", "Fatima Jinnah Women University, Rawalpindi" → "FJ". */
function initials(institution: string): string {
  return institution
    .split(/\s+/)
    .filter((word) => /^[A-Za-z]/.test(word))
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("")
}

/** Education as its own section: one spotlight card per entry, two up on desktop. Standalone; no neighbour assumptions. */
export function EducationSection() {
  return (
    <section id="education" className="section container">
      <SectionReveal>
        <SectionTitle
          title="Education"
          kicker="04 · Study"
          icon={GraduationCap}
          iconClassName="text-tone-purple-text"
          subtitle={site.sections.education}
        />
      </SectionReveal>

      <SectionReveal>
        <ul role="list" className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {education.map((entry) => (
            <SpotlightCard
              as="li"
              key={entry.id}
              className="flex gap-4 rounded-lg border border-border bg-card p-6 transition-[transform,border-color] duration-200 motion-safe:hover:-translate-y-1 hover:border-border-strong"
            >
              {/* 44px initials disc: decorative, the institution name follows in text. */}
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-sm font-semibold text-text-2"
              >
                {initials(entry.institution)}
              </span>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold leading-snug">{entry.title}</h3>
                <p className="mt-1 text-base text-text-2">{entry.institution}</p>
                <p className="mt-2 text-sm text-muted-foreground">{entry.period}</p>
              </div>
            </SpotlightCard>
          ))}
        </ul>
      </SectionReveal>
    </section>
  )
}
