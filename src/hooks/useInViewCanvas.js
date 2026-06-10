import { useEffect, useRef } from 'react'

export function useInViewCanvas() {
  const ref = useRef(null)
  const inViewRef = useRef(true)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = entry.isIntersecting
      },
      { rootMargin: '120px 0px', threshold: 0 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return { ref, inViewRef }
}
