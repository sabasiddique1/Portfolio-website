"use client"

import { useState } from "react"
import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Code, Layers } from "lucide-react"
import { useRef } from "react"

// Updated project data with GitHub and demo links
const projects = [
  {
    id: 1,
    title: "E-commerce Redesign",
    description:
      "A complete redesign of an e-commerce platform focusing on improving user experience and conversion rates.",
    category: "Web Design",
    technologies: ["React", "Next.js", "Tailwind CSS"],
    githubUrl: "https://github.com/username/ecommerce-redesign",
    demoUrl: "https://ecommerce-redesign.example.com",
  },
  {
    id: 2,
    title: "Finance Mobile App",
    description: "A mobile application that helps users track expenses, set budgets, and achieve financial goals.",
    category: "Mobile App",
    technologies: ["React Native", "TypeScript", "Firebase"],
    githubUrl: "https://github.com/username/finance-app",
    demoUrl: "https://finance-app.example.com",
  },
  {
    id: 3,
    title: "Healthcare Dashboard",
    description: "A dashboard for healthcare professionals to monitor patient data and track treatment progress.",
    category: "UI/UX Design",
    technologies: ["React", "D3.js", "Tailwind CSS"],
    githubUrl: "https://github.com/username/healthcare-dashboard",
    demoUrl: "https://healthcare-dashboard.example.com",
  },
  {
    id: 4,
    title: "Travel Platform",
    description: "A comprehensive travel platform that allows users to discover, plan, and book travel experiences.",
    category: "Web Development",
    technologies: ["Next.js", "MongoDB", "Tailwind CSS"],
    githubUrl: "https://github.com/username/travel-platform",
    demoUrl: "https://travel-platform.example.com",
  },
]

export function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <section id="projects" className="py-20 md:py-28" ref={sectionRef}>
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-12 space-y-4 text-center"
        >
          <div className="inline-block">
            <motion.h2
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl relative"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Selected Work
              <motion.span
                className="absolute -bottom-2 left-0 h-1 bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
            </motion.h2>
          </div>
          <motion.p
            className="mx-auto max-w-[700px] text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Explore my recent projects and case studies
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={itemVariants} whileHover={{ y: -5 }}>
              <Card
                className="overflow-hidden transition-all duration-300 hover:shadow-lg h-full"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="mb-2">
                        {project.category}
                      </Badge>
                      <div className="flex space-x-2">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            asChild
                            aria-label={`View GitHub repository for ${project.title}`}
                          >
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4" />
                            </a>
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            asChild
                            aria-label={`View live demo for ${project.title}`}
                          >
                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                  </div>

                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <div key={index} className="flex items-center text-xs bg-muted px-2 py-1 rounded-full">
                          {tech === "React" || tech === "React Native" ? (
                            <Layers className="h-3 w-3 mr-1" />
                          ) : (
                            <Code className="h-3 w-3 mr-1" />
                          )}
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
