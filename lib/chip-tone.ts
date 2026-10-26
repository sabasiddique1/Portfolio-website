/**
 * Colour tone for chips, derived from the chip's own text, so the data files stay untouched.
 * The same palette drives the category icons (components/category-icon.tsx).
 */
export type ChipTone = "green" | "blue" | "grey" | "purple" | "orange" | "teal" | "yellow" | "default"

// First match wins; keywords match on word boundaries (plural "s" allowed) so "Tailwind" never hits "ai".
const KEYWORDS: Array<[ChipTone, string[]]> = [
  ["green", ["ai", "llm", "rag", "agent", "mcp", "langgraph", "whisper", "speechmatics", "ml", "mlops", "nlp", "gpt"]],
  ["blue", ["python", "fastapi", "pytorch", "numpy", "pandas", "sktime", "skrub", "pgmpy", "scipy", "pydantic", "pytest"]],
  ["grey", ["react", "next.js", "typescript", "node.js", "tailwind", "ant design", "electron", "vite"]],
  ["purple", ["security", "red-team", "owasp", "guardrail", "kaggle", "top 14%"]],
  ["orange", ["healthcare", "clinical", "triage", "medical", "pgvector"]],
  ["teal", ["voice", "vapi", "twilio", "deepgram", "elevenlabs", "cal.com"]],
  ["yellow", ["observability", "opentelemetry", "grafana", "prometheus", "langfuse", "structlog"]],
]

const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

const MATCHERS = KEYWORDS.map(([tone, words]) => ({
  tone,
  pattern: new RegExp(`(^|[^a-z0-9])(${words.map(escape).join("|")})s?(?![a-z0-9])`, "i"),
}))

export function getChipTone(text: string): ChipTone {
  return MATCHERS.find(({ pattern }) => pattern.test(text))?.tone ?? "default"
}

/** Chip surface classes per tone (bg / text / 1px border). */
export const chipToneClasses: Record<ChipTone, string> = {
  green: "border-tone-green-border bg-tone-green-bg text-tone-green-text",
  blue: "border-tone-blue-border bg-tone-blue-bg text-tone-blue-text",
  grey: "border-tone-grey-border bg-tone-grey-bg text-tone-grey-text",
  purple: "border-tone-purple-border bg-tone-purple-bg text-tone-purple-text",
  orange: "border-tone-orange-border bg-tone-orange-bg text-tone-orange-text",
  teal: "border-tone-teal-border bg-tone-teal-bg text-tone-teal-text",
  yellow: "border-tone-yellow-border bg-tone-yellow-bg text-tone-yellow-text",
  default: "border-border bg-surface text-text-2",
}

/** Solid accent per tone, for the row tone bars. */
export const toneBarClasses: Record<ChipTone, string> = {
  green: "bg-tone-green-text",
  blue: "bg-tone-blue-text",
  grey: "bg-tone-grey-text",
  purple: "bg-tone-purple-text",
  orange: "bg-tone-orange-text",
  teal: "bg-tone-teal-text",
  yellow: "bg-tone-yellow-text",
  default: "bg-muted-foreground",
}
