import type { ComponentSpec } from "../../types"
export const magicBentoSpec: ComponentSpec = {
  id: "magic-bento",
  name: "Magic Bento",
  type: "Spotlight Card Treatment",
  tags: ["aesthetic", "layout", "card"],
  starred: false,
  desc: "A glass card with a neon spotlight border that traces the cursor and intensifies on hover. One of the Archive view modes.",
  usedIn: "Finna Archive (Bento view mode), Finna Diary (Bento view mode)",
  motion: { Border: "radial spotlight follows cursor", Lift: "translateY(-3px) on hover" },
  props: [
    { key: "size", type: "string", desc: "wide | normal" },
  ],
  controls: [
    { key: "size", type: "select", label: "Card size", default: "normal", options: ["normal", "wide"] },
  ],
  code: "",
  preview: "magic-bento",
}
