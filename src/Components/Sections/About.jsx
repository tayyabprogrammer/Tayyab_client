// src/Components/sections/About.jsx
import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
import img from '../../assets/img2.png'

const About = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const frameRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  // Check screen size
  useState(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  const handleMouseMove = (e) => {
    if (!frameRef.current || isMobile) return
    const rect = frameRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setTilt({ x: -y / 20, y: x / 20 })
  }

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 })

  return (
    <section id="about" style={{
      minHeight: '100vh',
      padding: isMobile ? '80px 20px' : '100px 50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      zIndex: 1,

      /* ── Full-width glass background ── */
      background: 'rgba(6, 10, 22, 0.72)',
      backdropFilter: 'blur(22px)',
      WebkitBackdropFilter: 'blur(22px)',
      borderTop: '1px solid rgba(0, 255, 255, 0.08)',
      borderBottom: '1px solid rgba(0, 255, 255, 0.08)',
      boxShadow: 'inset 0 0 120px rgba(0, 200, 255, 0.03)',
    }}>

      {/* Subtle top edge glow line */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(0,255,255,0.3) 30%, rgba(180,0,255,0.3) 70%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* Subtle bottom edge glow line */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(0,255,255,0.2) 40%, rgba(180,0,255,0.2) 60%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* Content grid - Responsive */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        gap: isMobile ? '50px' : '80px',
        maxWidth: '1200px',
        width: '100%',
        alignItems: 'center',
        position: 'relative',
        zIndex: 2,
      }}>

        {/* LEFT — 3D Image Frame (Responsive) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ 
            perspective: '1000px',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <div
            ref={frameRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              position: 'relative',
              width: isMobile ? '280px' : '400px',
              height: isMobile ? '350px' : '500px',
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: 'transform 0.1s ease',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Animated Glow Behind */}
            <div style={{
              position: 'absolute',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: isMobile ? '240px' : '350px',
              height: isMobile ? '300px' : '450px',
              background: 'linear-gradient(45deg, #00ffff, #ff00ff, #ffff00)',
              borderRadius: '30px',
              filter: 'blur(40px)',
              opacity: 0.6,
              animation: 'pulse 3s ease-in-out infinite',
            }} />

            {/* Glass Frame */}
            <div style={{
              position: 'relative',
              width: '100%', height: '100%',
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(0,255,255,0.3)',
              borderRadius: '20px',
              padding: '20px',
              boxShadow: `0 25px 50px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,255,255,0.1)`,
            }}>
              <img
                src={img}
                alt="M Tayyab Tahir"
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  borderRadius: '15px',
                  filter: 'contrast(1.1) saturate(1.1)',
                }}
              />
              {/* Corner Accents */}
              {[
                { top: -2, left: -2 }, { top: -2, right: -2 },
                { bottom: -2, left: -2 }, { bottom: -2, right: -2 },
              ].map((pos, i) => (
                <div key={i} style={{
                  position: 'absolute',
                  width: isMobile ? '12px' : '20px',
                  height: isMobile ? '12px' : '20px',
                  border: '2px solid #00ffff',
                  ...pos,
                }} />
              ))}
            </div>

            {/* Floating Particles - Hide on mobile */}
            {!isMobile && [...Array(6)].map((_, i) => (
              <div key={i} style={{
                position: 'absolute',
                width: '8px', height: '8px',
                background: '#00ffff',
                borderRadius: '50%',
                boxShadow: '0 0 10px #00ffff',
                top: `${20 + i * 15}%`,
                left: i % 2 === 0 ? '-30px' : 'calc(100% + 30px)',
                animation: `float ${2 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }} />
            ))}
          </div>
        </motion.div>

        {/* RIGHT — About Text (Responsive) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ textAlign: isMobile ? 'center' : 'left' }}
        >
          <h2 style={{
            fontSize: '0.85rem',
            color: '#00ffff',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            marginBottom: '12px',
            fontWeight: 600,
          }}>
            ✦ &nbsp; About Me
          </h2>

          <h3 style={{
            fontSize: 'clamp(1.8rem, 5vw, 3rem)',
            fontWeight: 700,
            marginBottom: '24px',
            lineHeight: 1.2,
            color: '#fff',
          }}>
            Crafting Digital{' '}
            <span style={{ color: '#00ffff' }}>Experiences</span>
          </h3>

          <p style={{
            color: '#bbb',
            fontSize: isMobile ? '0.95rem' : '1.05rem',
            lineHeight: 1.7,
            marginBottom: '18px',
          }}>
            I'm a passionate Full Stack Developer with expertise in building modern web applications. With 3+ years of experience, I specialize in React, Node.js, MongoDB, and creating immersive 3D web experiences. My expertise also includes Agentic AI, RAG (Retrieval Augmented Generation), LLM Models, NLP, and Prompt Engineering.

          </p>

          <p style={{
            color: '#bbb',
            fontSize: isMobile ? '0.95rem' : '1.05rem',
            lineHeight: 1.7,
            marginBottom: '36px',
          }}>
           My goal is to bridge the gap between AI, design, and technology, creating intelligent products that not only look stunning but perform exceptionally and think intelligently.
          </p>

          {/* Stats - Responsive Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(3, 1fr)',
            gap: isMobile ? '12px' : '16px',
          }}>
            {[
              { num: '3+', label: 'Years Exp' },
              { num: '50+', label: 'Projects' },
              { num: '20+', label: 'Clients' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
                style={{
                  textAlign: 'center',
                  padding: isMobile ? '15px 8px' : '20px 10px',
                  background: 'rgba(0, 255, 255, 0.04)',
                  borderRadius: '14px',
                  border: '1px solid rgba(0, 255, 255, 0.15)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <div style={{ 
                  fontSize: isMobile ? '1.5rem' : '2rem', 
                  fontWeight: 700, 
                  color: '#00ffff' 
                }}>
                  {stat.num}
                </div>
                <div style={{ 
                  color: '#777', 
                  fontSize: isMobile ? '0.7rem' : '0.85rem', 
                  marginTop: '4px', 
                  letterSpacing: '0.05em' 
                }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1);   opacity: 0.6; }
          50%       { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0);    }
          50%       { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  )
}

export default About