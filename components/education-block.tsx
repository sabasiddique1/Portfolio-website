import { education } from "@/constants/experience"

/** Compact education list rendered under the experience table. */
export function EducationBlock() {
  return (
    <div className="mt-6">
      <h3 className="mb-2 text-2xs uppercase tracking-wider text-muted-foreground">Education</h3>
      <ul className="divide-y divide-border rounded-lg border border-border bg-card">
        {education.map((entry) => (
          <li
            key={entry.id}
            className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
          >
            <div>
              <p className="text-sm font-medium text-foreground">{entry.title}</p>
              <p className="text-xs text-muted-foreground">{entry.institution}</p>
            </div>
            <span className="shrink-0 text-xs text-muted-foreground">{entry.period}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
