import type { ComponentSpec } from "../../types"
export const stackSpec: ComponentSpec = {
  id: "stack",
  name: "The Stack",
  type: "Overlapped Deck Layout",
  tags: ["layout", "motion", "cards"],
  starred: true,
  desc: "An overlapping horizontal deck system inspired by premium streaming UI architectures. Features spread-out hover vectors and card select states.",
  usedIn: "KakaFlix Collections",
  motion: { Spread: "Smooth offset translation on cursor hover" },
  props: [],
  controls: [],
  code: "",
  preview: "stack"
};