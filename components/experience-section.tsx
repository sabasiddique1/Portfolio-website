"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin } from "lucide-react"
import {SectionHeading} from "@/components/section-heading";

const experiences = [
  {
    id: 1,
    role: "Front End Developer",
    company: "Wanclouds",
    location: "On-site",
    period: "Aug 2023 - Apr 2025",
    description: "At Wanclouds, I contributed to VPC+, SecMon, and the AI platform by implementing features, fixing bugs, and improving the overall user experience. I worked on testing VPC+ for stability, enhanced AI model recognition, and collaborated on code reviews with cross-functional teams.",
    skills: ["React.js", "Next.js", "TailwindCSS", "Node.js", "AI Integration", "Agile"],
  },
  // {
  //   id: 2,
  //   role: "Data Analyst",
  //   company: "IIMCT - Pakistan",
  //   location: "Rawalpindi",
  //   period: "2023",
  //   description: "As a Data Analyst, I leveraged data analysis, statistical techniques, programming, and DBMS to drive actionable insights and decision-making. These skills are now integrated into my front-end development work, particularly with AI-driven projects.",
  //   skills: ["Data Analysis", "SQL", "Python", "Statistical Analysis"],
  // },
]

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })

  return (
    <section id="experience" ref={sectionRef} className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className=" space-y-4 text-center"
        >
          <div className="inline-block">
            {/*<motion.h2*/}
            {/*  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl relative"*/}
            {/*  initial={{ opacity: 0 }}*/}
            {/*  animate={isInView ? { opacity: 1 } : { opacity: 0 }}*/}
            {/*  transition={{ duration: 0.6 }}*/}
            {/*>*/}
              <SectionHeading title="Work Experience"/>
              <motion.span
                className="absolute -bottom-2 left-0 h-1 bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            {/*</motion.h2>*/}
          </div>
          {/*<motion.p*/}
          {/*  className="mx-auto max-w-[700px] text-muted-foreground"*/}
          {/*  initial={{ opacity: 0 }}*/}
          {/*  animate={isInView ? { opacity: 1 } : { opacity: 0 }}*/}
          {/*  transition={{ duration: 0.6, delay: 0.2 }}*/}
          {/*>*/}
          {/*  My professional journey and the companies I&apos;ve worked with*/}
          {/*</motion.p>*/}
        </motion.div>

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              transition={{ duration: 0.7, delay: index * 0.1, type: "spring" }}
              whileHover={{ y: -5 }}
            >
              <Card className="overflow-hidden border-l-4 border-l-primary/70 transition-all duration-300 hover:shadow-lg">
                <CardHeader className="pb-2">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                      <CardTitle className="text-xl">{experience.role}</CardTitle>
                      <div className="text-lg font-medium text-primary">{experience.company}</div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="h-4 w-4" />
                        <span>{experience.period}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="h-4 w-4" />
                        <span>{experience.location}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{experience.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {experience.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ delay: 0.5 + skillIndex * 0.1, duration: 0.3 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <Badge variant="secondary">{skill}</Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
