import { useRef } from 'react'

export function useMouseTilt(maxTilt = 4) {
  const ref = useRef()

  const handleMouseMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    ref.current.style.transform = `perspective(600px) rotateY(${x * maxTilt * 2}deg) rotateX(${-y * maxTilt * 2}deg) translateZ(8px)`
  }

  const handleMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.transform =
      'perspective(600px) rotateY(0) rotateX(0) translateZ(0)'
  }

  return { ref, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave }
}
