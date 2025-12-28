"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { TrendingUp, Zap, Bug, Rocket } from "lucide-react"

const impactMetrics = [
  {
    icon: <TrendingUp className="h-5 w-5" />,
    value: "40%",
    label: "Faster Load Speed",
    description: "Improved dashboard performance",
    color: "text-green-500",
  },
  {
    icon: <Bug className="h-5 w-5" />,
    value: "100+",
    label: "Bugs Resolved",
    description: "Across production systems",
    color: "text-blue-500",
  },
  {
    icon: <Zap className="h-5 w-5" />,
    value: "25%",
    label: "Performance Boost",
    description: "Frontend optimization",
    color: "text-yellow-500",
  },
  {
    icon: <Rocket className="h-5 w-5" />,
    value: "30%",
    label: "Faster Delivery",
    description: "Reduced Figma-to-code time",
    color: "text-purple-500",
  },
]

export function ImpactProofStrip() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <section ref={sectionRef} className="py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Impact & Results</h2>
          <p className="text-muted-foreground text-sm md:text-base">Quantified achievements from real projects</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {impactMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-4 rounded-lg bg-card border border-border/50 hover:border-primary/30 transition-colors"
            >
              <div className={`inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 dark:bg-primary/20 mb-3 ${metric.color}`}>
                {metric.icon}
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-1 text-foreground">{metric.value}</div>
              <div className="text-sm font-medium text-foreground mb-1">{metric.label}</div>
              <div className="text-xs text-muted-foreground">{metric.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

