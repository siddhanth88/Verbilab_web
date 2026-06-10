import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FeatureCyberScene from './FeatureCyberScene'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  {
    title: 'CALL AUDIT ENGINE',
    desc: 'Score every call. Flag risk. Coach agents in real time.',
    id: 'audit',
    index: '01',
  },
  {
    title: 'CONVERSATIONAL INTELLIGENCE',
    desc: 'Answers grounded in your data. Built for regulated teams.',
    id: 'chat',
    index: '02',
  },
  {
    title: 'WORKFLOW AUTOMATION',
    desc: 'Agents, pipelines, and tasks — orchestrated end to end.',
    id: 'flow',
    index: '03',
  },
]

export default function FeatureTheatre() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef(null)
  const activeId = FEATURES[active].id

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ft-head-reveal', {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="systems"
      ref={sectionRef}
      className="feature-theatre feature-theatre--hover feature-theatre--cyber site-section"
    >
      <div className="section-glow" aria-hidden />
      <div className="feature-theatre-inner">
        <div className="section-inner feature-theatre-grid">
          <div className="feature-theatre-copy">
            <p className="section-kicker ft-head-reveal !mb-2">PRODUCT SYSTEMS</p>
            <h2 className="sr-only">Product Systems</h2>
            <p className="cyber-interface-label ft-head-reveal">INTERFACE · SELECT MODULE</p>

            <div className="feature-list" role="tablist" aria-label="Product systems">
              {FEATURES.map((f, i) => (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  id={`feature-tab-${f.id}`}
                  aria-selected={active === i}
                  aria-controls={`feature-panel-${f.id}`}
                  className={`feature-item ft-head-reveal ${active === i ? 'is-active' : ''}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  <h3 className="feature-heading">
                    <span className="feature-heading-num">{f.index}</span>
                    {f.title}
                  </h3>
                  <p className={`feature-desc-inline ${active === i ? 'is-visible' : ''}`}>
                    {f.desc}
                  </p>
                </button>
              ))}
            </div>

            <div className="feature-progress ft-head-reveal !mt-4 !mb-0">
              {FEATURES.map((f, i) => (
                <span key={f.id} className={`feature-progress-dot ${active === i ? 'is-active' : ''}`} />
              ))}
              <span className="mono-label subtle ml-auto">{FEATURES[active].index} / 03</span>
            </div>
          </div>

          <div
            className="feature-scene cyber-scene-wrap"
            role="tabpanel"
            id={`feature-panel-${activeId}`}
            aria-labelledby={`feature-tab-${activeId}`}
            aria-live="polite"
          >
            <FeatureCyberScene activeId={activeId} />
            <a href="#contact" className="feature-scene-cta btn-ghost">
              Deploy system
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
