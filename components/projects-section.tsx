"use client"

import { useState } from "react"
import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Code, Layers } from "lucide-react"
import { useRef } from "react"
const projects = [
  {
    id: 9,
    title: "VPC+",
    description:
        "Cloud-based SaaS for end-to-end multi-cloud migrations, disaster recovery, cost optimization, and compliance tracking. Fixed key bugs and improved overall stability.",
    category: "Web App",
    technologies: ["React.js", "Node.js", "PostgreSQL", "TailwindCSS"],
    demoUrl: "https://www.wanclouds.net/vpc+",
  },
  {
    id: 10,
    title: "SECMON AI",
    description:
        "AI-focused security platform offering real-time observability, access control, and automated vulnerability management for AI and LLM deployments.",
    category: "Web App",
    technologies: ["React.js", "Next.js", "TailwindCSS", "Python", "ML Integration"],
  },
  {
    id: 1,
    title: "Vaultix - Cloud Storage App",
    description:
        "A cloud storage app for easy file management with secure sharing options and high scalability.",
    category: "Web App",
    technologies: ["React 19", "Next.js 15", "Appwrite", "TailwindCSS", "ShadCN", "TypeScript"],
    githubUrl: "https://github.com/sabasiddique1/Vaultix",
    demoUrl: "https://vaultix-demo.example.com",
  },
  {
    id: 2,
    title: "Event_Bazaar - Event Management App",
    description:
        "An event management app that allows users to organize, manage, and attend events easily.",
    category: "Web App",
    technologies: ["Node.js", "Next.js", "TypeScript", "TailwindCSS", "Stripe", "Zod", "React Hook Form", "ShadCN", "uploadthing"],
    githubUrl: "https://github.com/sabasiddique1/Event_Bazaar",
    demoUrl: "https://event-bazaar.example.com",
  },
  {
    id: 3,
    title: "Nexura - A Fintech Banking App",
    description:
        "A fintech banking app providing seamless financial services with user-friendly interfaces and secure transactions.",
    category: "Web App",
    technologies: ["React 19", "Next.js 15", "Appwrite", "TailwindCSS", "ShadCN", "TypeScript"],
    githubUrl: "https://github.com/sabasiddique1/nexura",
    demoUrl: "https://nexura.example.com",
  },
  {
    id: 4,
    title: "Pokedex - Pokemon App",
    description:
        "A fun and interactive Pokedex app that allows users to explore and search through a collection of Pokemon.",
    category: "Web App",
    technologies: ["Node.js", "React", "CSS"],
    githubUrl: "https://github.com/sabasiddique1/pokedex",
    demoUrl: "https://pokedex-example.com",
  },
  {
    id: 5,
    title: "Synapse - Therapist Appointment App",
    description:
        "An appointment scheduling platform for therapists and patients, featuring easy booking and management options.",
    category: "Web App",
    technologies: ["Next.js", "AntD", "ShadCN", "TailwindCSS"],
    githubUrl: "https://github.com/sabasiddique1/synapse",
    demoUrl: "https://synapse-demo.example.com",
  },
  {
    id: 6,
    title: "Stock Market Prediction",
    description:
        "A machine learning-powered web app that predicts stock prices using historical data, providing insights and trends.",
    category: "Web App",
    technologies: ["Vercel", "Next.js", "TailwindCSS", "ShadCN"],
    githubUrl: "https://github.com/sabasiddique1/stock-market-prediction",
    demoUrl: "https://stock-market-prediction.example.com",
  },
  {
    id: 7,
    title: "Web Scraping App",
    description:
        "A web scraping app that extracts valuable data from websites for analysis and research.",
    category: "Web App",
    technologies: ["Vercel", "Next.js", "TailwindCSS", "ShadCN"],
    githubUrl: "https://github.com/sabasiddique1/web-scraping-app",
    demoUrl: "https://web-scraping-app.example.com",
  },
  {
    id: 8,
    title: "Task Management App",
    description:
        "A simple yet effective task management tool to help users track and organize their daily tasks.",
    category: "Web App",
    technologies: ["Vercel", "Next.js", "TailwindCSS", "ShadCN"],
    githubUrl: "https://github.com/sabasiddique1/task-management-app",
    demoUrl: "https://task-management-app.example.com",
  },
  {
    id: 11,
    title: "Digilott App",
    description:
        "A fun and engaging digital lottery application designed for interactive money-winning experiences.",
    category: "Web App",
    technologies: ["React JS", "AntDesign", "React Libraries"],
    githubUrl: "https://github.com/sabasiddique1/task-management-app",
    demoUrl: "https://task-management-app.example.com",
  },
  {
    id: 12,
    title: "Miniature App",
    description:
        "A collection of small, functional web apps built with JavaScript to demonstrate core logic and UI concepts in a lightweight format.",
    category: "Web App",
    technologies: ["JavaScript", "HTML", "CSS"],
    githubUrl: "https://github.com/sabasiddique1/task-management-app",
    demoUrl: "https://task-management-app.example.com",
  },
];

export function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

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
  };

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
  );
}
