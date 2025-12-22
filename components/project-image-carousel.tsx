"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

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

  // Auto-switch images
  useEffect(() => {
    if (images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, autoSwitchInterval)

    return () => clearInterval(interval)
  }, [images.length, autoSwitchInterval])

  // Images are 1536x1024 (3:2 aspect ratio)
  const aspectRatio = "aspect-[3/2]"

  if (!images || images.length === 0) {
    return (
      <div className={`w-full ${aspectRatio} bg-muted rounded-lg flex items-center justify-center mb-4`}>
        <span className="text-muted-foreground text-sm">No image</span>
      </div>
    )
  }

  // If only one image, show it without carousel
  if (images.length === 1) {
    return (
      <div className={`w-full ${aspectRatio} relative overflow-hidden bg-muted ${className}`}>
        <Image
          src={images[0]}
          alt={`${title} - Image 1`}
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
    <div className={`w-full ${aspectRatio} relative overflow-hidden bg-muted group ${className}`}>
      {/* Background layer - always visible to prevent gaps */}
      <div className="absolute inset-0 z-0">
        <Image
          key={`bg-${currentIndex}`}
          src={images[currentIndex]}
          alt={`${title} - Background`}
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
            alt={`${title} - Image ${currentIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized
          />
        </motion.div>
      </AnimatePresence>

      {/* Image indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === currentIndex
                  ? "w-6 bg-primary"
                  : "w-1.5 bg-primary/30 hover:bg-primary/50"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

