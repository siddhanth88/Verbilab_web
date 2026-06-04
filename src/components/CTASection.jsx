import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CircuitBackground from './CircuitBackground'

gsap.registerPlugin(ScrollTrigger)

const LINES = [
  'THE FUTURE OF YOUR',
  'INDUSTRY RUNS ON AI.',
  "LET'S BUILD IT TOGETHER.",
]

export default function CTASection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    gsap.from('.cta-line', {
      y: '100%',
      stagger: 0.08,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
        once: true,
      },
    })
  }, [])

  return (
    <section ref={sectionRef} className="cta-section">
      <CircuitBackground />
      <div className="cta-overlay" />
      <div className="cta-glow" />

      <div className="cta-inner">
        <div className="cta-headline">
          {LINES.map((line, i) => (
            <div key={i} style={{ overflow: 'hidden' }}>
              <span className="cta-line">{line}</span>
            </div>
          ))}
        </div>

        <p className="cta-desc body-text">
          Whether you are solving a specific operational challenge or reimagining how your entire
          business runs — Verbilab AI is ready to partner with you.
        </p>

        <div className="cta-buttons">
          <a href="#contact" className="btn-primary">
            Book a Free Discovery Call
          </a>
          <a href="#products" className="btn-ghost">
            Explore Our Products →
          </a>
        </div>

        <p className="cta-email body-text">
          Or write to us at <a href="mailto:hello@verbilab.ai">hello@verbilab.ai</a>
        </p>
      </div>
    </section>
  )
}
