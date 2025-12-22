"use client"

import { useRef, useEffect, useState, useMemo } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin } from "lucide-react"

const experiences = [
  {
    id: 1,
    role: "Full Stack Developer / UI UX Developer",
    company: "xNerds Solution",
    location: "Remote",
    period: "Aug 2025 - Dec 2025",
    description: "Developed reusable UI libraries and scalable dashboards using React, Next.js, and shadcn/UI. Improved frontend performance by 25% through optimized state management, lazy loading, and streamlined API/CI-CD collaboration.",
    skills: ["React.js", "Next.js", "ShadCN UI", "TypeScript", "State Management", "Lazy Loading", "CI/CD", "Performance Optimization"],
    status: "completed" as const,
  },
  {
    id: 2,
    role: "Software Engineer",
    company: "Devsloop",
    location: "Remote",
    period: "Apr 2025 - Aug 2025",
    description: "Built performant UIs using React, Next.js, and Tailwind; improved load speed by 40% and reduced Figma-to-code time by 30%. Integrated APIs with Axios, handled error states, optimized Redux/Zustand state, and led Git-based CI/CD with 15% fewer rollbacks.",
    skills: ["React.js", "Next.js", "TailwindCSS", "TypeScript", "Axios", "Redux", "Zustand", "CI/CD", "Git"],
    status: "completed" as const,
  },
  {
    id: 3,
    role: "Front End Developer",
    company: "Wanclouds",
    location: "Hybrid (Remote/On-site)",
    period: "Aug 2023 - Apr 2025",
    description: "Developed features for VPC+, SecMon, and WhisperAI; resolved 100+ bugs and boosted dashboard speed by 28%. Improved UX, built reusable UI with MUI/Tailwind, maintained <2% API failure rate, and supported QA across scalable deployments.",
    skills: ["React.js", "Next.js", "TailwindCSS", "MUI", "Node.js", "AI Integration", "Agile"],
    status: "completed" as const,
  },
]

