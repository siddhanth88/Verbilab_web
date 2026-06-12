import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Loader, { getLoaderDuration } from './components/Loader'
import HomePage from './pages/HomePage'
import LegalPage from './pages/LegalPage'
import { prefersReducedMotion } from './utils/motion'
import { initClientRouter, normalizePath, usePathname } from './utils/router'

export default function App() {
  const [loading, setLoading] = useState(true)
  const pathname = usePathname()

  const isPrivacy = pathname === '/privacy'
  const isTerms = pathname === '/terms'
  const isLegal = isPrivacy || isTerms

  useEffect(() => initClientRouter(), [])

  useEffect(() => {
    const path = normalizePath()
    if (path === '/privacy' || path === '/terms') {
      setLoading(false)
      return
    }

    const hash = window.location.hash
    if (hash === '#privacy' || hash === '#terms') {
      const next = hash === '#privacy' ? '/privacy' : '/terms'
      window.history.replaceState({}, '', next)
      window.dispatchEvent(new PopStateEvent('popstate'))
      setLoading(false)
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
    const cross = document.getElementById('cursor-cross')
    if (!dot || !ring) return

    let ringX = 0
    let ringY = 0
    let crossX = 0
    let crossY = 0
    let mouseX = 0
    let mouseY = 0
    let rafId
    let pageActive = !document.hidden
    let spin = 0

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = `${mouseX}px`
      dot.style.top = `${mouseY}px`
    }

    const animateCursor = () => {
      rafId = requestAnimationFrame(animateCursor)
      if (!pageActive) return

      ringX += (mouseX - ringX) * 0.42
      ringY += (mouseY - ringY) * 0.42
      crossX += (mouseX - crossX) * 0.58
      crossY += (mouseY - crossY) * 0.58

      ring.style.left = `${ringX}px`
      ring.style.top = `${ringY}px`
      if (cross) {
        cross.style.left = `${crossX}px`
        cross.style.top = `${crossY}px`
        spin += 0.018
        cross.style.transform = `translate(-50%, -50%) rotate(${spin}deg)`
      }
    }

    const isCursorTarget = (el) => {
      if (!el) return false
      if (el.closest('.nav-logo')) return false
      return Boolean(el.closest('a, button, [data-cursor-hover]'))
    }

    const onPointerOver = (e) => {
      if (!isCursorTarget(e.target)) return
      ring.classList.add('hovering')
      dot.classList.add('cursor-dot--hover')
    }

    const onPointerOut = (e) => {
      if (!isCursorTarget(e.target)) return
      ring.classList.remove('hovering')
      dot.classList.remove('cursor-dot--hover')
    }

    const onVisibility = () => {
      pageActive = !document.hidden
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onPointerOver)
    document.addEventListener('mouseout', onPointerOut)
    document.addEventListener('visibilitychange', onVisibility)
    rafId = requestAnimationFrame(animateCursor)

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
      <div id="cursor-cross" className="cursor-cross" aria-hidden>
        <span className="cursor-cross__arm cursor-cross__arm--n" />
        <span className="cursor-cross__arm cursor-cross__arm--e" />
        <span className="cursor-cross__arm cursor-cross__arm--s" />
        <span className="cursor-cross__arm cursor-cross__arm--w" />
      </div>
      <div id="cursor-ring" className="cursor-ring-el" aria-hidden />
      <div id="cursor-dot" className="cursor-dot-el" aria-hidden />
      {isPrivacy && <LegalPage type="privacy" />}
      {isTerms && <LegalPage type="terms" />}
      {!isLegal && <HomePage loading={loading} />}
      <AnimatePresence>{loading && !isLegal && <Loader key="loader" />}</AnimatePresence>
    </>
  )
}
