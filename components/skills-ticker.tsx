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
    { icon: <Code className="h-5 w-5" />, name: "JavaScript" },
    { icon: <Figma className="h-5 w-5" />, name: "Figma" },
    { icon: <Layers className="h-5 w-5" />, name: "React" },
    { icon: <PenTool className="h-5 w-5" />, name: "Illustrator" },
    { icon: <Smartphone className="h-5 w-5" />, name: "Mobile Design" },
    { icon: <Globe className="h-5 w-5" />, name: "Web Development" },
    { icon: <Database className="h-5 w-5" />, name: "SQL" },
    { icon: <Cpu className="h-5 w-5" />, name: "TypeScript" },
    { icon: <Terminal className="h-5 w-5" />, name: "Node.js" },
    { icon: <Layout className="h-5 w-5" />, name: "UI/UX" },
    { icon: <Zap className="h-5 w-5" />, name: "Next.js" },
    { icon: <Server className="h-5 w-5" />, name: "AWS" },
    { icon: <Palette className="h-5 w-5" />, name: "Design Systems" },
    { icon: <Monitor className="h-5 w-5" />, name: "Responsive Design" },
    { icon: <GitBranch className="h-5 w-5" />, name: "Git" },
    { icon: <Cloud className="h-5 w-5" />, name: "Cloud Services" },
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
          {duplicatedSkills.map((skill, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2"
              whileHover={{ scale: 1.1, color: "var(--primary)" }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background shadow-sm">
                {skill.icon}
              </div>
              <span className="text-sm font-medium">{skill.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
