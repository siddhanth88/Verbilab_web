import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const COUNT = 200
const CONNECT_DIST = 1.5

function ParticleNetwork() {
  const groupRef = useRef()
  const target = useRef({ x: 0, y: 0 })

  const { positions, linePositions } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3)
    const pts = []

    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * 8
      const y = (Math.random() - 0.5) * 5
      const z = (Math.random() - 0.5) * 4
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      pts.push(new THREE.Vector3(x, y, z))
    }

    const segments = []
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        if (pts[i].distanceTo(pts[j]) < CONNECT_DIST) {
          segments.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z)
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
    groupRef.current.rotation.y += 0.0012

    const { x, y } = state.pointer
    target.current.x += (x * 0.3 - target.current.x) * 0.05
    target.current.y += (y * 0.3 - target.current.y) * 0.05
    state.camera.position.x = target.current.x
    state.camera.position.y = target.current.y
    state.camera.lookAt(0, 0, 0)
  })

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={COUNT}
          />
        </bufferGeometry>
        <pointsMaterial color="#4DFFA4" size={0.04} transparent opacity={0.6} />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            count={linePositions.length / 3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#4DFFA4" transparent opacity={0.25} />
      </lineSegments>
    </group>
  )
}

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 z-0 opacity-60">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ParticleNetwork />
        </Suspense>
      </Canvas>
    </div>
  )
}
