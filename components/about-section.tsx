"use client"

import Image from "next/image"
import { ArrowRight, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/section-heading"
import { SectionReveal } from "@/components/section-reveal"
import { mailto, site } from "@/constants/site"

export function AboutSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <SectionHeading title="About me" />

        <SectionReveal className="max-w-4xl mx-auto">
          <div className="bg-card rounded-xl p-4 md:p-6 flex flex-col md:flex-row gap-8 items-center">
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white/80 shadow-xl flex-shrink-0">
              <Image src={site.about.photo} alt={site.about.photoAlt} fill sizes="192px" className="object-cover" />
            </div>

            <div className="flex-1">
              <div className="pt-5 space-y-6 text-muted-foreground">
                {site.about.paragraphs.map((paragraph, i) => (
                  <SectionReveal key={i} delay={0.1 * (i + 1)}>
                    <p>{paragraph}</p>
                  </SectionReveal>
                ))}
              </div>

              <SectionReveal delay={0.3} className="flex flex-col sm:flex-row gap-4 pt-10">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:bg-accent/50"
                >
                  <a href={mailto}>
                    <Mail className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" aria-hidden="true" />
                    <span>Contact me</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </a>
                </Button>
              </SectionReveal>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
