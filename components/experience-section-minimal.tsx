"use client"

import { motion } from "framer-motion"
import { ArrowRight, CalendarDays, MapPin } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

const experiences = [
  {
    id: "1",
    period: "Aug 2025 - Dec 2025",
    company: "xNerds Solution",
    role: "Full Stack Developer / UI UX Developer",
    location: "Remote",
    status: "completed" as const,
  },
  {
    id: "2",
    period: "Apr 2025 - Aug 2025",
    company: "Devsloop",
    role: "Software Engineer",
    location: "Remote",
    status: "completed" as const,
  },
  {
    id: "3",
    period: "Aug 2023 - Apr 2025",
    company: "Wanclouds",
    role: "Front End Developer",
    location: "Hybrid",
    status: "completed" as const,
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
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12">
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
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
          >
            Full story
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Clean card-based experience list */}
        <div className="space-y-4">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative p-6 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                          {experience.role}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${
                              experience.status === "current" 
                                ? "bg-primary/20 text-primary border-primary/30" 
                                : "bg-muted/50"
                            }`}
                          >
                            {experience.company}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <CalendarDays className="w-4 h-4" />
                        <span>{experience.period}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        <span>{experience.location}</span>
                      </div>
                    </div>
                  </div>
                  {experience.status === "current" && (
                    <div className="flex items-center">
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                        Current
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
