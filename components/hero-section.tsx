import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionReveal } from "@/components/section-reveal"
import { site } from "@/constants/site"

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

/** Underlines each phrase that occurs in `text`; phrases that are absent are simply skipped. */
function underlinePhrases(text: string, phrases: readonly string[]): ReactNode[] {
  const present = phrases.filter((phrase) => text.includes(phrase))
  if (present.length === 0) return [text]
  // The capture group keeps the matched phrases in the split output.
  const splitter = new RegExp(`(${present.map(escapeRegExp).join("|")})`)
  return text.split(splitter).map((part, i) =>
    present.includes(part) ? (
      <span key={i} className="text-foreground underline decoration-lime decoration-2 underline-offset-4">
        {part}
      </span>
    ) : (
      part
    )
  )
}

export function HeroSection() {
  return (
    <section id="home" className="container pb-12 pt-16 md:pb-[72px] md:pt-24">
      <SectionReveal className="mx-auto flex max-w-[880px] flex-col items-center text-center">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">{site.hero.kicker}</p>

        <h1 className="mt-4 text-[32px] leading-[1.1] md:text-[48px]">
          {site.hero.h1Lines.map((line, i) => (
            // The space keeps the heading's text content readable as one sentence.
            <span key={line} className="block">
              {i > 0 && " "}
              {line}
            </span>
          ))}
        </h1>

        <p className="mt-5 max-w-[640px] text-[14px] leading-relaxed text-muted-foreground">
          {underlinePhrases(site.hero.subline, site.hero.underline)}
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Button asChild>
            <Link href={site.hero.primaryCta.href}>{site.hero.primaryCta.label}</Link>
          </Button>
          <Button asChild variant="outline">
            <a href={site.hero.secondaryCta.href}>
              {site.hero.secondaryCta.label}
              <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        </div>
      </SectionReveal>

      <SectionReveal delay={0.1}>
        <dl className="mx-auto mt-10 grid max-w-[880px] grid-cols-2 gap-y-8 text-center md:grid-cols-4 md:divide-x md:divide-border">
          {site.hero.stats.map(({ value, label }) => (
            // Bottom-aligned so a wrapping value ("Project Lead" on phones) keeps the labels on one line.
            <div key={label} className="flex flex-col justify-end px-4 md:px-6">
              <dt className="order-2 mt-2 text-xs text-muted-foreground">{label}</dt>
              <dd className="order-1 text-[32px] font-semibold leading-none text-foreground">{value}</dd>
            </div>
          ))}
        </dl>
      </SectionReveal>
    </section>
  )
}
