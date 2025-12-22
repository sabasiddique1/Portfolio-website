"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { CalendarDays, MapPin, Briefcase } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { Badge } from "@/components/ui/badge"

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

function ExperienceCard({ experience, index, total, scrollYProgress }: {
  experience: typeof experiences[0]
  index: number
  total: number
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"]
}) {
  const isCurrent = experience.status === "current"
  const cardProgress = useTransform(scrollYProgress, [(index + 0.5) / (total + 2), (index + 1.5) / (total + 2)], [0, 1])
  const titleY = useTransform(cardProgress, [0, 1], [50, -50])
  const opacity = useTransform(cardProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3])
  
  // Background color based on card progress - creates a glow effect when card is in focus
  const backgroundColor = useTransform(
    cardProgress,
    [0, 0.5, 1],
    [
      `radial-gradient(circle at center, hsl(var(--primary))/0 0%, transparent 100%)`,
      `radial-gradient(circle at center, hsl(var(--primary))/8 0%, transparent 70%)`,
      `radial-gradient(circle at center, hsl(var(--primary))/0 0%, transparent 100%)`,
    ]
  )

  return (
    <motion.div
      id={`experience-${experience.id}`}
      style={{ opacity, background: backgroundColor }}
      className="w-screen h-screen flex items-center px-6 md:px-12 shrink-0 relative transition-colors duration-500"
    >
      {/* Glowing neon line - appears for all experiences */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 h-[50%] w-px"
        style={{
          background: "linear-gradient(180deg, transparent, hsl(var(--primary)), hsl(var(--primary)), transparent)",
          boxShadow: "0 0 20px hsl(var(--primary)), 0 0 40px hsl(var(--primary))",
        }}
      />

      {/* Status indicator - appears for all experiences */}
      <div
        className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
        style={{
          background: "hsl(var(--primary))",
          boxShadow: "0 0 20px hsl(var(--primary))",
        }}
      />

      <div className="max-w-xl ml-8 md:ml-16">
        <motion.span style={{ y: titleY }} className="text-3xl md:text-4xl lg:text-5xl block mb-4 font-bold">
          {experience.role}
        </motion.span>

        {/* Company name as highlighted tag */}
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

        {/* Period */}
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

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2 text-muted-foreground mb-6"
        >
          <MapPin className="w-4 h-4" />
          <span>{experience.location}</span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed"
        >
          {experience.description}
        </motion.p>

        {/* Skills */}
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

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [scrollWidth, setScrollWidth] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 100,
  })

  const x = useTransform(smoothProgress, [0, 1], ["0%", `-${Math.max(0, scrollWidth - windowWidth)}px`])

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

  // For reduced motion, use vertical scroll instead
  if (prefersReducedMotion) {
    return (
      <section id="experience" ref={sectionRef} className="py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto space-y-16">
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
      </section>
    )
  }

  return (
    <section id="experience" ref={sectionRef} className="relative">

      <div ref={containerRef} className="h-[400vh] relative">
        {/* Background color changer based on scroll */}
        <motion.div
          className="fixed inset-0 -z-10"
          style={{
            background: useTransform(
              scrollYProgress,
              [0, 0.25, 0.5, 0.75, 1],
              [
                "radial-gradient(circle at 20% 50%, hsl(var(--primary))/5 0%, transparent 50%)",
                "radial-gradient(circle at 50% 50%, hsl(var(--primary))/10 0%, transparent 50%)",
                "radial-gradient(circle at 80% 50%, hsl(var(--secondary))/10 0%, transparent 50%)",
                "radial-gradient(circle at 50% 50%, hsl(var(--primary))/5 0%, transparent 50%)",
                "radial-gradient(circle at 20% 50%, hsl(var(--primary))/5 0%, transparent 50%)",
              ]
            ),
          }}
        />

        {/* Sticky horizontal scroll container */}
        <div className="sticky top-0 h-screen overflow-hidden flex items-center pt-20">
          <motion.div ref={scrollRef} style={{ x }} className="flex gap-0">
            {/* Intro section */}
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

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-12 flex items-center gap-3 text-muted-foreground"
                >
                  <div className="w-12 h-px bg-white/20" />
                  <span className="text-sm">Scroll to explore</span>
                </motion.div>
              </div>
            </div>

            {/* Experience cards */}
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                index={index}
                total={experiences.length}
                scrollYProgress={scrollYProgress}
              />
            ))}

            {/* End section */}
            <div className="w-screen h-screen flex items-center justify-center px-6 md:px-12 shrink-0">
              <div className="text-center max-w-xl">
                <h2 className="text-3xl md:text-4xl mb-6 font-bold">The journey continues...</h2>
                <p className="text-muted-foreground text-lg">
                  Every day brings new challenges and opportunities to grow. What will the next chapter hold?
                </p>
              </div>
            </div>
          </motion.div>

          {/* Progress indicator */}
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-50">
            {experiences.map((_, i) => (
              <ProgressDot key={i} index={i} total={experiences.length} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
