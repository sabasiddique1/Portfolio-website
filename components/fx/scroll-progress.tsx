"use client"

import { motion, useScroll, useSpring } from "framer-motion"

/** 2px accent line along the top edge that fills as the page scrolls. Scroll-linked, so it needs no motion gate. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 160, damping: 30, mass: 0.4 })

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-lime"
      style={{ scaleX }}
    />
  )
}
