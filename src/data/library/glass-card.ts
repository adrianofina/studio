import type { ComponentSpec } from "../../types"
export const glassCardSpec: ComponentSpec = {
  id: "glasscard",
  name: "Glass Card",
  type: "Glassmorphic Surface",
  tags: ["card", "aesthetic"],
  starred: false,
  desc: "Frosted glass surface with backdrop blur, hairline border at 8% opacity, and ambient light blobs drifting slowly behind it.",
  usedIn: "Finna (premium sections)",
  motion: { Blobs: "slow ambient oscillation behind the glass" },
  props: [
    { key: "children", type: "node", desc: "card content" },
  ],
  controls: [],
  code: "",
  preview: "glasscard",
}
