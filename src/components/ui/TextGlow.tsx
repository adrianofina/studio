import { ReactNode } from "react";

interface TextGlowProps {
  children: ReactNode;
  variant?: string;
  intensity?: "low" | "medium" | "high";
  className?: string;
}

export function TextGlow({ children, variant, intensity = "medium", className = "" }: TextGlowProps) {
  const getGlowStyle = () => {
    if (variant === "sungjinwoo") {
      return {
        filter: "drop-shadow(0 0 6px var(--finna-primary)) drop-shadow(0 0 16px var(--finna-primary))",
        color: "#ffffff",
        fontWeight: 600
      };
    }
    const radius = intensity === "low" ? "3px" : intensity === "high" ? "12px" : "6px";
    return {
      filter: `drop-shadow(0 0 ${radius} var(--finna-primary))`
    };
  };

  return (
    <span className={`inline-block transition-all duration-300 ${className}`} style={getGlowStyle()}>
      {children}
    </span>
  );
}
