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
      // Type scale: one step larger than the previous build so every section reads at a glance.
      fontSize: {
        "2xs": ["11px", { lineHeight: "1.3" }],
        xs: ["12px", { lineHeight: "1.4" }],
        sm: ["14px", { lineHeight: "1.5" }],
        base: ["16px", { lineHeight: "1.6" }],
        lg: ["18px", { lineHeight: "1.55" }],
        xl: ["20px", { lineHeight: "1.45" }],
        "2xl": ["24px", { lineHeight: "1.3" }],
        "3xl": ["32px", { lineHeight: "1.2" }],
        "4xl": ["40px", { lineHeight: "1.1" }],
        "5xl": ["56px", { lineHeight: "1.05" }],
        "6xl": ["72px", { lineHeight: "1.0" }],
        "7xl": ["88px", { lineHeight: "0.98" }],
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
          teal: { bg: "#0a1f27", text: "#45cbe6", border: "#164652" },
          yellow: { bg: "#2a2408", text: "#e3c341", border: "#4a3f12" },
        },
      },
      // 12px cards, 6px pills and buttons
      borderRadius: {
        xl: "16px",
        lg: "var(--radius)",
        md: "6px",
        sm: "4px",
      },
      boxShadow: {
        // Accent halo for the one hero frame; everything else stays flat.
        glow: "0 0 0 1px hsl(var(--hsl-accent) / 0.25), 0 24px 80px -24px hsl(var(--hsl-accent) / 0.45)",
        lift: "0 12px 40px -16px rgba(0, 0, 0, 0.8)",
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
        // Keyframes live in app/globals.css.
        marquee: "marquee 42s linear infinite",
        aurora: "aurora 22s ease-in-out infinite",
        "aurora-slow": "aurora 34s ease-in-out infinite reverse",
        "pulse-ring": "pulse-ring 2.2s cubic-bezier(0.16, 1, 0.3, 1) infinite",
        float: "float-y 7s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
