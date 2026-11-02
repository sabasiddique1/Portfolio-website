"use client"

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react"
import Link from "next/link"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowRight, Pause, Play } from "lucide-react"
import type { Project, ProjectKind } from "@/constants/projects"
import { BorderBeam } from "@/components/fx/border-beam"
import { CategoryIcon } from "@/components/category-icon"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

export type ShowcaseItem = Pick<Project, "slug" | "title"> & { kind: ProjectKind; video: NonNullable<Project["video"]> }

interface HeroShowcaseProps {
  items: ShowcaseItem[]
  /** Caption under the frame. */
  label: string
}

/** Max tilt of the frame towards the cursor, in degrees. */
const TILT = 5

/**
 * The hero "banner": a browser-style frame playing short silent loops of the featured projects,
 * with a tab per project. Built to cost nothing on first paint and to be safe by construction:
 *
 * - Posters (first frame, ~24KB WebP) render immediately; no video bytes are requested until the
 *   window `load` event has fired, and only the active clip ever gets a `src`.
 * - Playback runs only while the frame is on screen; clips are muted, inline, and advance to the
 *   next tab when they end, so the frame keeps moving without any JavaScript timers.
 * - Under reduced motion the poster is shown, nothing plays and the frame does not tilt.
 * - Sources are self-hosted static files under /public/media (never a third-party URL), with no
 *   controls, no picture-in-picture and nothing user-generated.
 */
export function HeroShowcase({ items, label }: HeroShowcaseProps) {
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)
  const [pageLoaded, setPageLoaded] = useState(false)
  const [inView, setInView] = useState(false)
  // Visitor-controlled stop for the moving picture (WCAG 2.2.2); nothing plays while true.
  const [paused, setPaused] = useState(false)
  const frameRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([])

  // No media requests until the page itself has finished loading.
  useEffect(() => {
    if (document.readyState === "complete") {
      setPageLoaded(true)
      return
    }
    const onLoad = () => setPageLoaded(true)
    window.addEventListener("load", onLoad)
    return () => window.removeEventListener("load", onLoad)
  }, [])

  // Play only while on screen.
  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 })
    observer.observe(frame)
    return () => observer.disconnect()
  }, [])

  const canPlay = pageLoaded && inView && !reduceMotion && !paused

  // Play the active clip from the start (so the progress line under its tab starts with it); park the others.
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return
      if (index === active && canPlay) {
        video.muted = true
        video.currentTime = 0
        // Autoplay can still be refused by the browser; the poster simply stays.
        video.play().catch(() => undefined)
      } else {
        video.pause()
      }
    })
  }, [active, canPlay])

  const next = useCallback(() => setActive((index) => (index + 1) % items.length), [items.length])

  // Cursor tilt (pointer only; idle at rest).
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [TILT, -TILT]), { stiffness: 160, damping: 22 })
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-TILT, TILT]), { stiffness: 160, damping: 22 })
  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5)
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5)
  }
  const onLeave = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  const current = items[active]
  if (!current) return null

  return (
    <div className="relative mx-auto w-full max-w-[640px]">
      {/* Accent halo behind the frame. */}
      <div aria-hidden="true" className="absolute -inset-8 -z-10 rounded-[40px] bg-lime/10 blur-3xl" />

      <motion.div
        ref={frameRef}
        onMouseMove={reduceMotion ? undefined : onMove}
        onMouseLeave={reduceMotion ? undefined : onLeave}
        style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 1400 }}
        className="relative rounded-xl border border-border-strong bg-card shadow-glow will-change-transform"
      >
        <BorderBeam className="rounded-xl" />

        {/* Window chrome */}
        <div className="flex items-center gap-3 border-b border-border px-3 py-2">
          <span aria-hidden="true" className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
            <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
            <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
          </span>
          <span className="mx-auto flex min-w-0 items-center gap-2 rounded-md bg-surface px-3 py-0.5 text-xs text-muted-foreground">
            <CategoryIcon kind={current.kind} className="h-3.5 w-3.5" />
            <span className="truncate">{current.title}</span>
          </span>
          <span aria-hidden="true" className="w-[42px]" />
        </div>

        <div className="relative aspect-[16/10] overflow-hidden rounded-b-xl bg-card-2">
          {items.map((item, index) => (
            <video
              key={item.slug}
              ref={(element) => {
                videoRefs.current[index] = element
              }}
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
                index === active ? "opacity-100" : "opacity-0"
              )}
              poster={item.video.poster}
              src={index === active && pageLoaded && !reduceMotion ? item.video.src : undefined}
              muted
              playsInline
              preload="none"
              disablePictureInPicture
              onEnded={next}
              aria-label={`${item.title} demo`}
              aria-hidden={index !== active}
              tabIndex={-1}
            />
          ))}
          {/* Thin dark veil: the clips have light backgrounds, this keeps them in the page's register. */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-background/15" />
        </div>
      </motion.div>

      {/* Clip switcher (toggle buttons) + pause control + progress line for the active clip */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
        <div role="group" aria-label="Featured project demos" className="flex gap-1 rounded-lg border border-border bg-card p-1">
          {items.map((item, index) => {
            const selected = index === active
            return (
              <button
                key={item.slug}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(index)}
                className={cn(
                  "relative overflow-hidden rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  selected ? "text-foreground" : "text-text-2 hover:text-foreground"
                )}
              >
                {selected && (
                  <motion.span
                    layoutId="showcase-tab"
                    aria-hidden="true"
                    className="absolute inset-0 rounded-md border border-border-strong bg-surface"
                    transition={reduceMotion ? { duration: 0 } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
                {selected && canPlay && (
                  <span
                    key={`progress-${active}`}
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-lime"
                    style={{ animation: `progress-x ${item.video.durationSeconds}s linear forwards` }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  <CategoryIcon kind={item.kind} className="h-3.5 w-3.5" />
                  {item.title}
                </span>
              </button>
            )
          })}
        </div>
        {!reduceMotion && (
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            aria-pressed={paused}
            aria-label={paused ? "Play the demo" : "Pause the demo"}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-text-2 transition-colors hover:border-border-strong hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {paused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
          </button>
        )}
        </div>

        <Link
          href={`/projects/${current.slug}`}
          className="group inline-flex items-center gap-1.5 text-sm text-text-2 transition-colors hover:text-foreground"
        >
          Case study
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{label}</p>
    </div>
  )
}
