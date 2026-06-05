import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import HeroCanvas from './HeroCanvas'
import HeroVisual from './HeroVisual'
import { prefersReducedMotion } from '../utils/motion'

const LINES = ['AI THAT WORKS', 'WHERE IT MATTERS']

export default function Hero() {
  const sectionRef = useRef(null)
  const parallaxRef = useRef({ x: 0, y: 0 })
  const motionRef = useRef({ speed: 0 })

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return

      gsap.from('.hero-line span', {
        y: '100%',
        stagger: 0.14,
        duration: 1.1,
        ease: 'power3.out',
        delay: 0.15,
        immediateRender: false,
      })
      gsap.from('.hero-reveal', {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.5,
        immediateRender: false,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      parallaxRef.current = { x, y }
      motionRef.current.speed = Math.min(
        1.2,
        Math.hypot(x, y) * 2.5 + Math.abs(x) * 0.4,
      )
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section id="home" ref={sectionRef} className="hero-cinematic section-mesh scanlines grain">
      <HeroCanvas motionRef={motionRef} />
      <div className="hero-ambient" aria-hidden />
      <div className="pointer-events-none absolute inset-0 scanlines" aria-hidden />

      <div className="hero-grid">
        <div className="hero-copy">
          <p className="section-kicker hero-reveal">APPLIED AI FOR REAL OPERATIONS</p>
          <h1 className="display-xl hero-title-glow">
            <span className="sr-only">Verbilab AI — </span>
            {LINES.map((line) => (
              <span key={line} className="hero-line">
                <span>{line}</span>
              </span>
            ))}
          </h1>
          <p className="body-short hero-reveal mt-6">
            Audit calls, automate workflows, and turn enterprise data into decisions.
          </p>
          <div className="hero-reveal mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="btn-primary">
              Book a Demo
            </a>
            <a href="#systems" className="btn-ghost">
              View Systems
            </a>
          </div>
        </div>

        <div className="hero-reveal hero-visual-col">
          <HeroVisual parallaxRef={parallaxRef} />
        </div>
      </div>

      <span className="mono-label absolute bottom-6 right-[clamp(1.25rem,4vw,4rem)] z-[3] opacity-40 [writing-mode:vertical-rl]">
        SCROLL
      </span>
    </section>
  )
}
