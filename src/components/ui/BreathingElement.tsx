import type { ReactNode } from "react"

interface Props {
  children: ReactNode
  duration?: string
}

export function BreathingElement({ children, duration = "3s" }: Props) {
  return (
    <div className="animate-breathing" style={{ animationDuration: duration }}>
      {children}
    </div>
  )
}
