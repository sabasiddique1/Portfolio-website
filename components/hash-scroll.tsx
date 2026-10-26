"use client"

import { useEffect } from "react"

/** Scrolls to the section named in the URL hash, offset for the fixed navbar. */
export function HashScroll() {
  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash.replace("#", "")
      if (!hash) return
      setTimeout(() => {
        const element = document.getElementById(hash)
        if (!element) return
        const navbarHeight = 64 // h-16
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        window.scrollTo({ top: elementPosition - navbarHeight, behavior: reduceMotion ? "auto" : "smooth" })
      }, 300)
    }

    handleHashNavigation()
    window.addEventListener("hashchange", handleHashNavigation)
    return () => window.removeEventListener("hashchange", handleHashNavigation)
  }, [])

  return null
}
