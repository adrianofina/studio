import { useState, type ReactNode, type ReactElement } from "react"

export interface SungJinwooShadowProps {
  progress?: number
  status?: "active" | "overdue" | "completed" | "pending" | "inactive"
  overrideColor?: string
  thickness?: number
  blur?: number
  children: ReactNode
  className?: string
}

export function SungJinwooShadow({
  progress = 40,
  status = "active",
  overrideColor = "",
  thickness = 4,
  blur = 2,
  children,
  className = "",
}: SungJinwooShadowProps): ReactElement {
  const [isHovered, setIsHovered] = useState(false)

  let accentColor = "var(--studio-emerald, #10b981)"
  if (status === "overdue") accentColor = "var(--studio-crimson, #ef4444)"
  if (status === "pending") accentColor = "var(--studio-amber, #f59e0b)"
  if (status === "completed") accentColor = "var(--studio-emerald, #10b981)"
  
  if (overrideColor && overrideColor.trim() !== "") {
    accentColor = overrideColor
  }

  const isInactive = status === "inactive" || progress <= 0
  const finalLineColor = isInactive ? "rgba(255, 255, 255, 0.08)" : accentColor
  const clampedProgress = isInactive ? 100 : Math.min(100, Math.max(0, progress))

  return (
    <div
      className={`relative rounded-xl bg-zinc-900/60 border border-white/5 transition-all duration-300 ease-out p-6 min-w-[280px] ${className}`}
      style={{
        transform: isHovered ? "translateY(-2px)" : "translateY(0px)"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Target injection layer */}
      <div className="w-full h-full relative z-10">
        {children}
      </div>

      {/* Progress Track Line */}
      <div
        className="absolute bottom-0 left-0 transition-all duration-300 ease-out rounded-b-xl"
        style={{
          width: `${clampedProgress}%`,
          height: `${thickness}px`,
          backgroundColor: finalLineColor,
          boxShadow: !isInactive && blur > 0
            ? `0 0 ${blur * 4}px ${accentColor}, 0 2px ${blur * 2}px ${accentColor}`
            : !isInactive ? `0 0 8px ${accentColor}` : "none",
          opacity: isHovered ? 1 : 0.85,
        }}
      />
    </div>
  )
}
