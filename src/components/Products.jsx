import { useEffect, useRef } from 'react'
import { fadeUp } from '../utils/animations'
import { useMouseTilt } from '../hooks/useMouseTilt'

function BentoCell({ className = '', children }) {
  const tilt = useMouseTilt()

  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className={`rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 transition-transform duration-300 ease-out ${className}`}
    >
      {children}
    </div>
  )
}

const FEATURES = [
  'Transcribes 100% of calls',
  'Scores against compliance frameworks',
  'Detects tone & sentiment',
  'Flags violations instantly',
  'Integrates with CRM & telephony',
]

export default function Products() {
  const sectionRef = useRef(null)

  useEffect(() => {
    fadeUp('.products-reveal', { trigger: sectionRef.current })
  }, [])

  return (
    <section id="products" ref={sectionRef} className="section-pad">
      <p className="section-label products-reveal">◆ PRODUCT SUITE</p>
      <h2 className="section-title products-reveal">Intelligent Products. Real Outcomes.</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        <BentoCell className="products-reveal relative overflow-hidden md:col-span-7">
          <div
            className="grad-shift pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                'linear-gradient(135deg, rgba(77,255,164,0.12), transparent 40%, rgba(255,77,109,0.08))',
            }}
          />
          <div className="relative z-[1]">
            <span className="inline-block rounded-full border border-[rgba(77,255,164,0.2)] bg-[rgba(77,255,164,0.1)] px-3 py-1 text-[0.65rem] text-[var(--accent)]">
              ● LIVE
            </span>
            <h3 className="font-display mt-4 text-[2.8rem] leading-none">CALL AUDIT AI</h3>
            <p className="mt-2 text-[0.9rem] text-[var(--muted)]">
              AI-Powered Call Quality Intelligence
            </p>
            <p className="mt-4 max-w-xl text-[0.9rem] leading-relaxed text-[var(--muted)]">
              Manual call auditing is slow, inconsistent, and expensive. Verbilab Call Audit
              eliminates all three — delivering full coverage, consistent scoring, and instant
              compliance flags at enterprise scale.
            </p>
            <ul className="mt-6 space-y-2">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2 text-[0.85rem] text-[var(--muted)]">
                  <span className="text-[var(--accent)]">●</span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 text-[var(--accent)] transition-all hover:gap-3"
            >
              Book a Demo →
            </a>
          </div>
        </BentoCell>

        <BentoCell className="products-reveal relative md:col-span-5">
          <span className="rounded-full border border-[var(--border2)] px-3 py-1 text-[0.65rem] text-[var(--muted)]">
            COMING SOON
          </span>
          <span className="font-display pointer-events-none absolute right-6 top-4 text-[6rem] leading-none text-[rgba(255,255,255,0.04)]">
            02
          </span>
          <h3 className="font-display relative mt-8 text-[2rem]">Film Intelligence</h3>
          <p className="relative mt-3 text-[0.88rem] leading-relaxed text-[var(--muted)]">
            AI for the entertainment industry — content analysis, compliance, and
            post-production intelligence.
          </p>
          <a href="#contact" className="relative mt-6 inline-block text-[var(--accent)]">
            Join the Waitlist →
          </a>
        </BentoCell>

        <BentoCell className="products-reveal relative md:col-span-4">
          <span className="rounded-full border border-[var(--border2)] px-3 py-1 text-[0.65rem] text-[var(--muted)]">
            COMING SOON
          </span>
          <span className="font-display absolute right-6 top-4 text-[5rem] text-[rgba(255,255,255,0.04)]">
            03
          </span>
          <h3 className="font-display relative mt-8 text-[1.8rem]">Verbilab Comply</h3>
          <p className="relative mt-3 text-[0.88rem] text-[var(--muted)]">
            Automated regulatory monitoring and real-time risk detection for BFSI, BPO, and
            enterprise.
          </p>
          <a href="#contact" className="relative mt-6 inline-block text-[var(--accent)]">
            Register Interest →
          </a>
        </BentoCell>

        <BentoCell className="products-reveal flex flex-col justify-center md:col-span-4">
          <p className="font-display text-[4rem] leading-none text-[var(--accent)]">100%</p>
          <p className="mt-2 font-medium">Calls Audited</p>
          <p className="mt-2 text-sm text-[var(--muted)]">vs. 2–5% with manual QA teams</p>
        </BentoCell>

        <BentoCell className="products-reveal flex flex-col justify-center md:col-span-4">
          <div className="mb-4 h-px w-12 bg-[var(--accent)]" />
          <p className="text-[1rem] font-semibold leading-snug">
            &ldquo;No missed violations. No unchecked behaviour. No blind spots.&rdquo;
          </p>
        </BentoCell>
      </div>
    </section>
  )
}
