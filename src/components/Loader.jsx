import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import BrandLogo from './BrandLogo'

const SEGMENTS = 11
const DURATION_MS = 2000

export default function Loader() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const start = performance.now()

    const tick = (now) => {
      const p = Math.min(((now - start) / DURATION_MS) * 100, 100)
      setProgress(p)
      if (p < 100) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [])

  const filledCount = Math.floor((progress / 100) * SEGMENTS)

  return (
    <motion.div
      className="verbilab-loader"
      initial={{ opacity: 1 }}
      exit={{
        y: '-100%',
        opacity: 0.4,
        transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      <div className="verbilab-loader-scan" aria-hidden />

      <div className="verbilab-loader-center">
        <div className="verbilab-loader-mark">
          <span className="verbilab-loader-mark-line" aria-hidden />
          <BrandLogo className="verbilab-loader-logo h-10 w-auto" alt="Verbilab" />
        </div>

        <p className="verbilab-loader-title">VERBILAB</p>

        <div className="verbilab-loader-bar-wrap">
          <span className="verbilab-loader-corner verbilab-loader-corner--tl" aria-hidden />
          <span className="verbilab-loader-corner verbilab-loader-corner--tr" aria-hidden />
          <span className="verbilab-loader-corner verbilab-loader-corner--bl" aria-hidden />
          <span className="verbilab-loader-corner verbilab-loader-corner--br" aria-hidden />
          <div className="verbilab-loader-bar">
            {Array.from({ length: SEGMENTS }).map((_, i) => (
              <span
                key={i}
                className={`verbilab-loader-seg${i < filledCount ? ' is-on' : ''}${
                  i === filledCount - 1 && progress < 100 ? ' is-pulse' : ''
                }`}
              />
            ))}
          </div>
        </div>

        <p className="verbilab-loader-pct">{Math.round(progress)}%</p>
      </div>

      <p className="verbilab-loader-tagline">AI SOLUTIONS COMPANY</p>
    </motion.div>
  )
}
