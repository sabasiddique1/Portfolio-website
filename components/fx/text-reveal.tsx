"use client"

import { Fragment } from "react"
import { motion } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

interface TextRevealProps {
  text: string
  className?: string
  /** Seconds before the first word. */
  delay?: number
  /** Seconds between words. */
  stagger?: number
  /** Play on mount instead of on scroll. */
  immediate?: boolean
  /** Words (0-based) rendered with the accent gradient. */
  accentWords?: number[]
}

/**
 * Word-by-word reveal: each word slides up out of a blur. Plays once, on scroll by default.
 * The spaces stay plain text nodes so the string reads as one sentence to assistive tech.
 */
export function TextReveal({ text, className, delay = 0, stagger = 0.05, immediate = false, accentWords = [] }: TextRevealProps) {
  const reduceMotion = useReducedMotion()
  const words = text.split(" ")
  const hidden = { opacity: 0, y: 18, filter: "blur(10px)" }
  const shown = { opacity: 1, y: 0, filter: "blur(0px)" }

  return (
    <span className={cn("inline", className)}>
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          {index > 0 && " "}
          <motion.span
            className={cn("inline-block will-change-transform", accentWords.includes(index) && "text-accent-gradient")}
            initial={hidden}
            {...(immediate ? { animate: shown } : { whileInView: shown, viewport: { once: true, amount: 0.6 } })}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.55, delay: delay + index * stagger, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        </Fragment>
      ))}
    </span>
  )
}
