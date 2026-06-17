// ============================================================
// FINNA THEME TOKENS
// Every color a component uses must come from here, never a
// hardcoded hex. The Color Lab edits these values at runtime
// by writing CSS variables onto :root.
// ============================================================

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
  canvas: "#1A0F1A",
  canvasAlt: "#241324",
  surface: "#2D1B36",
  textPrimary: "#F0EEF5",
  textSecondary: "#B8A8C8",
  textDim: "#7A6A8A",
  border: "rgba(131, 42, 93, 0.3)",
  colors: [
    { key: "primary", label: "Primary (Mulberry)", hex: "#832A5D", depth: 50, lightness: 20 },
    { key: "violet",  label: "Violet",  hex: "#B000FF", depth: 80, lightness: 10 },
    { key: "cyan",    label: "Cyan",    hex: "#00E5FF", depth: 60, lightness: 30 },
    { key: "amber",   label: "Amber",   hex: "#FFB000", depth: 70, lightness: 40 },
    { key: "crimson", label: "Crimson", hex: "#B8001A", depth: 60, lightness: 20 },
    { key: "emerald", label: "Emerald", hex: "#10B981", depth: 90, lightness: 10 },
    { key: "rose",    label: "Rose",    hex: "#F43F5E", depth: 60, lightness: 25 },
    { key: "indigo",  label: "Indigo",  hex: "#6366F1", depth: 60, lightness: 25 },
  ],
}

