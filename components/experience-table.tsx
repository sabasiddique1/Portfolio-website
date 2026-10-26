"use client"

import { useState } from "react"
import { Briefcase } from "lucide-react"
import { experience } from "@/constants/experience"
import { EducationBlock } from "@/components/education-block"
import { ExpandRow } from "@/components/expand-row"
import { SectionReveal } from "@/components/section-reveal"
import { SectionTitle } from "@/components/section-title"

export function ExperienceTable() {
  // One role open at a time; null = all collapsed.
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section id="experience" className="container py-16 md:py-24">
      <SectionTitle title="Experience" icon={Briefcase} iconClassName="text-cat-ml" />

      <SectionReveal>
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <div className="grid grid-cols-[1fr_auto] border-b border-border px-4 py-2 text-2xs uppercase tracking-wider text-muted-foreground">
            <span>Role</span>
            <span className="hidden md:block">Stack</span>
          </div>

          <ul>
            {experience.map((role) => {
              const open = openId === role.id

              return (
                <ExpandRow
                  key={role.id}
                  id={`experience-${role.id}`}
                  title={role.title}
                  line={role.highlight}
                  meta={`${role.company} · ${role.period} · ${role.location}`}
                  chips={role.chips}
                  open={open}
                  onToggle={() => setOpenId(open ? null : role.id)}
                  disabled={role.bullets.length === 0}
                >
                  <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground marker:text-muted-foreground">
                    {role.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </ExpandRow>
              )
            })}
          </ul>
        </div>

        <EducationBlock />
      </SectionReveal>
    </section>
  )
}
