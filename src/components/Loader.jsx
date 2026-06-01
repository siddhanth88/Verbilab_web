import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const TEXT = 'VERBILAB AI'

export default function Loader() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const start = performance.now()
    const duration = 1800

    const tick = (now) => {
      const p = Math.min(((now - start) / duration) * 100, 100)
      setProgress(p)
      if (p < 100) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[9000] flex flex-col justify-end bg-[#050508] p-[clamp(1.5rem,4vw,4rem)]"
      exit={{ y: '-100%', transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
    >
      <h1
        className="font-display leading-none tracking-[0.06em] text-[clamp(3rem,8vw,7rem)]"
        aria-label={TEXT}
      >
        {TEXT.split('').map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            className="inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.045, duration: 0.4 }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </h1>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-[var(--border2)]">
        <motion.div
          className="h-full bg-[var(--accent)]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  )
}
