import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Loader from './components/Loader'
import Nav from './components/Nav'
import Hero from './components/Hero'
import TrustTicker from './components/TrustTicker'
import About from './components/About'
import WhatWeDo from './components/WhatWeDo'
import Products from './components/Products'
import Industries from './components/Industries'
import WhyVerbilab from './components/WhyVerbilab'
import HowItWorks from './components/HowItWorks'
import CTASection from './components/CTASection'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2400)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const dot = document.getElementById('cursor-dot')
    const ring = document.getElementById('cursor-ring')
    if (!dot || !ring) return

    let ringX = 0
    let ringY = 0
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
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.left = `${ringX}px`
      ring.style.top = `${ringY}px`
      rafId = requestAnimationFrame(animateRing)
    }

    const onOver = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) {
        ring.classList.add('hovering')
      }
    }
    const onOut = (e) => {
      if (e.target.closest('a, button, [data-cursor-hover]')) {
        ring.classList.remove('hovering')
      }
    }

    document.addEventListener('mousemove', onMove)
    document.body.addEventListener('mouseover', onOver)
    document.body.addEventListener('mouseout', onOut)
    rafId = requestAnimationFrame(animateRing)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.body.removeEventListener('mouseover', onOver)
      document.body.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(rafId)
    }
  }, [loading])

  return (
    <>
      <div id="cursor-dot" />
      <div id="cursor-ring" />
      <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>
      {!loading && (
        <>
          <Nav />
          <main>
            <Hero />
            <TrustTicker />
            <About />
            <WhatWeDo />
            <Products />
            <Industries />
            <WhyVerbilab />
            <HowItWorks />
            <CTASection />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  )
}
