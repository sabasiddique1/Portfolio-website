"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { 
  CalendarDays, 
  MapPin, 
  ArrowRight, 
  ExternalLink, 
  TrendingUp, 
  Zap, 
  Code, 
  Rocket,
  CheckCircle2,
  Briefcase,
  Link2,
  Sparkles
} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SectionHeading } from "@/components/section-heading"
import { Progress } from "@/components/ui/progress"

const experiences = [
  {
    id: "1",
    period: "Aug 2025 - Dec 2025",
    company: "xNerds Solution",
    role: "Full Stack Developer / UI UX Developer",
    location: "Remote",
    status: "completed" as const,
    impact: "Improved frontend performance by 25% through optimized state management",
    description: "Developed reusable UI libraries and scalable dashboards using React, Next.js, and shadcn/UI. Focused on performance optimization, component reusability, and streamlined CI/CD workflows.",
    ownership: [
      "Built reusable component library reducing development time by 30%",
      "Optimized state management reducing re-renders by 40%",
      "Implemented lazy loading strategies improving initial load by 25%",
    ],
    keyWins: [
      "25% performance improvement",
      "30% faster development with reusable components",
      "Streamlined CI/CD pipeline",
    ],
    skills: ["React.js", "Next.js", "ShadCN UI", "TypeScript", "State Management", "Lazy Loading", "CI/CD", "Performance Optimization"],
    relatedProjects: [
      { title: "URFX", slug: "urfx" },
      { title: "Propafund Dashboard", slug: "propafund-dashboard" },
      { title: "FXEE", slug: "fxee" },
      { title: "FX Utopia", slug: "fx-utopia" },
    ],
  },
  {
    id: "2",
    period: "Apr 2025 - Aug 2025",
    company: "Devsloop",
    role: "Software Engineer",
    location: "Remote",
    status: "completed" as const,
    impact: "Improved load speed by 40% and reduced Figma-to-code time by 30%",
    description: "Built performant UIs using React, Next.js, and Tailwind. Focused on performance optimization, API integration, and efficient state management with Redux/Zustand.",
    ownership: [
      "Architected frontend performance optimizations resulting in 40% faster load times",
      "Reduced design-to-code handoff time by 30% through improved workflows",
      "Led Git-based CI/CD reducing rollbacks by 15%",
    ],
    keyWins: [
      "40% load speed improvement",
      "30% reduction in Figma-to-code time",
      "15% fewer CI/CD rollbacks",
    ],
    skills: ["React.js", "Next.js", "TailwindCSS", "TypeScript", "Axios", "Redux", "Zustand", "CI/CD", "Git"],
    relatedProjects: [
      { title: "SendScale", slug: "sendscale" },
      { title: "EasyLlama", slug: "easyllama" },
      { title: "Smodin", slug: "smodin" },
      { title: "Rewritely", slug: "rewritely" },
    ],
  },
  {
    id: "3",
    period: "Aug 2023 - Apr 2025",
    company: "Wanclouds",
    role: "Front End Developer",
    location: "Hybrid (Remote/On-site)",
    status: "completed" as const,
    impact: "Resolved 100+ bugs and boosted dashboard speed by 28%",
    description: "Developed features for VPC+, SecMon, and WhisperAI. Built reusable UI components with MUI/Tailwind, maintained high API reliability, and supported QA across scalable cloud deployments.",
    ownership: [
      "Resolved 100+ production bugs improving platform stability",
      "Optimized dashboard performance resulting in 28% speed improvement",
      "Maintained <2% API failure rate across all services",
    ],
    keyWins: [
      "100+ bugs resolved",
      "28% dashboard speed improvement",
      "<2% API failure rate maintained",
    ],
    skills: ["React.js", "Next.js", "TailwindCSS", "MUI", "Node.js", "AI Integration", "Agile"],
    relatedProjects: [
      { title: "VPC+", slug: "vpc" },
    ],
  },
]

