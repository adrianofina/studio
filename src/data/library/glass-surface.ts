import type { ComponentSpec } from '../../types'

export const glassSurfaceSpec: ComponentSpec = {
  id: "glass-surface",
  name: "Glass Surface",
  type: "CARD",
  tags: ["card", "glass", "surface"],
  starred: false,
  desc: "Glassmorphic surface with a tear drop displacement effect that follows the cursor.",
  usedIn: "Studio (card showcase)",
  motion: {
    "Tear drop": "Displacement follows cursor",
    "Blur": "Glass blur effect"
  },
  props: [
    { key: "tearDrop", type: "number", desc: "Intensity of the tear drop effect" },
    { key: "borderRadius", type: "number", desc: "Border radius" }
  ],
  controls: [
    { key: "tearDrop", type: "number", label: "Tear drop intensity", default: 0.5, min: 0, max: 1 },
    { key: "borderRadius", type: "number", label: "Border radius (px)", default: 24, min: 4, max: 48 }
  ],
  code: `import GlassSurface from "./components/ui/GlassSurface"

<GlassSurface width={400} height={200} borderRadius={24} tearDrop={0.5}>
  <div>Your content</div>
</GlassSurface>`,
  preview: "glass-surface"
}
