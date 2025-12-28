"use client"

import { FileText, Github, Linkedin, Mail } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ResumePreview } from "@/components/resume-preview"

export function StickyCtaRail() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed right-6 bottom-6 z-50 hidden lg:block"
    >
      <div className="flex flex-col gap-3 p-3 bg-background/80 backdrop-blur-md border border-border/50 rounded-lg shadow-lg">
        <ResumePreview>
          <Button
            size="icon"
            variant="ghost"
            className="h-10 w-10"
            aria-label="View Resume"
            title="View Resume"
          >
            <FileText className="h-5 w-5" />
          </Button>
        </ResumePreview>

        <Button
          size="icon"
          variant="ghost"
          className="h-10 w-10"
          asChild
          aria-label="GitHub Profile"
          title="GitHub"
        >
          <a href="https://github.com/sabasiddique1" target="_blank" rel="noopener noreferrer">
            <Github className="h-5 w-5" />
          </a>
        </Button>

        <Button
          size="icon"
          variant="ghost"
          className="h-10 w-10"
          asChild
          aria-label="LinkedIn Profile"
          title="LinkedIn"
        >
          <a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
            {/* TODO: Replace with actual LinkedIn URL */}
            <Linkedin className="h-5 w-5" />
          </a>
        </Button>

        <Button
          size="icon"
          variant="ghost"
          className="h-10 w-10"
          asChild
          aria-label="Send Email"
          title="Email"
        >
          <a href="mailto:sabasiddique001@gmail.com?subject=Let's Connect">
            <Mail className="h-5 w-5" />
          </a>
        </Button>
      </div>
    </motion.div>
  )
}

