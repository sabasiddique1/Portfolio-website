// DEMO — remove by deleting <AlsoBuilding /> in page.tsx
import { ArrowUpRight, Hammer } from "lucide-react"
import { proofCards } from "@/constants/proof"
import { site } from "@/constants/site"
import { CategoryIcon } from "@/components/category-icon"
import { SectionReveal } from "@/components/section-reveal"
import { SectionTitle } from "@/components/section-title"

/** Four small external cards (like OpenRouter's "Featured Models" row): 4 up on desktop, 2 on tablet, 1 on mobile. */
export function AlsoBuilding() {
  return (
    <section className="container py-12 md:py-[72px]">
      <SectionReveal>
        <SectionTitle
          size="sm"
          title="Also building"
          icon={Hammer}
          iconClassName="text-tone-purple-text"
          subtitle={site.sections.alsoBuilding}
          action={{ label: "View all", href: "/projects" }}
        />

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {proofCards.map((card) => (
            <li key={card.url}>
              <a
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full flex-col rounded-lg border border-border bg-card p-4 transition-[transform,border-color,background-color] duration-150 motion-safe:hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <CategoryIcon kind={card.kind} />
                    <span className="text-sm font-semibold text-foreground">{card.name}</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                </div>
                {card.line && <p className="mt-2 text-xs text-text-2">{card.line}</p>}
                {card.meta && <p className="mt-1 text-2xs text-muted-foreground">{card.meta}</p>}
              </a>
            </li>
          ))}
        </ul>
      </SectionReveal>
    </section>
  )
}
