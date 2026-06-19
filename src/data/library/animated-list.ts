import type { ComponentSpec } from "../../types"
export const animatedListSpec: ComponentSpec = {
  id: "animated-list",
  name: "Animated List",
  type: "Expandable Row Layout",
  tags: ["layout", "motion"],
  starred: false,
  desc: "Staggered fade-in list where each row expands inline to reveal description and tags. One of the Archive view modes.",
  usedIn: "Finna Archive (List view mode)",
  motion: { Entry: "staggered fade + translateY, 50ms per row", Expand: "inline reveal on click" },
  props: [
    { key: "items", type: "ComponentSpec[]", desc: "components to render as rows" },
  ],
  controls: [],
  code: "",
  preview: "animated-list",
}
