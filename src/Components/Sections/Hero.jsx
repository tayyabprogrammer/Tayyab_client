// src/Components/sections/Hero.jsx
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

// ─── Typewriter Hook ──────────────────────────────────────────────────────────
const useTypewriter = (words, speed = 80, pause = 1800) => {
  const [display, setDisplay] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIdx]
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIdx + 1))
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause)
        } else {
          setCharIdx(c => c + 1)
        }
      } else {
        setDisplay(current.slice(0, charIdx - 1))
        if (charIdx - 1 === 0) {
          setDeleting(false)
          setWordIdx(w => (w + 1) % words.length)
          setCharIdx(0)
        } else {
          setCharIdx(c => c - 1)
        }
      }
    }, deleting ? speed / 2 : speed)
    return () => clearTimeout(timeout)
  }, [charIdx, deleting, wordIdx, words, speed, pause])

  return display
}

// ─── Main Hero ────────────────────────────────────────────────────────────────
const Hero = () => {
  const role = useTypewriter([
    'Full Stack Developer',
    'RAG(Retreival Augmented Generation)',
    'LLM Models',
    'Agentic AI',
  ])

  return (
    <section style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      zIndex: 1,
      paddingTop: '60px', // Added padding top to avoid navbar overlap
    }}>
      <div style={{ textAlign: 'center' }}>

        {/* Greeting tag - moved down slightly */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{
            color: '#00ffff',
            letterSpacing: '0.3em',
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            marginBottom: '25px',
            fontWeight: 600,
          }}
        >
          ✦ &nbsp; Welcome to my portfolio &nbsp; ✦
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
          }}
        >
          M Tayyab Tahir
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          style={{
            height: '2.4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            marginBottom: '1.8rem',
          }}
        >
          <span style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            color: '#00ffff',
            letterSpacing: '0.15em',
          }}>
            {role}
          </span>
          <span style={{
            display: 'inline-block',
            width: '2px',
            height: '1.6rem',
            background: '#00ffff',
            borderRadius: '1px',
            animation: 'blink 1s step-end infinite',
          }} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{
            color: '#888',
            fontSize: '1rem',
            lineHeight: 1.7,
            maxWidth: '420px',
            margin: '0 auto 2.5rem',
          }}
        >
          Building modern web experiences with clean code,
          sharp design, and a passion for 3D interfaces.
        </motion.p>

        {/* Buttons only - Stats removed */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.6 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}
        >
          <Link to="/projects" style={{ textDecoration: 'none' }}>
          <button
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-3px)'
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,229,255,0.4)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
            style={{
              padding: '15px 30px',
              background: 'linear-gradient(135deg, #00ffff, #0080ff)',
              border: 'none',
              borderRadius: '50px',
              color: '#0a0a0a',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
            }}
          >
            View Work ↗
          </button>
</Link>
<Link to="/contact" style={{ textDecoration: 'none' }}>
          <button
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(0,255,255,0.08)'
              e.currentTarget.style.transform = 'translateY(-3px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
            style={{
              padding: '15px 30px',
              background: 'transparent',
              border: '2px solid #00ffff',
              borderRadius: '50px',
              color: '#00ffff',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background 0.25s ease, transform 0.25s ease',
            }}
          >
            Contact Me
          </button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#00ffff',
          animation: 'bounce 2s infinite',
          fontSize: '0.85rem',
          letterSpacing: '0.1em',
        }}
      >
        ↓ Scroll
      </motion.div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(8px); }
        }
      `}</style>
    </section>
  )
}

export default Hero