"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { mailto, site } from "@/constants/site"
import { cn } from "@/lib/utils"

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
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Hash links point at home-page sections, so only real routes can be current.
  const isActive = (href: string) =>
    !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`))

  const renderLinks = (className: string) =>
    site.nav.map(({ label, href }) => {
      const active = isActive(href)
      const hashIndex = href.indexOf("#")
      const classes = cn(
        "text-sm transition-colors hover:text-foreground",
        active ? "text-foreground" : "text-text-2",
        className
      )

      // On the home page, section links stay native anchors: the browser does the smooth scroll
      // (scroll-padding-top in globals.css keeps the target clear of this bar) and moves the
      // keyboard focus starting point to the section, which a scripted scroll would not.
      if (hashIndex !== -1 && pathname === "/") {
        return (
          <a key={href} href={href.slice(hashIndex)} onClick={() => setOpen(false)} className={classes}>
            {label}
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
        </Link>
      )
    })

  return (
    <header className="sticky top-0 z-50 bg-background">
      <div className="border-b border-border">
        <div className="container flex h-14 items-center justify-between gap-4">
          <Link href="/" className="text-[15px] font-semibold text-foreground">
            saba.
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <nav className="flex items-center gap-6">{renderLinks("")}</nav>
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
      </div>

      <div id="mobile-nav" hidden={!open} className="border-b border-border bg-background md:hidden">
        <nav className="container flex flex-col py-3">
          {renderLinks("py-2")}
          <EmailButton className="mt-3 w-full" />
        </nav>
      </div>
    </header>
  )
}
