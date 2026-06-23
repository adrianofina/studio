import type { ComponentSpec } from '../../types'

export const stepperSpec: ComponentSpec = {
  id: "stepper",
  name: "Stepper",
  type: "NAVIGATION",
  tags: ["navigation", "steps", "form"],
  starred: false,
  desc: "Step-by-step navigation with animated transitions between steps.",
  usedIn: "Studio (form steps)",
  motion: {
    "Slide": "Steps slide in and out",
    "Progress": "Step indicators show progress"
  },
  props: [
    { key: "initialStep", type: "number", desc: "Starting step" }
  ],
  controls: [
    { key: "initialStep", type: "number", label: "Initial step", default: 1, min: 1, max: 4 }
  ],
  code: `import Stepper, { Step } from "./components/ui/Stepper"

<Stepper initialStep={1} backButtonText="Back" nextButtonText="Next">
  <Step><div>Step 1</div></Step>
  <Step><div>Step 2</div></Step>
</Stepper>`,
  preview: "stepper"
}
