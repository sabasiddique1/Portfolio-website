"use client"

import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import Link from "next/link"
import { ExternalLink, Github, Info, X, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type Project = {
    id: number
    title: string
    description: string
    category: string
    projectType: string
    technologies: string[]
    githubUrl?: string
    demoUrl: string
    slug?: string
}

interface ProjectCardProps {
    project: Project
    isSelected: boolean
    onClick: () => void
}


interface ProjectShowcaseProps {
    projects: Project[]
}
export default function ProjectShowcase({ projects }: ProjectShowcaseProps) {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [isMobile, setIsMobile] = useState(false)
    const [hasInitialized, setHasInitialized] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            if (typeof window !== "undefined") {
                const mobile = window.innerWidth < 1024;
                setIsMobile(mobile);

                if (!hasInitialized && !mobile && projects.length > 0) {
                    setSelectedProject(projects[0]);
                    setHasInitialized(true);
                }
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [projects, hasInitialized]);

    const selectHandlers = useMemo(() => {
        const map = new Map<number, () => void>()
        for (const p of projects) {
            map.set(p.id, () => setSelectedProject(p))
        }
        return map
    }, [projects])

    const handleClose = useCallback(() => setSelectedProject(null), [])

    if (!projects || projects.length === 0) {
        return <p>No projects available.</p>;
    }


    return (
        <section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Project Deck */}
                <div className="h-[500px] rounded-xl p-8 shadow-xl relative">
                    <p className="absolute top-2 right-10 flex items-center gap-1 text-xs text-muted-foreground z-10">
                        <Info className="w-3 h-3" />
                        Click the card to expand
                    </p>
                    <div className="h-full overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
                        <div className="space-y-4">
                            {projects.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    isSelected={selectedProject?.id === project.id}
                                    onClick={selectHandlers.get(project.id) as () => void}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Desktop Expanded View */}
                {!isMobile && selectedProject && (
                    <div className="h-[500px] bg-primary-foreground rounded-xl p-4 shadow-xl flex items-center justify-center">
                        <ExpandedProjectCard project={selectedProject} />
                    </div>
                )}
            </div>

            {/* 🪟 Modal for Mobile/Tablet */}
            {isMobile && selectedProject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
                    <div className="relative w-full max-w-lg bg-background rounded-lg p-6 shadow-lg overflow-y-auto max-h-[90vh]">
                        <button
                            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                            onClick={handleClose}
                        >
                            <X className="h-5 w-5" />
                        </button>
                        <ExpandedProjectCard project={selectedProject} />
                    </div>
                </div>
            )}
        </section>
    );
}

export const ProjectCard = memo(function ProjectCard({ project, isSelected, onClick }: ProjectCardProps) {
    return (

        <Card
            className={cn(
                "w-full transition-all bg-card text-card-foreground duration-300 cursor-pointer hover:bg-primary-foreground overflow-hidden",
                isSelected
                    ? "ring-2 ring-white shadow-[0_0_10px_rgba(255,255,255,0.3)] relative z-10"
                    : "border border-zinc-800",
            )}
            onClick={onClick}
        >
            <CardHeader className="p-4">
                <div className="flex items-center justify-between w-full">
                    <div className="grid grid-cols-1 items-start">
                        <CardTitle className="text-xl">{project.title}</CardTitle>
                        <div className="flex justify-between my-1">
                            <span className="px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-xs font-medium">
                            {project.category}
                        </span>
                        </div>
                    </div>


                    <div className="flex gap-2 ml-4 shrink-0">
                        {project.githubUrl && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-card-foreground hover:text-white hover:bg-zinc-800"
                                asChild
                            >
                                <Link
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Github className="h-4 w-4" />
                                    <span className="sr-only">GitHub</span>
                                </Link>
                            </Button>
                        )}
                        {project.demoUrl && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-card-foreground hover:text-white hover:bg-zinc-800"
                                asChild
                            >
                                <Link
                                    href={project.demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                    <span className="sr-only">Demo</span>
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>
            </CardHeader>


            <CardFooter className="p-4 pt-0 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tag) => (
                        <Badge key={tag} variant="secondary" >
                            {tag}
                        </Badge>
                    ))}
                </div>

            </CardFooter>
        </Card>
    )
})

const ExpandedProjectCard = memo(function ExpandedProjectCard({ project }: { project: Project }) {
    return (
        <div className="w-full max-w-xl mx-auto h-full flex flex-col justify-center">
            <div className="space-y-8">
                <div>
                    <h3 className="text-3xl font-bold text-card-foreground mb-4">{project.title}</h3>
                    <p className="text-card-foreground leading-relaxed">{project.description}</p>
                </div>

                <div>
                    <h4 className="text-sm  mb-3 font-bold text-card-foreground">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary">
                                {tech}
                            </Badge>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="text-sm font-bold mb-3 text-card-foreground">Project Type</h4>
                    <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">

                                {project.projectType}
                            </Badge>
                    </div>
                </div>
                <div className="flex flex-col gap-3 pt-4">
                    {project.slug && (
                        <Button
                            className="w-full bg-primary/90 hover:bg-primary/80 overflow-hidden group"
                            asChild
                        >
                            <Link
                                href={`/projects/${project.slug}`}
                                className="flex items-center justify-center gap-2"
                            >
                                View Details
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    )}
                    <div className="flex gap-2">
                        {project.githubUrl && (
                            <Button
                                variant="outline"
                                className="flex-1"
                                asChild
                            >
                                <Link
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2"
                                >
                                    <Github className="h-4 w-4" />
                                    Code
                                </Link>
                            </Button>
                        )}

                        {project.demoUrl && project.demoUrl !== "#" && (
                            <Button variant="outline" className="flex-1" asChild>
                                <Link
                                    href={project.demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                    Demo
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
})
