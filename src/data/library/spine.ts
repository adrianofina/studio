import type { ComponentSpec } from "../../types"
export const spineSpec: ComponentSpec = {
  id: "spine",
  name: "Status Spine",
  type: "Vertical Status Bar",
  tags: ["status", "layout"],
  starred: false,
  desc: "A thin vertical bar that runs the full height of its container. Color indicates status at a glance. Overdue spines breathe to draw attention.",
  usedIn: "Finna Diary (project rows), CIMS (loan cards)",
  motion: { Overdue: "breathing scale 1 to 1.02 loop" },
  props: [
    { key: "status", type: "string", desc: "active | overdue | completed | pending | inactive" },
  ],
  controls: [
    { key: "status", type: "select", label: "Status", default: "active", options: ["active", "overdue", "completed", "pending", "inactive"] },
  ],
  code: "",
  preview: "spine",
}
