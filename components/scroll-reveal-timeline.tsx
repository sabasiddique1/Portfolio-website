"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export interface TimelineItem {
  id: string
  period: string
  title: string
  description?: string
}

interface ScrollRevealTimelineProps {
  items: TimelineItem[]
  className?: string
}

/**
 * Scroll-reveal vertical timeline component
 * 
 * Features:
 * - Thin base spine line (dim)
 * - Progress overlay line that fills/draws downward based on scroll progress
 * - Timeline nodes (dots) that glow/highlight when active/in view
 * - Items animate in with IntersectionObserver
 * - Accessible with semantic HTML
 * - Respects prefers-reduced-motion
 */
export function ScrollRevealTimeline({ items, className = "" }: ScrollRevealTimelineProps) {
  const containerRef = useRef<HTMLElement>(null)
  const itemRefs = items.map(() => useRef<HTMLLIElement>(null))
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [itemVisibility, setItemVisibility] = useState<boolean[]>(new Array(items.length).fill(false))
  const prefersReducedMotion = useReducedMotion()

  // Track scroll progress for line reveal
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Calculate line height based on scroll progress
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  // Use IntersectionObserver to track active section and visibility
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    itemRefs.forEach((ref, index) => {
      if (!ref.current) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveIndex(index)
              setItemVisibility((prev) => {
                const newVisibility = [...prev]
                newVisibility[index] = true
                return newVisibility
              })
            }
          })
        },
        {
          threshold: 0.5,
          rootMargin: "-20% 0px -20% 0px",
        }
      )

      observer.observe(ref.current)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [itemRefs])

  return (
    <section
      ref={containerRef}
      className={`relative ${className}`}
      aria-label="Timeline"
    >
      {/* Timeline spine - base line (dim) */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-muted-foreground/20 to-transparent -translate-x-1/2" />

      {/* Progress overlay line - fills/draws downward */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute left-0 md:left-1/2 top-0 w-px bg-gradient-to-b from-primary/40 via-primary/60 to-primary/40 -translate-x-1/2 origin-top"
          style={{
            height: lineHeight,
          }}
        />
      )}

      {/* Timeline items */}
      <ol className="space-y-12 md:space-y-16">
        {items.map((item, index) => {
          const itemRef = itemRefs[index]
          const isActive = activeIndex === index
          const isVisible = itemVisibility[index] || prefersReducedMotion

          return (
            <li
              key={item.id}
              ref={itemRef}
              className={`relative pl-8 md:pl-0 md:w-1/2 ${
                index % 2 === 0 ? "md:pr-12" : "md:ml-auto md:pl-12"
              }`}
            >
              {/* Dot - glows when active */}
              <motion.div
                className={`absolute top-1 left-0 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-20 ${
                  isActive ? "bg-primary" : "bg-muted-foreground/40"
                }`}
                animate={
                  prefersReducedMotion
                    ? {}
                    : {
                        scale: isActive ? 1.2 : 1,
                        boxShadow: isActive
                          ? "0 0 12px hsl(var(--primary)), 0 0 24px hsl(var(--primary) / 0.5)"
                          : "none",
                      }
                }
                transition={{ duration: 0.3 }}
                aria-hidden="true"
              />

              {/* Content - animates in */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                animate={
                  prefersReducedMotion || isVisible
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 12 }
                }
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.5,
                  ease: "easeOut",
                }}
                className="space-y-1"
              >
                <time
                  className="text-xs text-muted-foreground block"
                  dateTime={item.period}
                >
                  {item.period}
                </time>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                {item.description && (
                  <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                )}
              </motion.div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

