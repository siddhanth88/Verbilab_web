import { useState } from 'react'
// Place transparent logo at src/assets/logo.png; verbilab.logo2.png used as fallback
import logoImg from '../assets/verbilab.logo2.png'

export default function BrandLogo({ className = 'h-8 w-auto', alt = 'Verbilab AI' }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span
        className={`font-display text-lg tracking-[0.12em] text-[var(--white)] ${className}`}
        aria-label={alt}
      >
        VERBILAB <span className="text-[var(--accent)]">AI</span>
      </span>
    )
  }

  return (
    <img
      src={logoImg}
      alt={alt}
      className={`object-contain ${className}`}
      onError={() => setFailed(true)}
    />
  )
}
