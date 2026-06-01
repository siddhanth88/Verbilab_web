import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { fadeUp } from '../utils/animations'
import { useCountUp } from '../hooks/useCountUp'

const ITEMS = [
  {
    num: '01',
    title: 'Our Belief',
    body: 'Every industry has problems that intelligence can solve. We exist to find them.',
  },
  {
    num: '02',
    title: 'Our Approach',
    body: 'Domain-first, not AI-first. We embed with experts before writing a line of code.',
  },
  {
    num: '03',
    title: 'Our Mission',
    body: 'To make AI accessible, actionable, and impactful — one industry at a time.',
  },
  {
    num: '04',
    title: 'Our Vision',
    body: 'A world where every organisation can harness AI to operate smarter and faster.',
  },
]

function StatCard({ end, label }) {
  const { ref, value } = useCountUp(end)

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8">
      <p ref={ref} className="font-display text-[4rem] leading-none text-[var(--accent)]">
        {value}
      </p>
      <p className="mt-2 text-sm text-[var(--muted)]">{label}</p>
    </div>
  )
}

export default function About() {
  const [open, setOpen] = useState(0)
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = fadeUp('.about-reveal', { trigger: sectionRef.current })
    return () => ctx?.scrollTrigger?.kill?.()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="section-pad">
      <p className="section-label about-reveal">◆ WHO WE ARE</p>
      <h2 className="section-title about-reveal">We Are Not Just Another AI Company.</h2>

      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="about-reveal space-y-0">
          {ITEMS.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.title} className="border-b border-[var(--border)] py-6">
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-4 text-left"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <div>
                    <span className="font-mono text-xs text-[var(--accent)]">{item.num}</span>
                    <h3 className="mt-1 text-[1.1rem] font-semibold">{item.title}</h3>
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
                      <p className="pt-4 text-[0.92rem] leading-relaxed text-[var(--muted)]">
                        {item.body}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        <div className="about-reveal space-y-4 lg:sticky lg:top-28">
          <StatCard end="10K+" label="Calls Audited Daily" />
          <StatCard end="98%" label="Audit Accuracy Rate" />
          <div className="border-pulse rounded-2xl bg-[var(--surface2)] p-8">
            <p className="text-[1rem] leading-relaxed">
              A studio of applied AI — building purpose-driven products that address real pain
              points.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
