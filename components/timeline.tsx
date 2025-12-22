"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "framer-motion"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export interface TimelineItem {
  id: string
  period: string
  title: string
  description?: string
  status?: "inactive" | "active" | "completed"
}

interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

/**
 * Scroll-driven vertical timeline component
 * 
 * Customization options:
 * - DOT_SIZE: Size of timeline dots (default: 12px)
 * - DOT_GLOW: Glow intensity for active dot (default: 20px)
 * - LINE_WIDTH: Width of timeline line (default: 2px)
 * - SPACING: Vertical spacing between items (default: 4rem)
 * - ANIMATION_DURATION: Duration of fade/slide animations (default: 0.5s)
 */
const DOT_SIZE = 12 // pixels
const DOT_GLOW = 20 // pixels for box-shadow blur
const LINE_WIDTH = 2 // pixels
const SPACING = "4rem" // Tailwind spacing class
const ANIMATION_DURATION = 0.5 // seconds

export function Timeline({ items, className = "" }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRefs = items.map(() => useRef<HTMLDivElement>(null))
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const prefersReducedMotion = useReducedMotion()

  // Track scroll progress for line reveal
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Calculate line height based on scroll progress
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  // Use IntersectionObserver to track active section
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sectionRefs.forEach((ref, index) => {
      if (!ref.current) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveIndex(index)
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
  }, [sectionRefs])

  // Check if container is in view for initial animations
  const isInView = useInView(containerRef, { once: false, amount: 0.1 })

  return (
    <section
      ref={containerRef}
      className={`relative ${className}`}
      aria-label="Timeline"
    >
      {/* Timeline spine - vertical line */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] overflow-hidden -translate-x-1/2">
        {/* Base line - more visible background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/60 to-transparent" />

        {/* Progress line - bright, reveals as user scrolls */}
        {!prefersReducedMotion && (
          <motion.div
            className="absolute top-0 left-0 w-full origin-top"
            style={{
              height: lineHeight,
            }}
          >
            <div
              className="absolute inset-0 bg-gradient-to-b from-primary via-primary to-primary"
              style={{
                boxShadow: `0 0 ${DOT_GLOW / 2}px hsl(var(--primary)), 0 0 ${DOT_GLOW}px hsl(var(--primary))`,
              }}
            />
          </motion.div>
        )}

        {/* Glowing dot that travels down the line */}
        {!prefersReducedMotion && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 bg-primary rounded-full z-10"
            style={{
              width: `${DOT_SIZE / 2}px`,
              height: `${DOT_SIZE / 2}px`,
              top: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
              boxShadow: `0 0 ${DOT_GLOW}px hsl(var(--primary)), 0 0 ${DOT_GLOW * 2}px hsl(var(--primary))`,
            }}
          />
        )}
      </div>

      {/* Timeline items */}
      <div className="space-y-16 md:space-y-20">
        {items.map((item, index) => {
          const isActive = activeIndex === index
          const isCompleted = activeIndex > index
          const itemRef = sectionRefs[index]

          // Calculate content animation based on scroll and active state
          const contentProgress = useTransform(
            scrollYProgress,
            [
              index / (items.length + 1),
              (index + 0.5) / (items.length + 1),
              (index + 1) / (items.length + 1),
            ],
            [0, 1, 1]
          )

          const contentOpacity = useTransform(
            contentProgress,
            [0, 0.3, 1],
            prefersReducedMotion ? [1, 1, 1] : [0, 0, 1]
          )
          const contentY = useTransform(
            contentProgress,
            [0, 0.3, 1],
            prefersReducedMotion ? [0, 0, 0] : [20, 10, 0]
          )

          // Dot state styling
          const getDotStyle = () => {
            if (isActive) {
              return {
                backgroundColor: "hsl(var(--primary))",
                boxShadow: `0 0 ${DOT_GLOW}px hsl(var(--primary)), 0 0 ${DOT_GLOW * 2}px hsl(var(--primary))`,
                scale: 1.2,
              }
            } else if (isCompleted) {
              return {
                backgroundColor: "hsl(var(--primary))",
                boxShadow: `0 0 ${DOT_GLOW / 2}px hsl(var(--primary))`,
                scale: 1,
              }
            } else {
              return {
                backgroundColor: "hsl(var(--primary) / 0.3)",
                boxShadow: "none",
                scale: 1,
              }
            }
          }

          return (
            <motion.div
              key={item.id}
              ref={itemRef}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : {
                      opacity: isInView ? 1 : 0,
                      y: isInView ? 0 : 20,
                    }
              }
              transition={{
                duration: ANIMATION_DURATION,
                delay: index * 0.1,
              }}
              className={`relative pl-8 md:pl-0 md:w-1/2 ${
                index % 2 === 0 ? "md:pr-12" : "md:ml-auto md:pl-12"
              }`}
              aria-label={`Timeline item ${index + 1}: ${item.title}`}
            >
              {/* Dot on timeline - perfectly centered on the line, same position for all dots */}
              <motion.div
                className="absolute top-1 -left-8 md:left-1/2 -translate-x-1/2 rounded-full z-20"
                style={{
                  width: `${DOT_SIZE}px`,
                  height: `${DOT_SIZE}px`,
                  ...getDotStyle(),
                }}
                animate={getDotStyle()}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.3,
                  ease: "easeOut",
                }}
                aria-hidden="true"
              />

              {/* Content block */}
              <motion.div
                className="space-y-1"
                style={{
                  opacity: prefersReducedMotion ? 1 : contentOpacity,
                  y: prefersReducedMotion ? 0 : contentY,
                }}
              >
                <time
                  className="text-sm text-muted-foreground block"
                  dateTime={item.period}
                >
                  {item.period}
                </time>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                {item.description && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {item.description}
                  </p>
                )}
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

