import type { Config } from "tailwindcss"

const fallback = ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"]

/** Token colour with opacity-modifier support; the hex source of truth lives in app/globals.css. */
const token = (name: string) => `hsl(var(--hsl-${name}) / <alpha-value>)`

const config = {
  darkMode: ["class"],
  // `.container` is defined once in app/globals.css (1180px, centred, 24px gutters).
  corePlugins: { container: false },
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fallback],
        heading: ["var(--font-heading)", "var(--font-sans)", ...fallback],
      },
      fontSize: {
        "2xs": ["11px", { lineHeight: "1.3" }],
        xs: ["12px", { lineHeight: "1.4" }],
        sm: ["13px", { lineHeight: "1.5" }],
        base: ["15px", { lineHeight: "1.6" }],
      },
      colors: {
        // shadcn semantic names, mapped onto the tokens so existing utilities keep working.
        // `primary` is neutral on purpose: lime is reserved for primary buttons and active states (use `lime`).
        border: token("border"),
        input: token("border-strong"),
        ring: token("accent"),
        background: token("bg"),
        foreground: token("text"),
        primary: {
          DEFAULT: token("text"),
          foreground: token("bg"),
        },
        secondary: {
          DEFAULT: token("surface"),
          foreground: token("text"),
        },
        destructive: {
          DEFAULT: token("destructive"),
          foreground: token("text"),
        },
        muted: {
          DEFAULT: token("surface"),
          foreground: token("muted"),
        },
        accent: {
          DEFAULT: token("surface"),
          foreground: token("text"),
        },
        popover: {
          DEFAULT: token("surface"),
          foreground: token("text"),
        },
        card: {
          DEFAULT: token("card"),
          foreground: token("text"),
        },
        // Design tokens by their own names
        surface: token("surface"),
        "card-2": token("card-2"),
        "border-strong": token("border-strong"),
        "text-2": token("text-2"),
        lime: {
          DEFAULT: token("accent"),
          dim: token("accent-dim"),
          soft: token("accent-soft"),
        },
        pos: token("pos"),
        tag: token("tag"),
        cat: {
          agents: token("cat-agents"),
          health: token("cat-health"),
          ml: token("cat-ml"),
          research: token("cat-research"),
          voice: token("cat-voice"),
          fullstack: token("cat-fullstack"),
        },
        // Chip / icon tones (lib/chip-tone.ts): bg, text, 1px border per tone.
        tone: {
          green: { bg: "#0f1f14", text: "#7ee787", border: "#1d3a26" },
          blue: { bg: "#0d1a2b", text: "#58a6ff", border: "#1a3356" },
          grey: { bg: "#15191c", text: "#c9d1d9", border: "#262b2e" },
          purple: { bg: "#1c1430", text: "#d2a8ff", border: "#35265a" },
          orange: { bg: "#2a170c", text: "#ff9f5a", border: "#4a2a14" },
          teal: { bg: "#0b2422", text: "#39d3c3", border: "#174843" },
          yellow: { bg: "#2a2408", text: "#e3c341", border: "#4a3f12" },
        },
      },
      // 10px cards, 6px pills and buttons
      borderRadius: {
        lg: "var(--radius)",
        md: "6px",
        sm: "4px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
