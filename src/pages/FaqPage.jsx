import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import CircuitBackground from '../components/CircuitBackground'
import ScanLine from '../components/ScanLine'
import { FAQS } from '../data/faqs'
import { prefersReducedMotion } from '../utils/motion'

export default function FaqPage() {
  const sectionRef = useRef(null)
  const [openIndex, setOpenIndex] = useState(0)

  useEffect(() => {
    document.title = "FAQ — Verbilab AI"
    return () => {
      document.title = 'Verbilab AI — Applied AI for Real Operations'
    }
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.from('.legal-page-reveal', {
        y: 28,
        opacity: 0,
        stagger: 0.08,
        duration: 0.85,
        ease: 'power3.out',
        delay: 0.15,
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <Nav homeHref="/" />
      <main id="main-content" className="legal-page content-page" ref={sectionRef}>
        <CircuitBackground />
        <div className="legal-page-grid-bg" aria-hidden />
        <div className="legal-page-scanlines" aria-hidden />
        <span className="hero-bracket-tl" aria-hidden />
        <span className="hero-bracket-tr" aria-hidden />
        <span className="hero-bracket-bl" aria-hidden />
        <span className="hero-bracket-br" aria-hidden />

        <div className="legal-page-inner content-page-inner section-inner">
          <div className="legal-page-scan-beam" aria-hidden />
          <ScanLine />

          <p className="section-kicker legal-page-reveal">SUPPORT · PROTOCOL</p>
          <p className="mono-label subtle legal-page-reveal legal-page-code">
            <span className="blink-dot">●</span> DOC-FAQ-001
          </p>
          <h1 className="display-lg legal-page-title legal-page-reveal">Frequently Asked Questions</h1>
          <p className="body-short legal-page-reveal content-page-lead">
            Quick answers on Verbilab products, deployment, security, and how to get started.
          </p>

          <div className="faq-list legal-page-reveal">
            {FAQS.map((item, i) => {
              const open = openIndex === i
              return (
                <div key={item.q} className={`faq-item${open ? ' is-open' : ''}`}>
                  <button
                    type="button"
                    className="faq-question"
                    aria-expanded={open}
                    onClick={() => setOpenIndex(open ? -1 : i)}
                  >
                    <span>{item.q}</span>
                    <span className="faq-icon" aria-hidden>
                      {open ? '−' : '+'}
                    </span>
                  </button>
                  {open && <p className="faq-answer">{item.a}</p>}
                </div>
              )
            })}
          </div>

          <p className="legal-card-foot legal-page-reveal mt-8">
            Still have questions?{' '}
            <a href="mailto:sales@verbilab.com" className="legal-link">
              sales@verbilab.com
            </a>
          </p>

          <div className="legal-page-actions legal-page-reveal">
            <a href="/" className="btn-ghost">
              ← Back to Home
            </a>
            <a href="/blog" className="btn-primary">
              Read Blog
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
