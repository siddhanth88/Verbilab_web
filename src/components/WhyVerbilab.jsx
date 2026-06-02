import { useEffect, useRef } from 'react'
import { batchFadeUp, fadeUp } from '../utils/animations'
import SectionAccent3D from './SectionAccent3D'

const CARDS = [
  {
    title: 'Domain-First Thinking',
    body: "We start with your business problem, not with a model.",
  },
  {
    title: 'Production-Grade AI',
    body: 'Built to run at enterprise scale from day one.',
  },
  {
    title: 'Speed to Value',
    body: 'Most teams go live in weeks, not months.',
  },
  {
    title: 'Growing Ecosystem',
    body: 'Each new product compounds intelligence across the stack.',
  },
  {
    title: 'Transparent & Explainable AI',
    body: 'Clear audit trails and explainable decisioning by design.',
  },
  {
    title: 'Partner, Not Vendor',
    body: 'We iterate with your team until outcomes are delivered.',
  },
]

export default function WhyVerbilab() {
  const sectionRef = useRef(null)

  useEffect(() => {
    fadeUp('.why-head', { trigger: sectionRef.current })
    batchFadeUp('.why-card', { stagger: 0.1 })
  }, [])

  return (
    <section ref={sectionRef} className="section-pad relative overflow-hidden">
      <SectionAccent3D className="why-accent" color="#6f8bff" />
      <p className="section-label why-head">◆ WHY US</p>
      <h2 className="section-title why-head max-w-[12ch]">The Verbilab Difference.</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((card) => (
          <article
            key={card.title}
            className="why-card interactive-glow min-h-[13.5rem] rounded-2xl border border-[var(--border)] bg-[rgba(255,255,255,0.01)] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(77,255,164,0.3)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
          >
            <h3 className="neon-hover-text mb-3 text-[1.02rem] font-semibold">{card.title}</h3>
            <p className="text-[0.86rem] leading-[1.72] text-[var(--muted)]">{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
