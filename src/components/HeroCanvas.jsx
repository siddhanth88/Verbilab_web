import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import { prefersReducedMotion } from '../utils/motion'
import { ACCENT as NEON } from '../utils/brandColors'

gsap.registerPlugin(ScrollTrigger)

const COUNT = 600
const CONNECT_DIST = 1.45

function ParticleNetwork({ motionRef, scrollRef }) {
  const groupRef = useRef()
  const target = useRef({ x: 0, y: 0 })
  const prevPointer = useRef({ x: 0, y: 0 })
  const boost = useRef(0)
  const baseZ = useRef(5)

  const { positions, colors, linePositions } = useMemo(() => {
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

      const isBlue = Math.random() < 0.72
      if (isBlue) {
        colors[i * 3] = 0.36
        colors[i * 3 + 1] = 0.75
        colors[i * 3 + 2] = 0.87
      } else if (Math.random() < 0.5) {
        colors[i * 3] = 0.76
        colors[i * 3 + 1] = 0.88
        colors[i * 3 + 2] = 0.31
      } else {
        colors[i * 3] = 1
        colors[i * 3 + 1] = 1
        colors[i * 3 + 2] = 1
      }

      pts.push(new THREE.Vector3(x, y, z))
    }

    const segments = []
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < CONNECT_DIST) {
          segments.push(
            pts[i].x,
            pts[i].y,
            pts[i].z,
            pts[j].x,
            pts[j].y,
            pts[j].z,
          )
        }
      }
    }

    return {
      positions,
      colors,
      linePositions: new Float32Array(segments),
    }
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return

    const { x, y } = state.pointer
    const dx = x - prevPointer.current.x
    const dy = y - prevPointer.current.y
    const pointerSpeed = Math.min(Math.hypot(dx, dy) * 12, 1.2)
    prevPointer.current = { x, y }

    const external = motionRef?.current?.speed ?? 0
    boost.current += (pointerSpeed + external - boost.current) * 0.11
    if (motionRef?.current) motionRef.current.speed *= 0.93

    const spin = 0.0015 + boost.current * 0.032
    groupRef.current.rotation.y += spin
    groupRef.current.rotation.x += dy * 0.08 - groupRef.current.rotation.x * 0.04
    groupRef.current.rotation.z += dx * 0.05 - groupRef.current.rotation.z * 0.04

    const px = THREE.MathUtils.clamp(x * 0.3, -0.3, 0.3)
    const py = THREE.MathUtils.clamp(y * 0.3, -0.3, 0.3)
    target.current.x += (px - target.current.x) * 0.14
    target.current.y += (py - target.current.y) * 0.14

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
          size={0.078}
          sizeAttenuation
          transparent
          opacity={0.78}
          vertexColors
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      <lineSegments scale={[1.012, 1.012, 1.012]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            count={linePositions.length / 3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={NEON}
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            count={linePositions.length / 3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={NEON}
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  )
}

export default function HeroCanvas({ motionRef, scrollRef }) {
  const wrapRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap || prefersReducedMotion()) return

    const st = ScrollTrigger.create({
      trigger: '#home',
      start: 'top top',
      end: 'bottom top',
      onLeave: () => {
        wrap.style.visibility = 'hidden'
      },
      onEnterBack: () => {
        wrap.style.visibility = 'visible'
      },
    })

    return () => st.kill()
  }, [])

  return (
    <div ref={wrapRef} className="hero-canvas-wrap hero-canvas-wrap--fullscreen">
      <div className="hero-canvas-glow absolute inset-0" aria-hidden />
      <div className="hero-canvas-grain absolute inset-0" aria-hidden />
      <div className="hero-scanlines" aria-hidden />
      <Canvas
        className="!h-full !w-full"
        camera={{ position: [0, 0, 5], fov: 52 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <ParticleNetwork motionRef={motionRef} scrollRef={scrollRef} />
        </Suspense>
      </Canvas>
    </div>
  )
}
