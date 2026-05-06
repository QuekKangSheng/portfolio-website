import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ── Colours ── */
      colors: {
        bg: {
          primary:   "#080808",
          secondary: "#0f0f0f",
          card:      "#111111",
          elevated:  "#161616",
        },
        accent: {
          primary: "#D4A853",
          bright:  "#F0C060",
          dim:     "#A07830",
        },
        text: {
          primary:   "#F0EDE8",
          secondary: "#9A9590",
          muted:     "#4A4845",
        },
      },

      /* ── Typography ── */
      fontFamily: {
        display: ["Syne", "sans-serif"],
        mono:    ["DM Mono", "monospace"],
        body:    ["Inter", "sans-serif"],
      },

      fontSize: {
        "hero":    ["clamp(3rem, 8vw, 8rem)",    { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display": ["clamp(2.5rem, 5vw, 5rem)",  { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "heading": ["clamp(1.75rem, 3vw, 2.5rem)",{ lineHeight: "1.15", letterSpacing: "-0.01em" }],
      },

      /* ── Spacing ── */
      spacing: {
        section:    "120px",
        "section-sm": "80px",
      },

      /* ── Max Width ── */
      maxWidth: {
        grid: "1280px",
      },

      /* ── Border Radius ── */
      borderRadius: {
        DEFAULT: "2px",
        sm: "1px",
        lg: "4px",
      },

      /* ── Box Shadow ── */
      boxShadow: {
        card:     "0 1px 3px rgba(0,0,0,0.4), 0 4px 12px rgba(0,0,0,0.3)",
        elevated: "0 8px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)",
        accent:   "0 0 24px rgba(212,168,83,0.2), 0 0 48px rgba(212,168,83,0.08)",
        "accent-strong": "0 0 32px rgba(212,168,83,0.35)",
      },

      /* ── Transitions ── */
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      transitionDuration: {
        fast: "150ms",
        base: "300ms",
        slow: "600ms",
      },

      /* ── Background Images ── */
      backgroundImage: {
        "accent-gradient": "linear-gradient(135deg, #D4A853 0%, #F0C060 50%, #A07830 100%)",
        "subtle-grid":
          "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "60px 60px",
      },

      /* ── Animation ── */
      keyframes: {
        "fade-in": {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(212,168,83,0.2)" },
          "50%":      { boxShadow: "0 0 40px rgba(212,168,83,0.4)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-in":    "fade-in 0.6s ease forwards",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        shimmer:      "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;