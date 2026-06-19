import type { ComponentSpec } from "../../types"
export const shadowSpec: ComponentSpec = {
  id: "shadow",
  name: "Sung Jinwoo's Shadow",
  type: "Card Shadow Wrapper",
  tags: ["motion", "status"],
  starred: true,
  desc: "A colored, blurred shadow that lives beneath any element. Invisible at rest. As status becomes active, soft colored light blooms underneath like the card is casting light downward. Random flicker keeps it alive.",
  usedIn: "CIMS (loan tracking), Finna Diary (project rows)",
  motion: { Bloom: "opacity 0 to 0.45 over 0.7s", Flicker: "random intensity shift every 1.8s" },
  props: [
    { key: "status", type: "string", desc: "inactive | active | overdue | pending | completed" },
    { key: "intensity", type: "number", desc: "0.2 to 2, controls blur size and opacity" },
  ],
  controls: [
    { key: "status", type: "select", label: "Status", default: "active", options: ["inactive", "active", "overdue", "pending", "completed"] },
    { key: "intensity", type: "number", label: "Intensity", default: 1, min: 0.2, max: 2 },
  ],
  code: "",
  preview: "shadow",
}
