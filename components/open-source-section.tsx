"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ExternalLink, Code2 } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import Link from "next/link"

type OpenSourceContribution = {
  id: number
  name: string
  url: string
  iconPath?: string
}

const openSourceContributions: OpenSourceContribution[] = [
  {
    id: 1,
    name: "numpy",
    url: "https://github.com/numpy/numpy",
    iconPath: "/open-source-icons/NumPy.png",
  },
  {
    id: 2,
    name: "pgmpy",
    url: "https://github.com/pgmpy/pgmpy",
    iconPath: "/open-source-icons/pgmpy.png",
  },
  {
    id: 3,
    name: "skrub",
    url: "https://github.com/skrub-data/skrub",
    iconPath: "/open-source-icons/skrub.svg",
  },
  {
    id: 4,
    name: "sktime",
    url: "https://github.com/sktime/sktime",
    iconPath: "/open-source-icons/sktime.svg",
  },
]

function ContributionIcon({ repo }: { repo: OpenSourceContribution }) {
  const [assetMissing, setAssetMissing] = useState(false)

  if (repo.iconPath && !assetMissing) {
    return (
      <img
        src={repo.iconPath || "/placeholder.svg"}
        alt={`${repo.name} logo`}
        className="block w-full h-full object-contain object-center"
        onError={() => setAssetMissing(true)}
      />
    )
  }

  return <Code2 className="w-5 h-5" />
}

export function OpenSourceSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })

  return (
    <section id="open-source" ref={sectionRef} className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading title="Open Source" subtitle="Contributing to the open source community" />
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mt-12">
          {openSourceContributions.map((repo, index) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group w-full sm:w-auto"
            >
              <Link href={repo.url} target="_blank" rel="noopener noreferrer">
                <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 flex items-center justify-between gap-4 min-w-[200px]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                      <ContributionIcon repo={repo} />
                    </div>
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {repo.name}
                    </h3>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
