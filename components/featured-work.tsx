import Link from "next/link"
import { ArrowRight, Boxes } from "lucide-react"
import { featuredProjects } from "@/constants/projects"
import { site } from "@/constants/site"
import { ProjectCardGroup } from "@/components/project-card-group"
import { SectionReveal } from "@/components/section-reveal"
import { SectionTitle } from "@/components/section-title"

export function FeaturedWork({ availableImages }: { availableImages: string[] }) {
  return (
    <section id="projects" className="container py-12 md:py-[72px]">
      <SectionReveal>
        <SectionTitle
          title="Featured work"
          icon={Boxes}
          iconClassName="text-tone-blue-text"
          subtitle={site.sections.featured}
        />
      </SectionReveal>

      <ProjectCardGroup projects={featuredProjects} availableImages={availableImages} columns={2} />

      <SectionReveal className="mt-4 flex items-center justify-between gap-4" delay={0.1}>
        <p className="text-xs text-muted-foreground">Click a card to expand</p>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 text-sm text-text-2 transition-colors hover:text-foreground"
        >
          Explore more projects
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </SectionReveal>
    </section>
  )
}
