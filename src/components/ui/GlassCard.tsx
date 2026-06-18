import type { ReactNode } from "react"

interface Props {
  children: ReactNode
}

export function GlassCard({ children }: Props) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden p-5"
      style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-10 blur-3xl"
        style={{ background: "var(--finna-primary)" }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}
