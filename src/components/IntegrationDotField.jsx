import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../utils/motion'

export default function IntegrationDotField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || prefersReducedMotion()) return

    const ctx = canvas.getContext('2d')
    let rafId
    let dots = []

    const build = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.floor((w * h) / 4200)
      dots = Array.from({ length: Math.max(28, count) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() > 0.88 ? 1.6 : 0.8,
        phase: Math.random() * Math.PI * 2,
        speed: 0.004 + Math.random() * 0.008,
        drift: (Math.random() - 0.5) * 0.08,
      }))
    }

    build()
    const onResize = () => build()
    window.addEventListener('resize', onResize)

    const draw = (t) => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      dots.forEach((d) => {
        const pulse = 0.35 + Math.sin(t * d.speed + d.phase) * 0.35
        d.x += d.drift
        d.y += Math.sin(t * 0.0004 + d.phase) * 0.04
        if (d.x < 0) d.x = w
        if (d.x > w) d.x = 0

        ctx.beginPath()
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 255, 133, ${pulse * 0.55})`
        ctx.fill()

        if (d.r > 1.2) {
          ctx.beginPath()
          ctx.arc(d.x, d.y, d.r * 3, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0, 255, 133, ${pulse * 0.08})`
          ctx.fill()
        }
      })

      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas className="integration-dot-field" aria-hidden />
}
