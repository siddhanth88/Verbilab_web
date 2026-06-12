import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import { prefersReducedMotion } from '../utils/motion'
import { ACCENT as NEON, ACCENT_NEON, ACCENT_SECONDARY as LIME } from '../utils/brandColors'

gsap.registerPlugin(ScrollTrigger)

const COUNT = 490
const CONNECT_DIST = 1.55
const MAX_NEIGHBORS = 5
const BLUE_CORE = new THREE.Color(NEON)
const BLUE_NEON = new THREE.Color(ACCENT_NEON)
const LIME_C = new THREE.Color(LIME)

function GlowLines({ positions, colors, scale = 1, opacity = 0.5, matRef }) {
  const s = Array.isArray(scale) ? scale : [scale, scale, scale]
  return (
    <lineSegments scale={s}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
        />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} count={colors.length / 3} />
      </bufferGeometry>
      <lineBasicMaterial
        ref={matRef}
        vertexColors
        transparent
        opacity={opacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </lineSegments>
  )
}

function ParticleNetwork({ motionRef, scrollRef, activeRef }) {
  const groupRef = useRef()
  const target = useRef({ x: 0, y: 0 })
  const prevPointer = useRef({ x: 0, y: 0 })
  const boost = useRef(0)
  const baseZ = useRef(5)
  const glowMats = useRef([])

  const { positions, colors, linePositions, lineColors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const colors = new Float32Array(COUNT * 3)
    const pts = []

    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * 18
      const y = (Math.random() - 0.5) * 12
      const z = (Math.random() - 0.5) * 9
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      const isLime = Math.random() < 0.4
      const c = isLime ? LIME_C : Math.random() < 0.5 ? BLUE_NEON : BLUE_CORE
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b

      pts.push(new THREE.Vector3(x, y, z))
    }

    const segments = []
    const segColors = []
    const edgeSet = new Set()

    for (let i = 0; i < pts.length; i++) {
      const neighbors = []
      for (let j = 0; j < pts.length; j++) {
        if (i === j) continue
        const d = pts[i].distanceTo(pts[j])
        if (d < CONNECT_DIST) neighbors.push({ j, d })
      }
      neighbors.sort((a, b) => a.d - b.d)

      for (let k = 0; k < Math.min(MAX_NEIGHBORS, neighbors.length); k++) {
        const j = neighbors[k].j
        const key = i < j ? `${i}-${j}` : `${j}-${i}`
        if (edgeSet.has(key)) continue
        edgeSet.add(key)
        segments.push(
          pts[i].x,
          pts[i].y,
          pts[i].z,
          pts[j].x,
          pts[j].y,
          pts[j].z,
        )
        const c = Math.random() < 0.36 ? LIME_C : Math.random() < 0.55 ? BLUE_NEON : BLUE_CORE
        segColors.push(c.r, c.g, c.b, c.r, c.g, c.b)
      }
    }

    return {
      positions,
      colors,
      linePositions: new Float32Array(segments),
      lineColors: new Float32Array(segColors),
    }
  }, [])

  useFrame((state) => {
    if (!groupRef.current || activeRef.current === false) return

    const pulse = 0.88 + Math.sin(state.clock.elapsedTime * 1.25) * 0.1
    const [outer, mid, core] = glowMats.current
    if (outer) outer.opacity = 0.18 * pulse
    if (mid) mid.opacity = 0.34 * pulse
    if (core) core.opacity = 0.68 * pulse

    const { x, y } = state.pointer
    const dx = x - prevPointer.current.x
    const dy = y - prevPointer.current.y
    const pointerSpeed = Math.min(Math.hypot(dx, dy) * 12, 1.2)
    prevPointer.current = { x, y }

    const external = motionRef?.current?.speed ?? 0
    boost.current += (pointerSpeed + external - boost.current) * 0.11
    if (motionRef?.current) motionRef.current.speed *= 0.93

    const spin = 0.0012 + boost.current * 0.028
    groupRef.current.rotation.y += spin
    groupRef.current.rotation.x += dy * 0.06 - groupRef.current.rotation.x * 0.04
    groupRef.current.rotation.z += dx * 0.04 - groupRef.current.rotation.z * 0.04

    const px = THREE.MathUtils.clamp(x * 0.28, -0.28, 0.28)
    const py = THREE.MathUtils.clamp(y * 0.28, -0.28, 0.28)
    target.current.x += (px - target.current.x) * 0.12
    target.current.y += (py - target.current.y) * 0.12

    const scroll = scrollRef?.current?.p ?? 0
    const targetZ = 5 - scroll * 2
    baseZ.current += (targetZ - baseZ.current) * 0.06

    state.camera.position.x = target.current.x
    state.camera.position.y = target.current.y
    state.camera.position.z = baseZ.current
    state.camera.lookAt(0, 0, 0)
  })

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} count={COUNT} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} count={COUNT} />
        </bufferGeometry>
        <pointsMaterial
          size={0.074}
          sizeAttenuation
          transparent
          opacity={0.84}
          vertexColors
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </points>
      <GlowLines
        positions={linePositions}
        colors={lineColors}
        scale={1.08}
        opacity={0.18}
        matRef={(m) => {
          glowMats.current[0] = m
        }}
      />
      <GlowLines
        positions={linePositions}
        colors={lineColors}
        scale={1.05}
        opacity={0.34}
        matRef={(m) => {
          glowMats.current[1] = m
        }}
      />
      <GlowLines
        positions={linePositions}
        colors={lineColors}
        scale={1}
        opacity={0.68}
        matRef={(m) => {
          glowMats.current[2] = m
        }}
      />
    </group>
  )
}

export default function HeroCanvas({ motionRef, scrollRef }) {
  const wrapRef = useRef(null)
  const activeRef = useRef(true)
  const [frameloop, setFrameloop] = useState('always')

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap || prefersReducedMotion()) return

    const st = ScrollTrigger.create({
      trigger: '#home',
      start: 'top top',
      end: 'bottom top',
      onLeave: () => {
        activeRef.current = false
        setFrameloop('never')
        wrap.style.visibility = 'hidden'
        wrap.style.pointerEvents = 'none'
      },
      onEnterBack: () => {
        activeRef.current = true
        setFrameloop('always')
        wrap.style.visibility = 'visible'
        wrap.style.pointerEvents = 'none'
      },
    })

    return () => st.kill()
  }, [])

  return (
    <div ref={wrapRef} className="hero-canvas-wrap hero-canvas-wrap--fullscreen">
      <div className="hero-canvas-glow absolute inset-0" aria-hidden />
      <div className="hero-canvas-bloom absolute inset-0" aria-hidden />
      <div className="hero-canvas-grain absolute inset-0" aria-hidden />
      <div className="hero-scanlines" aria-hidden />
      <Canvas
        className="!h-full !w-full"
        camera={{ position: [0, 0, 5], fov: 52 }}
        dpr={[1, 1.35]}
        frameloop={frameloop}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: false,
        }}
      >
        <Suspense fallback={null}>
          <ParticleNetwork motionRef={motionRef} scrollRef={scrollRef} activeRef={activeRef} />
        </Suspense>
      </Canvas>
    </div>
  )
}
