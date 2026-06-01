import { useEffect, useRef } from 'react'
import { batchFadeUp, fadeUp } from '../utils/animations'

const CELLS = [
  {
    icon: '🎧',
    badge: 'Active Solution',
    badgeClass: 'text-[var(--accent)] border-[rgba(77,255,164,0.25)] bg-[rgba(77,255,164,0.08)]',
    title: 'BPO & Contact Centres',
    body: 'Audit every call. Coach every agent. Quality at scale.',
  },
  {
    icon: '🏦',
    badge: 'Active Solution',
    badgeClass: 'text-[var(--accent)] border-[rgba(77,255,164,0.25)] bg-[rgba(77,255,164,0.08)]',
    title: 'Banking & Financial Services',
    body: 'Call compliance, mis-selling detection, unbroken audit trail.',
  },
  {
    icon: '🎬',
    badge: 'Coming Soon',
    badgeClass: 'text-[var(--muted)] border-[var(--border2)]',
    title: 'Film & Entertainment',
    body: 'AI for content creation, post-production, and media compliance.',
  },
  {
    icon: '📋',
    badge: 'Coming Soon',
    badgeClass: 'text-[var(--muted)] border-[var(--border2)]',
    title: 'Compliance & Regulatory',
    body: 'Automated monitoring, real-time risk flagging, audit-ready reports.',
  },
  {
    icon: '🏢',
    badge: 'Exploring Partnerships',
    badgeClass: 'text-[#7eb8ff] border-[rgba(126,184,255,0.25)] bg-[rgba(126,184,255,0.08)]',
    title: 'Enterprise & Large Orgs',
    body: 'If your business runs on conversations and decisions at scale.',
  },
  {
    icon: '🚀',
    badge: "Let's Talk",
    badgeClass: 'text-[var(--accent2)] border-[rgba(255,77,109,0.25)] bg-[rgba(255,77,109,0.08)]',
    title: 'Startups & Scale-ups',
    body: 'AI-native operations from day one.',
  },
]

export default function Industries() {
  const sectionRef = useRef(null)

  useEffect(() => {
    fadeUp('.industries-head', { trigger: sectionRef.current })
    batchFadeUp('.industry-cell', { stagger: 0.08 })
  }, [])

  return (
    <section id="industries" ref={sectionRef} className="section-pad">
      <p className="section-label industries-head">◆ INDUSTRIES</p>
      <h2 className="section-title industries-head">
        Built for the Industries That Move the World.
      </h2>

      <div className="grid grid-cols-1 border border-[var(--border)] md:grid-cols-3">
        {CELLS.map((cell) => (
          <article
            key={cell.title}
            className="industry-cell border-b border-[var(--border)] p-10 transition-colors duration-300 last:border-b-0 hover:bg-[var(--surface)] md:border-b-0 md:border-r md:last:border-r-0 [&:nth-child(-n+3)]:md:border-b"
          >
            <div className="mb-4 text-[2rem]">{cell.icon}</div>
            <span
              className={`mb-4 inline-block rounded-full border px-3 py-1 text-[0.65rem] uppercase tracking-wider ${cell.badgeClass}`}
            >
              {cell.badge}
            </span>
            <h3 className="mb-2 text-[1.1rem] font-semibold">{cell.title}</h3>
            <p className="text-[0.85rem] text-[var(--muted)]">{cell.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
