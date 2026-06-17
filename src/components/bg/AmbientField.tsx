import { useEffect, useRef } from "react"

// Lightweight canvas-based ambient field. Not a full WebGL shader --
// a capped number of soft blurred orbs drifting slowly, redrawn at
// a throttled frame rate so it stays noticeable without taxing the
// GPU/CPU on lower-end machines. Pauses when the tab is hidden.

interface Orb {
  x: number; y: number; r: number
  dx: number; dy: number
  hueKey: string
}

const ORB_COUNT = 5
const MAX_FPS = 30

export function AmbientField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const orbsRef = useRef<Orb[]>([])
  const rafRef = useRef<number>(0)
  const lastFrameRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    if (orbsRef.current.length === 0) {
      const keys = ["primary", "violet", "cyan", "rose", "indigo"]
      orbsRef.current = Array.from({ length: ORB_COUNT }, (_, i) => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 180 + Math.random() * 220,
        dx: (Math.random() - 0.5) * 0.15,
        dy: (Math.random() - 0.5) * 0.15,
        hueKey: keys[i % keys.length],
      }))
    }

    let visible = true
    const onVis = () => { visible = document.visibilityState === "visible" }
    document.addEventListener("visibilitychange", onVis)

    const frameInterval = 1000 / MAX_FPS

    const draw = (t: number) => {
      rafRef.current = requestAnimationFrame(draw)
      if (!visible) return
      if (t - lastFrameRef.current < frameInterval) return
      lastFrameRef.current = t

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.globalCompositeOperation = "lighter"

      for (const orb of orbsRef.current) {
        orb.x += orb.dx
        orb.y += orb.dy
        if (orb.x < -orb.r) orb.x = canvas.width + orb.r
        if (orb.x > canvas.width + orb.r) orb.x = -orb.r
        if (orb.y < -orb.r) orb.y = canvas.height + orb.r
        if (orb.y > canvas.height + orb.r) orb.y = -orb.r

        const color = getComputedStyle(document.documentElement)
          .getPropertyValue(`--finna-${orb.hueKey}`)
          .trim() || "#832A5D"

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r)
        grad.addColorStop(0, `${color}22`)
        grad.addColorStop(1, "transparent")
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", resize)
      document.removeEventListener("visibilitychange", onVis)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: "var(--finna-canvas)" }}
      aria-hidden="true"
    />
  )
}
