import { useEffect } from 'react'
import { useInViewCanvas } from '../hooks/useInViewCanvas'
import { prefersReducedMotion } from '../utils/motion'

export default function CircuitBackground() {
  const { ref, inViewRef } = useInViewCanvas()

  useEffect(() => {
    const canvas = ref.current
    if (!canvas || prefersReducedMotion()) return

    const ctx = canvas.getContext('2d')
    let animFrame
    let intervalId
    const ACCENT = '#00FF85'

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const CELL = 48
      const COLS = Math.floor(w / CELL)
      const ROWS = Math.floor(h / CELL)
      const nodes = []
      const connections = []

      for (let x = 1; x < COLS; x++) {
        for (let y = 1; y < ROWS; y++) {
          if (Math.random() > 0.7) {
            nodes.push({
              x: x * CELL + (Math.random() - 0.5) * 10,
              y: y * CELL + (Math.random() - 0.5) * 10,
              pulse: Math.random(),
              pulseSpeed: 0.007 + Math.random() * 0.014,
              size: Math.random() > 0.85 ? 3 : 1.5,
            })
          }
        }
      }

      nodes.forEach((a, i) => {
        nodes.slice(i + 1).forEach((b) => {
          const dist = Math.hypot(b.x - a.x, b.y - a.y)
          if (dist < CELL * 2.2 && Math.random() > 0.5) {
            connections.push({
              a,
              b,
              progress: 0,
              speed: 0.0028 + Math.random() * 0.0056,
              active: false,
            })
          }
        })
      })

      return { w, h, nodes, connections }
    }

    let state = setup()

    intervalId = setInterval(() => {
      if (!inViewRef.current) return
      const inactive = state.connections.filter((c) => !c.active)
      if (inactive.length) {
        const pick = inactive[Math.floor(Math.random() * inactive.length)]
        pick.active = true
        pick.progress = 0
      }
    }, 79)

    const draw = () => {
      animFrame = requestAnimationFrame(draw)
      if (!inViewRef.current) return

      const { w, h, nodes, connections } = state
      ctx.clearRect(0, 0, w, h)

      ctx.strokeStyle = 'rgba(0, 255, 133, 0.04)'
      ctx.lineWidth = 1
      connections.forEach(({ a, b }) => {
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      })

      connections.forEach((conn) => {
        if (!conn.active) return
        conn.progress += conn.speed
        if (conn.progress >= 1) {
          conn.active = false
          conn.progress = 0
          return
        }

        const px = conn.a.x + (conn.b.x - conn.a.x) * conn.progress
        const py = conn.a.y + (conn.b.y - conn.a.y) * conn.progress
        const trailLength = 0.15
        const trailStart = Math.max(0, conn.progress - trailLength)
        const sx = conn.a.x + (conn.b.x - conn.a.x) * trailStart
        const sy = conn.a.y + (conn.b.y - conn.a.y) * trailStart

        const grad = ctx.createLinearGradient(sx, sy, px, py)
        grad.addColorStop(0, 'rgba(0,255,133,0)')
        grad.addColorStop(1, 'rgba(0,255,133,0.8)')
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(sx, sy)
        ctx.lineTo(px, py)
        ctx.stroke()

        ctx.fillStyle = ACCENT
        ctx.beginPath()
        ctx.arc(px, py, 2.5, 0, Math.PI * 2)
        ctx.fill()
      })

      nodes.forEach((node) => {
        node.pulse += node.pulseSpeed
        const alpha = 0.15 + Math.abs(Math.sin(node.pulse)) * 0.5
        ctx.fillStyle = `rgba(0, 255, 133, ${alpha})`
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    draw()

    const onResize = () => {
      state = setup()
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animFrame)
      clearInterval(intervalId)
      window.removeEventListener('resize', onResize)
    }
  }, [inViewRef, ref])

  return <canvas ref={ref} className="circuit-canvas" aria-hidden />
}
