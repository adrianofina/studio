import type { ComponentSpec } from "../../types"
export const stackSpec: ComponentSpec = {
  id: "stack",
  name: "The Stack",
  type: "Horizontal Scroll Card Stack",
  tags: ["layout", "motion", "card"],
  starred: true,
  desc: "A horizontal scroll row of overlapping poster cards. Clicking a card reveals a floating action panel (Watch Later, Liked, Remove). Cards show image, title, and year. Built from KakaFlix.",
  usedIn: "KakaFlix (movie collections)",
  motion: { Hover: "card lifts on hover", Actions: "floating panel appears on click" },
  props: [
    { key: "items", type: "array", desc: "array of {title, year, image, description} objects" },
    { key: "overlap", type: "number", desc: "pixel overlap between cards, default 20" },
  ],
  controls: [
    { key: "overlap", type: "number", label: "Card overlap (px)", default: 20, min: 0, max: 60 },
  ],
  code: "",
  preview: "stack",
}
