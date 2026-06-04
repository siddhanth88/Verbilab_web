import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import * as THREE from 'three'

function FloatingShapes({ color = '#00FF85' }) {
  const group = useRef()

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.getElapsedTime()
    group.current.rotation.y = t * 0.22
    group.current.rotation.x = Math.sin(t * 0.6) * 0.15
    group.current.children[0].position.y = Math.sin(t * 0.9) * 0.22
    group.current.children[1].position.y = Math.cos(t * 0.8) * 0.18
    group.current.children[2].position.x = Math.sin(t * 0.5) * 0.25
  })

  return (
    <group ref={group}>
      <mesh position={[-0.95, 0.08, 0]}>
        <icosahedronGeometry args={[0.42, 1]} />
        <meshStandardMaterial
          color={color}
          roughness={0.18}
          metalness={0.65}
          emissive={new THREE.Color(color)}
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh position={[0.2, -0.1, -0.2]}>
        <torusKnotGeometry args={[0.32, 0.08, 128, 16]} />
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.7}
          emissive={new THREE.Color(color)}
          emissiveIntensity={0.38}
        />
      </mesh>
      <mesh position={[1.05, 0.2, 0.1]}>
        <octahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial
          color={color}
          roughness={0.25}
          metalness={0.6}
          emissive={new THREE.Color(color)}
          emissiveIntensity={0.42}
        />
      </mesh>
    </group>
  )
}

export default function SectionAccent3D({
  className = '',
  color = '#00FF85',
  bg = 'radial-gradient(ellipse 65% 55% at 60% 50%, rgba(0,255,133,0.15), transparent 72%)',
}) {
  return (
    <div className={`section-accent-3d ${className}`} aria-hidden>
      <div className="section-accent-glow" style={{ background: bg }} />
      <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.65} />
        <pointLight position={[2, 2, 2]} intensity={1.15} color={color} />
        <pointLight position={[-2, -1, 1]} intensity={0.65} color="#8fd8ff" />
        <Suspense fallback={null}>
          <FloatingShapes color={color} />
        </Suspense>
      </Canvas>
    </div>
  )
}
