import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../utils/motion'

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const update = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  if (prefersReducedMotion()) return null

  return (
    <div className="scroll-progress" aria-hidden>
      <div className="scroll-progress-track">
        <div className="scroll-progress-fill" style={{ height: `${progress}%` }} />
      </div>
    </div>
  )
}
