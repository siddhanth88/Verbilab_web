import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import CircuitBackground from '../components/CircuitBackground'
import ScanLine from '../components/ScanLine'
import { BLOGS } from '../data/blogs'
import { prefersReducedMotion } from '../utils/motion'

export default function BlogPage() {
  const sectionRef = useRef(null)

  useEffect(() => {
    document.title = 'Blog — Verbilab AI'
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

          <p className="section-kicker legal-page-reveal">INSIGHTS · APPLIED AI</p>
          <p className="mono-label subtle legal-page-reveal legal-page-code">
            <span className="blink-dot">●</span> DOC-BLOG-INDEX
          </p>
          <h1 className="display-lg legal-page-title legal-page-reveal">Blog</h1>
          <p className="body-short legal-page-reveal content-page-lead">
            Perspectives on call audit, workflow automation, compliance, and enterprise applied AI.
          </p>

          <div className="blog-grid legal-page-reveal">
            {BLOGS.map((post) => (
              <article key={post.slug} className="blog-card">
                <p className="mono-label subtle blog-card-meta">
                  {post.date} · {post.readTime}
                </p>
                <h2 className="blog-card-title">
                  <a href={`/blog/${post.slug}`} className="blog-card-link">
                    {post.title}
                  </a>
                </h2>
                <p className="body-short blog-card-excerpt">{post.excerpt}</p>
                <a href={`/blog/${post.slug}`} className="blog-card-cta">
                  Read article →
                </a>
              </article>
            ))}
          </div>

          <div className="legal-page-actions legal-page-reveal">
            <a href="/" className="btn-ghost">
              ← Back to Home
            </a>
            <a href="/faq" className="btn-primary">
              View FAQ
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
