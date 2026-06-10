import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../utils/motion'
import { ACCENT, ACCENT_RGB, accentAlpha } from '../utils/brandColors'

gsap.registerPlugin(ScrollTrigger)

const STREAM_LABELS = [
  'NEURAL PIPELINE',
  'DATA INGEST',
  'MODEL READY',
  'AUDIT LAYER',
  'COMPLIANCE SYNC',
  'DEPLOY SIGNAL',
]

const PATHS = [
  'M -40 52 Q 200 12 440 52 T 920 52',
  'M -40 80 Q 280 120 520 80 T 920 80',
  'M -40 108 Q 160 68 400 108 T 920 108',
]

export default function AboutContactBridge() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || prefersReducedMotion()) return

    const ctx = canvas.getContext('2d')
    let rafId
    let nodes = []
    let packets = []

    const build = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.floor((w * h) / 2800)
      nodes = Array.from({ length: Math.max(36, count) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() > 0.9 ? 2 : 1,
        phase: Math.random() * Math.PI * 2,
        speed: 0.003 + Math.random() * 0.006,
      }))

      packets = Array.from({ length: 5 }, (_, i) => ({
        x: Math.random() * w,
        y: h * 0.35 + (i % 3) * (h * 0.12),
        vx: 0.4 + Math.random() * 0.6,
        len: 30 + Math.random() * 50,
        alpha: 0.35 + Math.random() * 0.4,
      }))
    }

    build()
    const onResize = () => build()
    window.addEventListener('resize', onResize)

    const draw = (t) => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      nodes.forEach((n, i) => {
        const pulse = 0.25 + Math.sin(t * n.speed + n.phase) * 0.35
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${ACCENT_RGB}, ${pulse * 0.7})`
        ctx.fill()

        nodes.slice(i + 1).forEach((m) => {
          const dist = Math.hypot(m.x - n.x, m.y - n.y)
          if (dist < 90) {
            ctx.beginPath()
            ctx.moveTo(n.x, n.y)
            ctx.lineTo(m.x, m.y)
            ctx.strokeStyle = `rgba(${ACCENT_RGB}, ${0.04 * (1 - dist / 90)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        })
      })

      packets.forEach((p) => {
        p.x += p.vx
        if (p.x > w + p.len) {
          p.x = -p.len
          p.y = h * 0.3 + Math.random() * h * 0.4
        }

        const grad = ctx.createLinearGradient(p.x - p.len, p.y, p.x, p.y)
        grad.addColorStop(0, accentAlpha(0))
        grad.addColorStop(0.6, `rgba(${ACCENT_RGB}, ${p.alpha * 0.5})`)
        grad.addColorStop(1, `rgba(${ACCENT_RGB}, ${p.alpha})`)

        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(p.x - p.len, p.y)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()

        ctx.fillStyle = `rgba(${ACCENT_RGB}, ${p.alpha})`
        ctx.shadowBlur = 10
        ctx.shadowColor = ACCENT
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      })

      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return

      gsap.from('.acb-reveal', {
        y: 18,
        opacity: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          once: true,
        },
      })

      gsap.to('.acb-packet', {
        strokeDashoffset: -120,
        duration: 2.4,
        ease: 'none',
        repeat: -1,
        stagger: 0.35,
      })

      gsap.to('.acb-core-ring', {
        scale: 1.15,
        opacity: 0.35,
        duration: 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        transformOrigin: '50% 50%',
      })

      gsap.to('.acb-scan-beam', {
        x: '120%',
        duration: 4.5,
        ease: 'none',
        repeat: -1,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="about-contact-bridge"
      aria-label="Transition to contact"
    >
      <div className="acb-horizon acb-horizon--top" aria-hidden />
      <canvas ref={canvasRef} className="acb-canvas" aria-hidden />

      <div className="acb-scanlines scanlines" aria-hidden>
        <div className="acb-scan-beam" />
      </div>

      <svg className="acb-svg" viewBox="0 0 880 160" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id="acbGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(91,192,222,0)" />
            <stop offset="50%" stopColor="rgba(91,192,222,0.55)" />
            <stop offset="100%" stopColor="rgba(91,192,222,0)" />
          </linearGradient>
        </defs>
        {PATHS.map((d, i) => (
          <path
            key={d}
            d={d}
            className="acb-path"
            fill="none"
            stroke="url(#acbGrad)"
            strokeWidth="1"
            opacity={0.35 + i * 0.1}
          />
        ))}
        {PATHS.map((d, i) => (
          <path
            key={`pkt-${d}`}
            d={d}
            className="acb-packet"
            fill="none"
            stroke={ACCENT}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="8 112"
            style={{ animationDelay: `${i * 0.6}s` }}
          />
        ))}
      </svg>

      <div className="acb-center acb-reveal">
        <div className="acb-core" aria-hidden>
          <span className="acb-core-ring" />
          <span className="acb-core-dot" />
        </div>
        <p className="acb-status mono-label">
          <span className="acb-status-dot" aria-hidden />
          SYSTEM LINK · ACTIVE
        </p>
        <div className="acb-ticker" aria-hidden>
          <div className="acb-ticker-track">
            {[...STREAM_LABELS, ...STREAM_LABELS].map((label, i) => (
              <span key={`${label}-${i}`} className="acb-ticker-item">
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="acb-horizon acb-horizon--bottom" aria-hidden />
    </section>
  )
}
