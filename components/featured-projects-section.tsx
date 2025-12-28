"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight, ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import { projects } from "@/constants/projects"
import { ProjectImageCarousel } from "@/components/project-image-carousel"

export function FeaturedProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })

  // Filter only featured projects (3-4 items)
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 4)

  return (
    <section id="projects" ref={sectionRef} className="py-24 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              className="text-sm text-primary uppercase tracking-wider block mb-3"
            >
              Selected Work
            </motion.span>
            <div className="flex items-center justify-between gap-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl font-bold"
              >
                Featured projects
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.15 }}
              >
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  View projects
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </div>

          {/* 2-column grid on desktop, single column on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                className="group"
              >
                <Link href={`/projects/${project.slug}`} className="block h-full">
                  <div className="h-full p-6 border border-border/50 rounded-lg hover:border-primary/30 transition-all duration-300 bg-background/50 hover:shadow-lg cursor-pointer">
                    {/* Project Image Carousel */}
                    {(project.images && project.images.length > 0) && (
                      <ProjectImageCarousel
                        images={project.images}
                        title={project.title}
                        autoSwitchInterval={3000}
                        className="mb-4 rounded-lg"
                      />
                    )}

                    {/* Project Title */}
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech tags (max 4) */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary/80 border border-primary/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Actions - GitHub + Live (aligned right) */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/30">
                      <span className="text-xs text-muted-foreground">View case study →</span>
                      <div className="flex items-center gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            onClick={(e) => e.stopPropagation()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-md hover:bg-accent transition-colors"
                            aria-label={`View ${project.title} on GitHub`}
                          >
                            <Github className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
                          </a>
                        )}
                        {project.demoUrl && project.demoUrl !== "#" && (
                          <a
                            href={project.demoUrl}
                            onClick={(e) => e.stopPropagation()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-md hover:bg-accent transition-colors"
                            aria-label={`View ${project.title} live demo`}
                          >
                            <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

