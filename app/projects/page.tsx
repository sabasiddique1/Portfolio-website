"use client"

import { motion } from "framer-motion"
import { projects } from "@/constants/projects"
import { SectionHeading } from "@/components/section-heading"
import { useRef } from "react"
import { useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ProjectImageCarousel } from "@/components/project-image-carousel"

export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-6">
      <div className="container max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="mb-6">
            <Link href="/#projects">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
          <SectionHeading 
            title="All Projects" 
            subtitle="A comprehensive collection of my work spanning web applications, cloud platforms, and creative tools."
          />
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Card className="h-full flex flex-col hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 border-border/50 hover:border-primary/50 overflow-hidden">
                {/* Project Image Carousel */}
                {project.images && project.images.length > 0 ? (
                  <ProjectImageCarousel
                    images={project.images}
                    title={project.title}
                    autoSwitchInterval={3000}
                    className="rounded-t-lg"
                  />
                ) : project.image ? (
                  <ProjectImageCarousel
                    images={[project.image]}
                    title={project.title}
                    className="rounded-t-lg"
                  />
                ) : null}

                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                  </div>
                  <CardDescription>
                    {project.description}
                  </CardDescription>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      {project.category}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {project.projectType}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="flex-1">
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.technologies.slice(0, 6).map((tech, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 6 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.technologies.length - 6} more
                      </Badge>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="flex gap-2">
                  {project.githubUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      asChild
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        Code
                      </a>
                    </Button>
                  )}
                  {project.demoUrl && (
                    <Button
                      variant="default"
                      size="sm"
                      className="flex-1"
                      asChild
                    >
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Demo
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}


