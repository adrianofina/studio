import { ReactNode } from "react"

interface Props<T> {
  items: T[]
  renderItem: (item: T, idx: number) => ReactNode
  overlap?: number
}

export function TheStack<T>({ items, renderItem, overlap = 20 }: Props<T>) {
  return (
    <div className="flex overflow-x-auto pb-8">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative flex-shrink-0 w-48 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:z-10"
          style={{ marginLeft: idx !== 0 ? `-${overlap}px` : "0", zIndex: items.length - idx }}
        >
          {renderItem(item, idx)}
        </div>
      ))}
    </div>
  )
}
