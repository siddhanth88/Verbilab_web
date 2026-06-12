import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../utils/motion'

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#%&*'

export default function TextScramble({ text, delay = 0, duration = 1100, className }) {
  const [display, setDisplay] = useState(() => (prefersReducedMotion() ? text : ''))

  useEffect(() => {
    if (prefersReducedMotion()) {
      setDisplay(text)
      return undefined
    }

    let raf = 0
    let start = 0
    const len = text.length

    const tick = (now) => {
      if (!start) start = now
      const elapsed = now - start - delay * 1000

      if (elapsed < 0) {
        raf = requestAnimationFrame(tick)
        return
      }

      const progress = Math.min(elapsed / duration, 1)
      const revealed = Math.floor(progress * len)
      let out = ''

      for (let i = 0; i < len; i++) {
        const ch = text[i]
        if (ch === ' ') out += ' '
        else if (i < revealed) out += ch
        else out += SCRAMBLE_CHARS[(Math.random() * SCRAMBLE_CHARS.length) | 0]
      }

      setDisplay(out)
      if (progress < 1) raf = requestAnimationFrame(tick)
      else setDisplay(text)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [text, delay, duration])

  return (
    <span className={className} aria-label={text}>
      {display}
    </span>
  )
}
