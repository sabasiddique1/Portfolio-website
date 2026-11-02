import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Bot, List } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { TextReveal } from "@/components/fx/text-reveal"
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
    <main className="container pb-16 pt-24 md:pb-28">
      <Link href="/" className={buttonVariants({ variant: "ghost", size: "sm" })}>
        <ArrowLeft aria-hidden="true" />
        Back to Home
      </Link>

      <header className="mt-8 max-w-3xl">
        <h1 className="text-4xl font-semibold md:text-5xl">
          <TextReveal text="All projects" immediate />
        </h1>
        <p className="mt-4 text-lg text-text-2">{subtitle}</p>
        <p className="mt-3 text-sm text-muted-foreground">
          {aiProjects.length} AI projects <span aria-hidden="true">·</span> last updated {lastUpdated}
        </p>
      </header>

      <section aria-labelledby="ai-work" className="mt-16">
        <SectionTitle
          id="ai-work"
          as="h2"
          title="AI work"
          icon={Bot}
          iconClassName="text-tone-green-text"
          kicker="01"
          subtitle="Agents, RAG, AI security, healthcare and data pipelines."
        />
        <ProjectCardGroup projects={cardProjects} availableImages={availableImages} columns={2} />
      </section>

      <section className="mt-20">
        <SectionTitle
          as="h2"
          title="More projects"
          icon={List}
          iconClassName="text-tone-grey-text"
          kicker="02"
          subtitle="A voice agent, then the earlier web work."
        />
        <SectionReveal>
          <ProjectsList projects={rowProjects} />
        </SectionReveal>
      </section>
    </main>
  )
}
