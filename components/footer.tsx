import { Fragment } from "react"
import Link from "next/link"
import { ArrowUp } from "lucide-react"
import { site } from "@/constants/site"

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-8 text-sm text-muted-foreground">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <Link href="/" className="font-semibold text-foreground transition-colors hover:text-lime">
            {site.brand}
          </Link>
          <span aria-hidden="true">·</span>
          <span>{site.name}</span>
          {site.footerLinks.map(({ label, href }) => (
            <Fragment key={label}>
              <span aria-hidden="true">·</span>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-foreground"
              >
                {label}
              </a>
            </Fragment>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <p>{site.footerTagline}</p>
          {/* "#top" scrolls to the top of any page, even with no element of that id. */}
          <a href="#top" className="group inline-flex items-center gap-1 transition-colors hover:text-foreground">
            Back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
