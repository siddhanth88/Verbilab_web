import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Loader from './components/Loader'
import Nav from './components/Nav'
import Hero from './components/Hero'
import SectionSeam from './components/SectionSeam'
import FeatureTheatre from './components/FeatureTheatre'
import BrandBandTransition from './components/BrandBandTransition'
import OutcomeCards from './components/OutcomeCards'
import IndustryMatrix from './components/IndustryMatrix'
import IntegrationEcosystem from './components/IntegrationEcosystem'
import AboutStrip from './components/AboutStrip'
import AboutContactBridge from './components/AboutContactBridge'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { prefersReducedMotion } from './utils/motion'

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const delay = prefersReducedMotion() ? 0 : 2600
    const timer = setTimeout(() => setLoading(false), delay)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (loading) return
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      requestAnimationFrame(() => ScrollTrigger.refresh())
    })
  }, [loading])

  useEffect(() => {
    if (loading || prefersReducedMotion()) return

    const dot = document.getElementById('cursor-dot')
    const ring = document.getElementById('cursor-ring')
    const glow = document.getElementById('cursor-glow')
    if (!dot || !ring) return

    let ringX = 0
    let ringY = 0
    let glowX = 0
    let glowY = 0
    let mouseX = 0
    let mouseY = 0
    let rafId

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = `${mouseX}px`
      dot.style.top = `${mouseY}px`
    }

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.48
      ringY += (mouseY - ringY) * 0.48
      ring.style.left = `${ringX}px`
      ring.style.top = `${ringY}px`
      if (glow) {
        glowX += (mouseX - glowX) * 0.22
        glowY += (mouseY - glowY) * 0.22
        glow.style.left = `${glowX}px`
        glow.style.top = `${glowY}px`
      }
      rafId = requestAnimationFrame(animateRing)
    }

    const links = document.querySelectorAll('a, button, [data-cursor-hover]')
    const onEnter = () => ring.classList.add('hovering')
    const onLeave = () => ring.classList.remove('hovering')
    links.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    document.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(animateRing)

    return () => {
      document.removeEventListener('mousemove', onMove)
      links.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
      cancelAnimationFrame(rafId)
    }
  }, [loading])

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <div id="cursor-glow" aria-hidden />
      <div id="cursor-ring" />
      <div id="cursor-dot" />
      <Nav />
      <main id="main-content">
        <Hero />
        <SectionSeam />
        <FeatureTheatre />
        <BrandBandTransition />
        <OutcomeCards />
        <IntegrationEcosystem />
        <IndustryMatrix />
        <AboutStrip />
        <AboutContactBridge />
        <Contact />
      </main>
      <Footer />
      <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>
    </>
  )
}
