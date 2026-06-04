import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CircuitBackground from './CircuitBackground'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-reveal', {
        y: 24,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          once: true,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <section id="contact" ref={sectionRef} className="contact-cta section-pad">
      <CircuitBackground />
      <p className="contact-watermark" aria-hidden>
        VERBILAB AI
      </p>

      <div className="contact-cta-grid section-inner">
        <div className="contact-cta-copy">
          <p className="section-kicker contact-reveal">CONTACT</p>
          <h2 className="display-lg contact-reveal contact-headline">
            READY TO BUILD INTELLIGENT SYSTEMS?
          </h2>
          <p className="body-short contact-reveal">
            Tell us your challenge. We respond within 24 hours.
          </p>
          <div className="contact-meta contact-reveal">
            <a
              href="mailto:hello@verbilab.ai"
              className="mono-label !text-[var(--white)] hover:text-[var(--accent)]"
            >
              hello@verbilab.ai
            </a>
            <span className="contact-divider" aria-hidden />
            <span className="mono-label subtle">Enterprise · BPO · BFSI</span>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="contact-form glass-panel glow-border tech-frame contact-reveal"
        >
          <span className="tech-frame-corner tl" aria-hidden />
          <span className="tech-frame-corner br" aria-hidden />
          <p className="mono-label subtle contact-form-label">REQUEST A CONSULTATION</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" name="name" required />
            <Field label="Company" name="company" required />
          </div>
          <Field label="Email" name="email" type="email" required />
          <div>
            <label className="field-label" htmlFor="challenge">
              Challenge
            </label>
            <textarea
              id="challenge"
              name="challenge"
              rows={3}
              className="field-input resize-y"
              placeholder="Briefly describe your use case"
              required
            />
          </div>
          <button type="submit" className="btn-premium w-full">
            Send Message
          </button>
        </form>
      </div>
    </section>
  )
}

function Field({ label, name, type = 'text', required = false }) {
  return (
    <div>
      <label className="field-label" htmlFor={name}>
        {label}
      </label>
      <input id={name} name={name} type={type} required={required} className="field-input" />
    </div>
  )
}
