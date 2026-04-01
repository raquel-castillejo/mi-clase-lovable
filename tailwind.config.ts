import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Overlock", "cursive", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          dark: "hsl(var(--color-primary-dark))",
          light: "hsl(var(--color-primary-light))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          dark: "hsl(var(--color-secondary-dark))",
          light: "hsl(var(--color-secondary-light))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--color-success))",
          foreground: "hsl(var(--color-success-text))",
          light: "hsl(var(--color-success-light))",
          dark: "hsl(var(--color-success-dark))",
        },
        alert: {
          DEFAULT: "hsl(var(--color-alert))",
          foreground: "hsl(var(--color-alert-text))",
          light: "hsl(var(--color-alert-light))",
          dark: "hsl(var(--color-alert-dark))",
        },
        surface: "hsl(var(--color-surface))",
        "text-secondary": "hsl(var(--color-text-secondary))",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
        pill: "var(--radius-pill)",
      },
      spacing: {
        xs: "var(--space-xs)",
        sm: "var(--space-sm)",
        md: "var(--space-md)",
        lg: "var(--space-lg)",
        xl: "var(--space-xl)",
      },
      fontSize: {
        "large-title": ["var(--text-large-title)", { lineHeight: "var(--leading-large-title)", fontWeight: "var(--weight-large-title)" }],
        "title-1": ["var(--text-title-1)", { lineHeight: "var(--leading-title-1)", fontWeight: "var(--weight-title-1)" }],
        "title-2": ["var(--text-title-2)", { lineHeight: "var(--leading-title-2)", fontWeight: "var(--weight-title-2)" }],
        "title-3": ["var(--text-title-3)", { lineHeight: "var(--leading-title-3)", fontWeight: "var(--weight-title-3)" }],
        headline: ["var(--text-headline)", { lineHeight: "var(--leading-headline)", fontWeight: "var(--weight-headline)" }],
        body: ["var(--text-body)", { lineHeight: "var(--leading-body)", fontWeight: "var(--weight-body)" }],
        callout: ["var(--text-callout)", { lineHeight: "var(--leading-callout)", fontWeight: "var(--weight-callout)" }],
        subhead: ["var(--text-subhead)", { lineHeight: "var(--leading-subhead)", fontWeight: "var(--weight-subhead)" }],
        footnote: ["var(--text-footnote)", { lineHeight: "var(--leading-footnote)", fontWeight: "var(--weight-footnote)" }],
        "caption-1": ["var(--text-caption-1)", { lineHeight: "var(--leading-caption-1)", fontWeight: "var(--weight-caption-1)" }],
        "caption-2": ["var(--text-caption-2)", { lineHeight: "var(--leading-caption-2)", fontWeight: "var(--weight-caption-2)" }],
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
} satisfies Config;
