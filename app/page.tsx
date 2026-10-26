import { HeroSection } from "@/components/hero-section"
import { FeaturedWork } from "@/components/featured-work"
import { ProofStrip } from "@/components/proof-strip"
import { JourneyTimeline } from "@/components/journey-timeline"
import { ExperienceAccordion } from "@/components/experience-accordion"
import { SkillsTicker } from "@/components/skills-ticker"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { StickyCtaRail } from "@/components/sticky-cta-rail"
import { HashScroll } from "@/components/hash-scroll"
import { getAvailableProjectImages } from "@/lib/project-images"

export default function Home() {
  const availableImages = getAvailableProjectImages()

  return (
    <main className="min-h-screen">
      <HashScroll />
      <HeroSection />
      <FeaturedWork availableImages={availableImages} />
      {/* DEMO — remove by deleting <ProofStrip /> in page.tsx */}
      <ProofStrip />
      <JourneyTimeline />
      <ExperienceAccordion />
      <section id="about">
        <SkillsTicker />
        <AboutSection />
      </section>
      <ContactSection />
      <StickyCtaRail />
    </main>
  )
}
