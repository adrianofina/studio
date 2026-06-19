import type { ComponentSpec } from "../../types"
import { ComponentPreview } from "./ComponentPreview"

interface Props {
  comp: ComponentSpec
  values: Record<string, unknown>
}

// Previously this had its own duplicated switch statement that quickly
// drifted out of sync with ComponentPreview.tsx. Now it simply calls
// ComponentPreview with size="large" and passes the live values down.
// Single source of truth: add a new component once in ComponentPreview,
// it works automatically in both the archive grid and the detail panel.

export function LiveComponentRenderer({ comp, values }: Props) {
  return <ComponentPreview comp={comp} size="large" values={values} />
}
