import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      /* ─── Brand Fonts ──────────────────────────────────────────────────── */
      fontFamily: {
        /**
         * font-syne  → headings, display text, wordmark
         * Usage:  className="font-syne font-bold"
         */
        syne: ["var(--font-syne)", "system-ui", "sans-serif"],

        /**
         * font-sans  → body copy (overrides Tailwind default)
         * Usage:  className="font-sans"  (applied globally in layout)
         */
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },

      /* ─── Brand Colours ────────────────────────────────────────────────── */
      colors: {
        /**
         * bg-amber / text-amber / border-amber
         * Primary: CTAs, highlights, prices, active states
         */
        amber: {
          DEFAULT: "#F59E0B",
          hover:   "#D97706", // amber-600 — darker on interaction
          light:   "#FEF3C7", // amber-100 — light tint for backgrounds
        },

        /**
         * bg-navy / text-navy / border-navy
         * Secondary: Navbar, headings, trust elements
         */
        navy: {
          DEFAULT: "#1E3A5F",
          light:   "#2A4F80", // slightly lighter for hover states
          dark:    "#152C4A", // slightly darker for pressed states
        },

        /**
         * bg-solar-green / text-solar-green / border-solar-green
         * Accent: 'In Stock' badges, eco labels, success states
         */
        "solar-green": {
          DEFAULT: "#10B981",
          light:   "#D1FAE5", // green-100 — badge backgrounds
          dark:    "#059669", // green-600 — hover
        },

        /**
         * Semantic surface & text colours mapped from CSS variables
         * These mirror the CSS vars so both systems stay in sync.
         */
        "off-white":        "#FAFAFA",
        "slate-dark":       "#0F172A",
        "slate-body":       "#1E293B",
        "slate-secondary":  "#64748B",
      },

      /* ─── Background Images ────────────────────────────────────────────── */
      backgroundImage: {
        /**
         * bg-hero-glow — used in HeroSection
         * Registered here so it's tree-shakeable and typed.
         */
        "hero-glow":
          "radial-gradient(ellipse 60% 55% at 85% 15%, rgba(245,158,11,0.18) 0%, transparent 70%)",
      },

      /* ─── Box Shadows ──────────────────────────────────────────────────── */
      boxShadow: {
        /** Floating product / stat cards */
        card:  "0 4px 24px rgba(30, 58, 95, 0.10)",
        /** Navbar on scroll */
        nav:   "0 2px 16px rgba(30, 58, 95, 0.12)",
        /** Amber glow — CTA buttons */
        amber: "0 4px 20px rgba(245, 158, 11, 0.35)",
      },

      /* ─── Border Radius ────────────────────────────────────────────────── */
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },

      /* ─── Keyframes & Animations ───────────────────────────────────────── */
      keyframes: {
        /** Partners marquee — also declared in globals.css for non-JIT use */
        marquee: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
        /** Fade + slide up — Framer Motion handles most, but here for fallback */
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        /** Pulse glow — amber CTA button accent */
        "pulse-amber": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(245,158,11,0.4)" },
          "50%":       { boxShadow: "0 0 0 8px rgba(245,158,11,0)" },
        },
      },
      animation: {
        marquee:       "marquee 28s linear infinite",
        "fade-up":     "fade-up 0.5s ease-out forwards",
        "pulse-amber": "pulse-amber 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
