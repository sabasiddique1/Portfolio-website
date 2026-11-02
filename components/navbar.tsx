"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { mailto, site } from "@/constants/site"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

/** "/#journey" → "journey"; null for real routes such as "/projects". */
function sectionIdOf(href: string): string | null {
  const hashIndex = href.indexOf("#")
  return hashIndex === -1 ? null : href.slice(hashIndex + 1)
}

/** Home-page sections the nav links to, in nav (= document) order. */
const sectionIds = site.nav.map(({ href }) => sectionIdOf(href)).filter((id): id is string => id !== null)

/**
 * Sections the scrollspy watches, in document order, each mapped to the nav link it lights up.
 * Education and Research have no link of their own and sit between Experience and Contact, so
 * they keep Experience current instead of leaving a gap where the underline would unmount.
 */
const OBSERVED_SECTIONS: Array<[sectionId: string, navId: string]> = sectionIds.flatMap((id) =>
  id === "experience" ? ([[id, id], ["education", id], ["research", id]] as Array<[string, string]>) : [[id, id] as [string, string]]
)

/** Past this scrollY the hero is gone and the bar's bottom border fades in. */
const SCROLLED_PAST_HERO = 80

function EmailButton({ className }: { className?: string }) {
  return (
    <Button asChild className={className}>
      <a href={mailto}>
        Email
        <ArrowUpRight className="size-3.5" aria-hidden="true" />
      </a>
    </Button>
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  // Both start empty so the server HTML and the first client render match; effects fill them in.
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()
  const isHome = pathname === "/"

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Scrollspy (home page only). The observed band is the viewport minus the 64px bar and the
  // bottom 60%; of the sections overlapping it, the last in document order is the one under the
  // 40% line, so that one is active. Nothing overlapping (hero, featured work) = no active link.
  useEffect(() => {
    if (!isHome) return

    const targets = OBSERVED_SECTIONS.map(([id]) => document.getElementById(id)).filter(
      (element): element is HTMLElement => element !== null
    )
    if (targets.length === 0) return

    const overlapping = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) overlapping.add(entry.target.id)
          else overlapping.delete(entry.target.id)
        }
        let current: string | null = null
        for (const [id, navId] of OBSERVED_SECTIONS) if (overlapping.has(id)) current = navId
        setActiveSection(current)
      },
      { rootMargin: "-64px 0px -60% 0px" }
    )
    targets.forEach((target) => observer.observe(target))

    return () => {
      observer.disconnect()
      setActiveSection(null)
    }
  }, [isHome])

  // Bar border: only the home page has a hero to scroll past; every other route shows it always.
  useEffect(() => {
    if (!isHome) return

    const update = () => setScrolled(window.scrollY > SCROLLED_PAST_HERO)
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [isHome])

  const showBorder = !isHome || scrolled

  const renderLinks = (variant: "desktop" | "mobile") =>
    site.nav.map(({ label, href }) => {
      const sectionId = sectionIdOf(href)
      // Section links are current from the scrollspy; route links from the pathname.
      const active = sectionId
        ? isHome && activeSection === sectionId
        : pathname === href || pathname.startsWith(`${href}/`)
      const classes = cn(
        "text-[15px] transition-colors hover:text-foreground",
        active ? "text-foreground" : "text-text-2",
        // Desktop links fill the 64px bar so the underline lands on its bottom border.
        variant === "desktop" ? "relative inline-flex h-16 items-center py-4" : "py-2.5 text-base"
      )
      // One shared underline slides between desktop links; the mobile menu only colours the active link.
      const underline = variant === "desktop" && active && (
        <motion.span
          layoutId="nav-underline"
          aria-hidden="true"
          className="absolute -bottom-[1px] left-0 right-0 h-0.5 bg-lime"
          transition={reduceMotion ? { duration: 0 } : { duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        />
      )

      // On the home page, section links stay native anchors: the browser does the smooth scroll
      // (scroll-padding-top in globals.css keeps the target clear of this bar) and moves the
      // keyboard focus starting point to the section, which a scripted scroll would not.
      if (sectionId && isHome) {
        return (
          <a
            key={href}
            href={`#${sectionId}`}
            onClick={() => setOpen(false)}
            aria-current={active ? "location" : undefined}
            className={classes}
          >
            {label}
            {underline}
          </a>
        )
      }

      return (
        <Link
          key={href}
          href={href}
          onClick={() => setOpen(false)}
          aria-current={active ? "page" : undefined}
          className={classes}
        >
          {label}
          {underline}
        </Link>
      )
    })

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="text-[17px] font-semibold tracking-tight text-foreground">
          {/* The trailing full stop of the wordmark takes the accent: a small, constant visual cue. */}
          {site.brand.endsWith(".") ? (
            <>
              {site.brand.slice(0, -1)}
              <span className="text-lime">.</span>
            </>
          ) : (
            site.brand
          )}
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          <nav className="flex items-center gap-7">{renderLinks("desktop")}</nav>
          <EmailButton />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle menu"
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </Button>
      </div>

      {/* The bar's 1px bottom border: fades in once the hero is scrolled past; always on where there is no hero. */}
      <div
        aria-hidden="true"
        className={cn("h-px bg-border transition-opacity duration-300", showBorder ? "opacity-100" : "opacity-0")}
      />

      <div id="mobile-nav" hidden={!open} className="border-b border-border bg-background md:hidden">
        <nav className="container flex flex-col py-4">
          {renderLinks("mobile")}
          <EmailButton className="mt-3 w-full" />
        </nav>
      </div>
    </header>
  )
}