export const PRESET_PALETTES: { name: string; theme: Partial<FinnaTheme> }[] = [
  { name: "Mulberry", theme: DEFAULT_THEME },
  {
    name: "Neon",
    theme: {
      canvas: "#0A0A0F", canvasAlt: "#12121A", surface: "#1A1A2E",
      colors: [
        { key: "primary", label: "Primary", hex: "#0080FF", depth: 50, lightness: 20 },
        { key: "violet", label: "Violet", hex: "#FF006E", depth: 50, lightness: 20 },
        { key: "cyan", label: "Cyan", hex: "#00FFFF", depth: 50, lightness: 20 },
        { key: "amber", label: "Amber", hex: "#FFB000", depth: 50, lightness: 20 },
        { key: "crimson", label: "Crimson", hex: "#FF0040", depth: 50, lightness: 20 },
        { key: "emerald", label: "Emerald", hex: "#00FF94", depth: 50, lightness: 20 },
        { key: "rose", label: "Rose", hex: "#FF006E", depth: 50, lightness: 20 },
        { key: "indigo", label: "Indigo", hex: "#7B2FFF", depth: 50, lightness: 20 },
      ],
    },
  },
  {
    name: "Vaporwave",
    theme: {
      canvas: "#1A0B2E", canvasAlt: "#241340", surface: "#2D1B4E",
      colors: [
        { key: "primary", label: "Primary", hex: "#FF71CE", depth: 50, lightness: 20 },
        { key: "violet", label: "Violet", hex: "#B967FF", depth: 50, lightness: 20 },
        { key: "cyan", label: "Cyan", hex: "#01CDFE", depth: 50, lightness: 20 },
        { key: "amber", label: "Amber", hex: "#FFB000", depth: 50, lightness: 20 },
        { key: "crimson", label: "Crimson", hex: "#FF5C8A", depth: 50, lightness: 20 },
        { key: "emerald", label: "Emerald", hex: "#05FFA1", depth: 50, lightness: 20 },
        { key: "rose", label: "Rose", hex: "#FF71CE", depth: 50, lightness: 20 },
        { key: "indigo", label: "Indigo", hex: "#B967FF", depth: 50, lightness: 20 },
      ],
    },
  },
  {
    name: "Cinema",
    theme: {
      canvas: "#0D0D0D", canvasAlt: "#161616", surface: "#202020",
      colors: [
        { key: "primary", label: "Primary", hex: "#D4AF37", depth: 50, lightness: 20 },
        { key: "violet", label: "Violet", hex: "#6B4E8E", depth: 50, lightness: 20 },
        { key: "cyan", label: "Cyan", hex: "#4A7A8C", depth: 50, lightness: 20 },
        { key: "amber", label: "Amber", hex: "#D4AF37", depth: 50, lightness: 20 },
        { key: "crimson", label: "Crimson", hex: "#8C2F39", depth: 50, lightness: 20 },
        { key: "emerald", label: "Emerald", hex: "#3C6E55", depth: 50, lightness: 20 },
        { key: "rose", label: "Rose", hex: "#8C2F39", depth: 50, lightness: 20 },
        { key: "indigo", label: "Indigo", hex: "#3C3C6E", depth: 50, lightness: 20 },
      ],
    },
  },
  {
    name: "Gaming",
    theme: {
      canvas: "#0A0E14", canvasAlt: "#10151D", surface: "#171D28",
      colors: [
        { key: "primary", label: "Primary", hex: "#39FF14", depth: 50, lightness: 20 },
        { key: "violet", label: "Violet", hex: "#9D00FF", depth: 50, lightness: 20 },
        { key: "cyan", label: "Cyan", hex: "#00F0FF", depth: 50, lightness: 20 },
        { key: "amber", label: "Amber", hex: "#FFD700", depth: 50, lightness: 20 },
        { key: "crimson", label: "Crimson", hex: "#FF1744", depth: 50, lightness: 20 },
        { key: "emerald", label: "Emerald", hex: "#39FF14", depth: 50, lightness: 20 },
        { key: "rose", label: "Rose", hex: "#FF1744", depth: 50, lightness: 20 },
        { key: "indigo", label: "Indigo", hex: "#9D00FF", depth: 50, lightness: 20 },
      ],
    },
  },
  {
    name: "Arcade",
    theme: {
      canvas: "#1C0B2E", canvasAlt: "#26113D", surface: "#321A52",
      colors: [
        { key: "primary", label: "Primary", hex: "#FF3864", depth: 50, lightness: 20 },
        { key: "violet", label: "Violet", hex: "#A742FF", depth: 50, lightness: 20 },
        { key: "cyan", label: "Cyan", hex: "#2DE2E6", depth: 50, lightness: 20 },
        { key: "amber", label: "Amber", hex: "#FF9F1C", depth: 50, lightness: 20 },
        { key: "crimson", label: "Crimson", hex: "#FF3864", depth: 50, lightness: 20 },
        { key: "emerald", label: "Emerald", hex: "#2DE2A6", depth: 50, lightness: 20 },
        { key: "rose", label: "Rose", hex: "#FF3864", depth: 50, lightness: 20 },
        { key: "indigo", label: "Indigo", hex: "#A742FF", depth: 50, lightness: 20 },
      ],
    },
  },
  {
    name: "Aurora",
    theme: {
      canvas: "#0B1320", canvasAlt: "#101A2C", surface: "#16223A",
      colors: [
        { key: "primary", label: "Primary", hex: "#4FD1C5", depth: 50, lightness: 20 },
        { key: "violet", label: "Violet", hex: "#7C77DD", depth: 50, lightness: 20 },
        { key: "cyan", label: "Cyan", hex: "#63D8E8", depth: 50, lightness: 20 },
        { key: "amber", label: "Amber", hex: "#F2C572", depth: 50, lightness: 20 },
        { key: "crimson", label: "Crimson", hex: "#E36BAE", depth: 50, lightness: 20 },
        { key: "emerald", label: "Emerald", hex: "#4FD1C5", depth: 50, lightness: 20 },
        { key: "rose", label: "Rose", hex: "#E36BAE", depth: 50, lightness: 20 },
        { key: "indigo", label: "Indigo", hex: "#7C77DD", depth: 50, lightness: 20 },
      ],
    },
  },
  {
    name: "Minimal",
    theme: {
      canvas: "#121212", canvasAlt: "#181818", surface: "#202020",
      colors: [
        { key: "primary", label: "Primary", hex: "#E0E0E0", depth: 50, lightness: 20 },
        { key: "violet", label: "Violet", hex: "#A0A0A0", depth: 50, lightness: 20 },
        { key: "cyan", label: "Cyan", hex: "#B0B0B0", depth: 50, lightness: 20 },
        { key: "amber", label: "Amber", hex: "#C0C0C0", depth: 50, lightness: 20 },
        { key: "crimson", label: "Crimson", hex: "#909090", depth: 50, lightness: 20 },
        { key: "emerald", label: "Emerald", hex: "#A8A8A8", depth: 50, lightness: 20 },
        { key: "rose", label: "Rose", hex: "#989898", depth: 50, lightness: 20 },
        { key: "indigo", label: "Indigo", hex: "#888888", depth: 50, lightness: 20 },
      ],
    },
  },
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
  return {
    ...DEFAULT_THEME,
    name: "Random",
    colors: DEFAULT_THEME.colors.map((c, i) => ({
      ...c,
      hex: toHex((base + i * 47) % 360, 0.65, 0.55),
    })),
  }
}
