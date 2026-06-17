import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import type { FinnaTheme, ColorToken } from "./tokens"
import { DEFAULT_THEME } from "./tokens"
import { applyDepthLightness } from "./colorUtils"

const STORAGE_KEY = "finna-theme"
const HISTORY_KEY = "finna-theme-history"

interface ThemeContextValue {
  theme: FinnaTheme
  setTheme: (t: FinnaTheme) => void
  updateColor: (key: string, patch: Partial<ColorToken>) => void
  history: FinnaTheme[]
  resetToDefault: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

// THIS WAS THE BUG: this function read theme.colors[].hex directly and
// never ran it through applyDepthLightness. Moving a slider updated
// React state correctly, but the CSS variables written to :root never
// reflected depth/lightness -- so nothing visible ever changed.

function applyToDocument(theme: FinnaTheme) {
  const root = document.documentElement
  root.style.setProperty("--finna-canvas", theme.canvas)
  root.style.setProperty("--finna-canvas-alt", theme.canvasAlt)
  root.style.setProperty("--finna-surface", theme.surface)
  root.style.setProperty("--finna-text", theme.textPrimary)
  root.style.setProperty("--finna-text-secondary", theme.textSecondary)
  root.style.setProperty("--finna-text-dim", theme.textDim)
  root.style.setProperty("--finna-border", theme.border)
  theme.colors.forEach(c => {
    const finalColor = applyDepthLightness(c.hex, c.depth, c.lightness)
    root.style.setProperty(`--finna-${c.key}`, finalColor)
  })
  const primary = theme.colors.find(c => c.key === "primary")
  if (primary) root.style.setProperty("--finna-primary", applyDepthLightness(primary.hex, primary.depth, primary.lightness))
}

function isValidTheme(t: unknown): t is FinnaTheme {
  return !!t && typeof t === "object" && Array.isArray((t as FinnaTheme).colors)
}

function loadTheme(): FinnaTheme {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (isValidTheme(parsed)) return parsed
    }
  } catch {}
  return DEFAULT_THEME
}

function loadHistory(): FinnaTheme[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) return parsed.filter(isValidTheme)
    }
  } catch {}
  return []
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<FinnaTheme>(loadTheme)
  const [history, setHistory] = useState<FinnaTheme[]>(loadHistory)

  useEffect(() => {
    applyToDocument(theme)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(theme))
  }, [theme])

  const setTheme = (t: FinnaTheme) => {
    setThemeState(t)
    setHistory(prev => {
      const next = [t, ...prev.filter(h => h.name !== t.name)].slice(0, 10)
      localStorage.setItem(HISTORY_KEY, JSON.stringify(next))
      return next
    })
  }

  // updateColor previously mutated state correctly -- the bug was
  // entirely downstream in applyToDocument, now fixed above. This
  // still needs to produce a NEW theme object so the effect re-fires.
  const updateColor = (key: string, patch: Partial<ColorToken>) => {
    setThemeState(prev => ({
      ...prev,
      colors: prev.colors.map(c => (c.key === key ? { ...c, ...patch } : c)),
    }))
  }

  const resetToDefault = () => setTheme(DEFAULT_THEME)

  return (
    <ThemeContext.Provider value={{ theme, setTheme, updateColor, history, resetToDefault }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}
