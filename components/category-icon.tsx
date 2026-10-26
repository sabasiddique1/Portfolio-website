import { BarChart3, Bot, FlaskConical, HeartPulse, Layers, Mic, type LucideIcon } from "lucide-react"
import type { ProjectKind } from "@/constants/projects"
import { cn } from "@/lib/utils"

/** One lucide icon + colour per category. 16px, coloured stroke, never filled. */
export const categoryIcons: Record<ProjectKind, { Icon: LucideIcon; colorClass: string; label: string }> = {
  agents: { Icon: Bot, colorClass: "text-cat-agents", label: "Agents and AI security" },
  healthcare: { Icon: HeartPulse, colorClass: "text-cat-health", label: "Healthcare AI" },
  ml: { Icon: BarChart3, colorClass: "text-cat-ml", label: "Machine learning and data" },
  research: { Icon: FlaskConical, colorClass: "text-cat-research", label: "Research" },
  voice: { Icon: Mic, colorClass: "text-cat-voice", label: "Voice" },
  fullstack: { Icon: Layers, colorClass: "text-cat-fullstack", label: "Full-stack" },
}

interface CategoryIconProps {
  kind: ProjectKind
  className?: string
}

export function CategoryIcon({ kind, className }: CategoryIconProps) {
  const { Icon, colorClass } = categoryIcons[kind]
  return <Icon className={cn("h-4 w-4 shrink-0", colorClass, className)} strokeWidth={1.75} aria-hidden="true" />
}
