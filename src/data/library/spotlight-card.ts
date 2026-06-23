import type { ComponentSpec } from '../../types'

export const spotlightCardSpec: ComponentSpec = {
  id: "spotlight-card",
  name: "Spotlight Card",
  type: "CARD",
  tags: ["card", "spotlight", "hover"],
  starred: false,
  desc: "Card with a spotlight effect that follows the cursor. The spotlight reveals a radial gradient.",
  usedIn: "Studio (card showcase)",
  motion: {
    "Spotlight": "Radial gradient follows cursor",
    "Fade": "Spotlight fades in on hover"
  },
  props: [
    { key: "spotlightColor", type: "string", desc: "Color of the spotlight" }
  ],
  controls: [
    { key: "spotlightColor", type: "color", label: "Spotlight color", default: "var(--studio-primary)" }
  ],
  code: `import SpotlightCard from "./components/ui/SpotlightCard"

<SpotlightCard spotlightColor="rgba(176,0,255,0.15)">
  <div>Your content</div>
</SpotlightCard>`,
  preview: "spotlight-card"
}
