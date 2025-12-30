"use client"

import { useEffect } from "react"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProjectsSection } from "@/components/featured-projects-section"
import { AboutSection } from "@/components/about-section"
import { SkillsTicker } from "@/components/skills-ticker"
import { ExperienceAccordion } from "@/components/experience-accordion"
import { OpenSourceSection } from "@/components/open-source-section"
import { ContactSection } from "@/components/contact-section"
import { StickyCtaRail } from "@/components/sticky-cta-rail"

export default function Home() {
  useEffect(() => {
    // Handle hash navigation from other pages
    const handleHashNavigation = () => {
      const hash = window.location.hash.replace("#", "")
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash)
          if (element) {
            const navbarHeight = 64 // h-16 = 64px
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
            const offsetPosition = elementPosition - navbarHeight
            
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            })
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
      <FeaturedProjectsSection />
      <section id="about">
        <SkillsTicker />
        <AboutSection />
      </section>
      <ExperienceAccordion />
      <OpenSourceSection />
      <ContactSection />
      <StickyCtaRail />
    </main>
  )
}
