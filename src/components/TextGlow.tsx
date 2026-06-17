import { ReactNode } from "react"

interface TextGlowProps {
  children: ReactNode
  variant?: string
  intensity?: "low" | "medium" | "high"
  className?: string
}

export function TextGlow({ 
  children, 
  variant, 
  intensity = "medium", 
  className = "" 
}: TextGlowProps) {
  
  // Resolve precise text filter / drop-shadow matrices based on parameters
  const getGlowStyle = () => {
    if (variant === "sungjinwoo") {
      // High-intensity electric shadow matrix configuration
      return {
        filter: "drop-shadow(0 0 4px #00d2ff) drop-shadow(0 0 12px #0066ff)",
        color: "#e0f7ff",
        fontWeight: 700 as const
      }
    }
    
    // Default luxury token fallback
    const shadowRadius = intensity === "low" ? "4px" : intensity === "high" ? "16px" : "8px"
    return {
      filter: `drop-shadow(0 0 ${shadowRadius} var(--finna-primary))`
    }
  }

  return (
    <span className={`inline-block transition-all duration-300 ${className}`} style={getGlowStyle()}>
      {children}
    </span>
  )
}
