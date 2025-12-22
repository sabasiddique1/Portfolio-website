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
 * Clean chronology timeline component
 * 
 * Features:
 * - Single vertical line with dots
 * - Only ONE dot glows at a time (the most visible one)
 * - Year labels on left, content cards on right
 * - IntersectionObserver tracks which item is most visible
 * - CSS-based glow animation (no Framer Motion for dots)
 * - Respects prefers-reduced-motion
 */
export function ScrollRevealTimeline({ items, className = "" }: ScrollRevealTimelineProps) {
  const containerRef = useRef<HTMLElement>(null)
  const itemRefs = items.map(() => useRef<HTMLLIElement>(null))
  const [activeIndex, setActiveIndex] = useState<number>(-1)
  const [itemVisibility, setItemVisibility] = useState<boolean[]>(new Array(items.length).fill(false))
  const intersectionRatiosRef = useRef<number[]>(new Array(items.length).fill(0))
  const lastActiveIndexRef = useRef<number>(-1)
  const prefersReducedMotion = useReducedMotion()

  // Track scroll progress for line reveal
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Calculate line height based on scroll progress
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  // Use IntersectionObserver to track which item is MOST VISIBLE
  // CRITICAL: Only ONE item should be active at a time
  useEffect(() => {
    const observers: IntersectionObserver[] = []
    let updateTimeout: NodeJS.Timeout | null = null

    const updateActiveIndex = () => {
      // Find the item with the HIGHEST intersection ratio
      // This ensures only ONE dot is active at a time
      const ratios = intersectionRatiosRef.current
      let maxRatio = 0
      let mostVisibleIndex = -1

      // Find the index with the highest ratio
      ratios.forEach((ratio, index) => {
        if (ratio > maxRatio && ratio > 0.2) { // Minimum threshold of 20%
          maxRatio = ratio
          mostVisibleIndex = index
        }
      })

      // Only update if we found a valid most visible item AND it's different
      if (mostVisibleIndex !== -1 && mostVisibleIndex !== lastActiveIndexRef.current) {
        lastActiveIndexRef.current = mostVisibleIndex
        setActiveIndex(mostVisibleIndex)
      } else if (mostVisibleIndex === -1 && lastActiveIndexRef.current !== -1) {
        // If no item meets threshold, keep the last active one
        // Don't reset to -1 to prevent flickering
      }
    }

    itemRefs.forEach((ref, index) => {
      if (!ref.current) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Track intersection ratio for each item
            intersectionRatiosRef.current[index] = entry.intersectionRatio

            // Mark as visible
            if (entry.isIntersecting) {
              setItemVisibility((prev) => {
                const newVisibility = [...prev]
                newVisibility[index] = true
                return newVisibility
              })
            }
          })

          // Debounce the active index update to prevent rapid changes
          if (updateTimeout) {
            clearTimeout(updateTimeout)
          }
          updateTimeout = setTimeout(updateActiveIndex, 100) // Increased debounce for stability
        },
        {
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0], // Multiple thresholds for accurate ratio
          rootMargin: "-15% 0px -15% 0px", // Tighter margin to focus on center
        }
      )

      observer.observe(ref.current)
      observers.push(observer)
    })

    return () => {
      if (updateTimeout) {
        clearTimeout(updateTimeout)
      }
      observers.forEach((observer) => observer.disconnect())
    }
  }, [itemRefs])

  return (
    <section
      ref={containerRef}
      className={`relative ${className}`}
      aria-label="Timeline"
    >
      {/* Timeline spine - single vertical line */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />

      {/* Progress overlay line - fills/draws downward */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute left-8 md:left-1/2 top-0 w-px bg-gradient-to-b from-primary/60 via-primary to-primary/60 origin-top"
          style={{
            height: lineHeight,
          }}
        />
      )}

      {/* Timeline items */}
      <ol className="space-y-16 md:space-y-20">
        {items.map((item, index) => {
          const itemRef = itemRefs[index]
          const isActive = activeIndex === index
          const isVisible = itemVisibility[index] || prefersReducedMotion

          return (
            <li
              key={item.id}
              ref={itemRef}
              className="relative"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                {/* Year/Period label on left */}
                <div className="md:w-1/4 flex-shrink-0">
                  <motion.time
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                    animate={prefersReducedMotion || isVisible ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    dateTime={item.period}
                    className={`text-sm font-medium ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    } transition-colors duration-300`}
                  >
                    {item.period}
                  </motion.time>
                </div>

                {/* Dot on the line */}
                <div className="absolute left-8 md:left-1/2 top-2 -translate-x-1/2 z-20">
                  <div
                    className={`chronology-dot ${isActive ? "chronology-dot-active" : ""}`}
                    aria-hidden="true"
                  />
                </div>

                {/* Content card on right */}
                <div className="md:w-3/4 md:ml-auto pl-12 md:pl-0">
                  <motion.div
                    initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    animate={
                      prefersReducedMotion || isVisible
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -20 }
                    }
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.5,
                      ease: "easeOut",
                    }}
                    className={`p-6 rounded-lg border transition-all duration-300 ${
                      isActive
                        ? "border-primary/30 bg-card/80 shadow-lg shadow-primary/5"
                        : "border-border/50 bg-card/50"
                    }`}
                  >
                    <h3 className={`text-lg font-semibold mb-1 transition-colors ${
                      isActive ? "text-primary" : "text-foreground"
                    }`}>
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                    )}
                  </motion.div>
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

