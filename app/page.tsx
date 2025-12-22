"use client"

import { useEffect } from "react"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProjectsSection } from "@/components/featured-projects-section"
import { AboutSection } from "@/components/about-section"
import { SkillsTicker } from "@/components/skills-ticker"
import { ExperienceSectionMinimal } from "@/components/experience-section-minimal"
import { OpenSourceSection } from "@/components/open-source-section"
import { ContactSection } from "@/components/contact-section"

export default function Home() {
  useEffect(() => {
    // Handle hash navigation from other pages
    const handleHashNavigation = () => {
      const hash = window.location.hash.replace("#", "")
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash)
          if (element) {
            element.scrollIntoView({ behavior: "smooth" })
          }
        }, 300) // Delay to ensure page is fully loaded
      }
    }

    // Check on mount
    handleHashNavigation()

    // Also listen for hash changes
    window.addEventListener("hashchange", handleHashNavigation)
    return () => window.removeEventListener("hashchange", handleHashNavigation)
  }, [])

  return (
    <main className="min-h-screen">
      <HeroSection />
      <SkillsTicker />
      <FeaturedProjectsSection />
      <AboutSection />
      <ExperienceSectionMinimal />
      <OpenSourceSection />
      <ContactSection />
    </main>
  )
}
