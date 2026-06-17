import { useState, useEffect, useCallback } from "react"
import type { ComponentVariant } from "../types"

const STORAGE_KEY = "finna-variants"

function load(): ComponentVariant[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) return parsed
    }
  } catch {}
  return []
}

export function useVariants() {
  const [variants, setVariants] = useState<ComponentVariant[]>(load)

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(variants)) } catch {}
  }, [variants])

  const saveVariant = useCallback((baseComponentId: string, name: string, values: Record<string, unknown>) => {
    const variant: ComponentVariant = { id: `${baseComponentId}-${Date.now()}`, baseComponentId, name, values, createdAt: Date.now() }
    setVariants(prev => [...prev, variant])
    return variant
  }, [])

  const deleteVariant = useCallback((id: string) => {
    setVariants(prev => prev.filter(v => v.id !== id))
  }, [])

  const variantsFor = useCallback((baseComponentId: string) => variants.filter(v => v.baseComponentId === baseComponentId), [variants])

  return { variants, saveVariant, deleteVariant, variantsFor }
}
