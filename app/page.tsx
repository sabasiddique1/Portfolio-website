import { HeroSection } from "@/components/hero-section"
import { ProjectsSectionMinimal } from "@/components/projects-section-minimal"
import { AboutSection } from "@/components/about-section"
import { SkillsTicker } from "@/components/skills-ticker"
import { ExperienceSectionMinimal } from "@/components/experience-section-minimal"
import { OpenSourceSection } from "@/components/open-source-section"
import { ContactSection } from "@/components/contact-section"

export default function Home() {

  return (
    <main className="min-h-screen">
      <HeroSection />
      <SkillsTicker />
      <ProjectsSectionMinimal />
      <AboutSection />
      <ExperienceSectionMinimal />
      <OpenSourceSection />
      <ContactSection />
    </main>
  )
}
