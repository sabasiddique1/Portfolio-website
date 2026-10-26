"use client"

import { createRef, memo, useCallback, useEffect, useMemo, useRef, useState, type RefObject } from "react"
import { motion, useInView, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion"
import { ArrowUpRight, ChevronDown, Route } from "lucide-react"
import { journey, type JourneyStep } from "@/constants/journey"
import { site } from "@/constants/site"
import { CategoryIcon } from "@/components/category-icon"
import { Chip } from "@/components/chip"
import { SectionReveal } from "@/components/section-reveal"
import { SectionTitle } from "@/components/section-title"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

type Point = { x: number; y: number }
type Side = "left" | "right"

/** Desktop centre column width; must match `md:grid-cols-[1fr_48px_1fr]` below. */
const SPINE_COLUMN = 48
/** Desktop nodes sit ±14px off the centre line so the spine visibly zigzags. */
const NODE_OFFSET = 14
/** Mobile spine x: the middle of the 24px left column (`grid-cols-[24px_1fr]`). */
const MOBILE_SPINE_X = 12
const DESKTOP_QUERY = "(min-width: 768px)"
const EASE_OUT = [0.16, 1, 0.3, 1] as const

const round = (n: number) => Math.round(n * 10) / 10

/** `M` to the first node, then one cubic per hop with vertical tangents (d = half the vertical gap). */
function buildPath(points: Point[]): string {
  if (points.length === 0) return ""
  let d = `M ${round(points[0].x)} ${round(points[0].y)}`
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]
    const next = points[i]
    const dy = (next.y - prev.y) / 2
    d += ` C ${round(prev.x)} ${round(prev.y + dy)}, ${round(next.x)} ${round(next.y - dy)}, ${round(next.x)} ${round(next.y)}`
  }
  return d
}

function samePoints(a: Point[], b: Point[]) {
  return a.length === b.length && a.every((p, i) => p.x === b[i].x && p.y === b[i].y)
}

/** Length of one spine hop (the same cubic `buildPath` draws), sampled; no DOM needed. */
function hopLength(prev: Point, next: Point, samples = 24): number {
  const dy = (next.y - prev.y) / 2
  const c1 = { x: prev.x, y: prev.y + dy }
  const c2 = { x: next.x, y: next.y - dy }
  let length = 0
  let last = prev
  for (let i = 1; i <= samples; i++) {
    const t = i / samples
    const mt = 1 - t
    const point = {
      x: mt ** 3 * prev.x + 3 * mt ** 2 * t * c1.x + 3 * mt * t ** 2 * c2.x + t ** 3 * next.x,
      y: mt ** 3 * prev.y + 3 * mt ** 2 * t * c1.y + 3 * mt * t ** 2 * c2.y + t ** 3 * next.y,
    }
    length += Math.hypot(point.x - last.x, point.y - last.y)
    last = point
  }
  return length
}

/** Each node's position along the spine as a 0–1 fraction of its total length. */
function nodeFractions(points: Point[]): number[] {
  if (points.length < 2) return points.map(() => 0)
  const cumulative = [0]
  for (let i = 1; i < points.length; i++) cumulative.push(cumulative[i - 1] + hopLength(points[i - 1], points[i]))
  const total = cumulative[cumulative.length - 1] || 1
  return cumulative.map((length) => length / total)
}

const sideOf = (index: number): Side => (index % 2 === 0 ? "left" : "right")

/**
 * "From frontend to AI": a vertical zigzag timeline. Cards alternate sides on desktop and stack on
 * mobile; an SVG spine draws itself as you scroll and each node lights up once its card is in view.
 * Node positions are measured after mount (and on resize), so the server HTML and the first client
 * render carry an empty path and no dots.
 */
