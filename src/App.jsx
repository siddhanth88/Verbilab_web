import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Loader, { getLoaderDuration } from './components/Loader'
import HomePage from './pages/HomePage'
import LegalPage from './pages/LegalPage'
import { prefersReducedMotion } from './utils/motion'
import { usePathname } from './utils/router'

export default function App() {
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()

  const isPrivacy = pathname === '/privacy'
  const isTerms = pathname === '/terms'
  const isLegal = isPrivacy || isTerms

  useEffect(() => {
    const hash = window.location.hash
    if (hash === '#privacy' || hash === '#terms') {
      const path = hash === '#privacy' ? '/privacy' : '/terms'
      window.history.replaceState({}, '', path)
      window.dispatchEvent(new PopStateEvent('popstate'))
      return
    }

    const delay = getLoaderDuration()
    const timer = setTimeout(() => setLoading(false), delay)
    return () => clearTimeout(timer)
  }, [])

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
    let pageActive = !document.hidden

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = `${mouseX}px`
      dot.style.top = `${mouseY}px`
    }

    const animateRing = () => {
      rafId = requestAnimationFrame(animateRing)
      if (!pageActive) return

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
    }

    const onPointerOver = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) {
        ring.classList.add('hovering')
      }
    }

    const onPointerOut = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) {
        ring.classList.remove('hovering')
      }
    }

    const onVisibility = () => {
      pageActive = !document.hidden
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onPointerOver)
    document.addEventListener('mouseout', onPointerOut)
    document.addEventListener('visibilitychange', onVisibility)
    rafId = requestAnimationFrame(animateRing)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onPointerOver)
      document.removeEventListener('mouseout', onPointerOut)
      document.removeEventListener('visibilitychange', onVisibility)
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
      {isPrivacy && <LegalPage type="privacy" />}
      {isTerms && <LegalPage type="terms" />}
      {!isLegal && <HomePage loading={loading} />}
      <AnimatePresence>{loading && !isLegal && <Loader key="loader" />}</AnimatePresence>
    </>
  )
}
