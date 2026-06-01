import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { fadeUp } from '../utils/animations'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    num: '01',
    title: 'Discover',
    body: 'We start with a deep-dive into your workflow, challenges, and goals. No assumptions. No generic demos.',
  },
  {
    num: '02',
    title: 'Deploy',
    body: 'We configure, integrate, and launch within your existing environment. Our team handles the technical lift.',
  },
  {
    num: '03',
    title: 'Evolve',
    body: 'AI that improves continuously. We monitor, refine, and roll out enhancements as your business grows.',
  },
]

export default function HowItWorks() {
  const sectionRef = useRef(null)

  useEffect(() => {
    fadeUp('.process-head', { trigger: sectionRef.current })
    fadeUp('.process-step', { stagger: 0.12, trigger: sectionRef.current })

    gsap.fromTo(
      '.process-line',
      { strokeDashoffset: 600 },
      {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: '.process-line',
          start: 'top 75%',
        },
      },
    )
  }, [])

  return (
    <section ref={sectionRef} className="section-pad">
      <p className="section-label process-head">◆ PROCESS</p>
      <h2 className="section-title process-head">Get Started in Three Steps.</h2>

      <div className="relative">
        <svg
          className="process-line absolute left-[16%] right-[16%] top-16 hidden h-2 w-[68%] md:block"
          viewBox="0 0 600 4"
          preserveAspectRatio="none"
          fill="none"
        >
          <line
            x1="0"
            y1="2"
            x2="600"
            y2="2"
            stroke="rgba(77,255,164,0.25)"
            strokeWidth="1"
            strokeDasharray="600"
          />
          <circle cx="0" cy="2" r="3" fill="var(--accent)" />
          <circle cx="300" cy="2" r="3" fill="var(--accent)" />
          <circle cx="600" cy="2" r="3" fill="var(--accent)" />
        </svg>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.num} className="process-step relative">
              <p className="font-display text-[5rem] leading-none text-[rgba(77,255,164,0.15)]">
                {step.num}
              </p>
              <h3 className="mt-2 text-[1.2rem] font-semibold">{step.title}</h3>
              <p className="mt-3 text-[0.88rem] leading-relaxed text-[var(--muted)]">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
