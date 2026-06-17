/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas:       "var(--finna-canvas)",
        "canvas-alt": "var(--finna-canvas-alt)",
        surface:      "var(--finna-surface)",
        primary:      "var(--finna-primary)",
        text:         "var(--finna-text)",
        muted:        "var(--finna-text-secondary)",
        dim:          "var(--finna-text-dim)",
      },
      fontFamily: {
        sans: ["Inter", "Segoe UI", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      keyframes: {
        breathing: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%":      { transform: "scale(1.02)", opacity: "0.85" },
        },
        shimmer: {
          from: { transform: "translateX(-100%)" },
          to:   { transform: "translateX(100%)" },
        },
      },
      animation: {
        breathing: "breathing 3s ease-in-out infinite",
        shimmer:   "shimmer 1.5s infinite",
      },
    },
  },
  plugins: [],
}
