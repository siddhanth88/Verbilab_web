import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useRef } from 'react'

function FloatingIco() {
  const mesh = useRef()

  useFrame((s) => {
    if (!mesh.current) return
    mesh.current.rotation.x = s.clock.elapsedTime * 0.2
    mesh.current.rotation.z = s.clock.elapsedTime * 0.15
  })

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color="#00FF85" wireframe opacity={0.2} transparent />
    </mesh>
  )
}

export default function Industries3DAccent() {
  return (
    <div
      className="pointer-events-none absolute right-[5%] top-8 z-0 h-[220px] w-[220px] opacity-90"
      aria-hidden
    >
      <Canvas camera={{ position: [0, 0, 3] }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.35} />
        <pointLight position={[2, 2, 2]} color="#00FF85" intensity={1.2} />
        <Suspense fallback={null}>
          <FloatingIco />
        </Suspense>
      </Canvas>
    </div>
  )
}
