"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9 opacity-0">
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 relative">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: currentTheme === "dark" ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun
              className={`h-[1.2rem] w-[1.2rem] transition-all ${
                currentTheme === "dark" ? "opacity-0 scale-0 rotate-90" : "opacity-100 scale-100 rotate-0"
              }`}
            />
            <Moon
              className={`absolute h-[1.2rem] w-[1.2rem] top-0 left-0 transition-all ${
                currentTheme === "dark" ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-0 rotate-90"
              }`}
            />
          </motion.div>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer">
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer">
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer">
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
