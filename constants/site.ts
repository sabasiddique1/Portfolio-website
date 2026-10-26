/**
 * Single source of truth for identity, positioning and site-wide copy.
 * Every component and the metadata/JSON-LD layer read from here.
 */
export const site = {
  name: "Saba Siddique",
  role: "AI Engineer",
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
  },

  seo: {
    title: "Saba Siddique | AI Engineer — Agentic AI, ML & AI Security",
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
    ogImageAlt: "Saba Siddique — AI Engineer: agentic AI, machine learning and AI security",
  },

  hero: {
    badge: "AI Engineer · Rawalpindi, Pakistan",
    h1: "Saba Siddique — AI Engineer",
    line: "AI Engineer — agentic AI, ML, and AI security for high-trust systems.",
    subline:
      "Four years of engineering, three years building and evaluating LLM systems. I build agentic AI and test how it fails.",
    chips: ["4 yrs engineering", "3 yrs AI/LLM", "Project Lead at Volmatica"],
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
