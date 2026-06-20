export interface ColorToken {
  key: string
  label: string
  hex: string
  depth: number
  lightness: number
}

export interface FinnaTheme {
  name: string
  canvas: string
  canvasAlt: string
  surface: string
  textPrimary: string
  textSecondary: string
  textDim: string
  border: string
  colors: ColorToken[]
}

export const DEFAULT_THEME: FinnaTheme = {
  name: "Mulberry & Blackberry Yogurt",
  canvas: "#150D15",
  canvasAlt: "#221329",
  surface: "#2F1B38",
  textPrimary: "#F5F2F8",
  textSecondary: "#B8A8C8",
  textDim: "#7A6A8A",
  border: "rgba(131, 42, 93, 0.3)",
  colors: [
    { key: "primary", label: "Primary",  hex: "#832A5D", depth: 50, lightness: 20 },
    { key: "violet",  label: "Violet",   hex: "#B000FF", depth: 80, lightness: 10 },
    { key: "cyan",    label: "Cyan",     hex: "#00E5FF", depth: 60, lightness: 30 },
    { key: "amber",   label: "Amber",    hex: "#FFB000", depth: 70, lightness: 40 },
    { key: "crimson", label: "Crimson",  hex: "#B8001A", depth: 60, lightness: 20 },
    { key: "emerald", label: "Emerald",  hex: "#10B981", depth: 90, lightness: 10 },
    { key: "rose",    label: "Rose",     hex: "#F43F5E", depth: 60, lightness: 25 },
    { key: "indigo",  label: "Indigo",   hex: "#6366F1", depth: 60, lightness: 25 },
  ],
}

export const PRESET_PALETTES: { name: string; theme: Partial<FinnaTheme> }[] = [
  { name: "Mulberry", theme: DEFAULT_THEME },
  { name: "Neon", theme: { canvas: "#0A0A0F", canvasAlt: "#12121A", surface: "#1A1A2E", colors: DEFAULT_THEME.colors.map(c => ({ ...c, hex: ["#0080FF","#FF006E","#00FFFF","#FFB000","#FF0040","#00FF94","#FF006E","#7B2FFF"][DEFAULT_THEME.colors.indexOf(c)] ?? c.hex })) } },
  { name: "Aurora", theme: { canvas: "#0B1320", canvasAlt: "#101A2C", surface: "#16223A", colors: DEFAULT_THEME.colors.map(c => ({ ...c, hex: ["#4FD1C5","#7C77DD","#63D8E8","#F2C572","#E36BAE","#4FD1C5","#E36BAE","#7C77DD"][DEFAULT_THEME.colors.indexOf(c)] ?? c.hex })) } },
  { name: "Minimal", theme: { canvas: "#121212", canvasAlt: "#181818", surface: "#202020", colors: DEFAULT_THEME.colors.map(c => ({ ...c, hex: "#888" })) } },
]

export function randomTheme(): FinnaTheme {
  const rand = () => Math.floor(Math.random() * 360)
  const toHex = (h: number, s: number, l: number) => {
    const a = s * Math.min(l, 1 - l)
    const f = (n: number) => {
      const k = (n + h / 30) % 12
      const c = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))
      return Math.round(255 * c).toString(16).padStart(2, "0")
    }
    return `#${f(0)}${f(8)}${f(4)}`
  }
  const base = rand()
  return { ...DEFAULT_THEME, name: "Random", colors: DEFAULT_THEME.colors.map((c, i) => ({ ...c, hex: toHex((base + i * 47) % 360, 0.65, 0.55) })) }
}
