"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && (theme === "system" ? resolvedTheme === "dark" : theme === "dark")

  const triggerButton = (
    <Button
      variant="secondary"
      size="icon"
      className="h-10 w-10 shrink-0 rounded-lg border border-border bg-secondary text-foreground hover:bg-secondary/80 [&_svg]:size-5"
      aria-label="Toggle theme (light/dark)"
    >
      {!mounted ? (
        <Sun strokeWidth={2} />
      ) : isDark ? (
        <Moon strokeWidth={2} />
      ) : (
        <Sun strokeWidth={2} />
      )}
    </Button>
  )

  if (!mounted) {
    return triggerButton
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{triggerButton}</DropdownMenuTrigger>
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
