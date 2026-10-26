import { BarChart3, Bot, FlaskConical, HeartPulse, Layers, Mic, type LucideIcon } from "lucide-react"
import type { ProjectKind } from "@/constants/projects"
import type { ChipTone } from "@/lib/chip-tone"
import { cn } from "@/lib/utils"

/** One lucide icon per category, coloured from the same tone palette as the chips. 16px, never filled. */
export const categoryIcons: Record<ProjectKind, { Icon: LucideIcon; tone: ChipTone; colorClass: string; label: string }> = {
  agents: { Icon: Bot, tone: "green", colorClass: "text-tone-green-text", label: "Agents and AI security" },
  healthcare: { Icon: HeartPulse, tone: "orange", colorClass: "text-tone-orange-text", label: "Healthcare AI" },
  ml: { Icon: BarChart3, tone: "blue", colorClass: "text-tone-blue-text", label: "Machine learning and data" },
  research: { Icon: FlaskConical, tone: "purple", colorClass: "text-tone-purple-text", label: "Research" },
  voice: { Icon: Mic, tone: "teal", colorClass: "text-tone-teal-text", label: "Voice" },
  fullstack: { Icon: Layers, tone: "grey", colorClass: "text-tone-grey-text", label: "Full-stack" },
}

interface CategoryIconProps {
  kind: ProjectKind
  className?: string
}

export function CategoryIcon({ kind, className }: CategoryIconProps) {
  const { Icon, colorClass } = categoryIcons[kind]
  return <Icon className={cn("h-4 w-4 shrink-0", colorClass, className)} strokeWidth={1.75} aria-hidden="true" />
}
