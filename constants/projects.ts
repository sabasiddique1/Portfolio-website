import { generateSlug } from "@/lib/utils"

export type ProjectLink = { label: string; url: string }

/** "ai" = the AI work; "earlier" = earlier web work. */
export type ProjectGroup = "ai" | "earlier"

/** Category for the coloured lucide icon (see components/category-icon.tsx). */
export type ProjectKind = "agents" | "healthcare" | "ml" | "research" | "voice" | "fullstack"

/** "card" = feature card (home + /projects "AI work"); "row" = table row in /projects "More projects". */
export type ProjectDisplay = "card" | "row"

export type Project = {
  id: number
  slug: string
  title: string
  /** One line, shown on the collapsed card and in listings. */
  description: string
  group: ProjectGroup
  /** Defaults to "fullstack" (see getProjectKind). */
  kind?: ProjectKind
  /** Defaults to "card" for AI work and "row" for earlier work (see getProjectDisplay). */
  display?: ProjectDisplay
  /** Shown on the home page. Exactly two projects carry this. */
  featured?: boolean
  /** Small label above the title, e.g. "Volmatica". */
  label?: string
  /** The single chip on the collapsed card. */
  highlight?: string
  period?: string
  category: string
  projectType: string
  /** Stack. The collapsed card shows the first four. */
  technologies: string[]
  /** Expanded card: "Problem". Optional for company projects. */
  problem?: string
  /** Expanded card: "What I built". */
  built?: string[]
  /** Extra links beyond repo/live (notebook, writeup). */
  links?: ProjectLink[]
  githubUrl?: string
  demoUrl?: string
  /** Card visual under public/ (e.g. /projects/<slug>.webp); a generated cover is shown while the file is missing. */
  image?: string
  imageAlt?: string
  /** Screenshot carousel on the case-study page. */
  images?: string[]
  /** Aspect ratio of `images`; default "3/2". Mixed ratios use "4/3" with object-contain. */
  imageAspect?: "3/2" | "4/3" | "16/9"
  /**
   * Short silent loop under public/media for the hero showcase. Self-hosted only (never a third-party URL);
   * the poster is the first frame so the switch from image to video is seamless.
   */
  video?: { src: string; poster: string; durationSeconds: number }
  color?: string
}

export function getProjectKind(project: Project): ProjectKind {
  return project.kind ?? "fullstack"
}

export function getProjectDisplay(project: Project): ProjectDisplay {
  return project.display ?? (project.group === "ai" ? "card" : "row")
}

/** Repo / live / extra links in display order. */
export function getProjectLinks(project: Project): ProjectLink[] {
  const links: ProjectLink[] = []
  if (project.githubUrl) links.push({ label: "Repo", url: project.githubUrl })
  if (project.demoUrl && project.demoUrl !== "#") links.push({ label: "Live", url: project.demoUrl })
  if (project.links) links.push(...project.links)
  return links
}

