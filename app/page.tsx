import { HeroSection } from "@/components/hero-section"
import { ProjectsSection } from "@/components/projects-section"
import { AboutSection } from "@/components/about-section"
import { SkillsTicker } from "@/components/skills-ticker"
import { ExperienceSection } from "@/components/experience-section"
import { ContactSection } from "@/components/contact-section"
import {ProjectShowCase} from "@/components/project-card";

export default function Home() {

  return (
    <main className="min-h-screen">
      <HeroSection />
      <SkillsTicker />
      <ProjectsSection />
      <AboutSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  )
}
