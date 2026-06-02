import { useEffect, useRef } from 'react'
import { batchFadeUp, fadeUp } from '../utils/animations'

const CARDS = [
  {
    title: 'Domain-First Thinking',
    body: "We don't start with AI. We start with your problem. Our solutions are built by people who understand your industry, not just machine learning.",
  },
  {
    title: 'Production-Grade AI',
    body: 'No prototypes, no pilots that never ship. Our products are built to run at enterprise scale from the moment you go live.',
  },
  {
    title: 'Speed to Value',
    body: 'Our modular architecture means you see results fast. Most clients are up and running within weeks, not months.',
  },
  {
    title: 'Growing Ecosystem',
    body: 'Every product we launch is designed to work alongside the others. As our portfolio grows, so does the intelligence available to you.',
  },
  {
    title: 'Transparent & Explainable AI',
    body: 'We believe AI should be auditable and explainable. Our systems surface the why behind every decision — not just the what.',
  },
  {
    title: 'Partner, Not Vendor',
    body: 'We work alongside you to define success, configure solutions, and iterate continuously. Your outcomes are our outcomes.',
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
