import { useState, useEffect } from "react"

interface ImageEntry {
  filename: string
  label: string
}

// Reads the manifest at /studio-images/manifest.json and returns
// the list of available images as full URL paths.
// To add an image: drop the file into public/studio-images/ and
// add its filename + label to manifest.json. That'\''s it.

export function useImagePool() {
  const [images, setImages] = useState<ImageEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/studio-images/manifest.json")
      .then(r => r.json())
      .then(data => {
        setImages(data.images ?? [])
        setLoading(false)
      })
      .catch(() => {
        setImages([])
        setLoading(false)
      })
  }, [])

  const urlFor = (filename: string) => `/studio-images/${filename}`

  return { images, loading, urlFor }
}
