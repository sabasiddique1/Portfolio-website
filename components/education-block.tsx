"use client"

import { education } from "@/constants/experience"

/** Compact education list rendered under the experience accordion. */
export function EducationBlock() {
  return (
    <div className="mt-12">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Education
      </h3>
      <ul className="divide-y divide-border/40 border-y border-border/40">
        {education.map((entry) => (
          <li
            key={entry.id}
            className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
          >
            <div>
              <p className="text-sm font-medium text-foreground">{entry.title}</p>
              <p className="text-sm text-muted-foreground">{entry.institution}</p>
            </div>
            <span className="shrink-0 text-xs text-muted-foreground">{entry.period}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
