import type { ComponentSpec } from "../../types"
export const stackSpec: ComponentSpec = {
  id: "stack",
  name: "The Stack",
  type: "Horizontal Scroll Card Stack",
  tags: ["layout", "motion", "card"],
  starred: false,
  desc: "A horizontal scroll row of overlapping cards. Clicking a card reveals a floating action panel with customizable action labels. Fully content-agnostic. Images come from the studio image pool.",
  usedIn: "KakaFlix (movie collections), any horizontal browseable content",
  motion: { Hover: "card lifts translateY(-8px) on click", Actions: "floating panel appears" },
  props: [
    { key: "items", type: "array", desc: "array of {id, title, subtitle, image?}" },
    { key: "overlap", type: "number", desc: "pixel overlap between cards, default 20" },
    { key: "action1Label", type: "string", desc: "label for first action" },
    { key: "action2Label", type: "string", desc: "label for second action" },
    { key: "action3Label", type: "string", desc: "label for third action" },
  ],
  controls: [
    { key: "overlap", type: "number", label: "Card overlap (px)", default: 20, min: 0, max: 60 },
    { key: "action1Label", type: "text", label: "Action 1 label", default: "Primary" },
    { key: "action2Label", type: "text", label: "Action 2 label", default: "Secondary" },
    { key: "action3Label", type: "text", label: "Action 3 label", default: "Remove" },
  ],
  code: "",
  preview: "stack",
}
