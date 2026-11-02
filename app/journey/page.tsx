import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { TextReveal } from "@/components/fx/text-reveal"
import { GridBackground } from "@/components/fx/grid-background"
import { JourneyPath } from "@/components/journey-path"
import { journey } from "@/constants/journey"
import { site } from "@/constants/site"

const title = "Journey"
const intro = site.sections.journey

// A page-level openGraph replaces the root one wholesale, so the site image is referenced explicitly.
export const metadata: Metadata = {
  title,
  description: `${site.name}'s path from frontend intern to ${site.role} in ${journey.length} steps, with the notebooks, contributions and writeup along the way.`,
  alternates: { canonical: "/journey" },
  openGraph: {
    url: "/journey",
    siteName: site.name,
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.seo.ogImageAlt }],
  },
}

/** The timeline on its own page (linked from the home-page teaser). */
export default function JourneyPage() {
  return (
    <main>
      <header className="relative overflow-hidden">
        <GridBackground />
        <div className="container pb-4 pt-10 md:pt-14">
          <Link href="/" className={buttonVariants({ variant: "ghost", size: "sm" })}>
            <ArrowLeft aria-hidden="true" />
            Back to Home
          </Link>
          <p className="mt-8 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{site.name}</p>
          <h1 className="mt-3 text-4xl font-semibold md:text-5xl">
            <TextReveal text={title} immediate />
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-text-2">{intro}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {journey.length} steps. Roles and education are on the{" "}
            <Link href="/#experience" className="text-text-2 underline underline-offset-4 transition-colors hover:text-foreground">
              home page
            </Link>
            .
          </p>
        </div>
      </header>

      <JourneyPath />
    </main>
  )
}
