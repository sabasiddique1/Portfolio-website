/**
 * Single source of truth for identity, positioning and site-wide copy.
 * Every component and the metadata/JSON-LD layer read from here.
 */
export const site = {
  name: "Saba Siddique",
  role: "Full-Stack AI Engineer",
  url: "https://saba-siddique-portfolio.vercel.app",
  location: "Rawalpindi, Pakistan",
  email: "sabasiddiqdev@gmail.com",

  employer: {
    name: "Volmatica",
    title: "Full-Stack AI Engineer (Project Lead)",
  },

  links: {
    linkedin: "https://www.linkedin.com/in/sabasiddiq",
    github: "https://github.com/sabasiddique1",
    kaggle: "https://www.kaggle.com/sabasiddiquedev",
    orcid: "https://orcid.org/0009-0005-4851-5200",
  },

  /** Top nav. "Projects" is its own page; the rest are home-page sections. */
  nav: [
    { label: "Projects", href: "/projects" },
    { label: "Journey", href: "/#journey" },
    { label: "Experience", href: "/#experience" },
    { label: "Contact", href: "/#contact" },
  ],

  /** One-line muted subtitles under each section title. */
  sections: {
    featured: "Two things I'd show first.",
    alsoBuilding: "Side projects that are live.",
    journey: "Frontend intern in 2022 to leading an AI team in 2026.",
    experience: "Where the four years went.",
    contact: "Email is fastest.",
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
    badge: "AI Engineer · Rawalpindi, Pakistan",
    h1: "Saba Siddique — AI Engineer",
    line: "AI Engineer — agentic AI, ML, and AI security for high-trust systems.",
    subline:
      "Four years of engineering, three years building and evaluating LLM systems. I build agentic AI and test how it fails.",
    chips: ["4 yrs engineering", "3 yrs AI/LLM", "Project Lead at Volmatica"],

    /** Round 3 hero: name as the H1, role line, one intro paragraph. No em dashes in visible hero copy. */
    intro:
      "I build AI products end to end: voice agents that answer real calls, RAG pipelines that stay accurate in production, and the security layer that stops an agent being talked out of its instructions. Four years shipping production software, the last three on LLM systems. Right now I lead an AI product team at Volmatica and contribute to NumPy, SciPy, pandas and sktime. I build agentic AI and test how it fails.",
    primaryCta: { label: "View projects", href: "/projects" },
    secondaryCta: { label: "Get in touch", href: "#contact" },
    stats: [
      { value: "4 yrs", label: "Engineering" },
      { value: "3 yrs", label: "AI / LLM systems" },
      { value: "Project Lead", label: "Volmatica" },
      { value: "6", label: "Open-source libraries" },
    ],
  },

  about: {
    paragraphs: [
      "I'm an AI engineer with four years of engineering experience, three of them building and evaluating LLM systems. I started on the frontend at Wanclouds in 2022, building cloud and security dashboards, moved into full-stack product work, and now lead a small team at Volmatica building an AI interview assistant with real-time speech-to-text and LLM responses.",
      "I work across Python, FastAPI, React and Next.js, and I care about AI systems that are observable, secure and hold up in production. Outside work I contribute to open-source Python libraries and build projects in AI security, healthcare AI and computational medicine.",
    ],
    photo: "/ChatGPT Image Dec 23, 2025, 02_41_59 PM.png",
    photoAlt: "Portrait of Saba Siddique, AI Engineer",
  },

  contact: {
    heading: "Get in touch",
    line: "If you'd like to talk about any of this work, send a message here or email me directly.",
    mailtoSubject: "Hello from your portfolio",
  },
} as const

export const mailto = `mailto:${site.email}?subject=${encodeURIComponent(site.contact.mailtoSubject)}`
