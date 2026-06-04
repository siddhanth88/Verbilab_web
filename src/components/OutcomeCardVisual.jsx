/** Cyberpunk call-scoring visuals — replaces bar charts */

export function AuditScoreVisual() {
  return (
    <div className="outcome-cyber-visual" aria-hidden>
      <svg viewBox="0 0 280 130" className="h-full w-full">
        <defs>
          <linearGradient id="auditGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00FF85" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <circle cx="72" cy="65" r="42" fill="none" stroke="rgba(0,255,133,0.15)" strokeWidth="8" />
        <circle
          cx="72"
          cy="65"
          r="42"
          fill="none"
          stroke="url(#auditGrad)"
          strokeWidth="8"
          strokeDasharray="220"
          strokeDashoffset="18"
          strokeLinecap="round"
          transform="rotate(-90 72 65)"
          className="outcome-audit-ring"
        />
        <text x="72" y="70" textAnchor="middle" fill="#00FF85" fontSize="22" fontWeight="700" fontFamily="Inter,sans-serif">
          98
        </text>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
          const h = 12 + Math.sin(i * 0.9) * 28 + Math.cos(i * 0.4) * 12
          return (
            <rect
              key={i}
              x={138 + i * 10}
              y={110 - h}
              width="5"
              height={h}
              fill="rgba(0,255,133,0.55)"
              className="outcome-wave-bar"
              style={{ animationDelay: `${i * 0.028}s` }}
            />
          )
        })}
        <text x="138" y="22" fill="rgba(255,255,255,0.35)" fontSize="8" fontFamily="Space Mono,monospace">
          LIVE CALL SCORING
        </text>
        <line x1="132" y1="32" x2="268" y2="32" stroke="rgba(0,255,133,0.2)" />
        <text x="138" y="48" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="Space Mono,monospace">
          Agent script · OK
        </text>
        <text x="138" y="62" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="Space Mono,monospace">
          Compliance · PASS
        </text>
        <text x="138" y="76" fill="rgba(0,255,133,0.7)" fontSize="7" fontFamily="Space Mono,monospace">
          Risk flag · CLEARED
        </text>
      </svg>
      <span className="outcome-visual-scan" />
    </div>
  )
}

export function CoverageVisual() {
  return (
    <div className="outcome-cyber-visual" aria-hidden>
      <svg viewBox="0 0 280 130" className="h-full w-full">
        <rect x="20" y="25" width="240" height="80" fill="none" stroke="rgba(0,255,133,0.12)" strokeWidth="1" />
        {Array.from({ length: 8 }).flatMap((_, row) =>
          Array.from({ length: 12 }).map((_, col) => {
            const i = row * 12 + col
            return (
              <rect
                key={`${row}-${col}`}
                x={28 + col * 18}
                y={33 + row * 9}
                width="12"
                height="6"
                className="outcome-grid-cell"
                style={{ '--cell-i': i }}
              />
            )
          }),
        )}
        <text x="140" y="118" textAnchor="middle" fill="#00FF85" fontSize="11" fontFamily="Space Mono,monospace" letterSpacing="3">
          FULL COVERAGE MAP
        </text>
        <circle cx="240" cy="40" r="4" fill="#00FF85" className="outcome-coverage-ping" />
        <text x="20" y="18" fill="rgba(255,255,255,0.4)" fontSize="8" fontFamily="Space Mono,monospace">
          100% CALLS INDEXED
        </text>
      </svg>
      <span className="outcome-visual-scan" />
    </div>
  )
}

export function IndustriesVisual() {
  const nodes = [
    [70, 65],
    [120, 40],
    [170, 55],
    [210, 35],
    [140, 90],
    [200, 85],
  ]
  return (
    <div className="outcome-cyber-visual" aria-hidden>
      <svg viewBox="0 0 280 130" className="h-full w-full outcome-network-svg">
        <g className="outcome-network-rotate">
          {[
            [0, 1],
            [1, 2],
            [2, 3],
            [0, 4],
            [4, 5],
            [2, 5],
            [1, 4],
          ].map(([a, b], i) => (
            <line
              key={i}
              x1={nodes[a][0]}
              y1={nodes[a][1]}
              x2={nodes[b][0]}
              y2={nodes[b][1]}
              stroke="rgba(0,255,133,0.25)"
              strokeWidth="1"
            />
          ))}
          {nodes.slice(0, 5).map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="10" fill="rgba(0,255,133,0.08)" stroke="rgba(0,255,133,0.5)" />
              <text
                x={x}
                y={y + 3}
                textAnchor="middle"
                fill="#00FF85"
                fontSize="6"
                fontFamily="Space Mono,monospace"
              >
                {['BPO', 'BFSI', 'MED', 'CMP', 'ENT'][i]}
              </text>
            </g>
          ))}
        </g>
        <circle
          cx="140"
          cy="65"
          r="18"
          fill="rgba(0,255,133,0.1)"
          stroke="#00FF85"
          strokeWidth="1"
          className="outcome-hub-pulse"
        />
        <text x="140" y="69" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="600" fontFamily="Inter,sans-serif">
          AI
        </text>
        <text x="140" y="118" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="8" fontFamily="Space Mono,monospace">
          MULTI-SECTOR DEPLOYMENT
        </text>
      </svg>
      <span className="outcome-visual-scan" />
    </div>
  )
}

const VISUALS = {
  audit: AuditScoreVisual,
  coverage: CoverageVisual,
  industries: IndustriesVisual,
}

export default function OutcomeCardVisual({ type }) {
  const V = VISUALS[type]
  return V ? <V /> : null
}
