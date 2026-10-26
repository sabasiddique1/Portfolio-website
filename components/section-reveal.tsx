"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface SectionRevealProps {
  children: ReactNode
  className?: string
  /** Seconds. Use for stagger within a section. */
  delay?: number
}

/**
 * Reveal-on-scroll wrapper: 16px fade-up, 400ms, plays once.
 * The SSR-safe hook keeps the first client render identical to the server HTML;
 * once mounted, reduced motion makes the change instant (MotionConfig already drops the slide).
 */
export function SectionReveal({ children, className, delay = 0 }: SectionRevealProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
