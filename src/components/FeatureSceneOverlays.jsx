import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import LiveAuditDashboard from './LiveAuditDashboard'

const SCENES = {
  audit: {
    status: 'CALL AUDIT · LIVE',
    metric: '98.4%',
    metricLabel: 'AUDIT SCORE',
    lines: ['2,847 calls scored', 'Risk flags: 12 cleared', 'Compliance sync OK'],
    chips: ['TRANSCRIPT', 'SCORE', 'FLAG'],
  },
  chat: {
    status: 'NEURAL QUERY · ACTIVE',
    metric: '0.4s',
    metricLabel: 'RESPONSE',
    lines: ['Grounded in enterprise KB', 'Policy + QA graph linked', 'Coaching recommended'],
    chips: ['ROOT CAUSE', 'POLICY', 'QA'],
  },
  flow: {
    status: 'AGENT PIPELINE · RUN',
    metric: '47',
    metricLabel: 'TASKS / HR',
    lines: ['INGEST → ROUTE → ACT → REPORT', '3 agents orchestrating', 'Zero manual handoffs'],
    chips: ['INGEST', 'ACT', 'REPORT'],
  },
}

const FLOAT = {
  audit: [
    { top: '12%', left: '6%', label: 'LIVE', text: 'Stream ON' },
    { top: '55%', right: '5%', label: 'FLAG', text: 'Cleared' },
  ],
  chat: [
    { top: '18%', right: '6%', label: 'QUERY', text: 'QA drop?' },
    { bottom: '28%', left: '5%', label: 'GRAPH', text: 'Linked' },
  ],
  flow: [
    { top: '15%', left: '8%', label: 'NODE', text: 'Router' },
    { top: '50%', right: '4%', label: 'PIPE', text: 'Active' },
  ],
}

export default function FeatureSceneOverlays({ activeId }) {
  const sceneRef = useRef(null)
  const prev = useRef(activeId)

  useEffect(() => {
    if (prev.current === activeId) return
    prev.current = activeId
    const el = sceneRef.current
    if (!el) return
    gsap.fromTo(
      el,
      { opacity: 0.4, filter: 'brightness(1.4)' },
      { opacity: 1, filter: 'brightness(1)', duration: 0.45, ease: 'power2.out' },
    )
  }, [activeId])

  const data = SCENES[activeId]
  const floats = FLOAT[activeId] || []

  const showAuditMockup = activeId === 'audit'
  const floatsToShow = showAuditMockup ? [] : floats

  return (
    <div className={`cyber-hud cyber-hud--${activeId}`} ref={sceneRef}>
      <div className="cyber-hud-ring" aria-hidden />
      <div className="cyber-hud-ring cyber-hud-ring--2" aria-hidden />

      {showAuditMockup && <LiveAuditDashboard />}

      <div className={`cyber-terminal cyber-terminal--${activeId}`}>
        <div className="cyber-terminal-header">
          <span className="cyber-terminal-pulse" />
          <span className="mono-label accent">{data.status}</span>
        </div>
        <div className="cyber-terminal-metric">
          <span className="cyber-metric-value">{data.metric}</span>
          <span className="mono-label subtle">{data.metricLabel}</span>
        </div>
        <ul className="cyber-terminal-lines">
          {data.lines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <div className="cyber-chips">
          {data.chips.map((c) => (
            <span key={c} className="cyber-chip">
              {c}
            </span>
          ))}
        </div>
      </div>

      {floatsToShow.map((f) => (
        <div
          key={f.label}
          className="cyber-float-tag"
          style={{ top: f.top, left: f.left, right: f.right, bottom: f.bottom }}
        >
          <span className="mono-label accent !text-[0.5rem]">{f.label}</span>
          <span>{f.text}</span>
        </div>
      ))}

      <svg className="cyber-connectors" viewBox="0 0 400 300" aria-hidden>
        <path
          className="cyber-connector-line"
          d="M 200 150 L 80 60 M 200 150 L 320 90 M 200 150 L 100 240"
          fill="none"
          stroke="url(#cyberGrad)"
          strokeWidth="1"
        />
        <defs>
          <linearGradient id="cyberGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5BC0DE" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#7DD8F5" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#C1E14F" stopOpacity="0.25" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
