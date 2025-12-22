"use client"

import { motion, useInView } from "framer-motion"
import { SectionHeading } from "@/components/section-heading"
import { useRef } from "react"
import { projects } from "@/constants/projects"
import { ProjectCarousel } from "@/components/project-carousel"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

// Legacy projects array - keeping for reference but using constants/projects.ts instead
const _legacyProjects: Array<{
  id: number;
  title: string;
  description: string;
  category: string;
  projectType: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl: string;
}> = [

  {
    id: 1,
    title: "Financial Dashboard – Supabase Integration",
    description: "Responsive dashboard with Supabase (auth, realtime, storage) built using Next.js, TailwindCSS, and ShadCN.",
    category: "Cross-platform",
    projectType: "Personal Project",
    technologies: ["React 19", "Next.js 15", "Supabase", "TailwindCSS", "ShadCN", "TypeScript"],
    githubUrl: "https://github.com/sabasiddique1/financial-dashboard-supabase",
    demoUrl: "https://financial-dashboard-supabase-r2su.vercel.app/",
  },
  {
    id: 2,
    title: "Vaultix - Cloud Storage App",
    description:
        "A cloud storage app for easy file management with secure sharing options and high scalability.",
    category: "Cross-platform",
    projectType: "Personal Project",
    technologies: ["React 19", "Next.js 15", "Appwrite", "TailwindCSS", "ShadCN", "TypeScript"],
    githubUrl: "https://github.com/sabasiddique1/Vaultix.git",
    demoUrl: "https://vaultix-5ndl.vercel.app/sign-in",
  },
  
  {
    id: 3,
    title: "Task Management App",
    description:
        "A simple yet effective task management tool to help users track and organize their daily tasks.",
    category: "Cross-platform",
    projectType: "Collaborative Project",
    technologies: ["Vercel", "Next.js", "TailwindCSS", "ShadCN"],
    githubUrl: "https://github.com/sabasiddique1/Task_Management_App_MERN.git",
    demoUrl: "https://v0-mern-task-management-rho.vercel.app/login"
  },
  {
    id: 4,
    title: "Rapid API Hub Clone",
    description: "RapidAPI Hub clone with API browsing and testing flows, built with Next.js, TypeScript, and TailwindCSS.",
    category: "Cross-platform",
    projectType: "Collaborative Project",
    technologies: ["Vercel", "Next.js", "TailwindCSS", "ShadCN", "Axios"],
    githubUrl: "https://github.com/sabasiddique1/rapid-api-hub",
    demoUrl: "https://rapid-api-hub.vercel.app/"
  },
  {
    id: 5,
    title: "Web Scraping App",
    description:
        "A web scraping app that extracts valuable data from websites for analysis and research.",
    category: "Cross-platform",
    projectType: "Collaborative Project",
    technologies: ["Vercel", "Next.js", "TailwindCSS", "ShadCN"],
    githubUrl: "https://github.com/Aniketsy/Web_Scrapper_App.git",
    demoUrl: "https://web-scrapper-app-kappa.vercel.app/",
  },
{
    id: 6,
    title: "NFT Detail Page – Web3 UI",
    description:
        "Built NFT detail UI with Next.js & Tailwind, featuring timer and metadata display.",
    category: "Cross-Platform",
    projectType: "Personal Project",
    technologies: ["Next.js", "TailwindCSS", "React lucide"],
    githubUrl: "https://github.com/sabasiddique1/nft-detail-screen.git",
    demoUrl: "https://nft-detail-screen.vercel.app/",
  },
  {
    id: 7,
    title: "Portfolio - Project Showcase App",
    description:
        "A project showcase website highlighting experience, skills, work history.",
    category: "Cross-platform",
    projectType: "Personal Project",
    technologies: ["React 19", "Next.js 15", "TailwindCSS", "ShadCN", "TypeScript", 'Framer Motion'],
    githubUrl: "https://github.com/sabasiddique1/Portfolio-website.git",
    demoUrl: "https://portfolio-website-phi-ten-96.vercel.app/",
  },
  {
    id: 8,
    title: "Pokedex - Pokemon App",
    description:
        "A fun and interactive Pokedex app that allows users to explore and search through a collection of Pokemon.",
    category: "Web App",
    projectType: "Personal Project",
    technologies: ["Node.js", "React", "CSS"],
    githubUrl: "https://github.com/sabasiddique1/Pokedex_App.git",
    demoUrl: "https://pokedex-app-sigma-silk.vercel.app/pokemon",
  },
  {
    id: 9,
    title: "Miniature App",
    description:
        "A collection of small, functional web apps built with JavaScript to demonstrate core logic and UI concepts in a lightweight format.",
    category: "Web App",
    projectType: "Personal Project",
    technologies: ["JavaScript", "HTML", "CSS"],
    githubUrl: "https://github.com/sabasiddique1/miniatureapps.git",
    demoUrl: "https://miniatureapps.vercel.app/",
  },
  {
    id: 10,
    title: "Event_Bazaar - Event Management App",
    description:
        "An event management app that allows users to organize, manage, and attend events easily.",
    category: "Cross-platform",
    projectType: "Personal Project",
    technologies: ["Node.js", "Next.js", "TypeScript", "TailwindCSS", "Stripe", "Zod", "React Hook Form", "ShadCN", "uploadthing"],
    githubUrl: "https://github.com/sabasiddique1/Event_Bazaar.git",
    demoUrl: "https://event-bazaar-3fht.vercel.app/",
  },
  {
    id: 11,
    title: "VPC+",
    description:
        "Cloud-based SaaS for end-to-end multi-cloud migrations, disaster recovery, cost optimization, and compliance tracking. Fixed key bugs and improved overall stability.",
    category: "Web App",
    projectType: "Company Project",
    technologies: ["React.js", "Node.js", "PostgreSQL", "TailwindCSS"],
    demoUrl: "https://www.wanclouds.net/vpc+",
  },
  {
    id: 12,
    title: "SECMON AI",
    description:
        "AI-focused security platform offering real-time observability, access control, and automated vulnerability management for AI and LLM deployments.",
    category: "Web App",
    projectType: "Company Project",
    technologies:  ["React.js", "Next.js", "TailwindCSS", "Python", "ML Integration"],
    demoUrl: "#",
  },
  {
    id: 13,
    title: "EasyLlama",
    description:
        "Compliance training platform interfaces built with a modern React stack.",
    category: "Company Project",
    projectType: "Company Project",
    technologies: ["Next.js", "TailwindCSS", "ShadCN"],
    demoUrl: "#",
  },
  {
    id: 14,
    title: "SendScale",
    description:
        "Messaging and delivery platform with robust monitoring and UI tooling.",
    category: "Company Project",
    projectType: "Company Project",
    technologies: ["Next.js", "NestJS", "Ant Design", "TailwindCSS", "Sentry"],
    demoUrl: "#",
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
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })

  // Show only featured projects (first 6) on homepage
  const featuredProjects = projects.slice(0, 6)

  return (
      <section id="projects" ref={sectionRef} className="py-24 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <div>
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  className="text-sm text-primary uppercase tracking-wider"
                >
                  Selected Work
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl md:text-4xl font-bold mt-3"
                >
                  Recent projects
                </motion.h2>
              </div>
              <Link
                href="/projects"
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                View all
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8"
            >
              <ProjectCarousel projects={featuredProjects} />
            </motion.div>
          </div>
        </div>
      </section>
  )
}
