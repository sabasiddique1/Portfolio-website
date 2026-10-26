"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Check, ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ProjectImageCarousel } from "@/components/project-image-carousel"
import { getProjectLinks, type Project } from "@/constants/projects"

interface ProjectCaseStudyProps {
  project: Project
  /** Whether `project.image` exists in public/ (checked on the server). */
  imageAvailable: boolean
}

type Section = { key: string; title: string; body: ReactNode }

export function ProjectCaseStudy({ project, imageAvailable }: ProjectCaseStudyProps) {
  const links = getProjectLinks(project)
  const screenshots = project.images ?? []
  const meta = [project.label, project.period].filter(Boolean).join(" · ")
  const built = project.built ?? []

  // Only sections with data render, so the entrance delay follows the rendered order.
  const sections: Section[] = []
  if (project.problem) {
    sections.push({
      key: "problem",
      title: "Problem",
      body: <p className="text-muted-foreground leading-relaxed">{project.problem}</p>,
    })
  }
  if (built.length > 0) {
    sections.push({
      key: "built",
      title: "What I built",
      body: (
        <ul className="space-y-3">
          {built.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <span className="text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
      ),
    })
  }
  if (project.technologies.length > 0) {
    sections.push({
      key: "stack",
      title: "Stack",
      body: (
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-sm">
              {tech}
            </Badge>
          ))}
        </div>
      ),
    })
  }

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="container px-4 md:px-6 max-w-5xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
              Back to Projects
            </Link>
          </Button>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge variant="outline">{project.category}</Badge>
            <Badge variant="secondary">{project.projectType}</Badge>
          </div>
          {meta && <p className="text-sm text-muted-foreground mb-3">{meta}</p>}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{project.description}</p>

          {/* Project Image */}
          {screenshots.length > 0 ? (
            <ProjectImageCarousel
              images={screenshots}
              title={project.title}
              autoSwitchInterval={4000}
              className="rounded-lg mb-8"
            />
          ) : project.image && imageAvailable ? (
            <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={project.image}
                alt={project.imageAlt ?? project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          ) : null}

          {/* Links */}
          {links.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {links.map((link) => {
                const Icon = link.label === "Repo" ? Github : ExternalLink
                return (
                  <Button key={link.url} asChild variant={link.label === "Live" ? "default" : "outline"}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
                      {link.label}
                    </a>
                  </Button>
                )
              })}
            </div>
          )}
        </motion.div>

        {/* Case Study Sections */}
        {sections.length > 0 && (
          <div className="space-y-12">
            {sections.map((section, index) => (
              <motion.section
                key={section.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
              >
                <Card className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                  {section.body}
                </Card>
              </motion.section>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
