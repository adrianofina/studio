interface Props {
  data: number[]
  color?: string
}

export function SparklineBars({ data, color = "var(--finna-primary)" }: Props) {
  const max = Math.max(...data, 1)
  return (
    <div className="flex items-end gap-0.5 h-8">
      {data.map((v, i) => (
        <div
          key={i}
          className="w-1.5 rounded-sm transition-all duration-300"
          style={{ height: `${(v / max) * 100}%`, background: color, opacity: i === data.length - 1 ? 1 : 0.4 }}
        />
      ))}
    </div>
  )
}
