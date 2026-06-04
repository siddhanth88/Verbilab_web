import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const INPUTS = [
  { id: 'bpo', label: 'BPO & Contact Centres', y: 80 },
  { id: 'bfsi', label: 'Banking & BFSI', y: 180 },
  { id: 'film', label: 'Film & Entertainment', y: 280 },
  { id: 'compliance', label: 'Compliance', y: 380 },
  { id: 'enterprise', label: 'Enterprise', y: 480 },
]

const OUTPUTS = [
  { id: 'audit', label: 'Call Audit AI', badge: 'LIVE', y: 130 },
  { id: 'filmintel', label: 'Film Intelligence', badge: 'SOON', y: 260 },
  { id: 'comply', label: 'Verbilab Comply', badge: 'SOON', y: 390 },
]

function hexPoints(cx, cy, r) {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 6
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`
  }).join(' ')
}

export default function ConnectionDiagram() {
  const sectionRef = useRef(null)
  const svgRef = useRef(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const ctx = gsap.context(() => {
      const paths = gsap.utils.toArray('.connect-line', svg)
      const dots = gsap.utils.toArray('.node-dot', svg)
      const hub = svg.querySelector('.center-hub')

      paths.forEach((path) => {
        const len = path.getTotalLength()
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 })
      })

      gsap.set([hub, ...dots], { opacity: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          toggleActions: 'play none none none',
          once: true,
        },
      })

      tl.to(paths, {
        strokeDashoffset: 0,
        duration: 1.4,
        ease: 'power2.inOut',
        stagger: 0.1,
      })
        .to(hub, { opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.9')
        .to(
          dots,
          {
            opacity: 1,
            scale: 1.4,
            duration: 0.35,
            stagger: 0.06,
            yoyo: true,
            repeat: 1,
            transformOrigin: '50% 50%',
          },
          '-=0.4',
        )

      gsap.to('.hub-pulse-ring', {
        attr: { r: 62 },
        opacity: 0,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const W = 900
  const H = 560
  const centerX = W / 2
  const centerY = H / 2

  return (
    <section id="how-it-works" ref={sectionRef} className="diagram-section section-pad section-mesh">
      <p className="section-kicker">HOW IT WORKS</p>
      <h2 className="display-lg mb-3 max-w-[18ch]">One core. Every sector.</h2>
      <p className="body-short mb-6 max-w-[42ch]">
        Inputs connect to Verbilab AI — products deliver on the other side.
      </p>

      <div className="diagram-wrapper mx-auto w-full max-w-[920px]">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="diagram-svg h-auto w-full"
          role="img"
          aria-label="Industries connecting through Verbilab AI to products"
        >
          <defs>
            <filter id="diagramGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00FF85" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#00FF85" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="lineGradR" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00FF85" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#00FF85" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {INPUTS.map((node) => (
            <g key={node.id}>
              <rect
                x="20"
                y={node.y - 20}
                width="168"
                height="40"
                rx="6"
                fill="rgba(0,255,133,0.05)"
                stroke="rgba(0,255,133,0.22)"
                strokeWidth="1"
              />
              <text
                x="104"
                y={node.y + 5}
                textAnchor="middle"
                fill="#ffffff"
                fontSize="12"
                fontFamily="Inter, sans-serif"
              >
                {node.label}
              </text>
              <circle
                className="node-dot"
                cx="192"
                cy={node.y}
                r="4"
                fill="#00FF85"
                opacity="0"
                filter="url(#diagramGlow)"
              />
              <path
                className="connect-line"
                d={`M 196 ${node.y} C ${centerX - 90} ${node.y}, ${centerX - 90} ${centerY}, ${centerX - 54} ${centerY}`}
                stroke="url(#lineGrad)"
                strokeWidth="1.5"
                fill="none"
                filter="url(#diagramGlow)"
                opacity="0"
              />
            </g>
          ))}

          <g className="center-hub">
            <circle
              className="hub-pulse-ring"
              cx={centerX}
              cy={centerY}
              r="50"
              fill="none"
              stroke="rgba(0,255,133,0.12)"
              strokeWidth="12"
            />
            <circle
              cx={centerX}
              cy={centerY}
              r="58"
              fill="none"
              stroke="rgba(0,255,133,0.1)"
              strokeWidth="1"
            />
            <circle
              cx={centerX}
              cy={centerY}
              r="50"
              fill="rgba(0,255,133,0.05)"
              stroke="rgba(0,255,133,0.35)"
              strokeWidth="1.5"
            />
            <polygon
              points={hexPoints(centerX, centerY, 42)}
              fill="rgba(0,255,133,0.08)"
              stroke="#00FF85"
              strokeWidth="1.5"
              filter="url(#diagramGlow)"
            />
            <text
              x={centerX}
              y={centerY - 6}
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="11"
              fontFamily="Inter, sans-serif"
              fontWeight="600"
              letterSpacing="2"
            >
              VERBILAB
            </text>
            <text
              x={centerX}
              y={centerY + 12}
              textAnchor="middle"
              fill="#00FF85"
              fontSize="13"
              fontFamily="Inter, sans-serif"
              fontWeight="700"
              letterSpacing="3"
            >
              AI
            </text>
          </g>

          {OUTPUTS.map((node) => {
            const badgeW = node.badge === 'LIVE' ? 38 : 42
            return (
              <g key={node.id}>
                <path
                  className="connect-line"
                  d={`M ${centerX + 54} ${centerY} C ${centerX + 90} ${centerY}, ${centerX + 90} ${node.y}, ${W - 204} ${node.y}`}
                  stroke="url(#lineGradR)"
                  strokeWidth="1.5"
                  fill="none"
                  filter="url(#diagramGlow)"
                  opacity="0"
                />
                <circle
                  className="node-dot"
                  cx={W - 200}
                  cy={node.y}
                  r="4"
                  fill="#00FF85"
                  opacity="0"
                  filter="url(#diagramGlow)"
                />
                <rect
                  x={W - 196}
                  y={node.y - 20}
                  width="176"
                  height="40"
                  rx="6"
                  fill="rgba(0,255,133,0.05)"
                  stroke="rgba(0,255,133,0.28)"
                  strokeWidth="1"
                />
                <rect
                  x={W - 196}
                  y={node.y - 20}
                  width={badgeW}
                  height="14"
                  rx="3"
                  fill={node.badge === 'LIVE' ? 'rgba(0,255,133,0.22)' : 'rgba(255,255,255,0.06)'}
                />
                <text
                  x={W - 196 + badgeW / 2}
                  y={node.y - 10}
                  textAnchor="middle"
                  fill={node.badge === 'LIVE' ? '#00FF85' : '#7a7a8c'}
                  fontSize="8"
                  fontFamily="Space Mono, monospace"
                >
                  {node.badge}
                </text>
                <text
                  x={W - 108}
                  y={node.y + 6}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="12"
                  fontFamily="Inter, sans-serif"
                >
                  {node.label}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    </section>
  )
}
