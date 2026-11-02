"use client"

import { useEffect, useRef, useState } from "react"
import { animate } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

/** "4 yrs" → { n: 4, suffix: " yrs" }; "6" → { n: 6, suffix: "" }; "Top 14%" → null (rendered verbatim). */
export function parseCountUp(value: string): { n: number; suffix: string } | null {
  const match = value.match(/^(\d+)(.*)$/)
  return match ? { n: Number(match[1]), suffix: match[2] } : null
}

interface CountUpProps {
  /** The stat as written in the data file. Rendered verbatim when it does not start with an integer. */
  value: string
  /** Flip to true when the row is revealed; the count runs once from there. */
  start: boolean
  /** Seconds to wait before counting, so the count lines up with the row's own reveal delay. */
  delay?: number
  className?: string
}

/**
 * Counts the leading integer of a stat up from 0 over 1.2s once `start` is true.
 * The server HTML and the first client render carry the final value (crawlers, no-JS), the 0 only
 * appears when the count begins. Under reduced motion the final value is shown immediately.
 */
export function CountUp({ value, start, delay = 0, className }: CountUpProps) {
  const reduceMotion = useReducedMotion()
  const parsed = parseCountUp(value)
  const target = parsed?.n ?? null
  const suffix = parsed?.suffix ?? ""
  const [display, setDisplay] = useState(target ?? 0)
  // Once the count has finished (or been skipped) it never replays, e.g. if the OS motion setting changes.
  const doneRef = useRef(false)

  useEffect(() => {
    if (!start || target === null || doneRef.current) return

    if (reduceMotion) {
      doneRef.current = true
      setDisplay(target)
      return
    }

    setDisplay(0)
    const controls = animate(0, target, {
      delay,
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.round(latest)),
      onComplete: () => {
        doneRef.current = true
      },
    })
    return () => controls.stop()
  }, [start, delay, reduceMotion, target])

  // Tabular digits keep the suffix from shifting while the number changes.
  return <span className={className ?? "tabular-nums"}>{target === null ? value : `${display}${suffix}`}</span>
}