export function JourneyPath() {
  const reduceMotion = useReducedMotion()
  const wrapperRef = useRef<HTMLDivElement>(null)
  // One stable ref per card, shared by the card (entrance) and its node (lit state) and the measurer.
  const [cardRefs] = useState(() => journey.map(() => createRef<HTMLLIElement>()))
  const [nodes, setNodes] = useState<Point[]>([])
  // Desktop variant on the first render (matches the server); flips to mobile in an effect.
  const [isDesktop, setIsDesktop] = useState(true)
  // One step open at a time; null = all collapsed.
  const [openId, setOpenId] = useState<string | null>(null)
  const toggle = useCallback((id: string) => setOpenId((prev) => (prev === id ? null : id)), [])

  // Spine draw: scroll progress through the wrapper, smoothed; fully drawn under reduced motion.
  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ["start 75%", "end 60%"] })
  const spring = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.5 })
  const pathLength = useTransform(spring, (v) => (reduceMotion ? 1 : v))

  // Nodes light up as the spine's drawn end reaches them (latched), so the dots and the line agree.
  const fractions = useMemo(() => nodeFractions(nodes), [nodes])
  const [litCount, setLitCount] = useState(0)
  const updateLit = useCallback(
    (drawn: number) => {
      const reached = fractions.filter((fraction) => fraction <= drawn + 0.02).length
      setLitCount((prev) => Math.max(prev, reached))
    },
    [fractions]
  )
  useMotionValueEvent(pathLength, "change", updateLit)
  useEffect(() => updateLit(pathLength.get()), [updateLit, pathLength])

  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY)
    const update = () => setIsDesktop(mql.matches)
    update()
    mql.addEventListener("change", update)
    return () => mql.removeEventListener("change", update)
  }, [])

  // Node points relative to the wrapper. Layout offsets (not bounding rects) so the cards' own
  // entrance and hover transforms never shift the spine.
  const measure = useCallback(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    const desktop = window.matchMedia(DESKTOP_QUERY).matches
    const next: Point[] = []
    cardRefs.forEach((ref, index) => {
      const card = ref.current
      if (!card) return
      const y = card.offsetTop + card.offsetHeight / 2
      if (!desktop) {
        next.push({ x: MOBILE_SPINE_X, y })
        return
      }
      const half = SPINE_COLUMN / 2
      const x =
        sideOf(index) === "left"
          ? card.offsetLeft + card.offsetWidth + half - NODE_OFFSET
          : card.offsetLeft - half + NODE_OFFSET
      next.push({ x, y })
    })
    setNodes((prev) => (samePoints(prev, next) ? prev : next))
  }, [cardRefs])

  useEffect(() => {
    measure()
    const wrapper = wrapperRef.current
    const observer =
      wrapper && typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => measure()) : null
    observer?.observe(wrapper as HTMLDivElement)
    window.addEventListener("resize", measure)
    return () => {
      observer?.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [measure])

  return (
    <section id="journey" className="container py-12 md:py-[72px]">
      <SectionReveal>
        <SectionTitle
          title="From frontend to AI"
          icon={Route}
          iconClassName="text-tone-green-text"
          subtitle={site.sections.journey}
        />
      </SectionReveal>

      <div ref={wrapperRef} className="relative">
        <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
          <motion.path
            d={buildPath(nodes)}
            fill="none"
            stroke="currentColor"
            className="text-border-strong"
            strokeWidth={1.5}
            strokeLinecap="round"
            pathLength={1}
            style={{ pathLength }}
          />
        </svg>

        {journey.map((step, index) => (
          <JourneyNode key={step.id} point={nodes[index]} lit={index < litCount} />
        ))}

        {/* role="list": preflight's list-style:none would otherwise drop the list semantics in WebKit. */}
        <ol role="list" className="grid grid-cols-[24px_1fr] gap-y-6 md:grid-cols-[1fr_48px_1fr]">
          {journey.map((step, index) => (
            <JourneyCard
              key={step.id}
              step={step}
              index={index}
              cardRef={cardRefs[index]}
              open={openId === step.id}
              onToggle={toggle}
              isDesktop={isDesktop}
              reduceMotion={reduceMotion}
            />
          ))}
        </ol>
      </div>
    </section>
  )
}

interface JourneyNodeProps {
  point?: Point
  lit: boolean
}

/** 10px dot on the spine; border-strong at rest, lime once the drawn spine has reached it. */
function JourneyNode({ point, lit }: JourneyNodeProps) {
  if (!point) return null

  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-300",
        lit ? "bg-lime" : "bg-border-strong"
      )}
      style={{ left: point.x, top: point.y }}
    />
  )
}

interface JourneyCardProps {
  step: JourneyStep
  index: number
  cardRef: RefObject<HTMLLIElement | null>
  open: boolean
  onToggle: (id: string) => void
  isDesktop: boolean
  reduceMotion: boolean
}

