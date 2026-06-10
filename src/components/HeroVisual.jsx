import { useEffect, useRef, Suspense, useState } from 'react'

import { Canvas, useFrame } from '@react-three/fiber'

import * as THREE from 'three'

import gsap from 'gsap'

import { prefersReducedMotion } from '../utils/motion'



import { ACCENT as NEON } from '../utils/brandColors'



const CORE_GLOW = {

  wire: NEON,

  emissive: NEON,

  ring: NEON,

  inner: NEON,

}



function WireCore() {

  const mesh = useRef()

  const ring = useRef()

  const inner = useRef()



  useFrame((s) => {

    const t = s.clock.elapsedTime

    if (mesh.current) {

      mesh.current.rotation.x = t * 0.18

      mesh.current.rotation.y = t * 0.28

    }

    if (ring.current) {

      ring.current.rotation.z = t * 0.4

      ring.current.rotation.x = Math.sin(t * 0.5) * 0.2

    }

    if (inner.current) {

      inner.current.scale.setScalar(1 + Math.sin(t * 1.2) * 0.04)

    }

  })



  return (

    <group>

      <mesh ref={inner}>

        <sphereGeometry args={[0.32, 24, 24]} />

        <meshBasicMaterial

          color={CORE_GLOW.inner}

          transparent

          opacity={0.38}

          blending={THREE.AdditiveBlending}

          depthWrite={false}

        />

      </mesh>

      <mesh ref={ring}>

        <torusGeometry args={[0.95, 0.013, 16, 64]} />

        <meshBasicMaterial color={CORE_GLOW.ring} transparent opacity={0.65} />

      </mesh>

      <mesh ref={mesh}>

        <icosahedronGeometry args={[0.62, 1]} />

        <meshStandardMaterial

          color={CORE_GLOW.wire}

          wireframe

          transparent

          opacity={1}

          emissive={CORE_GLOW.emissive}

          emissiveIntensity={2.6}

          metalness={0.15}

          roughness={0.25}

        />

      </mesh>

    </group>

  )

}



const FLOAT_CARDS = [

  { label: 'AUDIT SCORE', value: '98.4%', top: '8%', left: '0%', delay: 0, live: false, countUp: 98.4 },

  { label: 'LIVE TRANSCRIPT', value: 'Streaming', top: '28%', right: '0%', delay: 0.15, live: true, stream: true },

  { label: 'RISK FLAG', value: 'Cleared', top: '52%', left: '6%', delay: 0.3, live: true },

  { label: 'NODE MAP', value: '8 clusters', bottom: '8%', right: '4%', delay: 0.45, live: false },

]



function HudCard({ card }) {

  const [display, setDisplay] = useState(card.countUp ? '0%' : card.value)



  useEffect(() => {

    if (!card.countUp || prefersReducedMotion()) {

      setDisplay(card.value)

      return

    }

    const obj = { v: 0 }

    gsap.to(obj, {

      v: card.countUp,

      duration: 2.2,

      ease: 'power2.out',

      delay: 0.6,

      onUpdate: () => setDisplay(`${obj.v.toFixed(1)}%`),

    })

  }, [card.countUp, card.value])



  return (

    <div

      className="glass-card hero-float-card hero-hud-card"

      style={{

        top: card.top,

        left: card.left,

        right: card.right,

        bottom: card.bottom,

        animationDelay: `${card.delay}s`,

      }}

    >

      <p className="mono-label subtle hero-hud-label">

        {card.live && <span className="blink-dot" aria-hidden>●</span>}

        {card.label}

      </p>

      <p className="hero-card-value">

        {display}

        {card.stream && <span className="hero-stream-cursor" aria-hidden />}

      </p>

    </div>

  )

}



export default function HeroVisual({ parallaxRef }) {

  const wrapRef = useRef(null)



  useEffect(() => {

    const el = wrapRef.current

    if (!el) return



    const onMove = (e) => {

      const rect = el.getBoundingClientRect()

      const x = (e.clientX - rect.left) / rect.width - 0.5

      const y = (e.clientY - rect.top) / rect.height - 0.5

      if (parallaxRef) parallaxRef.current = { x, y }

      el.style.setProperty('--px', `${x * 18}px`)

      el.style.setProperty('--py', `${y * 12}px`)

      el.style.setProperty('--rx', `${y * -3}deg`)

      el.style.setProperty('--ry', `${x * 4}deg`)

    }



    window.addEventListener('mousemove', onMove, { passive: true })

    return () => window.removeEventListener('mousemove', onMove)

  }, [parallaxRef])



  return (

    <div

      ref={wrapRef}

      className="hero-visual-open"

      style={{

        transform:

          'perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) translate(var(--px, 0), var(--py, 0))',

      }}

    >

      <div className="hero-scan-beam" aria-hidden />



      <div className="hero-core-open hero-core-glow" aria-hidden />

      <div className="hero-core-open hero-core-glow-hot" aria-hidden />

      <div className="hero-core-open">

        <Suspense fallback={null}>

          <Canvas camera={{ position: [0, 0, 3.2], fov: 42 }} dpr={[1, 1.5]} gl={{ alpha: true }}>

            <ambientLight intensity={0.35} color={NEON} />

            <pointLight position={[2, 2, 2]} intensity={3.2} color={NEON} />

            <pointLight position={[-1.5, -1, 1.5]} intensity={2} color={NEON} />

            <pointLight position={[0, 0, 1]} intensity={1.4} color={NEON} />

            <WireCore />

          </Canvas>

        </Suspense>

      </div>

      {FLOAT_CARDS.map((c) => (

        <HudCard key={c.label} card={c} />

      ))}

    </div>

  )

}


