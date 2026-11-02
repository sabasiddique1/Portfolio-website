"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Pause, Play } from "lucide-react"
import type { Project } from "@/constants/projects"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

type ImageAspect = NonNullable<Project["imageAspect"]>

interface ProjectImageCarouselProps {
  images: string[]
  title: string
  autoSwitchInterval?: number // milliseconds
  className?: string // Additional className for styling
  /** Frame ratio; default 3:2 (the earlier-work screenshots are 1536x1024). */
  aspect?: ImageAspect
  /** "contain" letterboxes mixed ratios on the card-2 background instead of cropping. */
  fit?: "cover" | "contain"
}

const aspectClass: Record<ImageAspect, string> = {
  "3/2": "aspect-[3/2]",
  "4/3": "aspect-[4/3]",
  "16/9": "aspect-video",
}

/**
 * Auto-switching image carousel for project pages: crossfades every few seconds, holds while
 * hovered or focused, stops once the visitor picks an image or presses pause, never runs under
 * reduced motion.
 */
export function ProjectImageCarousel({
  images,
  title,
  autoSwitchInterval = 3000, // 3 seconds default
  className = "",
  aspect = "3/2",
  fit = "cover",
}: ProjectImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [settled, setSettled] = useState(false) // pointer over or focus inside the carousel
  const reduceMotion = useReducedMotion()

  const autoplay = images.length > 1 && !reduceMotion && !paused && !settled
  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, autoSwitchInterval)

    return () => clearInterval(interval)
  }, [autoplay, images.length, autoSwitchInterval])

  const frameClass = cn("relative w-full overflow-hidden bg-card-2", aspectClass[aspect])
  const fitClass = fit === "contain" ? "object-contain" : "object-cover"

  if (!images || images.length === 0) {
    return (
      <div className={cn(frameClass, "mb-4 flex items-center justify-center rounded-lg")}>
        <span className="text-sm text-muted-foreground">No image</span>
      </div>
    )
  }

  // If only one image, show it without carousel
  if (images.length === 1) {
    return (
      <div className={cn(frameClass, className)}>
        <Image
          src={images[0]}
          alt={`${title} screenshot`}
          fill
          className={fitClass}
          sizes="(max-width: 1024px) 100vw, 1024px"
          unoptimized
          priority
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-background/15" />
      </div>
    )
  }

  return (
    <div
      className={cn(frameClass, "group", className)}
      onMouseEnter={() => setSettled(true)}
      onMouseLeave={() => setSettled(false)}
      onFocus={() => setSettled(true)}
      onBlur={() => setSettled(false)}
    >
      {/* Background layer - always visible to prevent gaps */}
      <div className="absolute inset-0 z-0">
        <Image
          key={`bg-${currentIndex}`}
          src={images[currentIndex]}
          alt=""
          fill
          className={cn(fitClass, "transition-opacity duration-500")}
          sizes="(max-width: 1024px) 100vw, 1024px"
          unoptimized
          priority={currentIndex === 0}
        />
      </div>

      {/* Animated overlay layer for smooth crossfade */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 z-10"
        >
          <Image
            src={images[currentIndex]}
            alt={`${title} screenshot ${currentIndex + 1} of ${images.length}`}
            fill
            className={fitClass}
            sizes="(max-width: 1024px) 100vw, 1024px"
            unoptimized
          />
        </motion.div>
      </AnimatePresence>

      {/* Thin dark veil over the light screenshots; painted under the controls below. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 bg-background/15" />

      {/* Image indicators (24px hit areas around 4px bars) and the autoplay toggle */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 items-center rounded-md bg-background/60 px-1 backdrop-blur-sm">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                setCurrentIndex(index)
                setPaused(true)
              }}
              className="group/dot flex h-6 min-w-6 items-center justify-center px-1"
              aria-label={`Go to image ${index + 1}`}
              aria-current={index === currentIndex ? "true" : undefined}
            >
              <span
                className={`block h-1 rounded-sm transition-all ${
                  index === currentIndex ? "w-6 bg-lime" : "w-2 bg-foreground/40 group-hover/dot:bg-foreground/60"
                }`}
              />
            </button>
          ))}
          {!reduceMotion && (
            <button
              type="button"
              onClick={() => setPaused((value) => !value)}
              className="ml-1 flex h-6 w-6 items-center justify-center rounded-sm text-foreground/70 transition-colors hover:text-foreground"
              aria-label={paused ? "Play slideshow" : "Pause slideshow"}
              aria-pressed={paused}
            >
              {paused ? <Play className="h-3 w-3" aria-hidden="true" /> : <Pause className="h-3 w-3" aria-hidden="true" />}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
