import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Edges, OrthographicCamera } from '@react-three/drei'
import * as THREE from 'three'

import { ACCENT as NEON, ACCENT_RGB, ACCENT_SECONDARY as CYAN } from '../utils/brandColors'
const DIM = '#3a4a55'

const BUILDINGS = [
  { pos: [-2.4, 0.7, 0], size: [1.2, 1.4, 1.2], zones: ['audit'] },
  { pos: [-0.9, 1.1, 0.5], size: [1, 2.2, 1], zones: ['audit'] },
  { pos: [0.8, 0.65, -0.2], size: [1.6, 1.2, 1.4], zones: ['audit'] },
  { pos: [-1.6, 0.5, 1.3], size: [1.1, 1, 1.1], zones: ['audit', 'chat'] },
  { pos: [0.1, 0.95, 1.1], size: [1.3, 1.8, 1.1], zones: ['chat'] },
  { pos: [2, 0.7, 0.3], size: [1.1, 1.3, 1.4], zones: ['chat'] },
  { pos: [-0.2, 0.45, -1.2], size: [1.8, 0.9, 1.5], zones: ['flow'] },
  { pos: [1.3, 1.05, -0.9], size: [0.9, 2, 0.95], zones: ['flow'] },
  { pos: [2.6, 0.55, 0.7], size: [1.2, 1.1, 1.1], zones: ['flow'] },
  { pos: [1, 0.4, 1.6], size: [1.4, 0.75, 1.2], zones: ['flow', 'chat'] },
]

function Building({ position, size, active }) {
  const ref = useRef()

  useFrame((_, d) => {
    if (!ref.current) return
    const s = active ? 1.06 : 1
    ref.current.scale.lerp(new THREE.Vector3(s, s, s), d * 5)
  })

  return (
    <group ref={ref} position={position}>
      <mesh>
        <boxGeometry args={size} />
        <meshStandardMaterial
          color={active ? '#0a1f14' : '#0a0c10'}
          emissive={active ? NEON : DIM}
          emissiveIntensity={active ? 0.55 : 0.08}
          transparent
          opacity={active ? 0.85 : 0.5}
          metalness={0.6}
          roughness={0.35}
          wireframe={!active}
        />
      </mesh>
      <mesh>
        <boxGeometry args={size} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        <Edges color={active ? NEON : 'rgba(255,255,255,0.2)'} threshold={12} />
      </mesh>
      {active &&
        Array.from({ length: 4 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              (i % 2 ? 0.25 : -0.25) * size[0],
              size[1] * 0.2 + (i >> 1) * 0.35,
              (i % 3 ? 0.2 : -0.2) * size[2],
            ]}
          >
            <planeGeometry args={[0.12, 0.18]} />
            <meshBasicMaterial color={NEON} transparent opacity={0.9} side={THREE.DoubleSide} />
          </mesh>
        ))}
    </group>
  )
}

function AICore({ activeId }) {
  const g = useRef()
  const ring = useRef()

  useFrame((s) => {
    const t = s.clock.elapsedTime
    if (g.current) g.current.rotation.y = t * 0.35
    if (ring.current) {
      ring.current.rotation.x = t * 0.5
      ring.current.rotation.z = t * 0.25
    }
  })

  const hot = activeId === 'chat'

  return (
    <group position={[0, 1.4, 0]}>
      <mesh ref={g}>
        <octahedronGeometry args={[0.45, 0]} />
        <meshStandardMaterial
          color={hot ? CYAN : NEON}
          emissive={hot ? CYAN : NEON}
          emissiveIntensity={1.2}
          wireframe
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh ref={ring}>
        <torusGeometry args={[0.75, 0.02, 16, 48]} />
        <meshBasicMaterial color={NEON} transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.05, 0.01, 8, 64]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.25} />
      </mesh>
      <pointLight intensity={2} distance={6} color={hot ? CYAN : NEON} />
    </group>
  )
}

function CityBlock({ activeId }) {
  const group = useRef()

  useFrame((s) => {
    if (!group.current) return
    group.current.rotation.y = Math.sin(s.clock.elapsedTime * 0.15) * 0.12
  })

  return (
    <group ref={group} rotation={[0, Math.PI / 4.2, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[9, 7, 1, 1]} />
        <meshBasicMaterial color={NEON} transparent opacity={0.04} />
        <Edges color={`rgba(${ACCENT_RGB}, 0.35)`} />
      </mesh>
      <AICore activeId={activeId} />
      {BUILDINGS.map((b, i) => (
        <Building
          key={i}
          position={[b.pos[0], b.pos[1], b.pos[2]]}
          size={b.size}
          active={b.zones.includes(activeId)}
        />
      ))}
    </group>
  )
}

export default function FeatureIsoCity({ activeId = 'audit' }) {
  return (
    <div className="feature-iso-canvas">
      <Canvas gl={{ alpha: true, antialias: true }} dpr={[1, 2]}>
        <fog attach="fog" args={['#050508', 6, 22]} />
        <OrthographicCamera makeDefault position={[16, 16, 16]} zoom={46} near={0.1} far={200} />
        <ambientLight intensity={0.25} />
        <pointLight position={[8, 14, 6]} intensity={2} color={NEON} />
        <pointLight position={[-6, 4, 8]} intensity={0.8} color={CYAN} />
        <Suspense fallback={null}>
          <CityBlock activeId={activeId} />
        </Suspense>
      </Canvas>
    </div>
  )
}
