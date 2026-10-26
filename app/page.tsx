import { HeroSection } from "@/components/hero-section"
import { FeaturedWork } from "@/components/featured-work"
import { AlsoBuilding } from "@/components/also-building"
import { JourneyTable } from "@/components/journey-table"
import { ExperienceTable } from "@/components/experience-table"
import { ContactSection } from "@/components/contact-section"
import { getAvailableProjectImages } from "@/lib/project-images"

export default function Home() {
  const availableImages = getAvailableProjectImages()

  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedWork availableImages={availableImages} />
      {/* DEMO — remove by deleting <AlsoBuilding /> in page.tsx */}
      <AlsoBuilding />
      <JourneyTable />
      <ExperienceTable />
      <ContactSection />
    </main>
  )
}
