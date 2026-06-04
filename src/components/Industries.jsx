import { useEffect, useRef } from 'react'
import { fadeUp } from '../utils/animations'
import { useMouseTilt } from '../hooks/useMouseTilt'
import ScrollRevealCard from './ScrollRevealCard'
import Industries3DAccent from './Industries3DAccent'

const CELLS = [
  {
    icon: '🎧',
    badge: 'Active Solution Available',
    badgeClass: 'text-[var(--accent)] border-[var(--accent-glow)] bg-[var(--accent-dim)]',
    title: 'BPO & Contact Centres',
    body: 'Audit every call. Coach every agent. Ensure quality at scale without expanding your QA headcount.',
  },
  {
    icon: '🏦',
    badge: 'Active Solution Available',
    badgeClass: 'text-[var(--accent)] border-[var(--accent-glow)] bg-[var(--accent-dim)]',
    title: 'Banking & Financial Services',
    body: 'Ensure call compliance, detect mis-selling, and keep a complete audit trail.',
  },
  {
    icon: '🎬',
    badge: 'Coming Soon',
    badgeClass: 'text-[var(--muted)] border-[var(--border2)]',
    title: 'Film & Entertainment',
    body: 'AI intelligence for content workflows, post-production, and media compliance.',
  },
  {
    icon: '📋',
    badge: 'Coming Soon',
    badgeClass: 'text-[var(--muted)] border-[var(--border2)]',
    title: 'Compliance & Regulatory Bodies',
    body: 'Automated monitoring, real-time risk flagging, and audit-ready reporting.',
  },
  {
    icon: '🏢',
    badge: 'Exploring Partnerships',
    badgeClass: 'text-[var(--muted)] border-[var(--border2)]',
    title: 'Enterprises & Large Organisations',
    body: 'For organisations operating at conversation and decision scale.',
  },
  {
    icon: '🚀',
    badge: "Let's Talk",
    badgeClass: 'text-[var(--accent)] border-[var(--accent-glow)] bg-[var(--accent-dim)]',
    title: 'Startups & Scale-ups',
    body: 'AI-native operations from day one.',
  },
]

function IndustryCell({ cell, index }) {
  const tilt = useMouseTilt(6)

  return (
    <ScrollRevealCard delay={index * 0.06} direction={index % 2 === 0 ? 'left' : 'right'}>
      <article
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        className="industry-cell interactive-glow min-h-[15.5rem] break-words border-b border-[var(--border)] bg-[rgba(255,255,255,0.01)] p-8 transition-colors duration-300 last:border-b-0 hover:bg-[var(--surface)] md:border-b-0 md:border-r md:last:border-r-0 [&:nth-child(-n+3)]:md:border-b"
      >
        <div className="mb-4 text-[2rem]">{cell.icon}</div>
        <span
          className={`mb-4 inline-block rounded-sm border px-3 py-1 text-[0.62rem] uppercase tracking-[0.12em] ${cell.badgeClass}`}
        >
          {cell.badge}
        </span>
        <h3 className="subheading neon-hover-text mb-2">{cell.title}</h3>
        <p className="body-text">{cell.body}</p>
      </article>
    </ScrollRevealCard>
  )
}

export default function Industries() {
  const sectionRef = useRef(null)

  useEffect(() => {
    fadeUp('.industries-head', { trigger: sectionRef.current })

  }, [])

  return (
    <section id="industries" ref={sectionRef} className="section-pad relative overflow-hidden">
      <Industries3DAccent />
      <p className="section-label industries-head">INDUSTRIES</p>
      <h2 className="section-title industries-head max-w-[14ch]">
        Built for the Industries That Move the World.
      </h2>
      <p className="industries-head section-intro mb-10">
        Built for teams where quality, compliance, and speed are mission-critical.
      </p>

      <div className="industries-grid grid grid-cols-1 border border-[var(--border)] md:grid-cols-3">
        {CELLS.map((cell, i) => (
          <IndustryCell key={cell.title} cell={cell} index={i} />
        ))}
      </div>
    </section>
  )
}
