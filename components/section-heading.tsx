"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface SectionHeadingProps {
    title: string
    subtitle?: string
    className?: string
}

export function SectionHeading({ title, subtitle, className = "" }: SectionHeadingProps) {
    const headingRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(headingRef, { once: false, amount: 0.5 })

    return (
        <motion.div
            ref={headingRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className={`mb-12 space-y-4 text-center ${className}`}
        >
            <div className="inline-block">
                <motion.h2
                    className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl relative"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {title}
                    <motion.span
                        className="absolute -bottom-2 left-0 h-[3px] bg-gradient-to-r from-transparent via-primary/80 to-transparent rounded-full"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: "100%" } : { width: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    />
                </motion.h2>
            </div>
            {subtitle && (
                <motion.p
                    className="mx-auto max-w-[700px] text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {subtitle}
                </motion.p>
            )}
        </motion.div>
    )
}