const linkChipClass = "gap-1 transition-colors hover:border-border-strong hover:text-foreground"

/**
 * One timeline card. The outer `motion.li` only places the card and plays the entrance (framer
 * leaves an inline transform on it, so the hover lift lives on the inner surface). The whole header
 * toggles; the real control is the button inside the heading. The panel is always mounted.
 */
const JourneyCard = memo(function JourneyCard({
  step,
  index,
  cardRef,
  open,
  onToggle,
  isDesktop,
  reduceMotion,
}: JourneyCardProps) {
  const side = sideOf(index)
  const inView = useInView(cardRef, { once: true, amount: 0.3 })
  const panelId = `journey-${step.id}-panel`
  const year = step.period.match(/\d{4}/)?.[0]
  const details = step.details ?? []
  const links = step.links ?? []
  const chips = step.chips ?? []
  const hasExtras = details.length > 0 || links.length > 0 || Boolean(step.footnote)
  // Hidden-state swaps (desktop → mobile variant) are instant; only the reveal itself animates.
  const animated = inView && !reduceMotion
  const hidden = isDesktop
    ? { opacity: 0, x: side === "left" ? -24 : 24, y: 0 }
    : { opacity: 0, x: 0, y: 16 }
  const panelTransition = reduceMotion ? { duration: 0 } : { duration: 0.25, ease: EASE_OUT }

  const heading = (
    <>
      <span>{step.title}</span>
      {hasExtras && (
        <ChevronDown
          className={cn(
            "mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300",
            open && "rotate-180"
          )}
          aria-hidden="true"
        />
      )}
    </>
  )

  return (
    <motion.li
      ref={cardRef}
      className={cn(
        "col-start-2 w-full md:max-w-[440px]",
        side === "left" ? "md:col-start-1 md:justify-self-end" : "md:col-start-3 md:justify-self-start"
      )}
      style={{ gridRow: index + 1 }}
      initial={false}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : hidden}
      transition={animated ? { duration: 0.45, ease: EASE_OUT } : { duration: 0 }}
    >
      <div
        className={cn(
          "rounded-lg border border-border bg-card p-5 transition-[transform,border-color] duration-150 motion-safe:hover:-translate-y-0.5 hover:border-border-strong",
          open && "border-border-strong"
        )}
      >
        {/* A click anywhere in the header toggles; the button's keyboard activation bubbles here too. */}
        <div className={hasExtras ? "cursor-pointer" : undefined} onClick={hasExtras ? () => onToggle(step.id) : undefined}>
          <div className="flex items-center justify-between gap-3">
            <CategoryIcon kind={step.kind} />
            {year && (
              <span className="rounded-md bg-lime-soft px-2 py-0.5 text-[11px] font-medium leading-4 text-lime">
                {year}
              </span>
            )}
          </div>

          <h3 className="mt-3 text-[15px] font-semibold">
            {hasExtras ? (
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                className="flex w-full items-start justify-between gap-3 rounded-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
              >
                {heading}
              </button>
            ) : (
              heading
            )}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{step.summary}</p>
          <p className="mt-1 text-[11px] text-muted-foreground">{step.period}</p>

          {chips.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {chips.map((chip, i) => (
                <motion.span
                  key={chip}
                  className="inline-flex"
                  initial={false}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
                  transition={animated ? { duration: 0.3, delay: i * 0.03, ease: EASE_OUT } : { duration: 0 }}
                >
                  <Chip>{chip}</Chip>
                </motion.span>
              ))}
            </div>
          )}
        </div>

        {hasExtras && (
          <motion.div
            id={panelId}
            initial={false}
            animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
            transition={panelTransition}
            className="overflow-hidden"
            aria-hidden={!open}
            inert={!open}
          >
            <div className="mt-4 space-y-3 border-t border-border pt-4">
              {details.map((text) => (
                <p key={text} className="text-sm text-muted-foreground">
                  {text}
                </p>
              ))}

              {links.length > 0 && (
                <ul className="flex flex-wrap gap-1.5">
                  {links.map((link) => (
                    <li key={link.url}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex">
                        <Chip className={linkChipClass}>
                          {link.label}
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </Chip>
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              {step.footnote && <p className="text-xs text-muted-foreground">{step.footnote}</p>}
            </div>
          </motion.div>
        )}
      </div>
    </motion.li>
  )
})
