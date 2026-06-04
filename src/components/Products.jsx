import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { fadeUp } from '../utils/animations'
import { useMouseTilt } from '../hooks/useMouseTilt'
import Products3DAccent from './Products3DAccent'

gsap.registerPlugin(ScrollTrigger)

function BentoCell({ className = '', children, cellClass = 'bento-cell' }) {
  const tilt = useMouseTilt(6)

  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className={`${cellClass} interactive-glow relative overflow-hidden bg-[var(--surface)] p-8 transition-transform duration-300 ease-out ${className}`}
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

function StatCount() {
  const [count, setCount] = useState(0)
  const cellRef = useRef(null)

  useEffect(() => {
    const el = cellRef.current
    if (!el) return

    const countObj = { val: 0 }
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(countObj, {
          val: 100,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => setCount(Math.round(countObj.val)),
        })
      },
      once: true,
    })

    return () => st.kill()
  }, [])

  return (
    <span
      ref={cellRef}
      className="font-display pointer-events-none absolute right-6 top-8 z-[1] text-[clamp(4rem,9vw,6rem)] leading-none text-[var(--accent-glow)]"
    >
      {count}%
    </span>
  )
}

export default function Products() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      fadeUp('.products-head', { trigger: sectionRef.current, y: 20 })

      const cards = gsap.utils.toArray('.bento-cell')
      gsap.set(cards, {
        rotateY: -22,
        rotateX: 8,
        x: 100,
        opacity: 0,
        transformPerspective: 800,
      })

      ScrollTrigger.create({
        trigger: '.products-grid',
        start: 'top 72%',
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            rotateY: 0,
            rotateX: 0,
            x: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'expo.out',
            stagger: { amount: 0.55, from: 'start' },
          })
        },
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.product-main-card',
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
      })
      tl.from('.product-main-card .card-title', { y: 28, opacity: 0, duration: 0.65, ease: 'power3.out' })
        .from('.product-main-card .card-desc', { y: 18, opacity: 0, duration: 0.55, ease: 'power3.out' }, '-=0.35')
        .from('.product-main-card .card-bullets li', { y: 12, opacity: 0, stagger: 0.06, duration: 0.45 }, '-=0.35')
        .from('.product-main-card .card-cta', { y: 8, opacity: 0, duration: 0.4 }, '-=0.25')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="products"
      ref={sectionRef}
      className="products-section section-pad relative overflow-hidden"
    >
      <Products3DAccent />
      <p className="section-label products-head">PRODUCT SUITE</p>
      <div className="mb-10 flex flex-wrap items-end justify-between gap-8">
        <h2 className="section-title products-head !mb-0 max-w-[14ch]">
          Intelligent Products. Real Outcomes.
        </h2>
        <p className="products-head section-intro !mb-0 max-w-[42ch]">
          Purpose-built AI products for high-stakes operations. Scroll to reveal each system.
        </p>
      </div>

      <div className="products-grid grid grid-cols-1 gap-4 md:grid-cols-12">
        <BentoCell className="product-main-card min-h-[28rem] md:col-span-7">
          <div
            className="grad-shift pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                'linear-gradient(135deg, var(--accent-dim), transparent 40%, rgba(255,77,109,0.08))',
            }}
          />
          <div className="relative z-[2]">
            <span className="badge-pill inline-block rounded-sm border border-[var(--accent-glow)] bg-[var(--accent-dim)] px-3 py-1 text-[var(--accent)]">
              ● LIVE PRODUCT
            </span>
            <h3 className="card-title card-heading neon-hover-text mt-4">
              Verbilab Call Audit
            </h3>
            <p className="card-desc body-text mt-2">
              AI-Powered Call Quality Intelligence
            </p>
            <p className="card-desc body-text mt-4 max-w-xl">
              End-to-end call intelligence at enterprise scale: listen, score, detect risk, and
              coach faster.
            </p>
            <ul className="card-bullets mt-6 space-y-2.5">
              {FEATURES.map((f) => (
                <li key={f} className="body-text flex items-start gap-2">
                  <span className="text-[var(--accent)]">●</span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="card-cta mt-6 flex flex-wrap gap-4">
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

        <BentoCell className="stat-cell min-h-[28rem] md:col-span-5">
          <span className="badge-pill rounded-sm border border-[var(--accent-glow)] bg-[var(--accent-dim)] px-3 py-1 text-[var(--accent)]">
            Call Audit AI
          </span>
          <StatCount />
          <h3 className="card-heading neon-hover-text relative z-[2] mt-6 pr-20">
            Full Coverage
          </h3>
          <p className="body-text relative z-[2] mt-3 max-w-[34ch]">
            Traditional QA checks 2–5% of calls. Verbilab audits every call in seconds.
          </p>
          <div className="relative z-[2] mt-6 flex flex-wrap gap-2">
            {['BPO', 'BFSI', 'Insurance', 'Telecoms'].map((tag) => (
              <span
                key={tag}
                className="badge-pill rounded-sm border border-[var(--border2)] px-2.5 py-1 text-[var(--muted)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </BentoCell>

        <BentoCell className="min-h-[15rem] md:col-span-4">
          <span className="badge-pill rounded-sm border border-[var(--border2)] px-3 py-1 text-[var(--muted)]">
            COMING SOON
          </span>
          <h3 className="card-heading neon-hover-text relative z-[2] mt-8 pr-12">
            Verbilab Film Intelligence
          </h3>
          <p className="body-text relative z-[2] mt-3 max-w-[30ch]">
            AI purpose-built for the entertainment industry — from content analysis and
            compliance to post-production intelligence.
          </p>
          <a href="#contact" className="neon-hover-text relative z-[2] mt-6 inline-block text-[var(--accent)]">
            Join Waitlist →
          </a>
        </BentoCell>

        <BentoCell className="min-h-[15rem] break-words md:col-span-4 md:flex md:flex-col md:justify-center">
          <span className="badge-pill w-fit rounded-sm border border-[var(--border2)] px-3 py-1 text-[var(--muted)]">
            COMING SOON
          </span>
          <h3 className="card-heading neon-hover-text mt-5">
            Verbilab Comply
          </h3>
          <p className="body-text mt-3">
            Automated regulatory monitoring, real-time risk detection, and audit-ready reporting
            for BFSI, BPO, and enterprise teams.
          </p>
          <a href="#contact" className="neon-hover-text mt-5 inline-block text-[var(--accent)]">
            Register Interest →
          </a>
        </BentoCell>

        <BentoCell className="min-h-[15rem] break-words md:col-span-4 md:flex md:flex-col md:justify-center">
          <div className="mx-auto mb-3 text-3xl opacity-35">+</div>
          <p className="body-text text-center">
            More AI products in development. Watch this space.
          </p>
        </BentoCell>
      </div>
    </section>
  )
}
