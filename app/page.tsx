import { HeroSection } from "@/components/hero-section"
import { FeaturedWork } from "@/components/featured-work"
import { AlsoBuilding } from "@/components/also-building"
import { JourneyPath } from "@/components/journey-path"
import { ExperienceTable } from "@/components/experience-table"
import { EducationSection } from "@/components/education-section"
import { ContactSection } from "@/components/contact-section"
import { getAvailableProjectImages } from "@/lib/project-images"

export default function Home() {
  const availableImages = getAvailableProjectImages()

  return (
    <main>
      <HeroSection />
      <FeaturedWork availableImages={availableImages} />
      {/* DEMO — remove by deleting <AlsoBuilding /> in page.tsx */}
      <AlsoBuilding />
      <JourneyPath />
      <ExperienceTable />
      <EducationSection />
      <ContactSection />
    </main>
  )
}
