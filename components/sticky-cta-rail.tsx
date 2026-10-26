"use client"

import { Github, Linkedin, Mail } from "lucide-react"
import { SiKaggle } from "react-icons/si"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { mailto, site } from "@/constants/site"

export function StickyCtaRail() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed right-6 bottom-6 z-50 hidden lg:block"
    >
      <div className="flex flex-col gap-3 p-3 bg-background/80 backdrop-blur-md border border-border/50 rounded-lg shadow-lg">
        <Button
          size="icon"
          variant="ghost"
          className="h-10 w-10"
          asChild
          aria-label="GitHub profile"
          title="GitHub"
        >
          <a href={site.links.github} target="_blank" rel="noopener noreferrer">
            <Github className="h-5 w-5" />
          </a>
        </Button>

        <Button
          size="icon"
          variant="ghost"
          className="h-10 w-10"
          asChild
          aria-label="LinkedIn profile"
          title="LinkedIn"
        >
          <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin className="h-5 w-5" />
          </a>
        </Button>

        <Button
          size="icon"
          variant="ghost"
          className="h-10 w-10"
          asChild
          aria-label="Kaggle profile"
          title="Kaggle"
        >
          <a href={site.links.kaggle} target="_blank" rel="noopener noreferrer">
            <SiKaggle className="h-5 w-5" />
          </a>
        </Button>

        <Button
          size="icon"
          variant="ghost"
          className="h-10 w-10"
          asChild
          aria-label="Send email"
          title="Email"
        >
          <a href={mailto}>
            <Mail className="h-5 w-5" />
          </a>
        </Button>
      </div>
    </motion.div>
  )
}
