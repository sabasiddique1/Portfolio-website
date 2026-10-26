"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { featuredProjects } from "@/constants/projects"
import { ProjectCardGroup } from "@/components/project-card-group"
import { SectionReveal } from "@/components/section-reveal"

export function FeaturedWork({ availableImages }: { availableImages: string[] }) {
  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <SectionReveal className="mb-12">
            <span className="mb-3 block text-sm uppercase tracking-wider text-primary">Selected work</span>
            <h2 className="text-3xl font-bold md:text-4xl">Featured work</h2>
          </SectionReveal>

          <ProjectCardGroup projects={featuredProjects} availableImages={availableImages} columns={2} />

          <SectionReveal className="mt-10 flex justify-center" delay={0.1}>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              View all projects
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
