import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import OutcomeCardVisual from './OutcomeCardVisual'

gsap.registerPlugin(ScrollTrigger)

const TRUSTED = ['BPO', 'BFSI', 'Contact Centres', 'Compliance', 'Enterprise']

const OUTCOMES = [
  {
    feature: 'FEATURE 01',
    value: '98%',
    label: 'Audit Accuracy',
    desc: 'Validated on live enterprise call data.',
    visual: 'audit',
  },
  {
    feature: 'FEATURE 02',
    value: '100%',
    label: 'Call Coverage',
    desc: 'Every conversation scored — not a sample.',
    visual: 'coverage',
  },
  {
    feature: 'FEATURE 03',
    value: '4+',
    label: 'Industries Served',
    desc: 'BPO, BFSI, media, and compliance.',
    visual: 'industries',
  },
]

export default function OutcomeCards() {
  const ref = useRef(null)

  useEffect(() => {
    const section = ref.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from('.outcome-reveal', {
        y: 36,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: section,
          start: 'top 88%',
          toggleActions: 'play none none none',
          once: true,
        },
      })

      gsap.from('.outcomes-trust-item', {
        opacity: 0,
        y: 12,
        stagger: 0.06,
        duration: 0.6,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: section.querySelector('.outcomes-trust-slice'),
          start: 'top 88%',
          toggleActions: 'play none none none',
          once: true,
        },
      })
    }, ref)

    requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => ctx.revert()
  }, [])

  return (
    <section id="outcomes" ref={ref} className="outcomes-section site-section">
      <div className="outcomes-unified">
        <div className="outcomes-trust-slice outcome-reveal">
          <p className="outcomes-trust-label">BUILT FOR OPERATIONS IN</p>
          <div className="outcomes-trust-row">
            {TRUSTED.map((name) => (
              <div key={name} className="outcomes-trust-item">
                <span className="outcomes-trust-bracket" aria-hidden />
                <span className="outcomes-trust-name">{name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="outcomes-content section-pad">
          <div className="section-inner">
            <p className="section-kicker outcome-reveal">PROVEN METRICS</p>
            <h2 className="outcomes-headline outcome-reveal">Numbers that move operations.</h2>
            <p className="body-short outcome-reveal outcomes-sub max-w-[42ch]">
              Call scoring, full coverage, and multi-industry deployment — measured on live data.
            </p>

            <div className="outcomes-sazabi-grid">
              {OUTCOMES.map((o) => (
                <article key={o.label} className="outcome-sazabi-card outcome-reveal">
                  <div className="outcome-sazabi-visual">
                    <OutcomeCardVisual type={o.visual} />
                  </div>
                  <div className="outcome-sazabi-body">
                    <p className="outcome-value">{o.value}</p>
                    <h3 className="outcome-sazabi-title">{o.label}</h3>
                    <p className="body-short !text-[0.85rem]">{o.desc}</p>
                  </div>
                  <div className="outcome-sazabi-footer">
                    <span className="mono-label subtle">{o.feature}</span>
                    <a href="#contact" className="outcome-read-more">
                      Read more —
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
