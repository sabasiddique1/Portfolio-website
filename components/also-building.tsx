// DEMO — remove by deleting <AlsoBuilding /> in page.tsx
import { ArrowUpRight, Hammer } from "lucide-react"
import { proofCards } from "@/constants/proof"
import { site } from "@/constants/site"
import { CategoryIcon } from "@/components/category-icon"
import { SpotlightCard } from "@/components/fx/spotlight-card"
import { SectionReveal } from "@/components/section-reveal"
import { SectionTitle } from "@/components/section-title"

/** Four small external cards: 4 up on desktop, 2 on tablet, 1 on mobile. Each one is a spotlight surface. */
export function AlsoBuilding() {
  return (
    <section className="section container">
      <SectionReveal>
        <SectionTitle
          title="Also building"
          icon={Hammer}
          iconClassName="text-tone-purple-text"
          kicker="In the wild"
          subtitle={site.sections.alsoBuilding}
          action={{ label: "View all", href: "/projects" }}
        />

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {proofCards.map((card) => (
            <SpotlightCard
              as="li"
              key={card.url}
              className="rounded-lg border border-border bg-card transition-[transform,border-color] duration-200 motion-safe:hover:-translate-y-1 hover:border-border-strong"
            >
              <a
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-lg p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border bg-surface">
                      <CategoryIcon kind={card.kind} />
                    </span>
                    <span className="text-base font-semibold leading-snug text-foreground">{card.name}</span>
                  </div>
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-muted-foreground transition-[transform,color] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                    aria-hidden="true"
                  />
                </div>
                {card.line && <p className="mt-3 text-sm leading-relaxed text-text-2">{card.line}</p>}
                {card.meta && <p className="mt-2 text-xs text-muted-foreground">{card.meta}</p>}
              </a>
            </SpotlightCard>
          ))}
        </ul>
      </SectionReveal>
    </section>
  )
}
