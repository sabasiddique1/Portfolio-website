"use client"

import { Fragment, useEffect, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CountUp } from "@/components/count-up"
import { GridBackground } from "@/components/fx/grid-background"
import { HeroShowcase, type ShowcaseItem } from "@/components/hero-showcase"
import { site } from "@/constants/site"
import { useReducedMotion as useReducedMotionSafe } from "@/hooks/use-reduced-motion"

const EASE = [0.16, 1, 0.3, 1] as const

/** Seconds after the buttons before the stats row appears when it is on screen at load. */
const STATS_LOAD_DELAY = 0.7
/** Past this point the stats row counts as scroll-revealed and plays without the load delay. */
const LOAD_WINDOW_MS = 1200
/** Milliseconds each focus word stays before the next one rolls in. */
const FOCUS_INTERVAL_MS = 2600

interface HeroSectionProps {
  /** Featured projects that carry a video loop, for the showcase frame. */
  showcase: ShowcaseItem[]
}

/**
 * Two columns from lg up: name, role, a rolling focus word, intro, buttons and the stats row on the
 * left; the video showcase frame on the right. Stacked on smaller screens. Everything fades up top
 * to bottom on load; the stats count up once their row is in view.
 * Framer's `useReducedMotion` only drives transitions here (never markup), so the server HTML and
 * the first client render stay identical while reduced motion still gets duration 0 from the first frame.
 */
export function HeroSection({ showcase }: HeroSectionProps) {
  const reduceMotion = useReducedMotion()
  const reduceMotionSafe = useReducedMotionSafe()
  const words = site.name.split(" ")

  // Set once the load sequence is over, so a later scroll-reveal of the stats row is not delayed.
  const [loadWindowOver, setLoadWindowOver] = useState(false)
  useEffect(() => {
    const timer = window.setTimeout(() => setLoadWindowOver(true), LOAD_WINDOW_MS)
    return () => window.clearTimeout(timer)
  }, [])

  // The focus word under the role rolls through site.hero.focus; it holds still under reduced motion.
  const [focusIndex, setFocusIndex] = useState(0)
  useEffect(() => {
    if (reduceMotionSafe) return
    const timer = window.setInterval(() => setFocusIndex((index) => (index + 1) % site.hero.focus.length), FOCUS_INTERVAL_MS)
    return () => window.clearInterval(timer)
  }, [reduceMotionSafe])

  // null until the stats row enters view; then the delay the count was started with (frozen so it never restarts).
  const [countDelay, setCountDelay] = useState<number | null>(null)
  const statsDelay = loadWindowOver ? 0 : STATS_LOAD_DELAY

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: reduceMotion ? { duration: 0 } : { duration: 0.5, delay, ease: EASE },
  })

  return (
    <section id="home" className="grain relative overflow-hidden">
      <GridBackground aurora />

      <div className="container pb-16 pt-14 md:pb-24 md:pt-24">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-12">
          <div className="max-w-[640px]">
            <motion.p
              className="mb-5 inline-flex items-center gap-2 rounded-md border border-border bg-card/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-text-2"
              {...fadeUp(0)}
            >
              <span aria-hidden="true" className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-lime motion-safe:animate-pulse-ring" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
              </span>
              {site.location}
            </motion.p>

            <h1 className="text-5xl font-semibold tracking-[-0.03em] text-foreground md:text-6xl lg:text-7xl">
              {words.map((word, i) => (
                <Fragment key={`${word}-${i}`}>
                  {/* The space stays a plain text node so the heading reads as one name. */}
                  {i > 0 && " "}
                  <motion.span
                    className="inline-block will-change-transform"
                    initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={reduceMotion ? { duration: 0 } : { duration: 0.7, delay: 0.05 + i * 0.08, ease: EASE }}
                  >
                    {word}
                  </motion.span>
                </Fragment>
              ))}
            </h1>

            <motion.h2 className="mt-4 text-xl font-medium text-text-2 md:text-2xl" {...fadeUp(0.3)}>
              {site.role}
              <span aria-hidden="true" className="mx-3 text-border-strong">
                /
              </span>
              {/* Rolling focus word: a visual cue for what the work is about. Decorative for assistive tech (the static list follows). */}
              <span className="relative inline-grid overflow-hidden align-bottom text-lime" aria-hidden="true">
                {/* Every word is laid out invisibly in the same cell, so the slot is always as wide as the longest one and nothing below it shifts. */}
                {site.hero.focus.map((word) => (
                  <span key={word} className="invisible col-start-1 row-start-1 whitespace-nowrap">
                    {word}
                  </span>
                ))}
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={site.hero.focus[focusIndex]}
                    className="col-start-1 row-start-1 inline-block whitespace-nowrap"
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-110%", opacity: 0 }}
                    transition={reduceMotion ? { duration: 0 } : { duration: 0.5, ease: EASE }}
                  >
                    {site.hero.focus[focusIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="sr-only">{site.hero.focus.join(", ")}</span>
            </motion.h2>

            <motion.p className="mt-6 max-w-[600px] text-base leading-relaxed text-text-2 md:text-lg" {...fadeUp(0.4)}>
              {site.hero.intro}
            </motion.p>

            <motion.div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center" {...fadeUp(0.5)}>
              <Button asChild size="lg" className="group">
                <Link href={site.hero.primaryCta.href}>
                  {site.hero.primaryCta.label}
                  <ArrowRight className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={site.hero.secondaryCta.href}>
                  {site.hero.secondaryCta.label}
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </Button>
            </motion.div>

          </div>

          <motion.div
            className="relative lg:pl-4"
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.35, ease: EASE }}
          >
            <HeroShowcase items={showcase} label={site.hero.showcaseLabel} />
          </motion.div>
        </div>

        {/* Stats row: full width under both columns so the numbers get room at 40px. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          onViewportEnter={() => setCountDelay((current) => current ?? statsDelay)}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.5, delay: statsDelay, ease: EASE }}
        >
          <dl className="mt-14 grid grid-cols-2 gap-y-8 border-t border-border pt-8 md:mt-20 md:grid-cols-4 md:divide-x md:divide-border">
            {site.hero.stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col justify-end md:px-8 md:first:pl-0">
                <dt className="order-2 mt-2 text-sm text-muted-foreground">{label}</dt>
                <dd className="order-1 whitespace-nowrap text-[28px] font-semibold leading-none tracking-tight text-foreground sm:text-3xl md:text-4xl">
                  <CountUp value={value} start={countDelay !== null} delay={countDelay ?? 0} />
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  )
}
