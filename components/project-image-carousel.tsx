"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Pause, Play } from "lucide-react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

interface ProjectImageCarouselProps {
  images: string[]
  title: string
  autoSwitchInterval?: number // milliseconds
  className?: string // Additional className for styling
}

/**
 * Auto-switching image carousel for project cards
 * Automatically cycles through images every few seconds
 */
export function ProjectImageCarousel({
  images,
  title,
  autoSwitchInterval = 3000, // 3 seconds default
  className = "",
}: ProjectImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [settled, setSettled] = useState(false) // pointer over or focus inside the carousel
  const reduceMotion = useReducedMotion()

  // Auto-switch images. Stops when the visitor picks an image or presses pause, and holds while
  // they hover or focus the carousel; never runs under reduced motion.
  const autoplay = images.length > 1 && !reduceMotion && !paused && !settled
  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, autoSwitchInterval)

    return () => clearInterval(interval)
  }, [autoplay, images.length, autoSwitchInterval])

  // Images are 1536x1024 (3:2 aspect ratio)
  const aspectRatio = "aspect-[3/2]"

  if (!images || images.length === 0) {
    return (
      <div className={`w-full ${aspectRatio} bg-card-2 rounded-lg flex items-center justify-center mb-4`}>
        <span className="text-muted-foreground text-sm">No image</span>
      </div>
    )
  }

  // If only one image, show it without carousel
  if (images.length === 1) {
    return (
      <div className={`w-full ${aspectRatio} relative overflow-hidden bg-card-2 ${className}`}>
        <Image
          src={images[0]}
          alt={`${title} screenshot`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          unoptimized
          priority
        />
      </div>
    )
  }

  return (
    <div
      className={`w-full ${aspectRatio} relative overflow-hidden bg-card-2 group ${className}`}
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
          className="object-cover transition-opacity duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
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
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized
          />
        </motion.div>
      </AnimatePresence>

      {/* Image indicators (24px hit areas around 4px bars) and the autoplay toggle */}
      {images.length > 1 && (
        <div className="absolute bottom-1 left-1/2 z-10 flex -translate-x-1/2 items-center">
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
                  index === currentIndex ? "w-6 bg-foreground" : "w-2 bg-foreground/30 group-hover/dot:bg-foreground/50"
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

