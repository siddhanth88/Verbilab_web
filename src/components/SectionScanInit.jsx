import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../utils/motion'

gsap.registerPlugin(ScrollTrigger)

const SCAN_SECTIONS = '#systems, #outcomes, #how-it-works, #industries, #about, #contact'

export default function SectionScanInit() {
  useEffect(() => {
    if (prefersReducedMotion()) return

    const sections = document.querySelectorAll(SCAN_SECTIONS)
    const triggers = []

    sections.forEach((section) => {
      const line = document.createElement('div')
      line.className = 'section-scan-line'
      line.setAttribute('aria-hidden', 'true')
      section.prepend(line)

      const tween = gsap.fromTo(
        line,
        { scaleX: 0, opacity: 1, transformOrigin: 'left center' },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        },
      )
      triggers.push(tween)
    })

    return () => {
      triggers.forEach((t) => t.scrollTrigger?.kill())
      document.querySelectorAll('.section-scan-line').forEach((el) => el.remove())
    }
  }, [])

  return null
}
