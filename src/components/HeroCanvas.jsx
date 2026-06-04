import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 260
const CONNECT_DIST = 1.55
const NEON = '#00FF85'

function ParticleNetwork({ motionRef }) {
  const groupRef = useRef()
  const target = useRef({ x: 0, y: 0 })
  const prevPointer = useRef({ x: 0, y: 0 })
  const boost = useRef(0)

  const { positions, linePositions } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const pts = []

    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * 11
      const y = (Math.random() - 0.5) * 7
      const z = (Math.random() - 0.5) * 5
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
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

    const spin = 0.0018 + boost.current * 0.038
    groupRef.current.rotation.y += spin
    groupRef.current.rotation.x += dy * 0.1 - groupRef.current.rotation.x * 0.045
    groupRef.current.rotation.z += dx * 0.06 - groupRef.current.rotation.z * 0.045

    const parallax = 1
    target.current.x += (x * parallax - target.current.x) * 0.16
    target.current.y += (y * parallax - target.current.y) * 0.16
    state.camera.position.x = target.current.x
    state.camera.position.y = target.current.y
    state.camera.lookAt(0, 0, 0)
  })

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} count={COUNT} />
        </bufferGeometry>
        <pointsMaterial
          color={NEON}
          size={0.07}
          sizeAttenuation
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
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
          opacity={0.45}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  )
}

export default function HeroCanvas({ motionRef }) {
  return (
    <div className="hero-canvas-wrap absolute inset-0 z-0">
      <div className="hero-canvas-glow absolute inset-0" aria-hidden />
      <div className="hero-canvas-grain absolute inset-0" aria-hidden />
      <Canvas
        className="!h-full !w-full"
        camera={{ position: [0, 0, 6], fov: 52 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <ParticleNetwork motionRef={motionRef} />
        </Suspense>
      </Canvas>
    </div>
  )
}
