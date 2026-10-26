// DEMO — remove by deleting <AlsoBuilding /> in app/page.tsx (this file can then be deleted too).
import type { ProjectKind } from "@/constants/projects"

export type ProofCard = {
  name: string
  /** One line under the name. */
  line?: string
  /** Small muted meta, e.g. "Kaggle · top 14%". */
  meta?: string
  url: string
  kind: ProjectKind
}

export const proofCards: ProofCard[] = [
  {
    name: "Open-source contributions",
    line: "NumPy · SciPy · pandas · sktime · skrub · pgmpy",
    url: "https://github.com/sabasiddique1/oss-contributions",
    kind: "ml",
  },
  {
    name: "AI Agent Security writeup",
    line: "Structured Red-Team Search for Multi-Step Tool Attacks on AI Agents",
    meta: "Kaggle · top 14%",
    url: "https://www.kaggle.com/writeups/sabasiddiquedev/structured-red-team-search",
    kind: "research",
  },
  {
    name: "AI Security Daily Feed",
    line: "arXiv + NVD",
    meta: "updated daily",
    url: "https://github.com/sabasiddique1/ai-rss-feed",
    kind: "agents",
  },
  {
    name: "Free Claude Skills",
    url: "https://github.com/sabasiddique1/claude-skills",
    kind: "fullstack",
  },
]
