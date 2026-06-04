import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { fadeUp } from '../utils/animations'
import { useCountUp } from '../hooks/useCountUp'

gsap.registerPlugin(ScrollTrigger)

const ITEMS = [
  {
    num: '01',
    title: 'What We Do',
    body: 'We are a multi-disciplinary AI solutions company designing and deploying intelligent products across BPO, BFSI, film, and compliance sectors. Strategy, engineering, and integration — all under one roof.',
  },
  {
    num: '02',
    title: 'How We Do It',
    body: 'We embed with domain experts before writing a single line of code. Every product starts with a deep understanding of your workflows, edge cases, and outcomes — then we engineer AI that solves the actual problem.',
  },
  {
    num: '03',
    title: 'Who We Work With',
    body: 'From contact centres managing thousands of agents to financial institutions navigating compliance — we partner with organisations where the stakes are high and AI can make a measurable difference.',
  },
  {
    num: '04',
    title: 'Our Mission',
    body: 'To make AI accessible, actionable, and impactful — one industry at a time.',
  },
]

function StatCard({ end, label, staticValue }) {
  const { ref, value } = useCountUp(end)

  return (
    <div className="stat-card interactive-glow rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
      <p
        ref={ref}
        className="font-display text-[4rem] italic leading-none text-[var(--accent)]"
      >
        {staticValue || value}
      </p>
      <p className="body-text mt-2">{label}</p>
    </div>
  )
}

export default function About() {
  const [open, setOpen] = useState(0)
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      fadeUp('.about-reveal', { trigger: sectionRef.current, y: 20 })

      gsap.from('.accordion-item', {
        y: 24,
        opacity: 0,
        stagger: 0.08,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-accordion',
          start: 'top 88%',
          toggleActions: 'play none none none',
          once: true,
        },
      })

      gsap.from('.stat-card', {
        x: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-stats',
          start: 'top 88%',
          toggleActions: 'play none none none',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="section-pad">
      <p className="section-label about-reveal">WHO WE ARE</p>
      <h2 className="section-title about-reveal">We Are Not Just Another AI Company.</h2>

      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="about-accordion about-reveal space-y-0">
          <p className="body-text mb-10 max-w-[56ch]">
            Verbilab AI is a studio of applied AI — building purpose-driven products that
            address real pain points across BPOs, financial services, media, and compliance.
            Every solution we build is designed to integrate seamlessly and deliver results from
            day one.
          </p>
          {ITEMS.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.title} className="accordion-item border-b border-[var(--border)] py-6">
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-4 text-left"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <div>
                    <span className="font-mono text-xs text-[var(--accent)]">{item.num}</span>
                    <h3 className="subheading mt-1">{item.title}</h3>
                  </div>
                  {isOpen ? (
                    <Minus size={18} className="shrink-0 text-[var(--muted)]" />
                  ) : (
                    <Plus size={18} className="shrink-0 text-[var(--muted)]" />
                  )}
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="body-text pt-4">
                        {item.body}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        <div className="about-stats about-reveal space-y-4 lg:sticky lg:top-28">
          <div className="stat-card interactive-glow rounded-lg border border-[var(--border)] bg-[var(--surface)] p-8">
            <p className="mb-2 text-[0.65rem] uppercase tracking-[0.12em] text-[var(--accent)]">
              Calls Audited Daily
            </p>
            <p className="font-display text-[4rem] italic leading-none text-[var(--accent)]">
              10K+
            </p>
            <p className="body-text mt-2">Across active deployments</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <StatCard end="98%" label="Audit Accuracy Rate" />
            <StatCard end="4+" label="Industries Served" />
            <StatCard end="100%" label="Call Coverage vs 2–5% Manual" />
            <StatCard staticValue="∞" end={0} label="Possibilities Ahead" />
          </div>
        </div>
      </div>
    </section>
  )
}
