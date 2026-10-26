import { GraduationCap } from "lucide-react"
import { education } from "@/constants/experience"
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

/** Education as its own section after Experience: one card per entry, two up on desktop. */
export function EducationSection() {
  return (
    <section id="education" className="container py-12 md:py-[72px]">
      <SectionReveal>
        <SectionTitle title="Education" icon={GraduationCap} iconClassName="text-tone-purple-text" />
      </SectionReveal>

      <SectionReveal>
        <ul role="list" className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {education.map((entry) => (
            <li
              key={entry.id}
              className="flex gap-4 rounded-lg border border-border bg-card p-5 transition-[transform,border-color] duration-150 motion-safe:hover:-translate-y-0.5 hover:border-border-strong"
            >
              {/* 36px initials circle: decorative, the institution name follows in text. */}
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-xs font-semibold text-text-2"
              >
                {initials(entry.institution)}
              </span>
              <div className="min-w-0">
                <h3 className="text-[15px] font-semibold">{entry.title}</h3>
                <p className="text-sm text-text-2">{entry.institution}</p>
                <p className="mt-1 text-xs text-muted-foreground">{entry.period}</p>
              </div>
            </li>
          ))}
        </ul>
      </SectionReveal>
    </section>
  )
}
