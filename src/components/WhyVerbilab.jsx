import { useEffect, useRef } from 'react'
import { batchFadeUp, fadeUp } from '../utils/animations'

const CARDS = [
  {
    title: 'Domain-First Thinking',
    body: "We don't start with AI. We start with your problem.",
  },
  {
    title: 'Production-Grade AI',
    body: 'No prototypes. Built to run at enterprise scale from day one.',
  },
  {
    title: 'Speed to Value',
    body: 'Most clients are up and running within weeks, not months.',
  },
  {
    title: 'Growing Ecosystem',
    body: 'Every product works alongside the others. Intelligence compounds.',
  },
  {
    title: 'Transparent & Explainable AI',
    body: 'Our systems surface the why behind every decision, not just the what.',
  },
  {
    title: 'Partner, Not Vendor',
    body: 'We work alongside you to define success and iterate. Your outcomes are ours.',
  },
]

export default function WhyVerbilab() {
  const sectionRef = useRef(null)

  useEffect(() => {
    fadeUp('.why-head', { trigger: sectionRef.current })
    batchFadeUp('.why-card', { stagger: 0.1 })
  }, [])

  return (
    <section ref={sectionRef} className="section-pad">
      <p className="section-label why-head">◆ WHY US</p>
      <h2 className="section-title why-head">The Verbilab Difference.</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((card) => (
          <article
            key={card.title}
            className="why-card card-glow rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(77,255,164,0.3)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
          >
            <h3 className="mb-3 text-[1.05rem] font-semibold">{card.title}</h3>
            <p className="text-[0.88rem] leading-[1.75] text-[var(--muted)]">{card.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
