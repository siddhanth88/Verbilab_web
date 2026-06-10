import { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../utils/motion'

export default function LiveAuditDashboard() {
  const [score, setScore] = useState(0)
  const [calls, setCalls] = useState(0)
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
  )

  useEffect(() => {
    if (prefersReducedMotion()) {
      setScore(98)
      setCalls(10420)
      return
    }

    let s = 0
    let c = 0
    const timer = setInterval(() => {
      s = Math.min(s + 2, 98)
      c = Math.min(c + 127, 10420)
      setScore(s)
      setCalls(c)
      if (s >= 98 && c >= 10420) clearInterval(timer)
    }, 20)

    const clock = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      )
    }, 1000)

    return () => {
      clearInterval(timer)
      clearInterval(clock)
    }
  }, [])

  return (
    <div className="audit-mockup" aria-hidden>
      <div className="mockup-header">
        <span className="blink-dot">●</span>
        <span>LIVE AUDIT STREAM</span>
        <span className="mockup-time">{time}</span>
      </div>

      <div className="mockup-stats">
        <div className="mockup-stat">
          <span className="stat-val">{score}%</span>
          <span className="stat-label">AVG SCORE</span>
        </div>
        <div className="mockup-stat">
          <span className="stat-val">{calls.toLocaleString()}</span>
          <span className="stat-label">CALLS TODAY</span>
        </div>
        <div className="mockup-stat">
          <span className="stat-val green">PASS</span>
          <span className="stat-label">COMPLIANCE</span>
        </div>
      </div>

      <div className="mockup-waveform">
        {Array.from({ length: 24 }, (_, i) => (
          <div
            key={i}
            className="wave-bar"
            style={{
              height: `${20 + Math.sin(i * 0.8) * 15 + ((i * 7) % 11)}px`,
              animationDelay: `${i * 0.05}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
