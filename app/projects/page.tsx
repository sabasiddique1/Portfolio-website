import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { SectionHeading } from "@/components/section-heading"
import { SectionReveal } from "@/components/section-reveal"
import { ProjectCardGroup } from "@/components/project-card-group"
import { EarlierWorkList } from "@/components/earlier-work-list"
import { aiProjects, earlierProjects } from "@/constants/projects"
import { site } from "@/constants/site"
import { getAvailableProjectImages } from "@/lib/project-images"
import { cn } from "@/lib/utils"

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

  return (
    <main className="min-h-screen px-4 pb-20 pt-24 md:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16">
          <div className="mb-6">
            <Link href="/#projects" className={cn(buttonVariants({ variant: "ghost" }), "mb-4")}>
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              Back to Home
            </Link>
          </div>
          <SectionHeading as="h1" title="All projects" subtitle={subtitle} />
        </div>

        <section aria-labelledby="ai-work" className="mb-16">
          <SectionReveal>
            <h2 id="ai-work" className="mb-6 text-2xl font-bold md:text-3xl">
              AI work
            </h2>
          </SectionReveal>
          <ProjectCardGroup projects={aiProjects} availableImages={availableImages} columns={2} />
        </section>

        <section aria-labelledby="earlier-work">
          <SectionReveal>
            <h2 id="earlier-work" className="mb-6 text-2xl font-bold md:text-3xl">
              Earlier work
            </h2>
          </SectionReveal>
          <EarlierWorkList projects={earlierProjects} />
        </section>
      </div>
    </main>
  )
}
