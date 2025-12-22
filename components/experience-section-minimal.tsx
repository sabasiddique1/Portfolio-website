"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { ScrollRevealTimeline, type TimelineItem } from "@/components/scroll-reveal-timeline"

const experiences: TimelineItem[] = [
  {
    id: "1",
    period: "Aug 2025 - Present",
    title: "xNerds Solution",
    description: "Full Stack Developer / UI UX Developer",
  },
  {
    id: "2",
    period: "Apr 2025 - Aug 2025",
    title: "Devsloop",
    description: "Software Engineer",
  },
  {
    id: "3",
    period: "Aug 2023 - Apr 2025",
    title: "Wanclouds",
    description: "Front End Developer",
  },
]

export function ExperienceSectionMinimal() {
  return (
    <motion.section
      id="experience"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="px-6 py-24"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm text-primary uppercase tracking-wider"
            >
              Experience
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold mt-3"
            >
              The path so far
            </motion.h2>
          </div>
          <Link
            href="/journey"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            Full story
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Scroll-reveal timeline */}
        <ScrollRevealTimeline items={experiences} />
      </div>
    </motion.section>
  )
}
