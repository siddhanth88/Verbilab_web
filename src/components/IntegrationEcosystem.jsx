import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import IntegrationDotField from './IntegrationDotField'

gsap.registerPlugin(ScrollTrigger)

const CX = 240
const CY = 170
const ORBIT_R = 108

const FLOW_INPUTS = [
  { id: 'tel', label: 'TELEPHONY', cy: 62 },
  { id: 'crm', label: 'CRM', cy: 170 },
  { id: 'qa', label: 'QA DATA', cy: 278 },
]

const FLOW_OUTPUTS = [
  { id: 'audit', label: 'AUDIT AI', cy: 62 },
  { id: 'comply', label: 'COMPLIANCE', cy: 170 },
  { id: 'reports', label: 'REPORTS', cy: 278 },
]

const ORBIT_APP_LABELS = [
  { id: 'calls', label: 'CALLS' },
  { id: 'crm', label: 'CRM' },
  { id: 'cloud', label: 'CLOUD' },
  { id: 'chat', label: 'CHAT' },
  { id: 'data', label: 'DATA' },
  { id: 'tickets', label: 'TICKETS' },
]

const ORBIT_APPS = ORBIT_APP_LABELS.map((app, i) => {
  const a = (i / ORBIT_APP_LABELS.length) * Math.PI * 2 - Math.PI / 2
  return {
    ...app,
    x: CX + Math.cos(a) * ORBIT_R,
    y: CY + Math.sin(a) * ORBIT_R,
  }
})

