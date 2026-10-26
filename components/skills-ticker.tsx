"use client"

import { motion, useReducedMotion } from "framer-motion"
import {
  Activity,
  Atom,
  Boxes,
  BrainCircuit,
  Braces,
  Cloud,
  Database,
  FileSearch,
  Gauge,
  Globe,
  Hexagon,
  Mic,
  Shield,
  Terminal,
  Waypoints,
  Workflow,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { skills } from "@/constants/skills"

type Skill = (typeof skills)[number]

const icons: Record<Skill, LucideIcon> = {
  Python: Terminal,
  FastAPI: Gauge,
  TypeScript: Braces,
  React: Atom,
  "Next.js": Globe,
  "Node.js": Hexagon,
  LLMs: BrainCircuit,
  RAG: FileSearch,
  "AI Voice Agents": Mic,
  "Agentic Workflows": Workflow,
  "AI Security": Shield,
  OpenTelemetry: Activity,
  Langfuse: Waypoints,
  PostgreSQL: Database,
  AWS: Cloud,
  Kubernetes: Boxes,
}

function SkillList({ decorative = false }: { decorative?: boolean }) {
  return (
    <ul
      aria-hidden={decorative || undefined}
      className={cn(
        "flex items-center gap-8 motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-3",
        decorative && "motion-reduce:hidden",
      )}
    >
      {skills.map((name) => {
        const Icon = icons[name]
        return (
          <motion.li
            key={name}
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background shadow-sm">
              <Icon className="h-5 w-5 text-foreground group-hover:text-primary transition-colors" aria-hidden="true" />
            </div>
            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{name}</span>
          </motion.li>
        )
      })}
    </ul>
  )
}

export function SkillsTicker() {
  // No `initial` prop here, so framer's hook is safe: server and first client render both start at x: 0%.
  const reduceMotion = useReducedMotion()

  return (
    <section aria-label="Skills" className="py-4 bg-muted/30 overflow-hidden border-y border-muted">
      {/*
        Under reduced motion the marquee becomes a static, wrapped list via the motion-reduce classes.
        MotionConfig would snap x to the final keyframe (-50%), so the animation is gated here too.
      */}
      <motion.div
        className="flex items-center gap-8 whitespace-nowrap motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:whitespace-normal motion-reduce:px-4"
        animate={reduceMotion ? { x: "0%" } : { x: ["0%", "-50%"] }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          duration: 25,
          ease: "linear",
        }}
      >
        <SkillList />
        {/* Second copy makes the loop continuous; hidden when motion is reduced. */}
        <SkillList decorative />
      </motion.div>
    </section>
  )
}
