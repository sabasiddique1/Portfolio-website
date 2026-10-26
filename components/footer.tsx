import { Fragment } from "react"
import { site } from "@/constants/site"

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container flex flex-wrap items-center gap-x-2 gap-y-1 py-6 text-xs text-muted-foreground">
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
    </footer>
  )
}
