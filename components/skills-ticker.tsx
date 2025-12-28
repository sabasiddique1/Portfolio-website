"use client"

import { motion } from "framer-motion"
import {
  Code,
  Figma,
  Layers,
  PenTool,
  Smartphone,
  Globe,
  Database,
  Cpu,
  Terminal,
  Layout,
  Zap,
  Server,
  Palette,
  Monitor,
  GitBranch,
  Cloud,
} from "lucide-react"

export function SkillsTicker() {
  const skills = [
    { icon: Code, name: "JavaScript" },
    { icon: Figma, name: "Figma" },
    { icon: Layers, name: "React" },
    { icon: PenTool, name: "Illustrator" },
    { icon: Smartphone, name: "Mobile Design" },
    { icon: Globe, name: "Web Development" },
    { icon: Database, name: "SQL" },
    { icon: Cpu, name: "TypeScript" },
    { icon: Terminal, name: "Node.js" },
    { icon: Layout, name: "UI/UX" },
    { icon: Zap, name: "Next.js" },
    { icon: Server, name: "AWS" },
    { icon: Palette, name: "Design Systems" },
    { icon: Monitor, name: "Responsive Design" },
    { icon: GitBranch, name: "Git" },
    { icon: Cloud, name: "Cloud Services" },
  ]

  // Duplicate the skills array to create a seamless loop
  const duplicatedSkills = [...skills, ...skills]

  return (
    <section className="py-4 bg-muted/30 overflow-hidden border-y border-muted">
      <div className="flex items-center">
        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          }}
        >
          {duplicatedSkills.map((skill, index) => {
            const IconComponent = skill.icon
            return (
              <motion.div
                key={index}
                className="flex items-center gap-2 group"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background shadow-sm">
                  <IconComponent className="h-5 w-5 text-foreground group-hover:text-primary transition-colors" />
                </div>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{skill.name}</span>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
