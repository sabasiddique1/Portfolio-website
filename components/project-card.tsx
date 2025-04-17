"use client"
import { motion, AnimatePresence } from "framer-motion"
import { Github, ExternalLink, ChevronDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ProjectCardProps {
    project: {
        id: number
        title: string
        description: string
        category: string
        projectType: string
        technologies: string[]
        githubUrl: string
        demoUrl: string
    }
    isExpanded: boolean
    onExpand: () => void
}

export function ProjectCard({ project, isExpanded, onExpand }: ProjectCardProps) {
    return (
        <motion.div
            layout="position"
            className={`bg-card border rounded-lg overflow-hidden transition-all duration-300 ${
                isExpanded ? "shadow-md" : "shadow-sm hover:shadow-md"
            }`}
            initial={{ borderRadius: 12 }}
            whileHover={{ y: isExpanded ? 0 : -5 }}
            onClick={onExpand}
        >
            <motion.div layout="position" className="p-5">
                <motion.div layout="position" className="flex justify-between items-center">
                    <div className="flex-1">
                        <motion.h3 layout="position" className="text-lg font-medium">
                            {project.title}
                        </motion.h3>
                        <motion.div layout="position" className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                                {project.category}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                                {project.projectType}
                            </Badge>
                        </motion.div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <motion.a
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-full hover:bg-muted transition-colors"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Github size={16} />
                            <span className="sr-only">GitHub</span>
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-full hover:bg-muted transition-colors"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ExternalLink size={16} />
                            <span className="sr-only">Live Demo</span>
                        </motion.a>
                        <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-muted-foreground ml-1"
                        >
                            <ChevronDown size={18} />
                        </motion.div>
                    </div>
                </motion.div>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 space-y-4"
                        >
                            <p className="text-sm text-muted-foreground">{project.description}</p>

                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, index) => (
                                    <span key={index} className="text-xs bg-muted px-2 py-1 rounded-full">
                    {tech}
                  </span>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    )
}
