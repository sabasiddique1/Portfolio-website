"use client"

import { useState } from "react"
import { Briefcase, CalendarDays, CheckCircle2, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SectionHeading } from "@/components/section-heading"
import { SectionReveal } from "@/components/section-reveal"
import { EducationBlock } from "@/components/education-block"
import { experience } from "@/constants/experience"

export function ExperienceAccordion() {
  // Controlled so each panel knows whether it is open. Empty value = all collapsed.
  const [openId, setOpenId] = useState("")

  return (
    <section id="experience" className="px-6 pt-8 pb-24 bg-gradient-to-b from-background via-background to-secondary/5">
      <div className="max-w-5xl mx-auto">
        <SectionHeading title="Experience" />

        <Accordion
          type="single"
          collapsible
          value={openId}
          onValueChange={setOpenId}
          className="w-full space-y-6"
        >
          {experience.map((role, index) => {
            const open = openId === role.id
            const hasBullets = role.bullets.length > 0

            return (
              <SectionReveal key={role.id} delay={index * 0.06} className="relative">
                <AccordionItem
                  value={role.id}
                  disabled={!hasBullets}
                  className="group border border-border/50 bg-gradient-to-br from-card via-card/95 to-card/90 rounded-2xl p-0 overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 data-[state=open]:border-primary/30 data-[state=open]:shadow-xl data-[state=open]:ring-1 data-[state=open]:ring-primary/20"
                >
                  <AccordionTrigger
                    className={`hover:no-underline px-6 py-6 data-[state=open]:pb-5 ${
                      hasBullets ? "" : "[&>svg]:hidden"
                    }`}
                  >
                    <div className="flex-1 text-left w-full">
                      {/* Header Row */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <Briefcase className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          {/* Radix's AccordionHeader is already the h3; keep the button's content to phrasing elements. */}
                          <span className="block text-xl font-bold text-foreground mb-1">{role.title}</span>
                          <Badge
                            variant="secondary"
                            className={`text-xs font-medium ${
                              role.current
                                ? "bg-primary/20 text-primary border-primary/30"
                                : "bg-muted/80 text-foreground/80 border-border/50"
                            }`}
                          >
                            {role.company}
                          </Badge>
                        </div>
                      </div>

                      {/* Quick Info Row */}
                      <div className="flex flex-wrap items-center gap-4 text-sm mb-3 pl-11">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50">
                          <CalendarDays className="w-4 h-4 text-primary/70" />
                          <span className="font-medium text-foreground/90">{role.period}</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50">
                          <MapPin className="w-4 h-4 text-primary/70" />
                          <span className="text-foreground/80">{role.location}</span>
                        </div>
                      </div>

                      <span className="block text-sm text-muted-foreground pl-11">{role.highlight}</span>
                    </div>
                  </AccordionTrigger>

                  {/*
                    forceMount keeps the bullets in the server HTML. A force-mounted Radix panel is never
                    marked `hidden`, so the accordion-up/down keyframes cannot hold it closed; the inline
                    animationName disables them and the grid-rows transition below animates the height.
                  */}
                  <AccordionContent
                    forceMount
                    style={{ animationName: "none" }}
                    aria-hidden={!open}
                    inert={!open}
                    className="p-0"
                  >
                    <div
                      className="grid transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none"
                      style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
                    >
                      <div className="min-h-0 overflow-hidden">
                        {hasBullets && (
                          <ul className="px-6 pb-6 pl-[4.25rem] space-y-2.5">
                            {role.bullets.map((bullet) => (
                              <li key={bullet} className="flex items-start gap-2 text-sm">
                                <CheckCircle2 className="w-4 h-4 text-primary/60 mt-0.5 flex-shrink-0" />
                                <span className="text-muted-foreground">{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </SectionReveal>
            )
          })}
        </Accordion>

        <EducationBlock />
      </div>
    </section>
  )
}
