import { useEffect, useRef } from 'react'
import { batchFadeUp, fadeUp } from '../utils/animations'

const CELLS = [
  {
    icon: '🎧',
    badge: 'Active Solution Available',
    badgeClass: 'text-[var(--accent)] border-[rgba(77,255,164,0.25)] bg-[rgba(77,255,164,0.08)]',
    title: 'BPO & Contact Centres',
    body: 'Audit every call. Coach every agent. Ensure quality at scale without expanding your QA headcount.',
  },
  {
    icon: '🏦',
    badge: 'Active Solution Available',
    badgeClass: 'text-[var(--accent)] border-[rgba(77,255,164,0.25)] bg-[rgba(77,255,164,0.08)]',
    title: 'Banking & Financial Services',
    body: 'Ensure call compliance, detect mis-selling, and maintain an unbroken audit trail for every customer interaction.',
  },
  {
    icon: '🎬',
    badge: 'Coming Soon',
    badgeClass: 'text-[var(--muted)] border-[var(--border2)]',
    title: 'Film & Entertainment',
    body: 'AI intelligence for content creation, post-production workflows, and media compliance — built for how studios actually work.',
  },
  {
    icon: '📋',
    badge: 'Coming Soon',
    badgeClass: 'text-[var(--muted)] border-[var(--border2)]',
    title: 'Compliance & Regulatory Bodies',
    body: 'Automated monitoring, real-time risk flagging, and audit-ready reports that make regulators confident and businesses protected.',
  },
  {
    icon: '🏢',
    badge: 'Exploring Partnerships',
    badgeClass: 'text-[#7eb8ff] border-[rgba(126,184,255,0.25)] bg-[rgba(126,184,255,0.08)]',
    title: 'Enterprises & Large Organisations',
    body: 'If your business runs on conversations, data, and decisions at scale, Verbilab AI has a solution in development for you.',
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
      <h2 className="section-title industries-head max-w-[14ch]">
        Built for the Industries That Move the World.
      </h2>
      <p className="industries-head mb-10 max-w-[60ch] text-[0.95rem] leading-[1.8] text-[var(--muted)]">
        Verbilab AI builds where the problems are biggest and the stakes are highest. Our
        current and upcoming solutions are designed for teams where quality, compliance, and
        speed are mission critical.
      </p>

      <div className="grid grid-cols-1 border border-[var(--border)] md:grid-cols-3">
        {CELLS.map((cell) => (
          <article
            key={cell.title}
            className="industry-cell interactive-glow min-h-[15.5rem] break-words border-b border-[var(--border)] bg-[rgba(255,255,255,0.01)] p-8 transition-colors duration-300 last:border-b-0 hover:bg-[var(--surface)] md:border-b-0 md:border-r md:last:border-r-0 [&:nth-child(-n+3)]:md:border-b"
          >
            <div className="mb-4 text-[2rem]">{cell.icon}</div>
            <span
              className={`mb-4 inline-block rounded-full border px-3 py-1 text-[0.62rem] uppercase tracking-[0.12em] ${cell.badgeClass}`}
            >
              {cell.badge}
            </span>
            <h3 className="neon-hover-text mb-2 text-[1.1rem] font-semibold">{cell.title}</h3>
            <p className="text-[0.85rem] leading-[1.72] text-[var(--muted)]">{cell.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
