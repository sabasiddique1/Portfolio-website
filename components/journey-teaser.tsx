import Link from "next/link"
import { ArrowRight, Briefcase, Route } from "lucide-react"
import { Button } from "@/components/ui/button"
import { journey } from "@/constants/journey"
import { site } from "@/constants/site"
import { CategoryIcon } from "@/components/category-icon"
import { SectionReveal } from "@/components/section-reveal"
import { SectionTitle } from "@/components/section-title"
import { SpotlightCard } from "@/components/fx/spotlight-card"

/** "Dec 2022" → "2022"; "Jan 2026 – Present" → "2026". */
const yearOf = (period: string) => period.match(/\d{4}/)?.[0] ?? period

/**
 * Home-page stand-in for the journey and experience pages: the section header, one strip of the
 * timeline (year + title per step, joined by a line) and the buttons that open the full pages.
 * The strip is a preview, not a control: the whole band links through.
 */
export function JourneyTeaser() {
  return (
    <section id="journey" className="section container">
      <SectionReveal>
        <SectionTitle
          title="From frontend to AI"
          icon={Route}
          iconClassName="text-tone-green-text"
          kicker="02 · The path"
          subtitle={site.sections.journey}
          action={{ label: "Open the journey", href: "/journey" }}
        />
      </SectionReveal>

      <SectionReveal delay={0.05}>
        <SpotlightCard className="rounded-lg border border-border bg-card p-6 md:p-8">
          {/* Timeline strip: scrolls sideways on phones, spreads out on desktop. */}
          <ol
            role="list"
            className="-mx-6 flex snap-x snap-mandatory gap-0 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-7 md:overflow-visible md:px-0"
          >
            {journey.map((step, index) => (
              <li key={step.id} className="relative w-[136px] shrink-0 snap-start md:w-auto md:shrink">
                {/* Connector to the next node. */}
                {index < journey.length - 1 && (
                  <span aria-hidden="true" className="absolute left-[calc(50%+9px)] right-[calc(-50%+9px)] top-[9px] h-px bg-border-strong" />
                )}
                <div className="flex flex-col items-center gap-3 text-center">
                  <span
                    aria-hidden="true"
                    className={
                      index === journey.length - 1
                        ? "relative flex h-[18px] w-[18px] items-center justify-center"
                        : "flex h-[18px] w-[18px] items-center justify-center"
                    }
                  >
                    {index === journey.length - 1 && (
                      <span className="absolute inline-flex h-2.5 w-2.5 rounded-full bg-lime motion-safe:animate-pulse-ring" />
                    )}
                    <span className={index === journey.length - 1 ? "h-2.5 w-2.5 rounded-full bg-lime" : "h-2.5 w-2.5 rounded-full border border-border-strong bg-surface"} />
                  </span>
                  <div className="min-w-0 px-1.5">
                    <p className="flex items-center justify-center gap-1.5 text-sm font-semibold tabular-nums text-lime">
                      <CategoryIcon kind={step.kind} className="h-3.5 w-3.5" />
                      {yearOf(step.period)}
                    </p>
                    <p className="mt-1 text-sm leading-snug text-text-2 [text-wrap:balance]">{step.title}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-base text-text-2">
              Seven steps from frontend intern to full-stack AI engineer, with the notebooks, contributions and writeup behind each one.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="group">
                <Link href="/journey">
                  See the journey
                  <ArrowRight className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#experience">
                  <Briefcase aria-hidden="true" />
                  Experience
                </a>
              </Button>
            </div>
          </div>
        </SpotlightCard>
      </SectionReveal>
    </section>
  )
}
