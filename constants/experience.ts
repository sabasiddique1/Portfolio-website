/** Dates match LinkedIn exactly. Do not round or reformat. */
export type ExperienceRole = {
  id: string
  title: string
  company: string
  period: string
  location: string
  current?: boolean
  /** Shown on the collapsed row. */
  highlight: string
  /** 2–3 chips for the table row; only words that already appear in the role's own text. */
  chips: string[]
  /** Shown when expanded. */
  bullets: string[]
}

export const experience: ExperienceRole[] = [
  {
    id: "volmatica",
    title: "Full-Stack AI Engineer",
    company: "Volmatica",
    period: "Jan 2026 – Present",
    location: "Rawalpindi, On-site",
    current: true,
    highlight: "AI interview assistant desktop app with real-time speech-to-text and LLM responses.",
    chips: ["Whisper", "FastAPI", "OpenTelemetry"],
    bullets: [
      "AI interview assistant desktop app: real-time speech-to-text (Whisper, Speechmatics) feeding LLM response workflows; Electron + React + FastAPI; OpenTelemetry, Grafana Tempo, Prometheus.",
      "Agentic customer-service system: multi-agent workflow with tool use, approval gates and tracing.",
      "Production scraping pipeline with scheduling, retries and monitoring.",
      "Voice agent for client operations.",
    ],
  },
  {
    id: "xnerds",
    title: "Full Stack Engineer (AI-focused)",
    company: "xNerds Solutions",
    period: "Aug 2025 – Jan 2026",
    location: "Lahore, Hybrid",
    highlight: "~25% frontend performance improvement; 40%+ less manual work through automation.",
    chips: ["Next.js", "RAG/LLM", "Node.js"],
    bullets: [
      "AI-enabled fintech/crypto dashboards with React, Next.js, Node.js, REST APIs, Tailwind CSS, shadcn/ui.",
      "RAG/LLM-based market trend analysis and personalized trading insights.",
      "Automated payment and transaction workflows.",
    ],
  },
  {
    id: "devsloop",
    title: "Software Engineer",
    company: "Devsloop Technologies",
    period: "May 2025 – Aug 2025",
    location: "Remote",
    highlight: "40% faster load speed on React/Next.js apps.",
    chips: ["React/Next.js", "AI-assisted content", "Figma-to-code"],
    bullets: [
      "AI-assisted content and writing workflows, cutting content creation time by 30–35%.",
      "Lead-generation automation that increased qualified leads by 20%+.",
      "Figma-to-code delivery time reduced by 30%.",
    ],
  },
  {
    id: "wanclouds-se",
    title: "Software Engineer",
    company: "Wanclouds Inc.",
    period: "Mar 2023 – May 2025",
    location: "Islamabad, Hybrid",
    highlight: "28% dashboard performance improvement; 100+ product bugs resolved.",
    chips: ["React", "TypeScript", "Ant Design"],
    bullets: [
      "Cloud, security and AI-powered SaaS products: VPC+, SecMon, WhisperAI, Wanclouds Bot.",
      "React, Next.js, TypeScript, Ant Design, Tailwind CSS, Node.js, REST APIs.",
      "Reusable UI components that cut development time by 20%+.",
    ],
  },
  {
    id: "wanclouds-intern",
    title: "Software Engineer Intern",
    company: "Wanclouds Inc.",
    period: "Dec 2022 – Mar 2023",
    location: "Islamabad, On-site",
    highlight: "Frontend screens, bug fixing and API integration for cloud SaaS dashboards.",
    chips: ["Frontend", "API integration"],
    bullets: [],
  },
]

export type EducationEntry = {
  id: string
  title: string
  institution: string
  period: string
}

export const education: EducationEntry[] = [
  {
    id: "atomcamp",
    title: "Data Science & AI Bootcamp",
    institution: "Atomcamp × NUST",
    period: "Sep 2025 – Mar 2026",
  },
  {
    id: "fjwu",
    title: "BS Biotechnology",
    institution: "Fatima Jinnah Women University, Rawalpindi",
    period: "Oct 2018 – Oct 2022",
  },
]
