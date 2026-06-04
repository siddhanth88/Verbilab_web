import { useEffect, useRef } from 'react'

const NEON = '0, 255, 133'
const CYAN = '0, 212, 255'

export default function FeatureCyberCanvas() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let raf
    const particles = []
    const streams = []

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      particles.length = 0
      for (let i = 0; i < 48; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 1.5 + 0.5,
          a: Math.random(),
        })
      }

      streams.length = 0
      for (let i = 0; i < 6; i++) {
        streams.push({
          x: Math.random() * w,
          y: -20,
          speed: 1.2 + Math.random() * 2,
          len: 40 + Math.random() * 80,
        })
      }
    }

    resize()
    window.addEventListener('resize', resize)

    const drawGrid = (w, h, t) => {
      const cx = w * 0.52
      const cy = h * 0.58
      ctx.strokeStyle = `rgba(${NEON}, 0.08)`
      ctx.lineWidth = 1
      for (let i = -12; i <= 12; i++) {
        const off = i * 28 + (t * 12) % 28
        ctx.beginPath()
        ctx.moveTo(cx + off, cy - 200)
        ctx.lineTo(cx + off * 0.6, cy + 200)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(cx - 200, cy + off * 0.4)
        ctx.lineTo(cx + 200, cy + off * 0.25)
        ctx.stroke()
      }
    }

    let t = 0
    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      t += 0.016

      ctx.fillStyle = 'rgba(5, 5, 8, 0.22)'
      ctx.fillRect(0, 0, w, h)

      drawGrid(w, h, t)

      streams.forEach((s) => {
        s.y += s.speed
        if (s.y > h + s.len) {
          s.y = -s.len
          s.x = Math.random() * w
        }
        const g = ctx.createLinearGradient(s.x, s.y, s.x, s.y + s.len)
        g.addColorStop(0, `rgba(${CYAN}, 0)`)
        g.addColorStop(0.5, `rgba(${NEON}, 0.35)`)
        g.addColorStop(1, `rgba(${NEON}, 0)`)
        ctx.strokeStyle = g
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(s.x, s.y + s.len)
        ctx.stroke()
      })

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
        p.a += 0.02
        ctx.fillStyle = `rgba(${NEON}, ${0.25 + Math.sin(p.a) * 0.25})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      })

      raf = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} className="cyber-canvas-bg" aria-hidden />
}
