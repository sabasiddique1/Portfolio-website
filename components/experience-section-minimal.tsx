"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const experiences = [
  {
    id: 1,
    period: "Aug 2025 - Present",
    title: "xNerds Solution",
    role: "Full Stack Developer / UI UX Developer",
    status: "current" as const,
  },
  {
    id: 2,
    period: "Apr 2025 - Aug 2025",
    title: "Devsloop",
    role: "Software Engineer",
    status: "completed" as const,
  },
  {
    id: 3,
    period: "Aug 2023 - Apr 2025",
    title: "Wanclouds",
    role: "Front End Developer",
    status: "completed" as const,
  },
]

export function ExperienceSectionMinimal() {
  const sectionRef = useRef<HTMLElement>(null)
  const itemRefs = experiences.map(() => useRef<HTMLDivElement>(null))

  return (
    <motion.section
      id="experience"
      ref={sectionRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-20 md:py-28"
    >
      <div className="container px-4 md:px-6">
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
              className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
            >
              Full story
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="relative">
            {/* Timeline line - more visible with better colors */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/80 via-primary to-primary/80" 
              style={{
                boxShadow: "0 0 8px hsl(var(--primary) / 0.5)",
              }}
            />

            <div className="space-y-8">
              {experiences.map((experience, index) => {
                const itemRef = itemRefs[index]
                const isInView = useInView(itemRef, { 
                  once: false, 
                  amount: 0.3,
                  margin: "-100px 0px"
                })

                return (
                  <motion.div
                    key={experience.id}
                    ref={itemRef}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative pl-8 md:pl-0 md:w-1/2 ${
                      index % 2 === 0 ? "md:pr-12" : "md:ml-auto md:pl-12"
                    }`}
                  >
                    {/* Dot - glows when in view */}
                    <motion.div
                      className={`absolute top-1 w-3 h-3 rounded-full transition-all duration-300 ${
                        index % 2 === 0
                          ? "left-[-6px] md:left-auto md:right-[-6px]"
                          : "left-[-6px] md:left-[-6px]"
                      }`}
                      animate={{
                        backgroundColor: isInView || experience.status === "current" 
                          ? "hsl(var(--primary))" 
                          : "hsl(var(--primary) / 0.4)",
                        boxShadow: isInView || experience.status === "current"
                          ? "0 0 12px hsl(var(--primary)), 0 0 24px hsl(var(--primary) / 0.5)"
                          : "0 0 4px hsl(var(--primary) / 0.3)",
                        scale: isInView || experience.status === "current" ? 1.2 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    <span className="text-xs text-muted-foreground">{experience.period}</span>
                    <h3 className="text-lg font-semibold mt-1">{experience.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{experience.role}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

