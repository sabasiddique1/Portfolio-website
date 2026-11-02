/**
 * Single source of truth for identity, positioning and site-wide copy.
 * Every component and the metadata/JSON-LD layer read from here.
 */
export const site = {
  name: "Saba Siddique",
  role: "Full-Stack AI Engineer",
  /** Wordmark in the top-left of the nav. */
  brand: "portfolio.",
  url: "https://saba-siddique-portfolio.vercel.app",
  location: "Rawalpindi, Pakistan",
  email: "sabasiddiqdev@gmail.com",

  employer: {
    name: "Volmatica",
    title: "Full-Stack AI Engineer",
  },

  links: {
    linkedin: "https://www.linkedin.com/in/sabasiddiq",
    github: "https://github.com/sabasiddique1",
    kaggle: "https://www.kaggle.com/sabasiddiquedev",
    orcid: "https://orcid.org/0009-0005-4851-5200",
  },

  /** Top nav. "Projects" and "Journey" are their own pages; the rest are home-page sections. */
  nav: [
    { label: "Projects", href: "/projects" },
    { label: "Journey", href: "/journey" },
    { label: "Experience", href: "/#experience" },
    { label: "Contact", href: "/#contact" },
  ],

  /** One-line muted subtitles under each section title. */
  sections: {
    featured: "Two things I'd show first.",
    alsoBuilding: "Side projects that are live.",
    journey: "Frontend intern in 2022 to full-stack AI engineer in 2026.",
    experience: "Where the four years went.",
    education: "Biotechnology first, then data science and AI.",
    research: "Areas I'd like to work on.",
    contact: "Email is fastest.",
  },

  /** Research interest only: no claims about specific or ongoing work. Topics come from the keyword list. */
  research: {
    title: "Research",
    line: "I'm interested in research on AI security, agentic systems, healthcare AI and computational medicine.",
    topics: [
      { label: "AI security", tone: "purple" },
      { label: "Agentic AI", tone: "green" },
      { label: "Healthcare AI", tone: "orange" },
      { label: "Computational medicine", tone: "orange" },
      { label: "Machine learning", tone: "blue" },
    ],
  },

  footerTagline: "Production is the only benchmark I trust.",

  /** Footer profile links, in order. */
  footerLinks: [
    { label: "GitHub", href: "https://github.com/sabasiddique1" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/sabasiddiq" },
    { label: "Kaggle", href: "https://www.kaggle.com/sabasiddiquedev" },
    { label: "ORCID", href: "https://orcid.org/0009-0005-4851-5200" },
  ],

  seo: {
    title: "Saba Siddique | Full-Stack AI Engineer — Agentic AI, ML & AI Security",
    description:
      "AI engineer with 4 years of engineering and 3 years building and evaluating LLM systems: agentic AI, machine learning, AI security and healthcare AI. Python, FastAPI, Next.js.",
    keywords: [
      "AI engineer",
      "agentic AI",
      "AI security",
      "LLM red-teaming",
      "machine learning",
      "healthcare AI",
      "computational medicine",
      "Python",
      "FastAPI",
      "Next.js",
      "React",
      "TypeScript",
    ],
    ogImageAlt: "Saba Siddique, Full-Stack AI Engineer: agentic AI, machine learning and AI security",
  },

  hero: {
    /** Three short lines that rotate under the role. Each one is a thing I actually build. */
    focus: ["Agentic AI", "AI security", "Healthcare AI", "RAG in production"],
    /** Name as the H1, role line, one intro paragraph. No em dashes in visible hero copy. */
    intro:
      "I build AI products end to end: voice agents that answer real calls, RAG pipelines that stay accurate in production, and the security layer that stops an agent being talked out of its instructions. Four years shipping production software, the last three on LLM systems. Right now I build AI products at Volmatica and contribute to NumPy, SciPy, pandas and sktime. I build agentic AI and test how it fails.",
    primaryCta: { label: "View projects", href: "/projects" },
    secondaryCta: { label: "Get in touch", href: "#contact" },
    /** Caption under the video showcase. */
    showcaseLabel: "Live from the two featured projects",
    stats: [
      { value: "4 yrs", label: "Engineering" },
      { value: "3 yrs", label: "AI / LLM systems" },
      { value: "Top 14%", label: "Kaggle AI agent security" },
      { value: "8", label: "Open-source libraries" },
    ],
  },

  contact: {
    heading: "Get in touch",
    line: "If you'd like to talk about any of this work, send a message here or email me directly.",
    mailtoSubject: "Hello from your portfolio",
  },
} as const

export const mailto = `mailto:${site.email}?subject=${encodeURIComponent(site.contact.mailtoSubject)}`
