import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const INPUTS = [
  { id: 'bpo', label: 'BPO & Contact', y: 22 },
  { id: 'bfsi', label: 'Banking & BFSI', y: 54 },
  { id: 'film', label: 'Film & Media', y: 86 },
  { id: 'compliance', label: 'Compliance', y: 118 },
  { id: 'enterprise', label: 'Enterprise', y: 150 },
]

const OUTPUTS = [
  { id: 'audit', label: 'Call Audit AI', badge: 'LIVE', y: 42 },
  { id: 'filmintel', label: 'Film Intelligence', badge: 'SOON', y: 100 },
  { id: 'comply', label: 'Verbilab Comply', badge: 'SOON', y: 158 },
]

function hexPoints(cx, cy, r) {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 6
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`
  }).join(' ')
}

function animatePacketAlongPath(path, packet, trail, options = {}) {
  const { duration = 1.8, delay = 0, repeat = -1, repeatDelay = 0.4 } = options
  const len = path.getTotalLength()
  const state = { t: 0 }

  const move = () => {
    const pt = path.getPointAtLength(state.t * len)
    packet.setAttribute('cx', String(pt.x))
    packet.setAttribute('cy', String(pt.y))
    if (trail) {
      const t2 = Math.max(0, state.t - 0.06)
      const pt2 = path.getPointAtLength(t2 * len)
      trail.setAttribute('cx', String(pt2.x))
      trail.setAttribute('cy', String(pt2.y))
    }
  }

  return gsap.to(state, {
    t: 1,
    duration,
    delay,
    repeat,
    repeatDelay,
    ease: 'power1.inOut',
    onUpdate: move,
    onStart: () => {
      gsap.set([packet, trail], { opacity: 1 })
      move()
    },
  })
}

export default function ConnectionDiagram() {
  const sectionRef = useRef(null)
  const svgRef = useRef(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const ctx = gsap.context(() => {
      const paths = gsap.utils.toArray('.connect-line', svg)
      const glowPaths = gsap.utils.toArray('.connect-line-flow', svg)
      const nodes = gsap.utils.toArray('.diagram-node', svg)
      const hub = svg.querySelector('.center-hub')
      const hubHex = svg.querySelector('.hub-hex')

      paths.forEach((path) => {
        const len = path.getTotalLength()
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 })
      })

      glowPaths.forEach((path) => {
        const len = path.getTotalLength()
        gsap.set(path, { strokeDasharray: '6 14', strokeDashoffset: 0, opacity: 0 })
      })

      gsap.set(hub, { opacity: 0 })
      gsap.set(nodes, { opacity: 0.65 })

      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          toggleActions: 'play none none none',
          once: true,
        },
      })

      intro
        .to(paths, {
          strokeDashoffset: 0,
          duration: 1,
          ease: 'power2.inOut',
          stagger: 0.06,
        })
        .to(hub, { opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.65')
        .to(nodes, { opacity: 1, duration: 0.4, stagger: 0.04 }, '-=0.35')
        .add(() => {
          glowPaths.forEach((path, i) => {
            gsap.to(path, { opacity: 0.85, duration: 0.3, delay: i * 0.03 })
            gsap.to(path, {
              strokeDashoffset: -40,
              duration: 1.2,
              ease: 'none',
              repeat: -1,
            })
          })

          paths.forEach((path, i) => {
            const packet = svg.querySelector(`.flow-packet[data-line="${i}"]`)
            const trail = svg.querySelector(`.flow-trail[data-line="${i}"]`)
            const node = path.dataset.node
            const isOut = path.dataset.dir === 'out'

            if (!packet) return

            animatePacketAlongPath(path, packet, trail, {
              duration: isOut ? 1.4 : 1.7,
              delay: i * 0.22,
              repeat: -1,
              repeatDelay: 0.35 + (i % 3) * 0.15,
            })

            if (node) {
              const nodeEl = svg.querySelector(`.diagram-node[data-id="${node}"]`)
              if (nodeEl) {
                gsap.fromTo(
                  nodeEl,
                  { attr: { stroke: 'rgba(0,255,133,0.2)' } },
                  {
                    attr: { stroke: 'rgba(0,255,133,0.65)' },
                    duration: 0.3,
                    repeat: -1,
                    repeatDelay: 2,
                    delay: i * 0.22 + (isOut ? 1.1 : 0.9),
                    yoyo: true,
                  },
                )
              }
            }
          })
        })

      gsap.to('.hub-pulse-ring', {
        attr: { r: 42 },
        opacity: 0,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      if (hubHex) {
        gsap.fromTo(
          hubHex,
          { attr: { stroke: '#00FF85' } },
          {
            attr: { stroke: '#66ffb3' },
            duration: 1.4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const W = 680
  const H = 188
  const centerX = W / 2
  const centerY = H / 2
  const hubEdge = 34

  const linePaths = [
    ...INPUTS.map((node, i) => ({
      key: `in-${node.id}`,
      index: i,
      dir: 'in',
      nodeId: node.id,
      d: `M 142 ${node.y} L ${centerX - hubEdge - 8} ${node.y} L ${centerX - hubEdge} ${centerY}`,
    })),
    ...OUTPUTS.map((node, i) => ({
      key: `out-${node.id}`,
      index: INPUTS.length + i,
      dir: 'out',
      nodeId: node.id,
      d: `M ${centerX + hubEdge} ${centerY} L ${centerX + hubEdge + 8} ${node.y} L ${W - 142} ${node.y}`,
    })),
  ]

  return (
    <section id="how-it-works" ref={sectionRef} className="diagram-section site-section section-mesh">
      <div className="diagram-header">
        <p className="section-kicker">HOW IT WORKS</p>
        <h2 className="display-lg diagram-title">One core. Every sector.</h2>
        <p className="body-short diagram-sub">
          Inputs connect to Verbilab AI — products deliver on the other side.
        </p>
      </div>

      <div className="diagram-wrapper diagram-compact">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="diagram-svg"
          role="img"
          aria-label="Industries connecting through Verbilab AI to products"
        >
          <defs>
            <filter id="diagramGlow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="packetGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00FF85" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#00FF85" stopOpacity="0.75" />
            </linearGradient>
            <linearGradient id="lineGradR" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00FF85" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#00FF85" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          <rect
            x="8"
            y="6"
            width={W / 2 - 20}
            height={H - 12}
            rx="4"
            fill="rgba(0,255,133,0.02)"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
          <rect
            x={W / 2 + 12}
            y="6"
            width={W / 2 - 20}
            height={H - 12}
            rx="4"
            fill="rgba(0,255,133,0.02)"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />

          {INPUTS.map((node) => (
            <g key={node.id}>
              <rect
                className="diagram-node"
                data-id={node.id}
                x="16"
                y={node.y - 12}
                width="118"
                height="24"
                rx="4"
                fill="rgba(0,0,0,0.35)"
                stroke="rgba(0,255,133,0.2)"
                strokeWidth="1"
              />
              <text
                x="75"
                y={node.y + 4}
                textAnchor="middle"
                fill="rgba(255,255,255,0.88)"
                fontSize="9.5"
                fontFamily="Inter, sans-serif"
              >
                {node.label}
              </text>
            </g>
          ))}

          <g className="center-hub">
            <circle
              className="hub-pulse-ring"
              cx={centerX}
              cy={centerY}
              r="32"
              fill="none"
              stroke="rgba(0,255,133,0.1)"
              strokeWidth="8"
            />
            <polygon
              className="hub-hex"
              points={hexPoints(centerX, centerY, 28)}
              fill="rgba(0,255,133,0.08)"
              stroke="#00FF85"
              strokeWidth="1.2"
              filter="url(#diagramGlow)"
            />
            <text
              x={centerX}
              y={centerY - 4}
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="8"
              fontFamily="Inter, sans-serif"
              fontWeight="600"
              letterSpacing="1.5"
            >
              VERBILAB
            </text>
            <text
              x={centerX}
              y={centerY + 9}
              textAnchor="middle"
              fill="#00FF85"
              fontSize="10"
              fontFamily="Inter, sans-serif"
              fontWeight="700"
              letterSpacing="2"
            >
              AI
            </text>
          </g>

          {OUTPUTS.map((node) => {
            const badgeW = node.badge === 'LIVE' ? 34 : 38
            return (
              <g key={node.id}>
                <rect
                  className="diagram-node"
                  data-id={node.id}
                  x={W - 134}
                  y={node.y - 12}
                  width="118"
                  height="24"
                  rx="4"
                  fill="rgba(0,0,0,0.35)"
                  stroke="rgba(0,255,133,0.24)"
                  strokeWidth="1"
                />
                <rect
                  x={W - 134}
                  y={node.y - 12}
                  width={badgeW}
                  height="11"
                  rx="2"
                  fill={node.badge === 'LIVE' ? 'rgba(0,255,133,0.2)' : 'rgba(255,255,255,0.06)'}
                />
                <text
                  x={W - 134 + badgeW / 2}
                  y={node.y - 4}
                  textAnchor="middle"
                  fill={node.badge === 'LIVE' ? '#00FF85' : '#7a7a8c'}
                  fontSize="7"
                  fontFamily="Space Mono, monospace"
                >
                  {node.badge}
                </text>
                <text
                  x={W - 75}
                  y={node.y + 4}
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.88)"
                  fontSize="9.5"
                  fontFamily="Inter, sans-serif"
                >
                  {node.label}
                </text>
              </g>
            )
          })}

          {linePaths.map((line) => (
            <g key={line.key}>
              <path
                className="connect-line"
                data-dir={line.dir}
                data-node={line.nodeId}
                data-line={line.index}
                d={line.d}
                stroke={line.dir === 'in' ? 'url(#lineGrad)' : 'url(#lineGradR)'}
                strokeWidth="1.2"
                fill="none"
                filter="url(#diagramGlow)"
                opacity="0"
              />
              <path
                className="connect-line-flow"
                d={line.d}
                stroke="#00FF85"
                strokeWidth="2"
                fill="none"
                opacity="0"
                strokeLinecap="round"
              />
            </g>
          ))}

          <g className="flow-packets" aria-hidden>
            {linePaths.map((line) => (
              <g key={`pkt-${line.key}`}>
                <circle
                  className="flow-trail"
                  data-line={line.index}
                  r="5"
                  fill="rgba(0,255,133,0.2)"
                  opacity="0"
                />
                <circle
                  className="flow-packet"
                  data-line={line.index}
                  r="3.5"
                  fill="#00FF85"
                  opacity="0"
                  filter="url(#packetGlow)"
                />
              </g>
            ))}
          </g>
        </svg>
      </div>
    </section>
  )
}
