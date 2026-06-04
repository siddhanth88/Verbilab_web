import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const INDUSTRIES = [
  { code: 'BPO', name: 'BPO', useCase: 'Score every agent conversation at scale.' },
  { code: 'BFSI', name: 'Banking & BFSI', useCase: 'Regulated QA with audit-ready trails.' },
  { code: 'MED', name: 'Media & Film', useCase: 'Rights, scripts, and production intelligence.' },
  { code: 'CMP', name: 'Compliance', useCase: 'Policy checks embedded in workflows.' },
  { code: 'ENT', name: 'Enterprise', useCase: 'Unified AI layer across operations.' },
  { code: 'SCL', name: 'Startups', useCase: 'Ship audit and automation without overhead.' },
]

function IndustryIcon({ type }) {
  const common = { stroke: 'rgba(0,255,133,0.55)', strokeWidth: 1.2, fill: 'none' }
  if (type === 'BPO')
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
        <path {...common} d="M4 12h16M8 8v8M16 6v12" />
        <circle cx="12" cy="12" r="2" fill="rgba(0,255,133,0.4)" />
      </svg>
    )
  if (type === 'BFSI')
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
        <path {...common} d="M6 18V8l6-4 6 4v10" />
        <path {...common} d="M9 14h6" />
      </svg>
    )
  if (type === 'MED')
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
        <rect {...common} x="4" y="6" width="16" height="12" rx="1" />
        <path {...common} d="M8 10h8M8 14h5" />
      </svg>
    )
  if (type === 'CMP')
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
        <path {...common} d="M12 4l8 4v8l-8 4-8-4V8z" />
        <path {...common} d="M12 12v8M8 10l4 2 4-2" />
      </svg>
    )
  if (type === 'ENT')
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
        <circle {...common} cx="12" cy="8" r="3" />
        <path {...common} d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      </svg>
    )
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
      <path {...common} d="M6 18L12 6l6 12M9 14h6" />
    </svg>
  )
}

export default function IndustryMatrix() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.matrix-cell', {
        opacity: 0,
        y: 24,
        stagger: 0.06,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          once: true,
        },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="industries" ref={ref} className="section-pad section-mesh industries-section">
      <div className="section-inner">
        <p className="section-kicker">INDUSTRIES</p>
        <h2 className="display-lg mb-8 max-w-[14ch]">Built where stakes are high.</h2>

        <div className="industry-matrix industry-matrix-premium">
          {INDUSTRIES.map((ind) => (
            <div key={ind.code} className="industry-cell matrix-cell industry-tile">
              <div className="industry-tile-top">
                <IndustryIcon type={ind.code} />
                <span className="industry-circuit" aria-hidden />
                <span className="status-chip">{ind.code === 'MED' ? 'SOON' : 'ACTIVE'}</span>
              </div>
              <div>
                <p className="mono-label subtle mb-1">{ind.code}</p>
                <p className="text-sm font-medium text-[var(--white)]">{ind.name}</p>
              </div>
              <p className="industry-use-case">{ind.useCase}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
