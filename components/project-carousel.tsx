"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { useInView } from "framer-motion"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"
import Image from "next/image"
import type { Project } from "@/constants/projects"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface ProjectCarouselProps {
  projects: Project[]
  showAll?: boolean
}

export function ProjectCarousel({ projects, showAll = false }: ProjectCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })
  const prefersReducedMotion = useReducedMotion()

  return (
    <div ref={containerRef} className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {projects.map((project, index) => (
              <CarouselItem
                key={project.id}
                className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
              >
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.6,
                    delay: prefersReducedMotion ? 0 : index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -8 }}
                  className="h-full"
                >
                  <Card className="h-full flex flex-col overflow-hidden group hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 border-l-4 border-l-transparent hover:border-l-primary/70">
                    {/* Image */}
                    <div className="relative aspect-video w-full overflow-hidden bg-muted">
                      <Image
                        src={project.image || "/placeholder.jpg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                          {project.title}
                        </CardTitle>
                      </div>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <Badge variant="secondary" className="text-xs">
                          {project.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {project.projectType}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="flex-grow">
                      <p className="text-sm text-muted-foreground">
                        {project.description}
                      </p>
                    </CardContent>

                    <CardFooter className="flex flex-col gap-3 pt-4">
                      <div className="flex flex-wrap gap-2 w-full">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.technologies.length - 4}
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2 w-full">
                        {project.githubUrl && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex-1"
                            onClick={(e) => {
                              e.preventDefault()
                              window.open(project.githubUrl, '_blank')
                            }}
                          >
                            <Github className="h-4 w-4 mr-2" />
                            Code
                          </Button>
                        )}
                        {project.demoUrl && project.demoUrl !== "#" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="flex-1"
                            onClick={(e) => {
                              e.preventDefault()
                              window.open(project.demoUrl, '_blank')
                            }}
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Demo
                          </Button>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background" />
          <CarouselNext className="right-0 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hover:bg-background" />
        </Carousel>
      </motion.div>
    </div>
  )
}

