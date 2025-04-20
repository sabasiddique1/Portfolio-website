"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import { AnimatedBackground } from "@/components/animated-background"

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [text, setText] = useState("")
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const fullText = "Hey! I'm Sabaa."

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  // Typewriter effect
  useEffect(() => {
    if (text.length < fullText.length) {
      const timeout = setTimeout(() => {
        setText(fullText.slice(0, text.length + 1))
      }, 100)
      return () => clearTimeout(timeout)
    } else {
      setIsTypingComplete(true)
    }
  }, [text, fullText])

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
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <AnimatedBackground />

      <motion.div className="container px-4 md:px-6 relative z-10" style={{ opacity, scale, y }}>
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <motion.div className="space-y-4">
            <div className="relative">
              <motion.h1
                className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-primary/80 dark:text-primary/90"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {text}
                <motion.span
                  className="inline-block w-[3px] h-[1em] bg-primary/60 ml-1 align-middle"
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8 }}
                  style={{ display: isTypingComplete ? "none" : "inline-block" }}
                />
              </motion.h1>

              {isTypingComplete && (
                <motion.div
                  className="absolute -z-10 inset-0 blur-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: [0.2, 0.3, 0.2],
                    scale: [1, 1.02, 1],
                    y: [0, -2, 0],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 3,
                    ease: "easeInOut",
                  }}
                >
                  <div className="h-full w-full bg-primary/10 dark:bg-primary/5 rounded-full" />
                </motion.div>
              )}

              {isTypingComplete && (
                <motion.div
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "80%" }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                />
              )}
            </div>

            <motion.p
              className="pt-5 mx-auto max-w-[700px] text-muted-foreground md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isTypingComplete ? 1 : 0, y: isTypingComplete ? 0 : 20 }}
              transition={{ duration: 0.5 }}
            >
              A Front-End Developer dedicated to building seamless, intuitive, and visually engaging user experiences.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isTypingComplete ? 1 : 0, scale: isTypingComplete ? 1 : 0.8 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              onClick={scrollToProjects}
              className="mt-4 rounded-full relative overflow-hidden group bg-primary/80 hover:bg-primary/90"
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
                className="absolute inset-0 bg-primary/20 z-0"
                initial={{ scale: 0, borderRadius: "100%" }}
                whileHover={{ scale: 1.5, borderRadius: "100%" }}
                transition={{ duration: 0.5 }}
              />
            </Button>
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
