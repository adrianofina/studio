export interface PropControl {
  key: string
  type: "number" | "select" | "color" | "boolean" | "text" | "image"
  label: string
  default: unknown
  min?: number
  max?: number
  options?: string[]
}

export interface ComponentSpec {
  id: string
  name: string
  type: string
  tags: string[]
  starred: boolean
  desc: string
  usedIn: string
  motion?: Record<string, string>
  props?: { key: string; type: string; desc: string }[]
  controls?: PropControl[]
  code: string
  preview: string
  featured?: boolean
}

export interface ComponentVariant {
  id: string
  baseComponentId: string
  name: string
  values: Record<string, unknown>
  createdAt: number
}

export interface ProjectEntry {
  id: string
  status: "completed" | "inprogress" | "todo"
  progress: number
  date: string
  tech: string[]
  desc: string
  lessons: string
  link?: string
}

export interface UserCategory {
  id: string
  name: string
  componentIds: string[]
}