export const projects: Project[] = [
  // ───────────────────────────── AI work ─────────────────────────────
  {
    id: 101,
    slug: "trace-guard-ai",
    title: "TraceGuard AI",
    description: "Open-source red-team harness for RAG and agentic AI systems.",
    group: "ai",
    kind: "agents",
    display: "card",
    featured: true,
    highlight: "LLM red-teaming",
    category: "AI security",
    projectType: "Open source · MIT",
    technologies: ["Python", "FastAPI", "Next.js", "TypeScript", "Tailwind CSS", "Pydantic", "pytest", "GitHub Actions", "OWASP LLM Top 10"],
    problem:
      "Most tools test prompt injection by pasting the attack into the model's context. Real attacks don't get that shortcut: a poisoned document has to survive indexing and retrieval before it reaches the model at all.",
    built: [
      "Poisons the corpus instead of the context and tests whether the attack survives the real retrieval path. A canary token planted in the document showing up in the output is the evidence the whole path completed.",
      "A normalizer (NFKC, homoglyph folding, zero-width stripping, bounded base64/hex/ROT13 decoding) feeding seven detector families: instruction override, structural injection, exfiltration, PII, unauthorized action, tool poisoning and source confusion.",
      "A scored policy engine with strict, balanced and permissive packs. Every decision carries a plain-English rationale, findings are mapped to the OWASP LLM Top 10, and uploaded documents start untrusted, so trust changes how findings are scored.",
      "A benign corpus measured alongside attacks, so false-positive rate is reported next to recall. A mutation engine expands 91 base cases to 1,200+ through 17 seeded evasion mutators.",
      "Red-teamed itself with blind holdouts written independently from the threat model: 25% recall at first, 88.9% after two rebuilds, and 38.5% on a second holdout with fresh wordings. Both numbers are published. 333 tests on Python 3.11, 3.12 and 3.14, with pip-audit as a CI gate.",
    ],
    githubUrl: "https://github.com/sabasiddique1/trace-guard-ai",
    image: "/projects/trace-guard-ai.webp",
    imageAlt: "TraceGuard AI: red-team harness for RAG and AI agents, with the attack table, blind-holdout recall and the trace pipeline",
    images: ["/projects/trace-guard-ai.webp", "/projects/trace-guard-ai-2.webp"],
    imageAspect: "4/3",
    video: { src: "/media/trace-guard-ai.mp4", poster: "/media/trace-guard-ai-poster.webp", durationSeconds: 24 },
    color: "#5b3df5",
  },
  {
    id: 102,
    slug: "redisense",
    title: "RediSense",
    description: "AI clinical copilot: report analysis, symptom triage, evidence search, patient timeline and copilot chat.",
    group: "ai",
    kind: "healthcare",
    display: "card",
    featured: true,
    highlight: "Healthcare AI",
    category: "Healthcare AI",
    projectType: "Atomcamp × NUST bootcamp capstone",
    technologies: ["FastAPI", "Next.js", "PostgreSQL", "pgvector", "Python", "TypeScript", "SQLAlchemy", "Alembic", "OpenAI API"],
    problem:
      "Capstone for the Atomcamp × NUST Data Science & AI Bootcamp: a clinical copilot that brings medical report analysis, symptom triage and evidence lookup into one workflow for healthcare teams.",
    built: [
      "Medical report upload and analysis, symptom triage and a per-patient timeline, each persisted and written as timeline events.",
      "Evidence search over a locally ingested dataset using Postgres with pgvector, and a copilot chat with database-backed conversations and optional patient context.",
      "Risk-prioritised reports dashboard and severity-based triage views.",
      "FastAPI backend with SQLAlchemy and Alembic migrations, Next.js App Router frontend, and a demo mode that falls back to curated mock data when the backend is unavailable. Shipped with CI.",
      "Keeps working without an OpenAI key by using conservative heuristic fallbacks for analysis, triage, copilot and embeddings.",
    ],
    githubUrl: "https://github.com/sabasiddique1/redi_Sense_ai",
    demoUrl: "https://redi-sense-ai.vercel.app",
    image: "/projects/redisense.webp",
    imageAlt: "RediSense: every critical value flagged, every answer cited; severity scale and a cited report analysis",
    images: ["/projects/redisense.webp", "/projects/redisense-2.webp", "/projects/redisense-3.webp"],
    imageAspect: "4/3",
    video: { src: "/media/redisense.mp4", poster: "/media/redisense-poster.webp", durationSeconds: 8 },
    color: "#1a8a7a",
  },
  {
    id: 106,
    slug: "clinical-review-intelligence",
    title: "Clinical Review Intelligence System",
    description: "Enterprise RAG for pharmacy policy review: every answer cited to the document and page, or an explicit abstention.",
    group: "ai",
    kind: "healthcare",
    display: "card",
    label: "Enterprise client · retail and specialty pharmacy",
    highlight: "Enterprise RAG",
    category: "Healthcare AI · RAG",
    projectType: "Enterprise project",
    technologies: [
      "Python",
      "LangGraph",
      "MCP",
      "FastAPI",
      "React",
      "Amazon Bedrock",
      "Claude Sonnet",
      "OpenSearch Serverless",
      "Titan Embeddings",
      "AWS Textract",
      "DynamoDB",
      "Amazon EKS",
      "Argo CD",
      "Jenkins",
      "GitHub Actions",
      "Langfuse",
      "Prometheus",
      "Grafana",
      "pytest",
    ],
    problem:
      "Pharmacists and clinical reviewers answer policy questions all day: drug interactions, dosing, prior authorization and step-therapy criteria, FDA label lookups. The sources were scattered across SharePoint, shared drives, PDFs and scans, so one answer meant searching several systems and cross-checking. The system had to answer only from approved sources, cite the exact document and page, and say clearly when the evidence does not exist. It does not dispense and does not make the clinical decision; the pharmacist does.",
    built: [
      "Owned the retrieval layer: the Knowledge Agent inside a LangGraph orchestrator, the MCP retrieval tools, the OpenSearch index and the evaluation harness.",
      "Hybrid retrieval over Amazon OpenSearch Serverless: BM25 plus k-NN on Titan Text Embeddings V2, pre-filtered by line of business, document type and version, fused with Reciprocal Rank Fusion and reranked with a cross-encoder before the top chunks reach the model.",
      "A stateless MCP server as the tool boundary. It re-validates the user's JWT on every call, intersects the requested lines of business with what that user may read, and fails closed, so an unauthorised document is never a candidate.",
      "Offline ingestion: AWS Textract OCR with confidence thresholds and a quarantine queue, normalisation to Markdown with page markers, structural then semantic chunking with tables kept whole, drug entities normalised to RxNorm, and incremental sync that marks old versions superseded.",
      "Grounded generation with Claude Sonnet on Amazon Bedrock at temperature 0: every claim cites a chunk, numbers are quoted verbatim, and a validation node checks each citation before the answer goes out. Otherwise the system abstains and says what it searched.",
      "Shipped on Amazon EKS with Argo CD, Jenkins and GitHub Actions. A gold evaluation set written with pharmacists gates every retrieval and prompt change in CI; Langfuse, New Relic, Prometheus and Grafana for traces and metrics.",
    ],
    image: "/projects/clinical-review-intelligence.webp",
    imageAlt: "Clinical Review Intelligence System: hybrid retrieval, MCP tool boundary and cited answers for pharmacy policy review",
    color: "#1a8a7a",
  },
  {
    id: 103,
    slug: "serviceflow-voiceops",
    title: "ServiceFlow VoiceOps",
    description: "AI voice receptionist for HVAC and plumbing that triages emergencies and books real appointments.",
    group: "ai",
    kind: "voice",
    display: "row",
    highlight: "AI voice agent",
    category: "AI voice agent",
    projectType: "Portfolio project",
    technologies: ["Vapi", "GPT-4o", "Deepgram", "ElevenLabs", "Cal.com API", "Node.js", "Express", "Vercel"],
    problem:
      "An inbound service line has to tell an emergency from a routine booking in the first seconds of a call, and a booking agent that confidently confirms an appointment it never created is the worst failure it can have.",
    built: [
      "Inbound voice agent on Vapi with GPT-4o for intent and tool calls, Deepgram nova-3 speech-to-text and ElevenLabs flash v2.5 text-to-speech.",
      "Intent triage: emergencies, requests for a human, or two failures route to a live transfer to an on-call technician. Service requests collect issue, address, name and phone, then move to booking.",
      "Live availability pulled from the Cal.com v2 API at call time. The server validates every startTime against live slots before creating the booking, so the model never invents an appointment time.",
      "Node/Express webhook on Vercel. Serverless cold starts re-fetch slots instead of skipping validation, API failures surface as an apology plus a transfer offer, and 23 offline tests run without credentials.",
    ],
    githubUrl: "https://github.com/sabasiddique1/service-flow-ops",
    image: "/projects/serviceflow-voiceops.png",
    imageAlt: "ServiceFlow VoiceOps call flow: triage, live Cal.com availability and validated booking",
    color: "#00F5FF",
  },
  {
    id: 104,
    slug: "emergencycare-navigator",
    title: "EmergencyCare Navigator",
    description: "Multi-agent emergency triage that routes to the best facility and produces a clinician-ready SBAR handoff.",
    group: "ai",
    kind: "agents",
    display: "card",
    highlight: "Multi-agent system",
    period: "Dec 2025",
    category: "Healthcare AI · agents",
    projectType: "Kaggle Agents Intensive capstone",
    technologies: ["Python", "Pydantic", "Nominatim", "OSRM", "Gemini", "Multi-agent"],
    problem:
      "In a medical emergency people lose minutes to three questions: what matters right now, where to go, and what to tell the hospital so it can prepare. The goal was to cut that thinking-and-searching time while keeping triage conservative and rule-based.",
    built: [
      "Four agents in sequence: IntakeAgent (short structured questions) → rule-based TriageAgent (safety-first escalation) → FacilityFinderAgent (Nominatim geocoding and facility search, OSRM ETA routing, distance-only fallback) → CoordinatorAgent (session state, SBAR handoff, approval flow).",
      "Emergency mode creates a pre-arrival hospital alert and pauses until the hospital acknowledges it; non-emergency mode generates a simulated appointment request. The same session continues with no context loss.",
      "session_id state plus a small JSON MemoryBank for minimal preferences; a trace_id per run, structured tool-call, error and retry logs, and metrics counters.",
      "Optional Gemini for calmer explanations; the triage decision never depends on the LLM. Six deterministic eval cases: chest pain, stroke signs, anaphylaxis, major bleeding, head trauma, mild fever.",
      "Not medical advice. Hospital alerts and bookings are simulated.",
    ],
    githubUrl: "https://github.com/sabasiddique1/emergency_care_navigator",
    links: [{ label: "Notebook", url: "https://www.kaggle.com/code/sabasiddiquedev/emergency-care-navigator-agent" }],
    image: "/projects/emergencycare-navigator.png",
    imageAlt: "EmergencyCare Navigator agent pipeline: intake, triage, facility finder and SBAR handoff",
    color: "#B026FF",
  },
  {
    id: 105,
    slug: "cuepilot",
    title: "CuePilot",
    description: "AI interview assistant desktop app with real-time transcription and LLM-driven responses.",
    group: "ai",
    kind: "fullstack",
    display: "card",
    label: "Volmatica",
    highlight: "Real-time STT + LLM",
    period: "Jan 2026 – Present",
    category: "AI product",
    projectType: "Company project",
    technologies: ["Python", "FastAPI", "Electron", "React", "TypeScript", "Vite", "OpenTelemetry", "Langfuse", "Grafana Tempo", "Prometheus"],
    built: [
      "Real-time speech-to-text pipelines with Whisper and Speechmatics feeding LLM response workflows.",
      "Backend services and a cross-platform desktop client: Python, FastAPI, Electron, React, TypeScript, Vite.",
      "End-to-end logging, tracing and metrics with OpenTelemetry, Grafana Tempo, Prometheus and Langfuse.",
      "Established the product design system, code reviews and release quality.",
    ],
    image: "/projects/cuepilot.png",
    imageAlt: "CuePilot desktop app with live interview transcript and LLM response panel",
    color: "#00F5FF",
  },
  {
    id: 107,
    slug: "sift",
    title: "Sift",
    description: "Job-discovery pipeline: 12 public sources in, deduped and scored for fit and eligibility, a ranked feed out every morning.",
    group: "ai",
    kind: "ml",
    display: "card",
    highlight: "Data pipeline",
    category: "Data pipelines and automation",
    projectType: "Personal project",
    technologies: ["Python", "Requests", "Playwright", "SQLite", "GitHub Actions", "pytest", "REST APIs", "RSS", "Excel"],
    problem:
      "Finding jobs was never the bottleneck; finding the ones that can actually hire you is. Most \"remote\" postings are region-locked, so a feed that only matches on role wastes the morning on roles you are not eligible for.",
    built: [
      "Collects from 12 sources: Greenhouse, Lever, Ashby and Workable ATS APIs per company, plus Himalayas, We Work Remotely RSS, Jobicy, Arbeitnow, Remotive, RemoteOK and Hacker News Who is hiring. Every source runs in isolation, so one broken board never kills the run.",
      "Normalises everything to one schema (title, company, location, salary, employment type, posted date) and dedupes with a SHA-1 fingerprint: 52k postings fetched became 5,518 unique jobs, with first-seen and last-seen history.",
      "Scores each posting on 7 weighted signals (role fit, eligibility, niche, freshness, seniority, contractor-friendly, salary and stack). Eligibility weighs as much as fit because only 4.6% of the \"remote\" postings hire worldwide. Every score explains itself.",
      "Exports to SQLite, JSON, XLSX and an HTML dashboard with a status dropdown, notes and CSV export. Runs unattended on GitHub Actions every morning; each run logs fetched, kept, new and error counts per source.",
      "The same collect, normalise, dedupe and score engine runs over a company list for lead enrichment: domain, firmographics, tech and hiring signals, a fit score, CSV or Sheets out. Company-level public data only, rate-limited, robots.txt respected.",
      "pytest covers the scoring model; a config file tunes minimum score, maximum age, stack keywords and niche weights.",
    ],
    image: "/projects/sift.webp",
    imageAlt: "Sift: 600 postings in, the 17 that matter out; ranked feed with scores and a daily phone view",
    images: ["/projects/sift.webp", "/projects/sift-2.webp", "/projects/sift-3.webp", "/projects/sift-4.webp"],
    imageAspect: "4/3",
    color: "#5fd4b4",
  },

  // ─────────────────────────── Earlier work ───────────────────────────
  {
    id: 1,
    title: "Financial Dashboard – Supabase Integration",
    description: "Responsive dashboard with Supabase integration for authentication, realtime updates, and storage. Built using Next.js, TailwindCSS, and ShadCN components.",
    group: "earlier",
    category: "Cross-platform",
    projectType: "Personal Project",
    technologies: ["React 19", "Next.js 15", "Supabase", "TailwindCSS", "ShadCN", "TypeScript"],
    githubUrl: "https://github.com/sabasiddique1/financial-dashboard-supabase",
    demoUrl: "https://financial-dashboard-supabase-r2su.vercel.app/",
    slug: generateSlug("Financial Dashboard – Supabase Integration"),
    color: "#00F5FF",
    image: "/financial.png",
    images: ["/financial.png", "/financial2.png"],
  },
  {
    id: 2,
    title: "Vaultix - Cloud Storage App",
    description: "A cloud storage app for easy file management with secure sharing options. Built with high scalability and modern web technologies.",
    group: "earlier",
    category: "Cross-platform",
    projectType: "Personal Project",
    technologies: ["React 19", "Next.js 15", "Appwrite", "TailwindCSS", "ShadCN", "TypeScript"],
    githubUrl: "https://github.com/sabasiddique1/Vaultix.git",
    demoUrl: "https://vaultix-5ndl.vercel.app/sign-in",
    slug: generateSlug("Vaultix - Cloud Storage App"),
    color: "#B026FF",
    image: "/vault.png",
    images: ["/vault.png", "/vault3.png"],
  },
  {
    id: 3,
    title: "Task Management App",
    description: "A simple yet effective task management tool to help users track and organize their daily tasks. Features real-time collaboration and intuitive task organization.",
    group: "earlier",
    category: "Cross-platform",
    projectType: "Collaborative Project",
    technologies: ["Vercel", "Next.js", "TailwindCSS", "ShadCN"],
    githubUrl: "https://github.com/sabasiddique1/Task_Management_App_MERN.git",
    demoUrl: "https://v0-mern-task-management-rho.vercel.app/login",
    slug: generateSlug("Task Management App"),
    color: "#00F5FF",
    image: "/task.png",
    images: ["/task.png", "/task2.png"],
  },
  {
    id: 4,
    title: "Rapid API Hub Clone",
    description: "RapidAPI Hub clone with API browsing and testing flows. Built with Next.js, TypeScript, and TailwindCSS for a smooth developer experience.",
    group: "earlier",
    category: "Cross-platform",
    projectType: "Collaborative Project",
    technologies: ["Vercel", "Next.js", "TailwindCSS", "ShadCN", "Axios"],
    githubUrl: "https://github.com/sabasiddique1/rapid-api-hub",
    demoUrl: "https://rapid-api-hub.vercel.app/",
    slug: generateSlug("Rapid API Hub Clone"),
    color: "#B026FF",
    image: "/rapid.png",
    images: ["/rapid.png", "/rapid2.png"],
  },
  {
    id: 5,
    title: "Web Scraping App",
    description: "A web scraping app that extracts valuable data from websites for analysis and research. Features intuitive configuration and real-time data visualization.",
    group: "earlier",
    category: "Cross-platform",
    projectType: "Collaborative Project",
    technologies: ["Vercel", "Next.js", "TailwindCSS", "ShadCN"],
    githubUrl: "https://github.com/Aniketsy/Web_Scrapper_App.git",
    demoUrl: "https://web-scrapper-app-kappa.vercel.app/",
    slug: generateSlug("Web Scraping App"),
    color: "#00F5FF",
    image: "/scrape.png",
    images: ["/scrape.png", "/scrape2.png"],
  },
  {
    id: 6,
    title: "NFT Detail Page – Web3 UI",
    description: "Built NFT detail UI with Next.js and TailwindCSS. Features countdown timer and comprehensive metadata display for Web3 interactions.",
    group: "earlier",
    category: "Cross-Platform",
    projectType: "Personal Project",
    technologies: ["Next.js", "TailwindCSS", "React lucide"],
    githubUrl: "https://github.com/sabasiddique1/nft-detail-screen.git",
    demoUrl: "https://nft-detail-screen.vercel.app/",
    slug: generateSlug("NFT Detail Page – Web3 UI"),
    color: "#B026FF",
    image: "/nft.png",
    images: ["/nft.png", "/nft2.png"],
  },
  {
    id: 8,
    title: "Pokedex - Pokemon App",
    description: "A fun and interactive Pokedex app that allows users to explore and search through a collection of Pokemon. Integrated with Pokemon API for comprehensive data and detailed information pages.",
    group: "earlier",
    category: "Web App",
    projectType: "Personal Project",
    technologies: ["Node.js", "React", "CSS"],
    githubUrl: "https://github.com/sabasiddique1/Pokedex_App.git",
    demoUrl: "https://pokedex-app-sigma-silk.vercel.app/pokemon",
    slug: generateSlug("Pokedex - Pokemon App"),
    color: "#B026FF",
    image: "/pokemon.png",
    images: ["/pokemon.png", "/pokemon2.png"],
  },
  {
    id: 9,
    title: "Miniature App",
    description: "A collection of small, functional web apps built with JavaScript to demonstrate core logic and UI concepts. Each app is self-contained and showcases specific programming patterns in a lightweight format.",
    group: "earlier",
    category: "Web App",
    projectType: "Personal Project",
    technologies: ["JavaScript", "HTML", "CSS"],
    githubUrl: "https://github.com/sabasiddique1/miniatureapps.git",
    demoUrl: "https://miniatureapps.vercel.app/",
    slug: generateSlug("Miniature App"),
    color: "#00F5FF",
    image: "/mini.png",
    images: ["/mini.png", "/mini2.png"],
  },
  {
    id: 11,
    title: "VPC+",
    description: "Cloud-based SaaS for end-to-end multi-cloud migrations, disaster recovery, cost optimization, and compliance tracking. Fixed critical bugs and improved overall platform stability and performance.",
    group: "earlier",
    category: "Web App",
    projectType: "Company Project",
    technologies: ["React.js", "Node.js", "PostgreSQL", "TailwindCSS"],
    demoUrl: "https://www.wanclouds.net/vpc+",
    slug: generateSlug("VPC+"),
    color: "#00F5FF",
    image: "/vpc+.png",
  },
  {
    id: 13,
    title: "EasyLlama",
    description: "Compliance training platform that is fully compliant with state laws and accessible 24/7 on PC and phone. Features real-life scenarios, quizzes, high-quality videos, and HR tool integration.",
    group: "earlier",
    category: "Company Project",
    projectType: "Company Project",
    technologies: ["Next.js", "TailwindCSS", "ShadCN"],
    demoUrl: "https://www.easyllama.com/",
    slug: generateSlug("EasyLlama"),
    color: "#00F5FF",
    image: "/easyllama.png",
  },
  {
    id: 14,
    title: "SendScale",
    description: "Break through Gmail's daily limits with SendScale's automated email warm-up and smart campaign builder. Features unified inbox for cold email outreach with monitoring and error tracking.",
    group: "earlier",
    category: "Company Project",
    projectType: "Company Project",
    technologies: ["Next.js", "NestJS", "Ant Design", "TailwindCSS", "Sentry"],
    demoUrl: "https://sendscale.ai/",
    slug: generateSlug("SendScale"),
    color: "#B026FF",
    image: "/sendscale.png",
  },
  {
    id: 17,
    title: "Smodin",
    description: "Uncover AI-written text and transform it into undetectable, human-like writing. Detect and bypass AI confidently with Smodin's intelligent tools and advanced content analysis capabilities.",
    group: "earlier",
    category: "Web App",
    projectType: "Company Project",
    technologies: ["React.js", "Next.js", "TailwindCSS", "AI Integration"],
    demoUrl: "https://smodin.io/",
    slug: generateSlug("Smodin"),
    color: "#00F5FF",
    image: "/smodin.png",
  },
  {
    id: 18,
    title: "Rewritely",
    description: "Undetectable AI Writer and Humanizer platform for content transformation. Features advanced natural language processing with multiple rewriting modes and quality controls.",
    group: "earlier",
    category: "Web App",
    projectType: "Company Project",
    technologies: ["React.js", "Next.js", "TailwindCSS", "AI Integration"],
    demoUrl: "https://rewritely.io/",
    slug: generateSlug("Rewritely"),
    color: "#B026FF",
    image: "/rewritely.png",
  },
  {
    id: 20,
    title: "URFX",
    description: "Prop trading firm offering instant-funded forex and futures-style trading with no challenge. Features fair profit splits and AI-driven risk management tools.",
    group: "earlier",
    category: "Web App",
    projectType: "Company Project",
    technologies: ["React.js", "Next.js", "TailwindCSS", "Trading APIs", "AI Integration"],
    demoUrl: "https://urfx.io/",
    slug: generateSlug("URFX"),
    color: "#B026FF",
    image: "/urfx.png",
  },
  {
    id: 21,
    title: "FXEE",
    description: "Fxee.ai is an AI-powered trading assistant that provides intelligent insights and market analysis. Features automated trading recommendations and real-time data processing for forex traders.",
    group: "earlier",
    category: "Web App",
    projectType: "Company Project",
    technologies: ["React.js", "Next.js", "TailwindCSS", "AI Integration", "Trading APIs"],
    demoUrl: "https://fxee.ai/signin",
    slug: generateSlug("FXEE"),
    color: "#00F5FF",
    image: "/fxee.png",
  },
  {
    id: 23,
    title: "Propafund Dashboard",
    description: "Investment platform for portfolio management and investment tracking. Features real-time portfolio tracking, performance analytics, and secure authentication for investors.",
    group: "earlier",
    category: "Web App",
    projectType: "Company Project",
    technologies: ["React.js", "Next.js", "TailwindCSS", "Investment Platform"],
    demoUrl: "https://propafund-dashboard.vercel.app/home",
    slug: generateSlug("Propafund Dashboard"),
    color: "#00F5FF",
    image: "/propafund.png",
  },
  {
    id: 24,
    title: "FX Utopia",
    description: "Professional trading dashboard for FX Utopia with advanced charting and real-time market data. Features comprehensive trading tools, order management systems, and high-performance data processing.",
    group: "earlier",
    category: "Web App",
    projectType: "Company Project",
    technologies: ["React.js", "Next.js", "TailwindCSS", "Trading Platform"],
    demoUrl: "https://fxutopia.com/",
    slug: generateSlug("FX Utopia"),
    color: "#B026FF",
    image: "/utopia.png",
  },
]

export const featuredProjects = projects.filter((p) => p.featured)
export const aiProjects = projects.filter((p) => p.group === "ai")
export const earlierProjects = projects.filter((p) => p.group === "earlier")
/** /projects "AI work" cards, in data order. */
export const cardProjects = projects.filter((p) => getProjectDisplay(p) === "card")
/** /projects "More projects" table rows, in data order (ServiceFlow VoiceOps first, then earlier work). */
export const rowProjects = projects.filter((p) => getProjectDisplay(p) === "row")
