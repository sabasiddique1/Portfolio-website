"use client"

import { Fragment, useRef, useState } from "react"
import { motion, steps, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion"
import { ArrowDown, Mail, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedBackground } from "@/components/animated-background"
import { mailto, site } from "@/constants/site"

/** Headline reveal: one clip-path step per character. */
const CHAR_SECONDS = 0.06
const HEADLINE_DELAY = 0.4
const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Each word is revealed on its own so the effect still reads left-to-right when the headline wraps.
const headlineWords = site.hero.h1.split(" ").map((word, i, words) => {
  const charsBefore = words.slice(0, i).reduce((sum, w) => sum + w.length + 1, 0)
  return {
    word,
    delay: HEADLINE_DELAY + charsBefore * CHAR_SECONDS,
    duration: word.length * CHAR_SECONDS,
    ease: steps(word.length, "end"),
  }
})

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const [typingDone, setTypingDone] = useState(false)
  // With reduced motion everything is shown at once instead of waiting for the headline.
  const revealed = typingDone || !!reduceMotion

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], reduceMotion ? [1, 1] : [1, 0.9])
  const y = useTransform(scrollYProgress, [0, 0.5], reduceMotion ? [0, 0] : [0, 100])

  const chipList: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.08,
        delayChildren: reduceMotion ? 0 : 0.15,
      },
    },
  }

  const chipItem: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.35, ease: EASE_OUT },
    },
  }

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" })
  }

  return (
    <motion.section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-secondary/20 dark:from-background dark:via-background dark:to-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.8 }}
    >
      <div className="absolute inset-0 z-0">
        <AnimatedBackground />
      </div>

      <motion.div className="container px-4 md:px-6 relative z-10" style={{ opacity, scale, y }}>
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-4">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.6, delay: 0.2, type: "spring", stiffness: 100, damping: 12 }
              }
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 text-sm text-foreground/70 dark:text-primary/80 bg-secondary/50 dark:bg-primary/5 border border-border/50 dark:border-transparent rounded-full backdrop-blur-sm shadow-sm dark:shadow-none">
                <motion.span
                  aria-hidden="true"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.span>
                {site.hero.badge}
              </span>
            </motion.div>

            <div className="relative inline-block">
              {/* The full headline is in the DOM from the first render; the clip-path only hides it until typed. */}
              <h1
                className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-foreground dark:text-primary/90"
                style={{ lineHeight: 1.2 }}
              >
                {headlineWords.map(({ word, delay, duration, ease }, i) => (
                  <Fragment key={`${i}-${word}`}>
                    {i > 0 && " "}
                    <motion.span
                      className="inline-block"
                      initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
                      animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                      transition={reduceMotion ? { duration: 0 } : { delay, duration, ease }}
                      onAnimationComplete={i === headlineWords.length - 1 ? () => setTypingDone(true) : undefined}
                    >
                      {word}
                    </motion.span>
                  </Fragment>
                ))}
              </h1>

              <motion.div
                aria-hidden="true"
                className="absolute -z-10 inset-0 blur-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  revealed
                    ? reduceMotion
                      ? { opacity: 0.08, scale: 1 }
                      : { opacity: [0.05, 0.1, 0.05], scale: [1, 1.05, 1] }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={
                  revealed && !reduceMotion
                    ? { repeat: Number.POSITIVE_INFINITY, duration: 4, ease: "easeInOut" }
                    : { duration: 0 }
                }
              >
                <div className="h-full w-full bg-foreground/5 dark:bg-primary/10 rounded-full" />
              </motion.div>

              <motion.div
                aria-hidden="true"
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-foreground/20 dark:via-primary/40 to-transparent rounded-full"
                initial={{ width: 0, opacity: 0 }}
                animate={revealed ? { width: "80%", opacity: 1 } : { width: 0, opacity: 0 }}
                transition={{
                  delay: revealed && !reduceMotion ? 0.3 : 0,
                  duration: reduceMotion ? 0 : 1,
                  ease: EASE_OUT,
                }}
              />
            </div>

            <motion.p
              className="pt-5 mx-auto max-w-[700px] text-lg md:text-xl font-semibold tracking-tight text-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: reduceMotion ? 0 : 0.6,
                delay: revealed && !reduceMotion ? 0.2 : 0,
                ease: EASE_OUT,
              }}
            >
              {site.hero.line}
            </motion.p>

            <motion.p
              className="mx-auto max-w-[640px] text-muted-foreground md:text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: reduceMotion ? 0 : 0.6,
                delay: revealed && !reduceMotion ? 0.3 : 0,
                ease: EASE_OUT,
              }}
            >
              {site.hero.subline}
            </motion.p>

            {/* Proof chips stagger in once the headline has finished. */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-2 pt-2"
              variants={chipList}
              initial="hidden"
              animate={revealed ? "visible" : "hidden"}
            >
              {site.hero.chips.map((chip) => (
                <motion.span
                  key={chip}
                  variants={chipItem}
                  className="rounded-full border border-border/50 bg-muted/30 px-3 py-1.5 text-xs md:text-sm text-muted-foreground"
                >
                  {chip}
                </motion.span>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={revealed ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.5, delay: 0.5, type: "spring", stiffness: 100, damping: 12 }
            }
          >
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                onClick={scrollToProjects}
                className="rounded-full relative overflow-hidden group bg-foreground dark:bg-primary/80 text-background dark:text-primary-foreground hover:bg-foreground/90 dark:hover:bg-primary/90 shadow-lg dark:shadow-none"
              >
                <span className="relative z-10 flex items-center">
                  Explore Work
                  <motion.span
                    aria-hidden="true"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                    className="ml-2"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </motion.span>
                </span>
                <motion.span
                  className="absolute inset-0 bg-foreground/10 dark:bg-primary/20 z-0"
                  initial={{ scale: 0, borderRadius: "100%" }}
                  whileHover={{ scale: 1.5, borderRadius: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="rounded-full relative overflow-hidden group border-2 hover:border-foreground/50 dark:hover:border-primary/50 bg-background/50 dark:bg-background/10 backdrop-blur-sm shadow-lg dark:shadow-none"
              >
                <a href={mailto}>
                  <span className="relative z-10 flex items-center">
                    <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
                    Email me
                  </span>
                  <motion.span
                    className="absolute inset-0 bg-foreground/5 dark:bg-primary/10 z-0"
                    initial={{ scale: 0, borderRadius: "100%" }}
                    whileHover={{ scale: 1.5, borderRadius: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  )
}
