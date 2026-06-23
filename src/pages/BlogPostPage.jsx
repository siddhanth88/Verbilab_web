import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import CircuitBackground from '../components/CircuitBackground'
import ScanLine from '../components/ScanLine'
import { getBlogBySlug } from '../data/blogs'
import { prefersReducedMotion } from '../utils/motion'

export default function BlogPostPage({ slug }) {
  const post = getBlogBySlug(slug)
  const sectionRef = useRef(null)

  useEffect(() => {
    if (post) document.title = `${post.title} — Verbilab AI`
    else document.title = 'Blog — Verbilab AI'
    return () => {
      document.title = 'Verbilab AI — Applied AI for Real Operations'
    }
  }, [post])

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
  }, [slug])

  if (!post) {
    return (
      <>
        <Nav homeHref="/" />
        <main id="main-content" className="legal-page content-page">
          <div className="legal-page-inner section-inner">
            <h1 className="display-lg">Article not found</h1>
            <a href="/blog" className="btn-primary mt-6 inline-flex">
              Back to Blog
            </a>
          </div>
        </main>
        <Footer />
      </>
    )
  }

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

          <p className="section-kicker legal-page-reveal">BLOG · APPLIED AI</p>
          <p className="mono-label subtle legal-page-reveal legal-page-code">
            <span className="blink-dot">●</span> {post.date} · {post.readTime}
          </p>
          <h1 className="display-lg legal-page-title legal-page-reveal blog-post-title">{post.title}</h1>

          <article className="legal-page-card legal-page-reveal blog-post-body">
            {post.body.map((para) => (
              <p key={para.slice(0, 40)} className="blog-post-para">
                {para}
              </p>
            ))}
          </article>

          <div className="legal-page-actions legal-page-reveal">
            <a href="/blog" className="btn-ghost">
              ← All articles
            </a>
            <a href="/#contact" className="btn-primary">
              Book a Demo
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
