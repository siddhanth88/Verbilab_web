import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function BrandBandTransition() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const deco = section.querySelector('.bbt-deco')
      const band = section.querySelector('.bbt-band')
      const scanLayers = section.querySelectorAll('.bbt-scan-drift')

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        })
        .to(deco, { y: -8, ease: 'none' }, 0)
        .to(band, { y: -12, ease: 'none' }, 0)

      gsap.to(scanLayers, {
        backgroundPositionY: '24px',
        duration: 5,
        ease: 'none',
        repeat: -1,
      })

      gsap.from('.bbt-heading, .bbt-subtitle', {
        y: 20,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: band,
          start: 'top 88%',
          toggleActions: 'play none none none',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="brand-band-transition site-section"
      aria-label="Ready for outcomes"
    >
      <div className="bbt-deco">
        <div className="bbt-ceiling scanlines">
          <div className="bbt-scan-drift" aria-hidden />
          <div className="bbt-ceiling-edge" aria-hidden />
        </div>
        <div className="bbt-frame" aria-hidden>
          <div className="bbt-frame-glow" />
        </div>
      </div>

      <div className="bbt-band grain">
        <div className="bbt-band-glow-top" aria-hidden />
        <div className="bbt-scan-drift bbt-band-scan" aria-hidden />

        <div className="bbt-content">
          <h2 className="bbt-heading">READY FOR OUTCOMES</h2>
          <p className="bbt-subtitle">
            AI systems that audit, automate, and improve real operations.
          </p>
        </div>
      </div>
    </section>
  )
}
