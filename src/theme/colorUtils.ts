// Depth darkens toward black, lightness brightens toward white.
// Both are 0-100 sliders applied on top of the base hex.

function hexToRgb(hex: string) {
  const m = hex.replace("#", "")
  return {
    r: parseInt(m.substring(0, 2), 16),
    g: parseInt(m.substring(2, 4), 16),
    b: parseInt(m.substring(4, 6), 16),
  }
}

function rgbToHex(r: number, g: number, b: number) {
  const c = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0")
  return `#${c(r)}${c(g)}${c(b)}`
}

export function applyDepthLightness(hex: string, depth: number, lightness: number): string {
  const { r, g, b } = hexToRgb(hex)
  const depthFactor = depth / 100
  const lightFactor = lightness / 100
  const dr = r * depthFactor
  const dg = g * depthFactor
  const db = b * depthFactor
  const fr = dr + (255 - dr) * lightFactor
  const fg = dg + (255 - dg) * lightFactor
  const fb = db + (255 - db) * lightFactor
  return rgbToHex(fr, fg, fb)
}

export function exportAsCSS(theme: { colors: { key: string; hex: string }[] }) {
  return `:root {\n${theme.colors.map(c => `  --finna-${c.key}: ${c.hex};`).join("\n")}\n}`
}

export function exportAsTailwind(theme: { colors: { key: string; hex: string }[] }) {
  return `colors: {\n${theme.colors.map(c => `  ${c.key}: "${c.hex}",`).join("\n")}\n}`
}

export function exportAsJSON(theme: unknown) {
  return JSON.stringify(theme, null, 2)
}
