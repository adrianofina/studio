import type { ComponentSpec } from "../../types"
export const cardFlipSpec: ComponentSpec = {
  id: "card-flip",
  name: "Card Flip Context",
  type: "3D Perspective Surface",
  tags: ["card", "interaction"],
  starred: true,
  desc: "An individual media card that flips cleanly on the Y-axis when selected to reveal contextual action buttons without breaking layout reading perspective.",
  usedIn: "KakaFlix Content Matrix",
  motion: { Flip: "180deg smooth rotation swap" },
  props: [],
  controls: [],
  code: "",
  preview: "card-flip"
};