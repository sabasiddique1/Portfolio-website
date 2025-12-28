"use client"

import { motion } from "framer-motion"
import { ArrowLeft, ExternalLink, Github, Calendar, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ProjectImageCarousel } from "@/components/project-image-carousel"
import type { Project } from "@/constants/projects"

interface ProjectCaseStudyProps {
  project: Project
}

export function ProjectCaseStudy({ project }: ProjectCaseStudyProps) {
  // TODO: Add these fields to Project type and constants/projects.ts
  const caseStudyData = {
    problem: project.challenge || "TODO: Add problem statement - What challenge did this project solve?",
    role: "TODO: Add your role - What were your specific contributions? (e.g., 'Lead Frontend Developer', 'Sole Developer', 'UI/UX Designer')",
    solution: project.solution || "TODO: Add solution - How did you solve the problem? What approach did you take?",
    results: [
      "TODO: Add quantified results - e.g., '40% faster load time', '100+ users onboarded', '25% performance improvement'",
    ],
    timeline: "TODO: Add timeline - e.g., '3 months', 'Q2 2024'",
    teamSize: "TODO: Add team size - e.g., 'Solo', '3 developers', 'Cross-functional team of 5'",
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container px-4 md:px-6 max-w-5xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/projects">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </Link>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="outline">{project.category}</Badge>
            <Badge variant="secondary">{project.projectType}</Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{project.description}</p>

          {/* Project Image */}
          {project.images && project.images.length > 0 ? (
            <ProjectImageCarousel
              images={project.images}
              title={project.title}
              autoSwitchInterval={4000}
              className="rounded-lg mb-8"
            />
          ) : project.image ? (
            <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          ) : null}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            {project.githubUrl && (
              <Button asChild variant="outline">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </a>
              </Button>
            )}
            {project.demoUrl && project.demoUrl !== "#" && (
              <Button asChild>
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </motion.div>

        {/* Case Study Sections */}
        <div className="space-y-12">
          {/* Problem */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">The Problem</h2>
              <p className="text-muted-foreground leading-relaxed">{caseStudyData.problem}</p>
            </Card>
          </motion.section>

          {/* Role */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">My Role</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">{caseStudyData.role}</p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{caseStudyData.timeline}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{caseStudyData.teamSize}</span>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Solution */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">The Solution</h2>
              <p className="text-muted-foreground leading-relaxed">{caseStudyData.solution}</p>
            </Card>
          </motion.section>

          {/* Results */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="p-6 md:p-8 bg-primary/5 border-primary/20">
              <h2 className="text-2xl font-bold mb-4">Results</h2>
              <ul className="space-y-3">
                {caseStudyData.results.map((result, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-primary mt-1">✓</span>
                    <span className="text-muted-foreground">{result}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.section>

          {/* Tech Stack */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </Card>
          </motion.section>
        </div>
      </div>
    </div>
  )
}

