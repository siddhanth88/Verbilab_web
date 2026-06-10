import { useEffect, useRef } from 'react'
import { fadeUp } from '../utils/animations'
import ScrollRevealCard from './ScrollRevealCard'
import SectionAccent3D from './SectionAccent3D'

const CARDS = [
  {
    title: 'Domain-First Thinking',
    body: "We start with your business problem, not with a model.",
    tag: 'THINKING FIRST',
  },
  {
    title: 'Production-Grade AI',
    body: 'Built to run at enterprise scale from day one.',
    tag: 'BUILT TO SCALE',
  },
  {
    title: 'Speed to Value',
    body: 'Most teams go live in weeks, not months.',
    tag: 'FAST DEPLOYMENT',
  },
  {
    title: 'Growing Ecosystem',
    body: 'Each new product compounds intelligence across the stack.',
    tag: 'COMPOUND VALUE',
  },
  {
    title: 'Transparent & Explainable AI',
    body: 'Clear audit trails and explainable decisioning by design.',
    tag: 'AUDIT READY',
  },
  {
    title: 'Partner, Not Vendor',
    body: 'We iterate with your team until outcomes are delivered.',
    tag: 'TRUE PARTNER',
  },
]

export default function WhyVerbilab() {
  const sectionRef = useRef(null)

  useEffect(() => {
    fadeUp('.why-head', { trigger: sectionRef.current, y: 20 })
  }, [])

  return (
    <section ref={sectionRef} className="section-pad relative overflow-hidden">
      <SectionAccent3D className="why-accent" />
      <p className="section-label why-head">WHY US</p>
      <h2 className="section-title why-head max-w-[12ch]">The Verbilab Difference.</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((card, i) => (
          <ScrollRevealCard key={card.title} delay={i * 0.08} direction="up">
            <div className="why-card">
              <div
                style={{
                  width: '32px',
                  height: '2px',
                  background: 'var(--accent)',
                  marginBottom: '1.5rem',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  bottom: '1rem',
                  right: '1.5rem',
                  fontFamily: 'var(--font-display)',
                  fontSize: '5rem',
                  color: 'rgba(255,255,255,0.03)',
                  lineHeight: 1,
                  userSelect: 'none',
                }}
              >
                0{i + 1}
              </span>
              <h3 className="subheading neon-hover-text mb-3">{card.title}</h3>
              <p className="body-text flex-1">{card.body}</p>
              <span
                style={{
                  marginTop: 'auto',
                  fontSize: '0.65rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--accent)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                {card.tag}
              </span>
            </div>
          </ScrollRevealCard>
        ))}
      </div>
    </section>
  )
}
