/** "From frontend to AI" timeline. One line per step; details and links show on expand. */
export type JourneyLink = { label: string; url: string }

export type JourneyStep = {
  id: string
  period: string
  title: string
  /** The one visible line. */
  summary: string
  /** 2–3 chips for the table row; only words that already appear in the row's own text. */
  chips?: string[]
  /** Extra lines shown on expand, above the links. */
  details?: string[]
  /** Links shown on expand. */
  links?: JourneyLink[]
  /** One line shown on expand, below the links. */
  footnote?: string
}

export const journey: JourneyStep[] = [
  {
    id: "frontend",
    period: "Dec 2022",
    title: "Frontend",
    summary:
      "Software Engineer Intern at Wanclouds: React screens, bug fixing, API integration for cloud SaaS dashboards.",
    chips: ["React", "API integration", "Cloud SaaS"],
  },
  {
    id: "product-engineering",
    period: "Mar 2023 – May 2025",
    title: "Product engineering",
    summary:
      "Software Engineer at Wanclouds: cloud and security SaaS (VPC+, SecMon); first AI product work on Cloud Whisperer and Wanclouds Bot.",
    chips: ["VPC+", "SecMon", "Cloud Whisperer"],
  },
  {
    id: "fullstack-ai",
    period: "May 2025 – Jan 2026",
    title: "Full-stack with AI features",
    summary:
      "Devsloop (AI-assisted content workflows, lead-gen automation) → xNerds Solutions (RAG/LLM market insights in fintech dashboards, payment automation).",
    chips: ["RAG/LLM", "Fintech dashboards", "Automation"],
  },
  {
    id: "ai-training",
    period: "Sep 2025 – Mar 2026",
    title: "Formal AI training",
    summary:
      "Data Science & AI Bootcamp (Atomcamp × NUST): ML, deep learning, NLP/LLMs, computer vision, RAG, MLOps. Capstone: RediSense.",
    chips: ["ML", "NLP/LLMs", "MLOps"],
    details: [
      "Kaggle ML notebooks:",
    ],
    links: [
      { label: "EmergencyCare Navigator agent", url: "https://www.kaggle.com/code/sabasiddiquedev/emergency-care-navigator-agent" },
      { label: "HR promotion readiness", url: "https://www.kaggle.com/code/sabasiddiquedev/hr-promotion-readiness" },
      { label: "Real estate market insight (Zameen.com)", url: "https://www.kaggle.com/code/sabasiddiquedev/real-estate-market-insight-zameen-com" },
      { label: "UCI forest covertype", url: "https://www.kaggle.com/code/sabasiddiquedev/uci-forest-covertype" },
      { label: "AgriVision: automated fruit classification", url: "https://www.kaggle.com/code/sabasiddiquedev/agrivision-automated-fruit-classification" },
      { label: "IMDB text classification", url: "https://www.kaggle.com/code/sabasiddiquedev/imdb-text-classification" },
    ],
    footnote: "Also: EmergencyCare Navigator capstone (Kaggle Agents Intensive, Dec 2025).",
  },
  {
    id: "volmatica",
    period: "Jan 2026 – Present",
    title: "Leading AI product work",
    summary: "Full-Stack AI Engineer and Project Lead at Volmatica.",
    chips: ["Project Lead", "Full-Stack AI Engineer"],
  },
  {
    id: "ai-security",
    period: "Aug 2026",
    title: "AI security research",
    summary:
      "Kaggle \"AI Agent Security: Multi-Step Tool Attacks\" (OpenAI / Google / IEEE): ranked 576 of 4186 (top 14%).",
    chips: ["Kaggle", "Top 14%", "Red-Team Search"],
    details: ["Writeup: Structured Red-Team Search for Multi-Step Tool Attacks on AI Agents."],
    links: [
      { label: "Read the writeup", url: "https://www.kaggle.com/writeups/sabasiddiquedev/structured-red-team-search" },
    ],
  },
]
