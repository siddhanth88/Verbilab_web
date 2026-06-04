import { useEffect, useRef } from 'react'
import { Search, Cog, Link2, TrendingUp } from 'lucide-react'
import { fadeUp } from '../utils/animations'
import ScrollRevealCard from './ScrollRevealCard'

const CARDS = [
  {
    icon: Search,
    title: 'Deep Problem Research',
    body: 'We embed with domain experts to understand workflows, edge cases, and pain points before writing a single line of code.',
  },
  {
    icon: Cog,
    title: 'Custom AI Engineering',
    body: 'Models trained, fine-tuned, and validated on real-world data — not generic benchmarks.',
  },
  {
    icon: Link2,
    title: 'Seamless Integration',
    body: 'Our products plug into your existing systems. Minimal friction. Maximum impact.',
  },
  {
    icon: TrendingUp,
    title: 'Continuous Improvement',
    body: 'Every interaction makes our models smarter, more accurate, and more valuable over time.',
  },
]

export default function WhatWeDo() {
  const sectionRef = useRef(null)

  useEffect(() => {
    fadeUp('.wwd-reveal', { trigger: sectionRef.current })
  }, [])

  return (
    <section id="solutions" ref={sectionRef} className="section-pad">
      <p className="section-label wwd-reveal">OUR APPROACH</p>
      <h2 className="section-title wwd-reveal">AI Solutions Built for Business.</h2>
      <p className="wwd-reveal mb-10 max-w-[58ch] text-[0.95rem] leading-[1.8] text-[var(--muted)]">
        We do not build AI for the sake of AI. Every product starts with a real business problem
        and is engineered for measurable outcomes, seamless integration, and continuous learning.
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {CARDS.map(({ icon: Icon, title, body }, i) => (
          <ScrollRevealCard key={title} delay={i * 0.1} direction="up">
            <article className="feature-card interactive-glow grain-overlay relative min-h-[14.5rem] rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8 transition-all duration-300 hover:-translate-y-1">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--accent-glow)] bg-[var(--accent-dim)] text-[var(--accent)]">
                <Icon size={20} />
              </div>
              <h3 className="mb-3 text-[1.1rem] font-semibold">{title}</h3>
              <p className="text-[0.88rem] leading-[1.75] text-[var(--muted)]">{body}</p>
            </article>
          </ScrollRevealCard>
        ))}
      </div>
    </section>
  )
}
