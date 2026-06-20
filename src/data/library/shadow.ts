import type { ComponentSpec } from "../../types"

export const shadowSpec: ComponentSpec = {
  id: "sungjinwoo-shadow",
  name: "SungJinwoo Shadow",
  type: "INDICATOR",
  desc: "An elegant single-surface system featuring an integrated edge status line accent.",
  usedIn: "Active Loan Registry & Portfolio Balances",
  controls: [
    { key: "progress", label: "Progress Value (%)", type: "number", min: 0, max: 100, default: 40 },
    { key: "status", label: "Status Tier", type: "select", options: ["active", "pending", "overdue", "completed", "inactive"], default: "active" },
    { key: "overrideColor", label: "Override Line Color (Hex/CSS)", type: "text", default: "" },
    { key: "thickness", label: "Line Thickness (px)", type: "number", min: 1, max: 12, default: 4 },
    { key: "blur", label: "Glow Spread / Blur Radius", type: "number", min: 0, max: 10, default: 2 }
  ],
  code: `import { SungJinwooShadow } from "./components/ui/SungJinwooShadow"

<SungJinwooShadow 
  progress={40} 
  status="active"
  thickness={4}
  blur={2}
>
  <div>Your Core Metric Content Here</div>
</SungJinwooShadow>`
}
