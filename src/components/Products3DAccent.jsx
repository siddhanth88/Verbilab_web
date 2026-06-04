import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useRef } from 'react'

function FloatingTorus() {
  const mesh = useRef()

  useFrame((state) => {
    if (!mesh.current) return
    mesh.current.rotation.x = state.clock.elapsedTime * 0.3
    mesh.current.rotation.y = state.clock.elapsedTime * 0.5
    mesh.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15
  })

  return (
    <mesh ref={mesh}>
      <torusKnotGeometry args={[0.8, 0.25, 128, 16]} />
      <meshStandardMaterial color="#00FF85" wireframe opacity={0.15} transparent />
    </mesh>
  )
}

export default function Products3DAccent() {
  return (
    <div
      className="products-3d-accent pointer-events-none absolute right-[5%] top-0 z-0 h-[300px] w-[300px]"
      aria-hidden
    >
      <Canvas camera={{ position: [0, 0, 3] }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.3} />
        <pointLight position={[2, 2, 2]} color="#00FF85" intensity={1.5} />
        <Suspense fallback={null}>
          <FloatingTorus />
        </Suspense>
      </Canvas>
    </div>
  )
}
