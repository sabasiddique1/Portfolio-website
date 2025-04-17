"use client"

import { useState } from "react"
import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Code, Layers } from "lucide-react"
import { ProjectCard } from "@/components/project-card"
import { SectionHeading } from "@/components/section-heading"
import { useRef } from "react"
const projects = [
  {
    id: 7,
    title: "Web Scraping App",
    description:
        "A web scraping app that extracts valuable data from websites for analysis and research.",
    category: "Web App",
    projectType: "Personal Project",
    technologies: ["Vercel", "Next.js", "TailwindCSS", "ShadCN"],
    githubUrl: "https://github.com/sabasiddique1/web-scraping-app",
    demoUrl: "https://web-scrapper-app-kappa.vercel.app/",
  },
  {
    id: 9,
    title: "VPC+ - Company project",
    description:
        "Cloud-based SaaS for end-to-end multi-cloud migrations, disaster recovery, cost optimization, and compliance tracking. Fixed key bugs and improved overall stability.",
    category: "Web App",
    projectType: "Company Project",
    technologies: ["React.js", "Node.js", "PostgreSQL", "TailwindCSS"],
    demoUrl: "https://www.wanclouds.net/vpc+",
  },
  {
    id: 10,
    title: "SECMON AI",
    description:
        "AI-focused security platform offering real-time observability, access control, and automated vulnerability management for AI and LLM deployments.",
    category: "Web App",
    projectType: "Company Project",
    technologies: ["React.js", "Next.js", "TailwindCSS", "Python", "ML Integration"],
  },
  {
    id: 1,
    title: "Vaultix - Cloud Storage App",
    description:
        "A cloud storage app for easy file management with secure sharing options and high scalability.",
    category: "Web App",
    projectType: "Personal Project",
    technologies: ["React 19", "Next.js 15", "Appwrite", "TailwindCSS", "ShadCN", "TypeScript"],
    githubUrl: "https://github.com/sabasiddique1/Vaultix",
    demoUrl: "https://vaultix-5ndl.vercel.app/sign-in",
  },
  {
    id: 2,
    title: "Event_Bazaar - Event Management App",
    description:
        "An event management app that allows users to organize, manage, and attend events easily.",
    category: "Web App",
    projectType: "Company Project",
    technologies: ["Node.js", "Next.js", "TypeScript", "TailwindCSS", "Stripe", "Zod", "React Hook Form", "ShadCN", "uploadthing"],
    githubUrl: "https://github.com/sabasiddique1/Event_Bazaar",
    demoUrl: "https://event-bazaar-3fht.vercel.app/",
  },
  // {
  //   id: 3,
  //   title: "Nexura - A Fintech Banking App",
  //   description:
  //       "A fintech banking app providing seamless financial services with user-friendly interfaces and secure transactions.",
  //   category: "Web App",
  //   projectType: "Company Project",
  //   technologies: ["React 19", "Next.js 15", "Appwrite", "TailwindCSS", "ShadCN", "TypeScript"],
  //   githubUrl: "https://github.com/sabasiddique1/nexura",
  //   // demoUrl: "https://nexura.example.com",
  // },
  {
    id: 4,
    title: "Pokedex - Pokemon App",
    description:
        "A fun and interactive Pokedex app that allows users to explore and search through a collection of Pokemon.",
    category: "Web App",
    projectType: "Company Project",
    technologies: ["Node.js", "React", "CSS"],
    githubUrl: "https://github.com/sabasiddique1/pokedex",
    demoUrl: "https://pokedex-app-sigma-silk.vercel.app/pokemon",
  },
  {
    id: 5,
    title: "Synapse - Therapist Appointment App",
    description:
        "An appointment scheduling platform for therapists and patients, featuring easy booking and management options.",
    category: "Web App",
    projectType: "Company Project",
    technologies: ["Next.js", "AntD", "ShadCN", "TailwindCSS"],
    githubUrl: "https://github.com/sabasiddique1/synapse",
    demoUrl: "https://syna-pse.vercel.app/",
  },
  // {
  //   id: 6,
  //   title: "Stock Market Prediction",
  //   description:
  //       "A machine learning-powered web app that predicts stock prices using historical data, providing insights and trends.",
  //   category: "Web App",
  //   projectType: "Company Project",
  //   technologies: ["Vercel", "Next.js", "TailwindCSS", "ShadCN"],
  //   githubUrl: "https://github.com/sabasiddique1/stock-market-prediction",
  //   // demoUrl: "https://stock-market-prediction.example.com",
  // },
  {
    id: 8,
    title: "Task Management App",
    description:
        "A simple yet effective task management tool to help users track and organize their daily tasks.",
    category: "Web App",
    projectType: "Company Project",
    technologies: ["Vercel", "Next.js", "TailwindCSS", "ShadCN"],
    githubUrl: "https://github.com/sabasiddique1/task-management-app",
    demoUrl: "https://v0-mern-task-management-rho.vercel.app/login"
  },
  // {
  //   id: 11,
  //   title: "Digilott App",
  //   description:
  //       "A fun and engaging digital lottery application designed for interactive money-winning experiences.",
  //   category: "Web App",
  //   projectType: "Company Project",
  //   technologies: ["React JS", "AntDesign", "React Libraries"],
  //   githubUrl: "https://github.com/sabasiddique1/task-management-app",
  //   demoUrl: "https://task-management-app.example.com",
  // },
  {
    id: 12,
    title: "Miniature App",
    description:
        "A collection of small, functional web apps built with JavaScript to demonstrate core logic and UI concepts in a lightweight format.",
    category: "Web App",
    projectType: "Company Project",
    technologies: ["JavaScript", "HTML", "CSS"],
    githubUrl: "https://github.com/sabasiddique1/task-management-app",
    demoUrl: "https://miniatureapps.vercel.app/",
  },

  // {
  //   id: 12,
  //   title: "Rad UI",
  //   description:
  //       "Contributing to Rad UI, an open-source React component library focused on building flexible, modern, and\n" +
  //       "developer-friendly user interfaces; enhancing component design, usability, and overall developer experience.",
  //   category: "Web App",
  //   projectType: "Company Project",
  //   technologies: ["React JS", "Tailwind css", "Jest"],
  //   githubUrl: "https://github.com/sabasiddique1/task-management-app",
  //   demoUrl: "https://task-management-app.example.com",
  // },
];

export function ProjectsSection() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const handleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
      <section id="projects" className="py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <SectionHeading title="Selected Work" subtitle="Explore my recent projects and case studies" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {projects.map((project) => (
                <ProjectCard
                    key={project.id}
                    project={project}
                    isExpanded={expandedId === project.id}
                    onExpand={() => handleExpand(project.id)}
                />
            ))}
          </div>
        </div>
      </section>
  )
}