export function ExperienceAccordion() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section id="experience" ref={sectionRef} className="px-6 py-24 bg-gradient-to-b from-background via-background to-secondary/5">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-4">
            <SectionHeading title="The path so far" />
            <Link
              href="/journey"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 group px-3 py-1.5 rounded-lg hover:bg-muted/50"
            >
              Full story
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        <Accordion type="single" collapsible className="w-full space-y-6">
          {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <AccordionItem
                  value={experience.id}
                  className="group border border-border/50 bg-gradient-to-br from-card via-card/95 to-card/90 rounded-2xl p-0 overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 data-[state=open]:border-primary/30 data-[state=open]:shadow-xl data-[state=open]:ring-1 data-[state=open]:ring-primary/20"
                >
                  <AccordionTrigger className="hover:no-underline px-6 py-6 data-[state=open]:pb-5">
                    <div className="flex-1 text-left w-full">
                      {/* Header Row */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                              <Briefcase className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-foreground mb-1">{experience.role}</h3>
                              <Badge
                                variant="secondary"
                                className={`text-xs font-medium ${
                                  experience.status === "current"
                                    ? "bg-primary/20 text-primary border-primary/30"
                                    : "bg-muted/80 text-foreground/80 border-border/50"
                                }`}
                              >
                                {experience.company}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Quick Info Row */}
                      <div className="flex flex-wrap items-center gap-4 text-sm mb-4 pl-11">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50">
                          <CalendarDays className="w-4 h-4 text-primary/70" />
                          <span className="font-medium text-foreground/90">{experience.period}</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50">
                          <MapPin className="w-4 h-4 text-primary/70" />
                          <span className="text-foreground/80">{experience.location}</span>
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="px-6 pb-6 pt-2 space-y-6">
                    {/* Description - Concise */}
                    <div className="flex gap-4 p-4 rounded-xl bg-muted/30 border border-border/50">
                      <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0 h-fit">
                        <Code className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-sm text-foreground/80 leading-relaxed pt-1">{experience.description}</p>
                    </div>

                    {/* Key Contributions - Visual List */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <h4 className="font-semibold text-sm text-foreground">Key Contributions</h4>
                      </div>
                      <div className="grid md:grid-cols-2 gap-2 ml-7">
                        {experience.ownership.map((item, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                            transition={{ delay: index * 0.1 + i * 0.05 }}
                            className="flex items-start gap-2 text-sm"
                          >
                            <CheckCircle2 className="w-4 h-4 text-primary/60 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Stack - Visual Pills */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-1.5 rounded-lg bg-primary/10">
                          <Zap className="w-4 h-4 text-primary" />
                        </div>
                        <h4 className="font-semibold text-base text-foreground">Technologies</h4>
                      </div>
                      <div className="flex flex-wrap gap-2.5 ml-9">
                        {experience.skills.map((skill, i) => (
                          <Badge 
                            key={i} 
                            variant="secondary" 
                            className="text-xs px-3.5 py-1.5 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 text-foreground hover:from-primary/15 hover:to-primary/10 hover:border-primary/30 transition-all shadow-sm"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Related Projects - Visual Links */}
                    {experience.relatedProjects.length > 0 && (
                      <div className="space-y-4 pt-4 border-t border-border/50">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-1.5 rounded-lg bg-primary/10">
                            <Link2 className="w-4 h-4 text-primary" />
                          </div>
                          <h4 className="font-semibold text-base text-foreground">Related Projects</h4>
                        </div>
                        <div className="flex flex-wrap gap-2.5 ml-9">
                          {experience.relatedProjects.map((project, i) => (
                            <Link
                              key={i}
                              href={`/projects/${project.slug}`}
                              className="group inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary bg-gradient-to-br from-primary/10 to-primary/5 hover:from-primary/15 hover:to-primary/10 rounded-lg border border-primary/20 hover:border-primary/40 transition-all shadow-sm hover:shadow-md"
                            >
                              {project.title}
                              <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

