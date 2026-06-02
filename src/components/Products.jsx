import { useEffect, useRef } from 'react'
import { fadeUp } from '../utils/animations'
import { useMouseTilt } from '../hooks/useMouseTilt'
import SectionAccent3D from './SectionAccent3D'

function BentoCell({ className = '', children }) {
  const tilt = useMouseTilt()

  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className={`interactive-glow relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 transition-transform duration-300 ease-out ${className}`}
    >
      {children}
    </div>
  )
}

const FEATURES = [
  'Transcribes 100% of customer calls with high accuracy',
  'Scores calls against quality and compliance frameworks',
  'Detects sentiment and escalation patterns',
  'Flags violations and script deviations instantly',
  'Integrates with leading CRM and telephony platforms',
]

export default function Products() {
  const sectionRef = useRef(null)

  useEffect(() => {
    fadeUp('.products-reveal', { trigger: sectionRef.current })
    fadeUp('.flow-copy', { trigger: sectionRef.current, y: 22, start: 'top 70%' })
  }, [])

  return (
    <section id="products" ref={sectionRef} className="section-pad relative overflow-hidden">
      <SectionAccent3D className="products-accent" />
      <p className="section-label products-reveal">◆ PRODUCT SUITE</p>
      <div className="mb-10 flex flex-wrap items-end justify-between gap-8">
        <h2 className="section-title products-reveal !mb-0 max-w-[14ch]">
          Intelligent Products. Real Outcomes.
        </h2>
        <p className="products-reveal flow-copy max-w-[42ch] text-[0.94rem] leading-[1.78] text-[var(--muted)]">
          Purpose-built AI products for high-stakes operations. Scroll to reveal each system.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        <BentoCell className="products-reveal min-h-[28rem] md:col-span-7">
          <div
            className="grad-shift pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                'linear-gradient(135deg, rgba(77,255,164,0.12), transparent 40%, rgba(255,77,109,0.08))',
            }}
          />
          <div className="relative z-[2]">
            <span className="inline-block rounded-full border border-[rgba(77,255,164,0.2)] bg-[rgba(77,255,164,0.1)] px-3 py-1 text-[0.65rem] uppercase tracking-[0.08em] text-[var(--accent)]">
              ● LIVE PRODUCT
            </span>
            <h3 className="neon-hover-text font-display mt-4 text-[clamp(1.9rem,3.8vw,2.5rem)] leading-none">
              Verbilab Call Audit
            </h3>
            <p className="mt-2 text-[0.9rem] text-[var(--muted)]">
              AI-Powered Call Quality Intelligence
            </p>
            <p className="mt-4 max-w-xl text-[0.88rem] leading-relaxed text-[var(--muted)]">
              End-to-end call intelligence at enterprise scale: listen, score, detect risk, and
              coach faster.
            </p>
            <ul className="mt-6 space-y-2.5">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2 text-[0.82rem] leading-relaxed text-[var(--muted)]">
                  <span className="text-[var(--accent)]">●</span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-[var(--accent)] transition-all hover:gap-3"
              >
                Book a Demo →
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-[var(--muted)] transition-colors hover:text-[var(--white)]"
              >
                See It in Action →
              </a>
            </div>
          </div>
        </BentoCell>

        <BentoCell className="products-reveal min-h-[28rem] md:col-span-5">
          <span className="rounded-full border border-[rgba(77,255,164,0.2)] bg-[rgba(77,255,164,0.1)] px-3 py-1 text-[0.65rem] uppercase tracking-[0.08em] text-[var(--accent)]">
            Call Audit AI
          </span>
          <span className="font-display pointer-events-none absolute right-6 top-8 z-[1] text-[clamp(4rem,9vw,6rem)] leading-none text-[rgba(77,255,164,0.12)]">
            100%
          </span>
          <h3 className="neon-hover-text relative z-[2] mt-6 pr-20 font-display text-[clamp(1.5rem,2.7vw,1.9rem)] leading-tight">
            Full Coverage
          </h3>
          <p className="relative z-[2] mt-3 max-w-[34ch] text-[0.86rem] leading-relaxed text-[var(--muted)]">
            Traditional QA checks 2–5% of calls. Verbilab audits every call in seconds.
          </p>
          <div className="relative z-[2] mt-6 flex flex-wrap gap-2">
            {['BPO', 'BFSI', 'Insurance', 'Telecoms'].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--border2)] px-2.5 py-1 text-[0.68rem] text-[var(--muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </BentoCell>

        <BentoCell className="products-reveal min-h-[15rem] md:col-span-4">
          <span className="rounded-full border border-[var(--border2)] px-3 py-1 text-[0.65rem] text-[var(--muted)]">
            COMING SOON
          </span>
          <h3 className="neon-hover-text relative z-[2] mt-8 pr-12 font-display text-[clamp(1.4rem,2.7vw,1.8rem)] leading-tight">
            Verbilab Film Intelligence
          </h3>
          <p className="relative z-[2] mt-3 max-w-[30ch] text-[0.88rem] leading-relaxed text-[var(--muted)]">
            AI purpose-built for the entertainment industry — from content analysis and
            compliance to post-production intelligence.
          </p>
          <a href="#contact" className="neon-hover-text relative z-[2] mt-6 inline-block text-[var(--accent)]">
            Join Waitlist →
          </a>
        </BentoCell>

        <BentoCell className="products-reveal min-h-[15rem] break-words md:col-span-4 md:flex md:flex-col md:justify-center">
          <span className="w-fit rounded-full border border-[var(--border2)] px-3 py-1 text-[0.65rem] text-[var(--muted)]">
            COMING SOON
          </span>
          <h3 className="neon-hover-text mt-5 font-display text-[clamp(1.4rem,2.7vw,1.8rem)] leading-tight">
            Verbilab Comply
          </h3>
          <p className="mt-3 text-[0.88rem] leading-relaxed text-[var(--muted)]">
            Automated regulatory monitoring, real-time risk detection, and audit-ready reporting
            for BFSI, BPO, and enterprise teams.
          </p>
          <a href="#contact" className="neon-hover-text mt-5 inline-block text-[var(--accent)]">
            Register Interest →
          </a>
        </BentoCell>

        <BentoCell className="products-reveal min-h-[15rem] break-words md:col-span-4 md:flex md:flex-col md:justify-center">
          <div className="mx-auto mb-3 text-3xl opacity-35">+</div>
          <p className="text-center text-[0.85rem] leading-relaxed text-[var(--muted)]">
            More AI products in development. Watch this space.
          </p>
        </BentoCell>
      </div>
    </section>
  )
}
