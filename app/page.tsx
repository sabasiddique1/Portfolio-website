import { HeroSection } from "@/components/hero-section"
import { FeaturedWork } from "@/components/featured-work"
import { AlsoBuilding } from "@/components/also-building"
import { JourneyTeaser } from "@/components/journey-teaser"
import { ExperienceTable } from "@/components/experience-table"
import { EducationSection } from "@/components/education-section"
import { ResearchSection } from "@/components/research-section"
import { ContactSection } from "@/components/contact-section"
import { Marquee } from "@/components/fx/marquee"
import { featuredProjects, getProjectKind } from "@/constants/projects"
import { skills } from "@/constants/skills"
import { getAvailableProjectImages } from "@/lib/project-images"
import type { ShowcaseItem } from "@/components/hero-showcase"

export default function Home() {
  const availableImages = getAvailableProjectImages()
  // The hero frame plays the featured projects that ship a clip (see `video` in constants/projects.ts).
  const showcase: ShowcaseItem[] = featuredProjects.flatMap((project) =>
    project.video ? [{ slug: project.slug, title: project.title, kind: getProjectKind(project), video: project.video }] : []
  )

  return (
    <main>
      <HeroSection showcase={showcase} />
      {/* The stack, as an endless strip: the first visual cue after the hero. */}
      <div className="border-y border-border bg-surface/40 py-5">
        <div className="container">
          <Marquee items={skills} />
        </div>
      </div>
      <FeaturedWork availableImages={availableImages} />
      {/* DEMO — remove by deleting <AlsoBuilding /> in page.tsx */}
      <AlsoBuilding />
      {/* The timeline lives on /journey; this band is the way in. */}
      <JourneyTeaser />
      <ExperienceTable />
      <EducationSection />
      <ResearchSection />
      <ContactSection />
    </main>
  )
}
