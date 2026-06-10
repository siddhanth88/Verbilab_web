import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { prefersReducedMotion } from '../utils/motion'

gsap.registerPlugin(ScrollTrigger)

export default function ScanLine() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    const tween = gsap.fromTo(
      el,
      { scaleX: 0, opacity: 1 },
      {
        scaleX: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: el.parentElement || el,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      },
    )

    return () => tween.scrollTrigger?.kill()
  }, [])

  return <div ref={ref} className="section-scan-line section-scan-line--inline" aria-hidden />
}
