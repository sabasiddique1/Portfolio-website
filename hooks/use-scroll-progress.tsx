"use client"

import { useEffect, useState } from "react"
import { useScroll, useTransform } from "framer-motion"

/**
 * Hook to track scroll progress within a container
 * Returns a value from 0 to 1 representing scroll progress
 */
export function useScrollProgress(targetRef: React.RefObject<HTMLElement>) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  })

  return scrollYProgress
}

/**
 * Hook to track which section is currently active based on IntersectionObserver
 * Returns the index of the active section
 */
export function useActiveSection(
  sectionRefs: React.RefObject<HTMLElement>[],
  options: IntersectionObserverInit = { threshold: 0.5 }
) {
  const [activeIndex, setActiveIndex] = useState<number>(0)

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
        options
      )

      observer.observe(ref.current)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [sectionRefs, options])

  return activeIndex
}


