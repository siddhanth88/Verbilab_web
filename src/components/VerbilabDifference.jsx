import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const POINTS = [
  { num: '01', title: 'Domain-first thinking', line: 'We solve the workflow — not the benchmark.' },
  { num: '02', title: 'Production-grade AI', line: 'Enterprise scale from day one.' },
  { num: '03', title: 'Measurable outcomes', line: 'Audit trails. Accuracy. Coverage.' },
]

export default function VerbilabDifference() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.diff-reveal', {
        y: 28,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 78%',
          once: true,
        },
      })

      gsap.fromTo(
        '.diff-line-path',
        { strokeDashoffset: 800 },
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 70%',
            once: true,
          },
        },
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="difference" ref={ref} className="section-pad difference-wrap">
      <svg
        className="difference-lines"
        viewBox="0 0 1200 400"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          className="diff-line-path"
          d="M0 200 Q300 80 600 200 T1200 200"
          fill="none"
          stroke="rgba(0,255,133,0.15)"
          strokeWidth="1"
          strokeDasharray="800"
        />
        <path
          className="diff-line-path"
          d="M0 220 Q400 320 800 180 T1200 240"
          fill="none"
          stroke="rgba(0,255,133,0.08)"
          strokeWidth="1"
          strokeDasharray="800"
        />
      </svg>

      <p className="section-kicker diff-reveal relative z-[1]">WHY VERBILAB</p>
      <h2 className="display-lg diff-reveal relative z-[1] mb-10">THE VERBILAB DIFFERENCE</h2>

      <div className="relative z-[1] max-w-2xl">
        {POINTS.map((p) => (
          <div key={p.num} className="difference-point diff-reveal">
            <span className="difference-num">{p.num}</span>
            <div>
              <h3 className="mb-1 text-lg font-semibold uppercase tracking-wide text-[var(--white)]">
                {p.title}
              </h3>
              <p className="body-short">{p.line}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="diff-reveal relative z-[1] mt-10">
        <a href="#contact" className="btn-primary">
          Start a Discovery Call
        </a>
      </div>
    </section>
  )
}
