import type { ReactNode, ReactElement } from "react"

interface Props {
  children: ReactNode;
  className?: string;
}

export function AuroraText({ children, className = "" }: Props): ReactElement {
  return (
    <span 
      className={`font-bold tracking-tight bg-clip-text text-transparent animate-studio-aurora ${className}`}
      style={{
        backgroundImage: "linear-gradient(90deg, var(--studio-primary), var(--studio-violet), var(--studio-cyan), var(--studio-primary))",
        backgroundSize: "300% 100%",
        WebkitBackgroundClip: "text",
      }}
    >
      {children}
    </span>
  );
}
