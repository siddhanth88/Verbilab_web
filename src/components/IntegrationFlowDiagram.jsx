import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const INDUSTRIES = [
  { id: 'bpo', label: 'BPO & Contact Centres', short: 'BPO' },
  { id: 'bfsi', label: 'Banking & BFSI', short: 'BFSI' },
  { id: 'film', label: 'Film & Entertainment', short: 'Film' },
  { id: 'comply', label: 'Compliance', short: 'Comply' },
  { id: 'enterprise', label: 'Enterprise', short: 'Enterprise' },
]

const PRODUCTS = [
  { id: 'audit', label: 'Call Audit AI', short: 'Call Audit' },
  { id: 'coverage', label: 'Full Coverage', short: '100% QA' },
  { id: 'film-ai', label: 'Film Intelligence', short: 'Film AI' },
  { id: 'comply-ai', label: 'Verbilab Comply', short: 'Comply' },
]

const VB = { w: 900, h: 520 }
const CENTER = { x: 450, y: 260 }
const LEFT_X = 118
const RIGHT_X = 782

function nodeY(index, total) {
  const pad = 56
  const span = VB.h - pad * 2
  return pad + (span / (total - 1)) * index
}

function topPercent(index, total) {
  return `${(nodeY(index, total) / VB.h) * 100}%`
}

function pathIn(index) {
  const y = nodeY(index, INDUSTRIES.length)
  const cx = CENTER.x - 54
  const cy = CENTER.y
  return `M ${LEFT_X + 10} ${y} C ${LEFT_X + 150} ${y}, ${cx - 110} ${cy}, ${cx} ${cy}`
}

function pathOut(index) {
  const y = nodeY(index, PRODUCTS.length)
  const cx = CENTER.x + 54
  const cy = CENTER.y
  return `M ${cx} ${cy} C ${cx + 110} ${cy}, ${RIGHT_X - 150} ${y}, ${RIGHT_X - 10} ${y}`
}

