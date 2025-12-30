"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false)
    
    // If we're on the home page, scroll to the section
    if (pathname === "/") {
      const element = document.getElementById(id)
      if (element) {
        const navbarHeight = 64 // h-16 = 64px
        // Add extra offset for experience section to show the heading
        const extraOffset = id === "experience" ? 40 : 0
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - navbarHeight - extraOffset
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        })
      }
    } else {
      // If we're on a different page, navigate to home with hash
      router.push(`/#${id}`)
    }
  }

  return (
    <motion.header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent",
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container flex h-16 items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link href="/" className="text-xl font-bold tracking-tighter transition-colors hover:text-primary">
            portfolio.
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <motion.button
            onClick={() => scrollToSection("home")}
            className="text-sm font-medium hover:text-primary transition-colors relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Home
          </motion.button>
          <motion.button
            onClick={() => scrollToSection("projects")}
            className="text-sm font-medium hover:text-primary transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Work
          </motion.button>
          <motion.button
            onClick={() => scrollToSection("about")}
            className="text-sm font-medium hover:text-primary transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            About
          </motion.button>
          <motion.button
            onClick={() => scrollToSection("experience")}
            className="text-sm font-medium hover:text-primary transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Experience
          </motion.button>
          <motion.button
            onClick={() => scrollToSection("contact")}
            className="text-sm font-medium hover:text-primary transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Contact
          </motion.button>
          <ModeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          className="md:hidden bg-background/95 backdrop-blur-md shadow-md"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container py-4 flex flex-col gap-4">
            <motion.button
              onClick={() => scrollToSection("home")}
              className="py-2 text-sm font-medium hover:text-primary transition-colors"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              Home
            </motion.button>
            <motion.button
              onClick={() => scrollToSection("projects")}
              className="py-2 text-sm font-medium hover:text-primary transition-colors"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              Work
            </motion.button>
            <motion.button
              onClick={() => scrollToSection("about")}
              className="py-2 text-sm font-medium hover:text-primary transition-colors"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              About
            </motion.button>
            <motion.button
              onClick={() => scrollToSection("experience")}
              className="py-2 text-sm font-medium hover:text-primary transition-colors"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              Experience
            </motion.button>
            <motion.button
              onClick={() => scrollToSection("contact")}
              className="py-2 text-sm font-medium hover:text-primary transition-colors"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
