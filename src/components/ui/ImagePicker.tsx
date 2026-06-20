import { useImagePool } from "../../hooks/useImagePool"

interface Props {
  value: string
  onChange: (url: string) => void
}

// A compact image picker for the Customize panel. Shows thumbnails
// from the studio image pool (public/studio-images/). Selected image
// gets a violet border highlight. Click any thumbnail to select it.
// To add more images: drop files into public/studio-images/ and update
// public/studio-images/manifest.json.

export function ImagePicker({ value, onChange }: Props) {
  const { images, loading, urlFor } = useImagePool()

  if (loading) return (
    <div style={{ fontSize: 10, fontFamily: "monospace", color: "var(--studio-text-dim)" }}>
      Loading images...
    </div>
  )

  if (images.length === 0) return (
    <div style={{ fontSize: 10, fontFamily: "monospace", color: "var(--studio-text-dim)", lineHeight: 1.6 }}>
      No images yet. Drop image files into{" "}
      <span style={{ color: "var(--studio-primary)" }}>public/studio-images/</span>{" "}
      and add their filenames to{" "}
      <span style={{ color: "var(--studio-primary)" }}>manifest.json</span>.
    </div>
  )

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
      {/* "None" option */}
      <button
        onClick={() => onChange("")}
        style={{
          width: 48, height: 64, borderRadius: 6,
          background: "var(--studio-surface)",
          border: `1px solid ${!value ? "var(--studio-primary)" : "rgba(255,255,255,0.07)"}`,
          cursor: "pointer", fontSize: 9, fontFamily: "monospace",
          color: "var(--studio-text-dim)", display: "flex",
          alignItems: "center", justifyContent: "center",
        }}
      >
        none
      </button>

      {images.map(img => {
        const url = urlFor(img.filename)
        const isSelected = value === url
        return (
          <button
            key={img.filename}
            onClick={() => onChange(url)}
            title={img.label}
            style={{
              width: 48, height: 64, borderRadius: 6, padding: 0,
              background: `url(${url}) center/cover`,
              border: `2px solid ${isSelected ? "var(--studio-primary)" : "rgba(255,255,255,0.07)"}`,
              cursor: "pointer",
              boxShadow: isSelected ? "0 0 8px var(--studio-primary)" : "none",
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
          />
        )
      })}
    </div>
  )
}