function hexPoints(cx, cy, r) {
  const pts = []
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 6
    pts.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`)
  }
  return pts.join(' ')
}

export default function IntegrationFlowDiagram() {
  const rootRef = useRef(null)
  const svgRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    const svg = svgRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      const inPaths = svg ? gsap.utils.toArray('.flow-path-in', svg) : []
      const outPaths = svg ? gsap.utils.toArray('.flow-path-out', svg) : []
      const hex = svg?.querySelector('.flow-hex')
      const hexMobile = root.querySelector('.flow-hex-mobile')
      const leftNodes = gsap.utils.toArray('[data-side="left"]', root)
      const rightNodes = gsap.utils.toArray('[data-side="right"]', root)

      const prepPath = (path) => {
        const len = path.getTotalLength()
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 })
      }
      inPaths.forEach(prepPath)
      outPaths.forEach(prepPath)

      const targets = [hex, hexMobile, ...leftNodes, ...rightNodes].filter(Boolean)
      gsap.set(targets, { opacity: 0, scale: 0.94 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top 78%',
          toggleActions: 'play none none none',
          once: true,
        },
      })

      tl.to(leftNodes, {
        opacity: 1,
        scale: 1,
        duration: 0.45,
        stagger: 0.07,
        ease: 'power3.out',
      })

      if (inPaths.length) {
        tl.to(
          inPaths,
          {
            strokeDashoffset: 0,
            duration: 0.85,
            stagger: 0.1,
            ease: 'power2.inOut',
          },
          '-=0.15',
        )
      }

      tl.to(
        [hex, hexMobile].filter(Boolean),
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.35)',
        },
        '-=0.3',
      )

      if (outPaths.length) {
        tl.to(
          outPaths,
          {
            strokeDashoffset: 0,
            duration: 0.85,
            stagger: 0.1,
            ease: 'power2.inOut',
          },
          '-=0.2',
        )
      }

      tl.to(
        rightNodes,
        {
          opacity: 1,
          scale: 1,
          duration: 0.45,
          stagger: 0.07,
          ease: 'power3.out',
        },
        '-=0.55',
      )

      if (hex) {
        gsap.to(hex, {
          stroke: 'rgba(91,192,222,1)',
          attr: { 'stroke-width': 2 },
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 2.2,
        })
      }
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={rootRef}
      className="integration-flow relative mx-auto w-full max-w-[1100px] overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]/80 px-4 py-8 md:px-6 md:py-10"
    >
      <p className="mb-8 text-center font-mono text-[0.65rem] uppercase tracking-[0.18em] text-[var(--accent)]">
        Industries connect in · Verbilab AI orchestrates · Products deliver outcomes
      </p>

      <div className="relative hidden w-full md:block" style={{ aspectRatio: `${VB.w} / ${VB.h}` }}>
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VB.w} ${VB.h}`}
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <defs>
            <linearGradient id="flowGradIn" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(91,192,222,0.2)" />
              <stop offset="100%" stopColor="rgba(91,192,222,0.9)" />
            </linearGradient>
            <linearGradient id="flowGradOut" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(91,192,222,0.9)" />
              <stop offset="100%" stopColor="rgba(91,192,222,0.2)" />
            </linearGradient>
          </defs>

          {INDUSTRIES.map((ind, i) => (
            <path
              key={`in-${ind.id}`}
              className="flow-path-in"
              d={pathIn(i)}
              fill="none"
              stroke="url(#flowGradIn)"
              strokeWidth="1.5"
              opacity="0"
            />
          ))}

          {PRODUCTS.map((prod, i) => (
            <path
              key={`out-${prod.id}`}
              className="flow-path-out"
              d={pathOut(i)}
              fill="none"
              stroke="url(#flowGradOut)"
              strokeWidth="1.5"
              opacity="0"
            />
          ))}

          <polygon
            className="flow-hex"
            points={hexPoints(CENTER.x, CENTER.y, 60)}
            fill="rgba(91,192,222,0.06)"
            stroke="rgba(91,192,222,0.7)"
            strokeWidth="1.5"
          />
          <text
            x={CENTER.x}
            y={CENTER.y - 5}
            textAnchor="middle"
            fill="#ffffff"
            fontSize="14"
            fontFamily="Cormorant Garamond, serif"
            fontWeight="600"
          >
            VERBILAB
          </text>
          <text
            x={CENTER.x}
            y={CENTER.y + 15}
            textAnchor="middle"
            fill="#5BC0DE"
            fontSize="11"
            fontFamily="Space Mono, monospace"
          >
            AI
          </text>

          {INDUSTRIES.map((_, i) => {
            const y = nodeY(i, INDUSTRIES.length)
            return (
              <g key={`dot-l-${i}`}>
                <circle cx={LEFT_X} cy={y} r="3.5" fill="#5BC0DE" />
                <circle cx={LEFT_X} cy={y} r="9" fill="none" stroke="rgba(91,192,222,0.3)" strokeWidth="1" />
              </g>
            )
          })}

          {PRODUCTS.map((_, i) => {
            const y = nodeY(i, PRODUCTS.length)
            return (
              <g key={`dot-r-${i}`}>
                <circle cx={RIGHT_X} cy={y} r="3.5" fill="#5BC0DE" />
                <circle cx={RIGHT_X} cy={y} r="9" fill="none" stroke="rgba(91,192,222,0.3)" strokeWidth="1" />
              </g>
            )
          })}
        </svg>

        {INDUSTRIES.map((ind, i) => (
          <div
            key={ind.id}
            data-side="left"
            className="flow-node absolute left-0 max-w-[28%] -translate-y-1/2 pr-2 text-right"
            style={{ top: topPercent(i, INDUSTRIES.length) }}
          >
            <span className="block text-[0.8rem] leading-snug text-[var(--white)]">{ind.label}</span>
            <span className="font-mono text-[0.58rem] tracking-wider text-[var(--accent)]">{ind.short}</span>
          </div>
        ))}

        {PRODUCTS.map((prod, i) => (
          <div
            key={prod.id}
            data-side="right"
            className="flow-node absolute right-0 max-w-[28%] -translate-y-1/2 pl-2"
            style={{ top: topPercent(i, PRODUCTS.length) }}
          >
            <span className="font-mono text-[0.58rem] tracking-wider text-[var(--accent)]">{prod.short}</span>
            <span className="block text-[0.8rem] leading-snug text-[var(--white)]">{prod.label}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-5 md:hidden">
        <div className="w-full space-y-2.5">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[var(--muted)]">Industries</p>
          {INDUSTRIES.map((ind) => (
            <div
              key={ind.id}
              data-side="left"
              className="flow-node rounded-sm border border-[var(--border)] bg-[var(--surface2)] px-4 py-2.5 text-[0.82rem] text-[var(--muted)]"
            >
              {ind.label}
            </div>
          ))}
        </div>

        <div className="flow-hex-mobile flex h-[5.5rem] w-[5.5rem] flex-col items-center justify-center border border-[var(--accent)] bg-[var(--accent-dim)]">
          <span className="font-display text-sm font-semibold text-[var(--white)]">VERBILAB</span>
          <span className="font-mono text-[0.65rem] text-[var(--accent)]">AI</span>
        </div>

        <div className="w-full space-y-2.5">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-[var(--muted)]">Products</p>
          {PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              data-side="right"
              className="flow-node rounded-sm border border-[var(--border)] bg-[var(--surface2)] px-4 py-2.5 text-[0.82rem] text-[var(--muted)]"
            >
              {prod.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
