"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      className="border-t py-6 md:py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <motion.div className="flex flex-col items-center gap-4 md:flex-row md:gap-2" whileHover={{ scale: 1.02 }}>
          <Link href="/" className="font-bold">
            portfolio.
          </Link>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {currentYear} All rights reserved.
          </p>
        </motion.div>
        <motion.p
          className="text-center text-xs text-muted-foreground md:text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Built with Next.js, Tailwind CSS & Framer Motion
        </motion.p>
      </div>
    </motion.footer>
  )
}
