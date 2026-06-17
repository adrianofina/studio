interface Props {
  status?: "active" | "overdue" | "completed" | "pending" | "inactive"
}

export function StatusSpine({ status = "inactive" }: Props) {
  const color =
    status === "overdue" ? "var(--finna-crimson)" :
    status === "active" ? "var(--finna-emerald)" :
    status === "completed" ? "var(--finna-violet)" :
    status === "pending" ? "var(--finna-amber)" : "#4A4A5A"
  return (
    <div
      className={`w-1 h-full rounded-full ${status === "overdue" ? "animate-breathing" : ""}`}
      style={{ background: color }}
    />
  )
}
