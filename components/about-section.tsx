"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Award, Star } from "lucide-react"

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

  const stats = [
    {
      icon: <Clock className="h-5 w-5 text-primary" />,
      value: "2+",
      label: "Years Experience",
    },
    {
      icon: <Award className="h-5 w-5 text-primary" />,
      value: "30+",
      label: "Projects Completed",
    },
    {
      icon: <Star className="h-5 w-5 text-primary" />,
      value: "45%",
      label: "Improved User Experience",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-28 bg-muted/50">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <div className="text-center space-y-2">
            <div className="inline-block">
              <motion.h2
                className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl relative"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                About Me
                <motion.span
                  className="absolute -bottom-2 left-0 h-1 bg-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "100%" } : { width: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                />
              </motion.h2>
            </div>
            <motion.p
              className="pt-5 text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              I&apos;m a passionate front-end developer dedicated to building intuitive, responsive, and visually appealing user interfaces.
            </motion.p>
          </div>

          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.p variants={itemVariants} className="text-center">
              Creative and results-driven Front-End Developer with 2+ years of experience in designing and implementing highly responsive, scalable, and user-focused web applications.
            </motion.p>
            <motion.p variants={itemVariants} className="text-center">
              Skilled in building modern, component-driven UIs with React, Next.js, Tailwind CSS, and leading design systems such as Material UI and Ant Design.
              Experienced in full-stack development using Node.js and PostgreSQL, with a focus on integrating AI-powered features using Python libraries like NumPy and Pandas.
              Proven ability to ship production-ready applications, collaborate effectively in Agile teams, and contribute meaningfully to open-source projects.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-3 gap-4 mt-10"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
              >
                <Card className="border-none shadow-sm overflow-hidden relative">
                  <motion.div
                    className="absolute inset-0 bg-primary/5 z-0"
                    initial={{ y: "100%" }}
                    whileHover={{ y: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <CardContent className="p-4 text-center relative z-10">
                    <motion.div
                      className="flex justify-center mb-2"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 * index, duration: 0.3, type: "spring" }}
                    >
                      {stat.icon}
                    </motion.div>
                    <motion.div
                      className="text-2xl font-bold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 * index, duration: 0.5 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
