"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown, Sparkles, Mail } from "lucide-react"
import { AnimatedBackground } from "@/components/animated-background"

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [text, setText] = useState("")
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [mounted, setMounted] = useState(false)
  const fullText = "Hey! I'm Sabaa."

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])
  
  // Keep background opacity constant (don't fade it out)
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [1, 1])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Smooth, natural typewriter effect with variable timing
  useEffect(() => {
    if (!mounted) return
    
    if (text.length < fullText.length) {
      const currentChar = fullText[text.length]
      const nextChar = text.length + 1 < fullText.length ? fullText[text.length + 1] : null
      
      // Variable delays for natural typing rhythm
      let delay = 100 // Base delay for letters
      
      // Faster for spaces
      if (currentChar === ' ') {
        delay = 50
      }
      // Slightly longer pause after punctuation
      else if (currentChar === '!' || currentChar === '.' || currentChar === '?' || currentChar === ',') {
        delay = 200
      }
      // Slightly longer for apostrophes
      else if (currentChar === "'") {
        delay = 80
      }
      // Natural pause between words (space coming next)
      else if (nextChar === ' ') {
        delay = 120
      }
      // Slightly faster for common letters
      else if ('aeiou'.includes(currentChar.toLowerCase())) {
        delay = 90
      }
      
      const timeout = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1))
      }, delay)
      return () => clearTimeout(timeout)
    } else {
      setTimeout(() => setIsTypingComplete(true), 300)
    }
  }, [text, fullText, mounted])

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-secondary/20 dark:from-background dark:via-background dark:to-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 z-0">
        <AnimatedBackground />
      </div>

      <motion.div className="container px-4 md:px-6 relative z-10" style={{ opacity, scale, y }}>
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <motion.div className="space-y-4">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.2,
                type: "spring",
                stiffness: 100,
                damping: 12
              }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 text-sm text-foreground/70 dark:text-primary/80 bg-secondary/50 dark:bg-primary/5 border border-border/50 dark:border-transparent rounded-full backdrop-blur-sm shadow-sm dark:shadow-none">
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ 
                    repeat: Number.POSITIVE_INFINITY, 
                    duration: 2,
                    ease: "easeInOut"
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.span>
                Available for projects in 2026
              </span>
            </motion.div>

            <div className="relative inline-block">
              <motion.h1
                className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-foreground dark:text-primary/90"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  duration: 0.5,
                  delay: 0.1,
                }}
                style={{ 
                  lineHeight: '1.2',
                  minHeight: '1.2em'
                }}
              >
                <span className="inline-block relative" style={{ position: 'relative' }}>
                  {/* Reserve space with invisible full text - prevents layout shift */}
                  <span 
                    className="inline-block opacity-0 pointer-events-none select-none"
                    aria-hidden="true"
                    style={{ 
                      whiteSpace: 'pre',
                      display: 'inline-block',
                      visibility: 'hidden'
                    }}
                  >
                    {fullText}
                  </span>
                  {/* Visible typing text - absolutely positioned to prevent shift */}
                  <span 
                    className="absolute top-0 left-0 inline-block whitespace-pre"
                    style={{ 
                      whiteSpace: 'pre',
                      position: 'absolute',
                      top: 0,
                      left: 0
                    }}
                  >
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {text}
                    </motion.span>
                    {!isTypingComplete && (
                      <motion.span
                        className="inline-block w-[2px] h-[1em] bg-foreground/60 dark:bg-primary/70 ml-0.5"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ 
                          repeat: Number.POSITIVE_INFINITY, 
                          duration: 0.7,
                          ease: "easeInOut"
                        }}
                        style={{ 
                          verticalAlign: 'middle',
                          display: 'inline-block'
                        }}
                      />
                    )}
                  </span>
                </span>
              </motion.h1>

              {isTypingComplete && (
                <motion.div
                  className="absolute -z-10 inset-0 blur-xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: [0.05, 0.1, 0.05],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 4,
                    ease: "easeInOut",
                  }}
                >
                  <div className="h-full w-full bg-foreground/5 dark:bg-primary/10 rounded-full" />
                </motion.div>
              )}

              {isTypingComplete && (
                <motion.div
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-foreground/20 dark:via-primary/40 to-transparent rounded-full"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "80%", opacity: 1 }}
                  transition={{ 
                    delay: 0.3, 
                    duration: 1,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                />
              )}
            </div>

            <motion.p
              className="pt-5 mx-auto max-w-[700px] text-muted-foreground md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isTypingComplete ? 1 : 0, y: isTypingComplete ? 0 : 20 }}
              transition={{ 
                duration: 0.6,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              A Front-End Developer dedicated to building seamless, intuitive, and visually engaging user experiences.
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ 
              opacity: isTypingComplete ? 1 : 0, 
              scale: isTypingComplete ? 1 : 0.8,
              y: isTypingComplete ? 0 : 20
            }}
            transition={{ 
              duration: 0.5,
              delay: 0.4,
              type: "spring",
              stiffness: 100,
              damping: 12
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                onClick={scrollToProjects}
                className="rounded-full relative overflow-hidden group bg-foreground dark:bg-primary/80 text-background dark:text-primary-foreground hover:bg-foreground/90 dark:hover:bg-primary/90 shadow-lg dark:shadow-none"
              >
                <span className="relative z-10 flex items-center">
                  Explore Work
                  <motion.span
                    initial={{ y: 0 }}
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

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                asChild
                className="rounded-full relative overflow-hidden group border-2 hover:border-foreground/50 dark:hover:border-primary/50 bg-background/50 dark:bg-background/10 backdrop-blur-sm shadow-lg dark:shadow-none"
              >
                <a href="mailto:sabasiddique001@gmail.com?subject=Let's Connect&body=Hi there,%0AI'd love to connect with you...">
                  <span className="relative z-10 flex items-center">
                    <Mail className="mr-2 h-4 w-4" />
                    Connect with Me
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

          {/*<motion.div*/}
          {/*  initial={{ opacity: 0 }}*/}
          {/*  animate={{ opacity: isTypingComplete ? 0.7 : 0 }}*/}
          {/*  transition={{ delay: 0.5, duration: 1 }}*/}
          {/*  className="absolute bottom-50 left-1/2 -translate-x-1/2"*/}
          {/*>*/}
          {/*  <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}>*/}
          {/*    <ArrowDown className="h-6 w-6 text-muted-foreground" />*/}
          {/*  </motion.div>*/}
          {/*</motion.div>*/}
        </div>
      </motion.div>
    </motion.section>
  )
}
