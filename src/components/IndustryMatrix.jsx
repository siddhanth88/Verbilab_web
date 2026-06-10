import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import IntegrationDotField from './IntegrationDotField'
import { prefersReducedMotion } from '../utils/motion'

gsap.registerPlugin(ScrollTrigger)

const INDUSTRIES = [
  { code: 'BPO', name: 'BPO', useCase: 'Score every agent conversation at scale.' },
  { code: 'BFSI', name: 'Banking & BFSI', useCase: 'Regulated QA with audit-ready trails.' },
  { code: 'MED', name: 'Media & Film', useCase: 'Rights, scripts, and production intelligence.', soon: true },
  { code: 'CMP', name: 'Compliance', useCase: 'Policy checks embedded in workflows.' },
  { code: 'ENT', name: 'Enterprise', useCase: 'Unified AI layer across operations.' },
  { code: 'SCL', name: 'Startups', useCase: 'Ship audit and automation without overhead.' },
]

function IndustryIcon({ type }) {
  const common = { stroke: 'rgba(91,192,222,0.55)', strokeWidth: 1.2, fill: 'none' }
  if (type === 'BPO')
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden className="industry-icon-svg">
        <path {...common} d="M4 12h16M8 8v8M16 6v12" />
        <circle cx="12" cy="12" r="2" fill="rgba(91,192,222,0.4)" />
      </svg>
    )
  if (type === 'BFSI')
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden className="industry-icon-svg">
        <path {...common} d="M6 18V8l6-4 6 4v10" />
        <path {...common} d="M9 14h6" />
      </svg>
    )
  if (type === 'MED')
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden className="industry-icon-svg">
        <rect {...common} x="4" y="6" width="16" height="12" rx="1" />
        <path {...common} d="M8 10h8M8 14h5" />
      </svg>
    )
  if (type === 'CMP')
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden className="industry-icon-svg">
        <path {...common} d="M12 4l8 4v8l-8 4-8-4V8z" />
        <path {...common} d="M12 12v8M8 10l4 2 4-2" />
      </svg>
    )
  if (type === 'ENT')
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden className="industry-icon-svg">
        <circle {...common} cx="12" cy="8" r="3" />
        <path {...common} d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      </svg>
    )
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden className="industry-icon-svg">
      <path {...common} d="M6 18L12 6l6 12M9 14h6" />
    </svg>
  )
}

export default function IndustryMatrix() {
  const ref = useRef(null)
  const cycleRef = useRef(null)

  useEffect(() => {
    const section = ref.current
    if (!section) return

    const ctx = gsap.context(() => {
      const tiles = gsap.utils.toArray('.industry-tile', section)
      const reveals = gsap.utils.toArray('.industries-reveal', section)

      if (!prefersReducedMotion()) {
        gsap.set(reveals, { opacity: 0, y: 20 })
        gsap.set(tiles, { opacity: 0, y: 28, scale: 0.97 })
      }

      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
      })

      intro
        .to(reveals, { opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: 'power2.out' })
        .to(tiles, { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.07, ease: 'power2.out' }, '-=0.35')
        .add(startCycle)

      function startCycle() {
        let idx = 0
        const activate = () => {
          tiles.forEach((t) => t.classList.remove('is-live'))
          tiles[idx]?.classList.add('is-live')
          idx = (idx + 1) % tiles.length
        }
        activate()
        cycleRef.current = window.setInterval(activate, 2800)
      }
    }, ref)

    return () => {
      ctx.revert()
      if (cycleRef.current) clearInterval(cycleRef.current)
    }
  }, [])

  return (
    <section id="industries" ref={ref} className="site-section section-mesh industries-section">
      <div className="section-glow" aria-hidden />
      <div className="section-inner">
        <p className="section-kicker industries-reveal">INDUSTRIES</p>
        <h2 className="display-lg industries-reveal mb-8 max-w-[14ch]">Built where stakes are high.</h2>

        <div className="industry-matrix-stage scanlines grain">
          <IntegrationDotField />
          <div className="industry-matrix-vignette" aria-hidden />

          <div className="industry-matrix industry-matrix-premium industry-matrix-animated">
            {INDUSTRIES.map((ind, i) => (
              <div
                key={ind.code}
                className="industry-cell matrix-cell industry-tile"
                data-index={i}
                data-cursor-hover
              >
                <span className="industry-tile-glow" aria-hidden />
                <span className="industry-tile-corner industry-tile-corner--tl" aria-hidden />
                <span className="industry-tile-corner industry-tile-corner--br" aria-hidden />

                <div className="industry-tile-top">
                  <IndustryIcon type={ind.code} />
                  <span className="industry-circuit-wrap" aria-hidden>
                    <span className="industry-circuit" />
                    <span className="industry-circuit-dot" />
                  </span>
                  <span className={`status-chip${ind.soon ? ' status-chip--soon' : ''}`}>
                    {ind.soon ? 'SOON' : 'ACTIVE'}
                  </span>
                </div>

                <div>
                  <p className="mono-label subtle mb-1">{ind.code}</p>
                  <h3 className="text-sm font-medium text-[var(--white)]">{ind.name}</h3>
                </div>

                <p className="industry-use-case">{ind.useCase}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
