import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FEATURES = [
  {
    num: '01',
    title: 'DEEP PROBLEM\nRESEARCH',
    body: 'We embed with domain experts to understand workflows, edge cases, and pain points before writing a single line of code.',
    tag: 'RESEARCH',
    visual: 'research',
    stat: '247',
    statLabel: 'data points mapped',
    label: 'DOMAIN ANALYSIS',
  },
  {
    num: '02',
    title: 'CUSTOM AI\nENGINEERING',
    body: 'Models trained, fine-tuned, and validated on real-world data — not generic benchmarks. Built for your exact use case.',
    tag: 'ENGINEERING',
    visual: 'engineering',
    stat: '98.4%',
    statLabel: 'accuracy achieved',
    label: 'MODEL TRAINING',
  },
  {
    num: '03',
    title: 'SEAMLESS\nINTEGRATION',
    body: 'Our products plug into your existing systems — CRM, telephony, compliance tools. Minimal friction. Maximum impact.',
    tag: 'INTEGRATION',
    visual: 'integration',
    stat: '14',
    statLabel: 'integrations supported',
    label: 'SYSTEM CONNECTED',
  },
  {
    num: '04',
    title: 'CONTINUOUS\nIMPROVEMENT',
    body: 'Every interaction makes our models smarter. Your AI gets more accurate, more valuable, and more capable over time.',
    tag: 'EVOLUTION',
    visual: 'evolution',
    stat: '↑ 34%',
    statLabel: 'improvement avg',
    label: 'PERFORMANCE OVER TIME',
  },
]

function FeatureVisual({ feature }) {
  return (
    <div className="visual-box">
      <span className="visual-label">{feature.label}</span>
      <div className={`visual-art visual-art--${feature.visual}`} aria-hidden />
      <p className="visual-stat">
        <span>{feature.stat}</span>
        {feature.statLabel}
      </p>
    </div>
  )
}

export default function ScrollFeatures() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef(null)

  useEffect(() => {
    const triggers = FEATURES.map((_, i) =>
      ScrollTrigger.create({
        trigger: `.feature-item-${i}`,
        start: 'top 55%',
        end: 'bottom 45%',
        onEnter: () => setActive(i),
        onEnterBack: () => setActive(i),
      }),
    )

    gsap.from('.scroll-features-head', {
      y: 24,
      opacity: 0,
      duration: 0.85,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
        once: true,
      },
    })

    return () => triggers.forEach((t) => t.kill())
  }, [])

  return (
    <section id="solutions" ref={sectionRef} className="scroll-features-section section-pad">
      <p className="section-label scroll-features-head">OUR APPROACH</p>
      <h2 className="section-title scroll-features-head">
        AI Solutions Built
        <br />
        for Business.
      </h2>
      <p className="section-intro scroll-features-head mb-12">
        We do not build AI for the sake of AI. Every product starts with a real business problem
        and is engineered for measurable outcomes, seamless integration, and continuous learning.
      </p>

      <div className="scroll-features-grid">
        <div className="features-left">
          {FEATURES.map((f, i) => (
            <div
              key={f.num}
              className={`feature-item feature-item-${i} ${active === i ? 'active' : ''}`}
            >
              <span className="feature-num">{f.num}</span>
              <div className="feature-content">
                <span className="feature-tag">{f.tag}</span>
                <h3 className="feature-title">{f.title}</h3>
                <p className="body-text feature-body">{f.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="features-right hidden lg:block">
          <div className="feature-visual-sticky">
            {FEATURES.map((f, i) => (
              <div key={f.num} className={`feature-visual ${active === i ? 'visible' : ''}`}>
                <FeatureVisual feature={f} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
