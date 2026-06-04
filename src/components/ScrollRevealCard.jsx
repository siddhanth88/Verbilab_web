import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FROM_VARS = {
  up: { y: 36, opacity: 0 },
  down: { y: -36, opacity: 0 },
  left: { x: -36, opacity: 0 },
  right: { x: 36, opacity: 0 },
}

export default function ScrollRevealCard({ children, delay = 0, direction = 'up', className = '' }) {
  const cardRef = useRef(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    const anim = gsap.from(el, {
      ...FROM_VARS[direction],
      duration: 0.85,
      ease: 'power3.out',
      delay,
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        toggleActions: 'play none none none',
        once: true,
      },
    })

    return () => anim.scrollTrigger?.kill()
  }, [delay, direction])

  return (
    <div ref={cardRef} className={className}>
      {children}
    </div>
  )
}
