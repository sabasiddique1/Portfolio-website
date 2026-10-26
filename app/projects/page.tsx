import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Bot, List } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { SectionTitle } from "@/components/section-title"
import { SectionReveal } from "@/components/section-reveal"
import { ProjectCardGroup } from "@/components/project-card-group"
import { ProjectsList } from "@/components/projects-list"
import { aiProjects, cardProjects, rowProjects } from "@/constants/projects"
import { site } from "@/constants/site"
import { getAvailableProjectImages } from "@/lib/project-images"

const subtitle = "AI work first, earlier web work below."

// A page-level openGraph replaces the root one wholesale, so the site image is referenced explicitly.
export const metadata: Metadata = {
  title: "Projects",
  description: `Projects by ${site.name}, ${site.role}: ${aiProjects.map((p) => p.title).join(", ")}, plus earlier web work.`,
  alternates: { canonical: "/projects" },
  openGraph: {
    url: "/projects",
    siteName: site.name,
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.seo.ogImageAlt }],
  },
}

export default function ProjectsPage() {
  const availableImages = getAvailableProjectImages()
  // Static page: this is the build date, like OpenRouter's "last run" line.
  const lastUpdated = new Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(new Date())

  return (
    <main className="container pt-24 pb-16 md:pb-24">
      <Link href="/" className={buttonVariants({ variant: "ghost", size: "sm" })}>
        <ArrowLeft aria-hidden="true" />
        Back to Home
      </Link>

      <header className="mt-6">
        <h1 className="text-[32px] font-semibold">All projects</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{subtitle}</p>
        <p className="mt-3 text-xs text-muted-foreground">
          {aiProjects.length} projects <span aria-hidden="true">·</span> last updated {lastUpdated}
        </p>
      </header>

      <section aria-labelledby="ai-work" className="mt-12">
        <SectionTitle id="ai-work" as="h2" title="AI work" icon={Bot} iconClassName="text-cat-agents" />
        <ProjectCardGroup projects={cardProjects} availableImages={availableImages} columns={2} />
      </section>

      <section className="mt-16">
        <SectionTitle as="h2" title="More projects" icon={List} iconClassName="text-cat-fullstack" />
        <SectionReveal>
          <ProjectsList projects={rowProjects} />
        </SectionReveal>
      </section>
    </main>
  )
}
