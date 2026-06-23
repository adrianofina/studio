import type { ComponentSpec } from '../../types'

export const borderGlowSpec: ComponentSpec = {
  id: "border-glow",
  name: "Border Glow",
  type: "CARD",
  tags: ["card", "glow", "interactive"],
  starred: false,
  desc: "Card with an edge glow that follows the cursor. Glow intensity increases near edges.",
  usedIn: "Studio (card showcase)",
  motion: {
    "Glow": "Edge glow follows cursor",
    "Cone": "Glow spreads in a cone pattern"
  },
  props: [
    { key: "edgeSensitivity", type: "number", desc: "How close cursor must be to edge" },
    { key: "glowIntensity", type: "number", desc: "Intensity of the glow" }
  ],
  controls: [
    { key: "edgeSensitivity", type: "number", label: "Edge sensitivity", default: 30, min: 10, max: 80 },
    { key: "glowIntensity", type: "number", label: "Glow intensity", default: 1.0, min: 0.1, max: 3.0 },
    { key: "coneSpread", type: "number", label: "Cone spread", default: 25, min: 5, max: 45 }
  ],
  code: `import BorderGlow from "./components/ui/BorderGlow"

<BorderGlow edgeSensitivity={30} glowIntensity={1.0}>
  <div>Your content</div>
</BorderGlow>`,
  preview: "border-glow"
}
