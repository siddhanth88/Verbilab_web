import { useEffect, useRef } from 'react'
import { clipReveal } from '../utils/animations'

const LINES = [
  'THE FUTURE OF YOUR',
  'INDUSTRY RUNS ON AI.',
  "LET'S BUILD IT TOGETHER.",
]

export default function CTASection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    clipReveal('.cta-line')
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--surface)] px-[clamp(1.5rem,4vw,4rem)] py-[clamp(5rem,12vh,8rem)] text-center"
    >
      <div className="cta-bg pointer-events-none absolute inset-0" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "url('/noise.png')" }}
      />

      <div className="relative z-[1] mx-auto max-w-[1100px]">
        <h2 className="mx-auto max-w-[10ch] font-display text-[clamp(2.8rem,7vw,7.4rem)] leading-[0.92] tracking-[0.005em]">
          {LINES.map((line) => (
            <span key={line} className="cta-line block overflow-hidden">
              <span className="block">{line}</span>
            </span>
          ))}
        </h2>
        <p className="mx-auto mt-7 max-w-[54ch] text-[0.95rem] leading-[1.8] text-[var(--muted)]">
          Whether you are looking to solve a specific operational challenge or explore how AI can
          transform your entire business, Verbilab AI is ready to partner with you.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#contact"
            className="rounded-full bg-[var(--accent)] px-7 py-2.5 text-sm font-medium text-[#04131a] transition-opacity hover:opacity-85"
          >
            Book a Free Discovery Call
          </a>
          <a
            href="#products"
            className="rounded-full border border-[var(--border2)] px-7 py-2.5 text-sm transition-colors hover:border-[var(--accent)]"
          >
            Explore Our Products
          </a>
        </div>
        <p className="mt-5 text-sm text-[var(--muted)]">
          Or write to us at{' '}
          <a href="mailto:hello@verbilab.ai" className="text-[var(--accent)]">
            hello@verbilab.ai
          </a>
        </p>
      </div>
    </section>
  )
}
