"use client"

import { Fragment, useEffect, useState } from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CountUp } from "@/components/count-up"
import { site } from "@/constants/site"

const EASE = [0.16, 1, 0.3, 1] as const

/** Seconds after the buttons before the stats row appears when it is on screen at load. */
const STATS_LOAD_DELAY = 0.6
/** Past this point the stats row counts as scroll-revealed and plays without the load delay. */
const LOAD_WINDOW_MS = 1000

/**
 * Name, role, intro, buttons and the stats row. Everything fades up top to bottom on load;
 * the stats count up once their row is in view.
 * Framer's `useReducedMotion` only drives transitions here (never markup), so the server HTML and
 * the first client render stay identical while reduced motion still gets duration 0 from the first frame.
 */
export function HeroSection() {
  const reduceMotion = useReducedMotion()
  const words = site.name.split(" ")

  // Set once the load sequence is over, so a later scroll-reveal of the stats row is not delayed.
  const [loadWindowOver, setLoadWindowOver] = useState(false)
  useEffect(() => {
    const timer = window.setTimeout(() => setLoadWindowOver(true), LOAD_WINDOW_MS)
    return () => window.clearTimeout(timer)
  }, [])

  // null until the stats row enters view; then the delay the count was started with (frozen so it never restarts).
  const [countDelay, setCountDelay] = useState<number | null>(null)
  const statsDelay = loadWindowOver ? 0 : STATS_LOAD_DELAY

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: reduceMotion ? { duration: 0 } : { duration: 0.4, delay, ease: EASE },
  })

  return (
    <section id="home" className="container pb-12 pt-16 md:pb-[72px] md:pt-24">
      <div className="mx-auto max-w-[880px] text-center">
        <h1 className="text-[40px] font-semibold leading-[1.05] md:text-[56px]">
          {words.map((word, i) => (
            <Fragment key={`${word}-${i}`}>
              {/* The space stays a plain text node so the heading reads as one name. */}
              {i > 0 && " "}
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.4, delay: i * 0.04, ease: EASE }}
              >
                {word}
              </motion.span>
            </Fragment>
          ))}
        </h1>

        <motion.h2 className="mt-3 text-lg font-medium leading-7 text-text-2" {...fadeUp(0.3)}>
          {site.role}
        </motion.h2>

        <motion.p
          className="mx-auto mt-5 max-w-[620px] text-left text-[15px] leading-relaxed text-muted-foreground"
          {...fadeUp(0.4)}
        >
          {site.hero.intro}
        </motion.p>

        <motion.div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center" {...fadeUp(0.5)}>
          <Button asChild>
            <Link href={site.hero.primaryCta.href}>{site.hero.primaryCta.label}</Link>
          </Button>
          <Button asChild variant="outline">
            <a href={site.hero.secondaryCta.href}>
              {site.hero.secondaryCta.label}
              <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          onViewportEnter={() => setCountDelay((current) => current ?? statsDelay)}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.4, delay: statsDelay, ease: EASE }}
        >
          {/* Slightly wider than the text block from lg up so "Project Lead" fits on one line at 32px. */}
          <dl className="mt-10 grid grid-cols-2 gap-y-8 md:grid-cols-4 md:divide-x md:divide-border lg:-mx-12">
            {site.hero.stats.map(({ value, label }) => (
              // Bottom-aligned so a wrapping value ("Project Lead" on phones) keeps the labels on one line.
              <div key={label} className="flex flex-col justify-end px-4 md:px-6">
                <dt className="order-2 mt-2 text-xs text-muted-foreground">{label}</dt>
                <dd className="order-1 text-[32px] font-semibold leading-none text-foreground lg:whitespace-nowrap">
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
