import { useEffect, useRef, useState } from 'react'

export function useCountUp(end, duration = 2000, suffix = '') {
  const [value, setValue] = useState('0' + suffix)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return
        started.current = true

        const numericEnd =
          typeof end === 'string' ? parseFloat(end.replace(/[^0-9.]/g, '')) : end
        const hasPercent = String(end).includes('%')
        const hasPlus = String(end).includes('+')
        const startTime = performance.now()

        const tick = (now) => {
          const progress = Math.min((now - startTime) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          const current = Math.round(numericEnd * eased)
          let display = String(current)
          if (hasPercent) display += '%'
          if (hasPlus) display += '+'
          setValue(display + (suffix && !hasPercent && !hasPlus ? suffix : ''))
          if (progress < 1) requestAnimationFrame(tick)
        }

        requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [end, duration, suffix])

  return { ref, value }
}
