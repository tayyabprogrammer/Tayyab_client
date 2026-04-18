// src/Components/3D/HeroBackground.jsx
import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

const CustomStars = () => {
  const ref = useRef()

  const positions = useMemo(() => {
    const pos = []
    for (let i = 0; i < 2000; i++) {
      pos.push(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 50
      )
    }
    return new Float32Array(pos)
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.3}
        color="#ffffff"
        transparent
        opacity={0.9}
        sizeAttenuation={true}
      />
    </points>
  )
}

// ─── Nebula Orbs — CSS-only floating blobs ───────────────────────────────────
const nebulaOrbs = [
  // { size, top, left, color, duration, delay, blur }
  { size: 500, top: '10%',  left: '5%',   color: 'rgba(0,200,255,0.07)',  duration: 18, delay: 0,   blur: 120 },
  { size: 400, top: '60%',  left: '75%',  color: 'rgba(180,0,255,0.07)', duration: 22, delay: 3,   blur: 100 },
  { size: 350, top: '30%',  left: '55%',  color: 'rgba(0,255,180,0.05)', duration: 15, delay: 6,   blur: 90  },
  { size: 300, top: '75%',  left: '20%',  color: 'rgba(255,60,200,0.06)',duration: 25, delay: 2,   blur: 110 },
  { size: 250, top: '5%',   left: '70%',  color: 'rgba(0,150,255,0.06)', duration: 20, delay: 8,   blur: 80  },
  { size: 200, top: '50%',  left: '40%',  color: 'rgba(100,255,255,0.04)',duration: 12, delay: 4,  blur: 70  },
]

const NebulaLayer = () => (
  <>
    <style>{`
      @keyframes nebulaFloat {
        0%   { transform: translate(0px, 0px) scale(1);   }
        25%  { transform: translate(30px, -20px) scale(1.05); }
        50%  { transform: translate(10px, 30px) scale(0.97); }
        75%  { transform: translate(-25px, 10px) scale(1.03); }
        100% { transform: translate(0px, 0px) scale(1);   }
      }
    `}</style>

    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,           /* stars = -1, nebula = 0, content = 1+ */
      pointerEvents: 'none',
      overflow: 'hidden',
    }}>
      {nebulaOrbs.map((orb, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: orb.top,
            left: orb.left,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            borderRadius: '50%',
            background: orb.color,
            filter: `blur(${orb.blur}px)`,
            animation: `nebulaFloat ${orb.duration}s ease-in-out infinite`,
            animationDelay: `${orb.delay}s`,
          }}
        />
      ))}
    </div>
  </>
)

// ─── Main Export ─────────────────────────────────────────────────────────────
const HeroBackground = () => {
  const [canRenderThree, setCanRenderThree] = useState(false)

  useEffect(() => {
    const canvas = document.createElement('canvas')
    const hasWebGL = !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )

    setCanRenderThree(hasWebGL)
  }, [])

  return (
    <>
      {/* Layer 1 — Three.js Stars (zIndex: -1) */}
      <div style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: -1,
        background: 'radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)'
      }}>
        {canRenderThree ? (
          <Canvas camera={{ position: [0, 0, 10] }}>
            <ambientLight intensity={1.5} />
            <CustomStars />
          </Canvas>
        ) : null}
      </div>

      {/* Layer 2 — Nebula Orbs (zIndex: 0) */}
      <NebulaLayer />
    </>
  )
}

export default HeroBackground