function hexPoints(cx, cy, r) {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 6
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`
  }).join(' ')
}

function flowPathIn(cy) {
  return `M 104 ${cy} C ${CX - 72} ${cy}, ${CX - 58} ${CY}, ${CX - 36} ${CY}`
}

function flowPathOut(cy) {
  return `M ${CX + 36} ${CY} C ${CX + 58} ${CY}, ${CX + 72} ${cy}, 376 ${cy}`
}

function animatePacket(path, dot, opts = {}) {
  const { duration = 2.4, delay = 0, repeat = -1, repeatDelay = 0.8 } = opts
  const len = path.getTotalLength()
  const state = { t: 0 }

  return gsap.to(state, {
    t: 1,
    duration,
    delay,
    repeat,
    repeatDelay,
    ease: 'none',
    onStart: () => gsap.set(dot, { opacity: 1 }),
    onUpdate: () => {
      const pt = path.getPointAtLength(state.t * len)
      dot.setAttribute('cx', String(pt.x))
      dot.setAttribute('cy', String(pt.y))
    },
  })
}

function VerbilabHub() {
  return (
    <g className="integration-hub">
      <circle className="hub-glow-ring" cx={CX} cy={CY} r="44" fill="none" stroke="rgba(0,255,133,0.07)" strokeWidth="12" />
      <polygon
        className="hub-hex-shape"
        points={hexPoints(CX, CY, 32)}
        fill="rgba(0,255,133,0.06)"
        stroke="#00FF85"
        strokeWidth="1.3"
      />
      <text x={CX} y={CY - 4} textAnchor="middle" fill="#fff" fontSize="8.5" fontWeight="600" letterSpacing="2" fontFamily="Inter,sans-serif">
        VERBILAB
      </text>
      <text x={CX} y={CY + 9} textAnchor="middle" fill="#00FF85" fontSize="10" fontWeight="700" letterSpacing="2" fontFamily="Inter,sans-serif">
        AI
      </text>
    </g>
  )
}

function FlowPanel({ svgRef }) {
  const paths = [
    ...FLOW_INPUTS.map((n) => ({ key: `in-${n.id}`, d: flowPathIn(n.cy) })),
    ...FLOW_OUTPUTS.map((n) => ({ key: `out-${n.id}`, d: flowPathOut(n.cy) })),
  ]

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 480 340"
      className="integration-svg"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <defs>
        <filter id="flowGlow">
          <feGaussianBlur stdDeviation="1.8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="flowGradL" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00FF85" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#00FF85" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="flowGradR" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00FF85" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#00FF85" stopOpacity="0.18" />
        </linearGradient>
      </defs>

      {FLOW_INPUTS.map((node) => (
        <g key={node.id} className="flow-card integration-card">
          <rect x="16" y={node.cy - 18} width="88" height="36" rx="5" className="integration-card-bg" />
          <text x="60" y={node.cy + 4} textAnchor="middle" className="integration-card-label">
            {node.label}
          </text>
        </g>
      ))}

      {FLOW_OUTPUTS.map((node) => (
        <g key={node.id} className="flow-card integration-card">
          <rect x="376" y={node.cy - 18} width="88" height="36" rx="5" className="integration-card-bg" />
          <text x="420" y={node.cy + 4} textAnchor="middle" className="integration-card-label">
            {node.label}
          </text>
        </g>
      ))}

      <VerbilabHub />

      {paths.map((line, i) => (
        <g key={line.key}>
          <path
            className="flow-line"
            data-index={i}
            d={line.d}
            stroke={i < 3 ? 'url(#flowGradL)' : 'url(#flowGradR)'}
            strokeWidth="1.2"
            fill="none"
            filter="url(#flowGlow)"
          />
          <circle className="flow-dot" data-index={i} r="2.5" fill="#00FF85" opacity="0" />
        </g>
      ))}
    </svg>
  )
}

function OrbitPanel({ svgRef }) {
  const orbitHex = hexPoints(CX, CY, ORBIT_R + 16)
  const orbitPath = ORBIT_APPS.map((n, i) => `${i === 0 ? 'M' : 'L'} ${n.x} ${n.y}`).join(' ') + ' Z'

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 480 340"
      className="integration-svg"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      <polygon className="orbit-hex-ring" points={orbitHex} fill="none" stroke="rgba(0,255,133,0.1)" strokeWidth="1" />
      <circle
        className="orbit-ring-glow"
        cx={CX}
        cy={CY}
        r={ORBIT_R + 6}
        fill="none"
        stroke="rgba(0,255,133,0.05)"
        strokeWidth="1"
        strokeDasharray="3 9"
      />
      <path className="orbit-track" d={orbitPath} fill="none" stroke="none" />

      {ORBIT_APPS.map((app, i) => (
        <line
          key={`line-${app.id}`}
          className="orbit-line"
          x1={CX}
          y1={CY}
          x2={app.x}
          y2={app.y}
          stroke="rgba(0,255,133,0.16)"
          strokeWidth="1"
        />
      ))}

      <VerbilabHub />

      <circle className="orbit-packet" r="2.5" fill="#00FF85" opacity="0" />

      {ORBIT_APPS.map((app) => (
        <g
          key={app.id}
          className="orbit-node integration-orbit-node"
          transform={`translate(${app.x}, ${app.y})`}
          data-cursor-hover
        >
          <circle r="20" className="orbit-node-bg" />
          <text y="3.5" textAnchor="middle" className="orbit-node-label">
            {app.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

export default function IntegrationEcosystem() {
  const sectionRef = useRef(null)
  const flowSvgRef = useRef(null)
  const orbitSvgRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const flowSvg = flowSvgRef.current
    const orbitSvg = orbitSvgRef.current
    if (!section || !flowSvg || !orbitSvg) return

    const ctx = gsap.context(() => {
      const flowLines = gsap.utils.toArray('.flow-line', flowSvg)
      const flowCards = gsap.utils.toArray('.flow-card', flowSvg)
      const orbitLines = gsap.utils.toArray('.orbit-line', orbitSvg)
      const orbitNodes = gsap.utils.toArray('.orbit-node', orbitSvg)
      const headers = gsap.utils.toArray('.integration-panel-head', section)
      const visuals = gsap.utils.toArray('.integration-visual', section)
      const hubs = gsap.utils.toArray('.integration-hub', section)

      flowLines.forEach((path) => {
        const len = path.getTotalLength()
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len, opacity: 0.85 })
      })
      gsap.set(orbitLines, { opacity: 0 })
      gsap.set([...flowCards, ...orbitNodes, ...hubs], { opacity: 0, scale: 0.94, transformOrigin: '50% 50%' })
      gsap.set(headers, { opacity: 0, y: 20 })
      gsap.set(visuals, { opacity: 0, y: 16 })

      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 82%',
          toggleActions: 'play none none none',
          once: true,
        },
      })

      intro
        .to(headers, { opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: 'power2.out' })
        .to(visuals, { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: 'power2.out' }, '-=0.3')
        .to(flowLines, { strokeDashoffset: 0, duration: 1.2, stagger: 0.08, ease: 'power2.inOut' }, '-=0.15')
        .to(orbitLines, { opacity: 1, duration: 0.6, stagger: 0.04 }, '-=0.9')
        .to(hubs, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out' }, '-=0.85')
        .to(flowCards, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' }, '-=0.45')
        .to(orbitNodes, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.06, ease: 'power2.out' }, '-=0.35')
        .add(startIdle)

      function startIdle() {
        flowLines.forEach((path, i) => {
          const dot = flowSvg.querySelector(`.flow-dot[data-index="${i}"]`)
          if (dot) {
            animatePacket(path, dot, {
              duration: 2.6 + (i % 3) * 0.3,
              delay: i * 0.35,
              repeatDelay: 1.2,
            })
          }
        })

        gsap.to(section.querySelectorAll('.hub-glow-ring'), {
          attr: { r: 50 },
          opacity: 0,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })

        gsap.to(section.querySelectorAll('.hub-hex-shape'), {
          opacity: 0.82,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })

        gsap.to(orbitSvg.querySelector('.orbit-hex-ring'), {
          rotation: 360,
          transformOrigin: `${CX}px ${CY}px`,
          duration: 72,
          repeat: -1,
          ease: 'none',
        })

        const track = orbitSvg.querySelector('.orbit-track')
        const packet = orbitSvg.querySelector('.orbit-packet')
        if (track && packet) {
          const len = track.getTotalLength()
          const state = { t: 0 }
          gsap.to(state, {
            t: 1,
            duration: 8,
            repeat: -1,
            ease: 'none',
            onStart: () => gsap.set(packet, { opacity: 0.9 }),
            onUpdate: () => {
              const pt = track.getPointAtLength(state.t * len)
              packet.setAttribute('cx', String(pt.x))
              packet.setAttribute('cy', String(pt.y))
            },
          })
        }

        orbitLines.forEach((line, i) => {
          gsap.to(line, {
            stroke: 'rgba(0,255,133,0.32)',
            duration: 1.8,
            repeat: -1,
            yoyo: true,
            delay: i * 0.25,
            ease: 'sine.inOut',
          })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="integration-ecosystem site-section section-mesh"
      aria-labelledby="integration-lead"
    >
      <p className="section-kicker integration-kicker">HOW IT WORKS</p>
      <h2 id="integration-lead" className="display-lg integration-lead">One core. Every sector.</h2>

      <div className="integration-ecosystem-grid">
        <article className="integration-panel">
          <header className="integration-panel-head">
            <h3 className="integration-panel-title">INSTRUMENT IN MINUTES</h3>
            <p className="body-short integration-panel-sub">
              Connect calls, CRMs, compliance tools, and operational data into one AI layer.
            </p>
          </header>
          <div className="integration-visual scanlines grain">
            <IntegrationDotField />
            <div className="integration-visual-vignette" aria-hidden />
            <FlowPanel svgRef={flowSvgRef} />
          </div>
        </article>

        <article className="integration-panel">
          <header className="integration-panel-head">
            <h3 className="integration-panel-title">WORKS WITH YOUR STACK</h3>
            <p className="body-short integration-panel-sub">
              Verbilab connects with the tools your teams already use.
            </p>
          </header>
          <div className="integration-visual scanlines grain">
            <IntegrationDotField />
            <div className="integration-visual-vignette" aria-hidden />
            <OrbitPanel svgRef={orbitSvgRef} />
          </div>
        </article>
      </div>
    </section>
  )
}
