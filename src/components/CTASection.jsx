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

      <div className="relative z-[1] mx-auto max-w-5xl">
        <h2 className="font-display text-[clamp(3.5rem,8vw,9rem)] leading-[0.92]">
          {LINES.map((line) => (
            <span key={line} className="cta-line block overflow-hidden">
              <span className="block">{line}</span>
            </span>
          ))}
        </h2>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#contact"
            className="rounded-full bg-[var(--accent)] px-8 py-3 text-sm font-medium text-[#050508] transition-opacity hover:opacity-85"
          >
            Book a Free Discovery Call
          </a>
          <a
            href="#products"
            className="rounded-full border border-[var(--border2)] px-8 py-3 text-sm transition-colors hover:border-[var(--accent)]"
          >
            Explore Our Products
          </a>
        </div>
      </div>
    </section>
  )
}