function ExperienceCard({ experience, index, total, scrollYProgress, activeDotIndex }: {
  experience: typeof experiences[0]
  index: number
  total: number
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"]
  activeDotIndex: number
}) {
  const isCurrent = experience.status === "current"
  const cardProgress = useTransform(scrollYProgress, [(index + 0.5) / (total + 2), (index + 1.5) / (total + 2)], [0, 1])
  const titleY = useTransform(cardProgress, [0, 1], [50, -50])
  const opacity = useTransform(cardProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3])
  
  const backgroundColor = useTransform(
    cardProgress,
    [0, 0.5, 1],
    [
      `radial-gradient(circle at center, hsl(var(--primary))/0 0%, transparent 100%)`,
      `radial-gradient(circle at center, hsl(var(--primary))/8 0%, transparent 70%)`,
      `radial-gradient(circle at center, hsl(var(--primary))/0 0%, transparent 100%)`,
    ]
  )

  // Dot should only glow if this is the active dot (based on scroll position)
  // Use useMemo to prevent unnecessary recalculations
  const isDotActive = useMemo(() => activeDotIndex === index, [activeDotIndex, index])

  return (
    <motion.div
      id={`experience-${experience.id}`}
      style={{ opacity, background: backgroundColor }}
      className="w-screen h-screen flex items-center px-6 md:px-12 shrink-0 relative transition-colors duration-500"
    >
      {/* Dot - positioned on the continuous line */}
      <div
        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 chronology-dot ${isDotActive ? 'chronology-dot-active' : ''}`}
        aria-hidden="true"
      />

      <div className="max-w-xl ml-8 md:ml-16">
        <motion.span style={{ y: titleY }} className="text-3xl md:text-4xl lg:text-5xl block mb-4 font-bold">
          {experience.role}
        </motion.span>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-4"
        >
          <Badge 
            variant="secondary" 
            className={`text-sm px-4 py-2 ${
              isCurrent 
                ? "bg-primary/20 text-primary border-primary/30" 
                : "bg-primary/10 text-primary/80 border-primary/20"
            }`}
          >
            {experience.company}
          </Badge>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2 text-sm text-muted-foreground mb-6"
        >
          <CalendarDays className="w-4 h-4" />
          <span>{experience.period}</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed"
        >
          {experience.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-2"
        >
          {experience.skills.map((skill, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.05 }}
              className="px-3 py-1 text-xs bg-white/5 rounded-full text-muted-foreground border border-white/10"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}

function ProgressDot({
  index,
  total,
  scrollYProgress,
}: {
  index: number
  total: number
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"]
}) {
  const scaleX = useTransform(scrollYProgress, [index / (total + 1), (index + 1) / (total + 1)], [0, 1])

  return (
    <div className="w-8 h-1 rounded-full overflow-hidden bg-white/10">
      <motion.div className="h-full bg-primary" style={{ scaleX, transformOrigin: "left" }} />
    </div>
  )
}

export default function JourneyPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [scrollWidth, setScrollWidth] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)
  const [activeDotIndex, setActiveDotIndex] = useState<number>(-1)
  const cardRefs = experiences.map(() => useRef<HTMLDivElement>(null))

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 100,
  })

  const x = useTransform(smoothProgress, [0, 1], ["0%", `-${Math.max(0, scrollWidth - windowWidth)}px`])

  // Determine which dot should be active based on scroll progress
  // Only one dot glows at a time, based on scroll position
  // Use refs and stable thresholds to prevent flickering
  const lastActiveIndexRef = useRef<number>(-1)
  const rafIdRef = useRef<number | null>(null)

  useEffect(() => {
    const updateActiveDot = (latest: number) => {
      const total = experiences.length
      let newActiveIndex = -1

      // Calculate which section we're in based on scroll progress
      // Each experience takes up 1/(total+2) of the scroll
      // Use wider thresholds to prevent rapid switching
      const threshold = 0.03 // 3% threshold for stability
      
      for (let i = 0; i < total; i++) {
        const sectionStart = (i + 1) / (total + 2)
        const sectionEnd = (i + 2) / (total + 2)
        const sectionCenter = (sectionStart + sectionEnd) / 2
        
        // Use center-based detection with threshold to prevent flickering
        if (latest >= sectionCenter - threshold && latest <= sectionCenter + threshold) {
          newActiveIndex = i
          break
        }
        // Fallback: if we're in the section range (with hysteresis)
        if (latest >= sectionStart && latest < sectionEnd) {
          // Only switch if we're past the center or if no dot is currently active
          if (latest >= sectionCenter || lastActiveIndexRef.current === -1) {
            newActiveIndex = i
            break
          }
        }
      }
      
      // If we've scrolled past all experiences, keep the last one active
      if (latest >= (total + 1) / (total + 2)) {
        newActiveIndex = total - 1
      }
      
      // If we're before the first experience, no dot is active
      if (latest < 1 / (total + 2)) {
        newActiveIndex = -1
      }

      // Only update state if the active index actually changed
      // Use ref to persist across renders and prevent unnecessary updates
      if (newActiveIndex !== lastActiveIndexRef.current) {
        lastActiveIndexRef.current = newActiveIndex
        setActiveDotIndex(newActiveIndex)
      }
    }

    // Use requestAnimationFrame for smooth updates, but batch them
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Cancel any pending RAF
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }
      
      // Batch updates using RAF
      rafIdRef.current = requestAnimationFrame(() => {
        updateActiveDot(latest)
        rafIdRef.current = null
      })
    })

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current)
      }
      unsubscribe()
    }
  }, [scrollYProgress, experiences.length])

  useEffect(() => {
    const updateDimensions = () => {
      if (scrollRef.current) {
        setScrollWidth(scrollRef.current.scrollWidth)
      }
      setWindowWidth(window.innerWidth)
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  if (prefersReducedMotion) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-4 md:px-6">
        <div className="container max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/#experience">
              <Button variant="ghost">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
          <div className="space-y-16">
            {experiences.map((experience) => (
              <div key={experience.id} className="relative pl-8">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-primary/20" />
                <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-primary" />
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{experience.role}</h3>
                    <p className="text-lg text-primary mb-2">{experience.company}</p>
                    <p className="text-sm text-muted-foreground">{experience.period}</p>
                  </div>
                  <p className="text-muted-foreground">{experience.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {experience.skills.map((skill) => (
                      <span key={skill} className="px-3 py-1 text-xs bg-white/5 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="fixed top-6 left-6 z-50">
        <Link href="/#experience">
          <Button variant="ghost" className="bg-background/80 backdrop-blur-sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      <div ref={containerRef} className="h-[400vh] relative">
        {/* Continuous vertical timeline line */}
        <div className="fixed left-0 top-0 bottom-0 w-px overflow-hidden z-0">
          {/* Static background line */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
          
          {/* Animated shiny line that grows */}
          <motion.div
            className="absolute top-0 left-0 w-full"
            style={{
              height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary to-primary/50" />
          </motion.div>
          
          {/* Glowing dot that travels down */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full"
            style={{
              top: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
              boxShadow: "0 0 20px hsl(var(--primary)), 0 0 40px hsl(var(--primary))",
            }}
          />
        </div>

        <div className="sticky top-0 h-screen overflow-hidden flex items-center pt-20">
          <motion.div ref={scrollRef} style={{ x }} className="flex gap-0">
            <div className="w-screen h-screen flex items-center justify-center px-6 md:px-12 shrink-0">
              <div className="max-w-2xl">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-sm text-primary uppercase tracking-wider"
                >
                  The Journey
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl sm:text-5xl md:text-6xl mt-3 mb-6 font-bold"
                >
                  Professional
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                    Experience
                  </span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg text-muted-foreground"
                >
                  Scroll to explore my career journey and the companies I&apos;ve worked with.
                </motion.p>
              </div>
            </div>

            {experiences.map((experience, index) => (
              <div key={experience.id} ref={cardRefs[index]}>
                <ExperienceCard
                  experience={experience}
                  index={index}
                  total={experiences.length}
                  scrollYProgress={scrollYProgress}
                  activeDotIndex={activeDotIndex}
                />
              </div>
            ))}

            <div className="w-screen h-screen flex items-center justify-center px-6 md:px-12 shrink-0">
              <div className="text-center max-w-xl">
                <h2 className="text-3xl md:text-4xl mb-6 font-bold">The journey continues...</h2>
                <p className="text-muted-foreground text-lg">
                  Every day brings new challenges and opportunities to grow. What will the next chapter hold?
                </p>
              </div>
            </div>
          </motion.div>

          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-50">
            {experiences.map((_, i) => (
              <ProgressDot key={i} index={i} total={experiences.length} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


