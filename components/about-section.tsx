"use client"

import { useInView, motion } from "framer-motion"
import { useRef } from "react"
import { Card } from "@/components/ui/card"
import { Clock, Award, Star, Code, Briefcase, FileText, Mail, ArrowRight } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {SectionHeading} from "@/components/section-heading"
import { ResumePreview } from "@/components/resume-preview"

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
      <section className="py-20 md:py-28" ref={sectionRef}>

        <div className="container px-4 md:px-6">
          <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto space-y-8"
          >
          <div className="text-center space-y-2">
          <div className="inline-block">
            {/*<motion.h2*/}
            {/*    className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl relative"*/}
            {/*    initial={{ opacity: 0 }}*/}
            {/*    animate={isInView ? { opacity: 1 } : { opacity: 0 }}*/}
            {/*    transition={{ duration: 0.6 }}*/}
            {/*>*/}
              <SectionHeading title="About Me" />
            {/*</motion.h2>*/}
          </div>
        </div>
          </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Profile Picture and Description */}
          <div className="lg:col-span-8 bg-card  rounded-xl p-4 flex flex-col md:flex-row gap-8 items-center">
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white/80 shadow-xl flex-shrink-0">
              <Image
                  src="/ChatGPT Image Dec 23, 2025, 02_41_59 PM.png?height=200&width=200"
                  alt="Profile" fill className="object-cover" />
            </div>

            <div className="flex-1">
              <motion.div
                  className="pt-5 text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.div
                    className="space-y-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                  <motion.p variants={itemVariants}>
                    Creative and results-driven Front-End Developer with 2+ years of experience building responsive, accessible, and high-performance web apps.
                  </motion.p>
                  <motion.p variants={itemVariants}>
                    Proficient in React, Next.js, Tailwind CSS, MUI, and Ant Design. Experienced in full-stack development with Node.js, Express, PostgreSQL, and REST APIs. Familiar with AI integrations using Python, NumPy, and Pandas. Strong team player in Agile setups, focused on shipping clean, scalable, production-ready solutions.
                  </motion.p>
                </motion.div>
              </motion.div>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 pt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <ResumePreview>
                  <Button
                    variant="default"
                    size="lg"
                    className="w-full group relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/30"
                  >
                    <FileText className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                    <span>View Resume</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  </Button>
                </ResumePreview>

                <a 
                  href="mailto:sabasiddiqdev@gmail.com?subject=Let's%20Work%20Together&body=Hi%20there%2C%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20connect..."
                  className="w-full"
                >
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="w-full group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:bg-accent/50"
                  >
                    <Mail className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                    <span>Contact Me</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </a>
              </motion.div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-4">
            {/* Experience Card */}
            <StatCard icon={<Briefcase className="h-8 w-8 text-card" />} title="Experience" value="2+" unit="Years" />

            {/* Projects Card */}
            <StatCard icon={<Code className="h-8 w-8 text-card" />} title="Projects" value="30+" unit="Completed" />

            {/* Awards Card */}
            <StatCard icon={<Award className="h-8 w-8 text-card" />} title="User Experience" value="45%" unit="Improved" />
          </div>
        </div>
        </div>
      </section>
  )
}

function StatCard({ icon, title, value, unit }: { icon: React.ReactNode; title: string; value: string; unit: string }) {
  return (
      <Card className="bg-card border-0 p-5 transition-all duration-300">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/70  rounded-lg">{icon}</div>
          <div>
            <h4 className="font-bold text-lg text-card-foreground">{title}</h4>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold ">{value}</span>
              <span className="text-zinc-400 text-sm">{unit}</span>
            </div>
          </div>
        </div>
      </Card>
  )
}