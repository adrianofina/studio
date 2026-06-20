import { useState, type ReactElement } from "react"

interface Props {
  progress: number;
  size?: number;
  strokeWidth?: number;
  status?: "active" | "overdue" | "completed" | "pending";
  overrideColor?: string;
}

const STATUS_COLOR: Record<string, string> = {
  active: "var(--studio-indigo)",
  completed: "var(--studio-emerald)",
  pending: "var(--studio-amber)",
  overdue: "var(--studio-crimson)",
};

export function MercuryWobbleRing({
  progress,
  size = 96,
  strokeWidth = 8,
  status = "active",
  overrideColor
}: Props): ReactElement {
  const [isHovered, setIsHovered] = useState(false);
  
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const strokeDashoffset = circumference - (clampedProgress / 100) * circumference;
  
  // Format override colors gracefully to protect SVG strokes from raw invalid values
  let activeColor = STATUS_COLOR[status] || STATUS_COLOR.active;
  if (overrideColor && overrideColor.trim() !== "") {
    if (overrideColor.startsWith("#") || overrideColor.startsWith("rgb") || overrideColor.startsWith("hsl")) {
      activeColor = overrideColor;
    } else if (overrideColor.startsWith("var(")) {
      activeColor = overrideColor;
    } else {
      activeColor = `var(--studio-${overrideColor})`;
    }
  }

  return (
    <div 
      className="relative flex items-center justify-center select-none"
      style={{ width: size, height: size }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg className={`transform -rotate-90 w-full h-full ${isHovered ? 'animate-studio-wobble' : ''}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="stroke-neutral-800"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={activeColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      <div className="absolute text-sm font-semibold text-neutral-200">
        {clampedProgress}%
      </div>
    </div>
  );
}
