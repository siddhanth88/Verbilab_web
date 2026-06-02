import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import logoWithBg from '../assets/verbilab.logo.jpeg'

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
      <div>
        <motion.img
          src={logoWithBg}
          alt={TEXT}
          className="h-[clamp(5.5rem,12vw,9rem)] w-auto rounded-lg object-contain"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-[var(--border2)]">
        <motion.div
          className="h-full bg-[var(--accent)]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  )
}
