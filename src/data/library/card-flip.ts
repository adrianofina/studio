import type { ComponentSpec } from "../../types"
export const cardFlipSpec: ComponentSpec = {
  id: "cardflip",
  name: "Card Flip",
  type: "3D Flip Card",
  tags: ["motion", "card"],
  starred: true,
  desc: "A poster card with a genuine 3D rotateY flip. Front shows image, title, year, rating. Back reveals description and action buttons (Trailer, Save). Click to flip, click again to return.",
  usedIn: "KakaFlix (movie cards)",
  motion: { Flip: "rotateY 0 to 180deg, 0.5s cubic-bezier(0.23,1,0.32,1)" },
  props: [
    { key: "title", type: "string", desc: "card title" },
    { key: "year", type: "number", desc: "release year" },
    { key: "rating", type: "number", desc: "rating out of 10" },
    { key: "description", type: "string", desc: "back-face description text" },
    { key: "accentColor", type: "string", desc: "color for action button" },
  ],
  controls: [
    { key: "title", type: "text", label: "Title", default: "Obsession" },
    { key: "year", type: "number", label: "Year", default: 2026, min: 1900, max: 2099 },
    { key: "rating", type: "number", label: "Rating", default: 7.9, min: 0, max: 10 },
    { key: "accentColor", type: "color", label: "Action button color", default: "var(--finna-primary)" },
  ],
  code: "",
  preview: "cardflip",
}
