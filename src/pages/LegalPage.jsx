import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import CircuitBackground from '../components/CircuitBackground'
import ScanLine from '../components/ScanLine'
import { prefersReducedMotion } from '../utils/motion'

gsap.registerPlugin(ScrollTrigger)

const PAGES = {
  privacy: {
    title: 'Privacy Policy',
    kicker: 'DATA · PROTOCOL',
    code: 'DOC-PRIV-001',
    items: [
      'We collect what you submit on the contact form — name, company, email, and message.',
      'Used only to respond, schedule demos, and improve our services. Never sold.',
      'Data kept only as long as needed. Protected with standard security measures.',
    ],
    sibling: { href: '/terms', label: 'View Terms' },
  },
  terms: {
    title: 'Terms of Use',
    kicker: 'LEGAL · PROTOCOL',
    code: 'DOC-TERM-001',
    items: [
      'Site content is informational. Enterprise deals use separate contracts.',
      'Verbilab owns all branding, software, and materials here. No copying without permission.',
      'Site provided as-is. Governed by applicable law in India.',
    ],
    sibling: { href: '/privacy', label: 'View Privacy' },
  },
}

export default function LegalPage({ type }) {
  const page = PAGES[type]
  const sectionRef = useRef(null)

  useEffect(() => {
    document.title = `${page.title} — Verbilab AI`
    return () => {
      document.title = 'Verbilab AI — Applied AI for Real Operations'
    }
  }, [page.title])

  useEffect(() => {
    const section = sectionRef.current
    if (!section || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.from('.legal-page-reveal', {
        y: 28,
        opacity: 0,
        stagger: 0.1,
        duration: 0.85,
        ease: 'power3.out',
        delay: 0.15,
      })

      gsap.from('.legal-page-scan-beam', {
        scaleX: 0,
        opacity: 0.9,
        duration: 1,
        ease: 'power2.inOut',
        transformOrigin: 'left center',
      })
    }, section)

    return () => ctx.revert()
  }, [type])

  return (
    <>
      <Nav homeHref="/" />
      <main id="main-content" className="legal-page" ref={sectionRef}>
        <CircuitBackground />
        <div className="legal-page-grid-bg" aria-hidden />
        <div className="legal-page-scanlines" aria-hidden />
        <span className="hero-bracket-tl" aria-hidden />
        <span className="hero-bracket-tr" aria-hidden />
        <span className="hero-bracket-bl" aria-hidden />
        <span className="hero-bracket-br" aria-hidden />

        <div className="legal-page-inner section-inner">
          <div className="legal-page-scan-beam" aria-hidden />
          <ScanLine />

          <p className="section-kicker legal-page-reveal">{page.kicker}</p>
          <p className="mono-label subtle legal-page-reveal legal-page-code">
            <span className="blink-dot">●</span> {page.code}
          </p>
          <h1 className="display-lg legal-page-title legal-page-reveal">{page.title}</h1>

          <article className="legal-page-card legal-page-reveal">
            <ul className="legal-list legal-list--page">
              {page.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="legal-card-foot legal-page-reveal">
              Questions?{' '}
              <a href="mailto:hello@verbilab.ai" className="legal-link">
                hello@verbilab.ai
              </a>
            </p>
          </article>

          <div className="legal-page-actions legal-page-reveal">
            <a href="/" className="btn-ghost">
              ← Back to Home
            </a>
            <a href={page.sibling.href} className="btn-primary">
              {page.sibling.label}
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
