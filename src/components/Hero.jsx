import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import HeroCanvas from './HeroCanvas'

const LINES = ['WE BUILD AI', 'THAT WORKS', 'WHERE IT MATTERS.']

export default function Hero() {
  const sectionRef = useRef(null)
  const motionRef = useRef({ speed: 0 })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-line span', {
        y: '110%',
        stagger: 0.12,
        duration: 1.1,
        ease: 'expo.out',
        delay: 0.2,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    let lastX = 0
    let lastY = 0

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      const speed = Math.hypot(x - lastX, y - lastY)
      lastX = x
      lastY = y
      motionRef.current.speed = Math.min(1.5, motionRef.current.speed + speed * 2.5)
    }

    const onWheel = (e) => {
      motionRef.current.speed = Math.min(
        1.5,
        motionRef.current.speed + Math.abs(e.deltaY) * 0.0015,
      )
    }

    el.addEventListener('mousemove', onMove, { passive: true })
    el.addEventListener('wheel', onWheel, { passive: true })
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('wheel', onWheel)
    }
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col justify-end px-[clamp(1.5rem,4vw,4rem)] pb-[clamp(2rem,5vh,4rem)] pt-28"
    >
      <HeroCanvas motionRef={motionRef} />

      <p
        className="absolute left-[clamp(1.5rem,4vw,4rem)] top-[clamp(6rem,10vh,9rem)] z-[1] font-mono text-[0.65rem] tracking-[0.14em] text-[var(--accent)]"
      >
        ◆ AI-POWERED SOLUTIONS FOR THE REAL WORLD
      </p>

      <div className="relative z-[1] flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <h1 className="hero-title-glow font-display max-w-[14ch] text-[clamp(2.75rem,5.5vw,6.5rem)] leading-[0.92] tracking-[-0.01em] lg:max-w-[12ch]">
          {LINES.map((line) => (
            <span key={line} className="hero-line">
              <span>{line}</span>
            </span>
          ))}
        </h1>

        <div className="max-w-[340px] shrink-0 space-y-6">
          <p className="text-[0.95rem] leading-relaxed text-[var(--muted)]">
            Verbilab builds production-grade AI for industries where quality,
            compliance, and scale matter — from call centres to banking to
            entertainment.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-[#050508] transition-opacity hover:opacity-85"
            >
              Book a Demo →
            </a>
            <a
              href="#products"
              className="inline-flex items-center justify-center rounded-full border border-[var(--border2)] px-6 py-3 text-sm transition-colors hover:border-[var(--accent)]"
            >
              Explore Products
            </a>
          </div>
        </div>
      </div>

      <span className="absolute bottom-8 right-[clamp(1.5rem,4vw,4rem)] z-[1] font-mono text-[0.65rem] tracking-[0.2em] text-[var(--muted)] opacity-50 [writing-mode:vertical-rl]">
        SCROLL
      </span>
    </section>
  )
}
