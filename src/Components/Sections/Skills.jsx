// src/Components/sections/Skills.jsx
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// Skills data for carousel
const skillsData = [
  { name: 'React JS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: '#61DAFB' },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', color: '#06B6D4' },
  { name: 'Node JS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', color: '#339933' },
  { name: 'Express JS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', color: '#ffffff' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', color: '#47A248' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: '#3776AB' },
  { name: 'Agentic AI', icon: '🤖', color: '#00ffff', isEmoji: true },
  { name: 'RAG', icon: '📚', color: '#ff00ff', isEmoji: true },
  { name: 'NLP', icon: '💬', color: '#ffff00', isEmoji: true },
  { name: 'Prompt Engineering', icon: '✍️', color: '#ff6600', isEmoji: true },
]

// ─── Carousel Item Component ─────────────────────────────────────────────────
const CarouselItem = ({ skill }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.1,
        y: -8,
        transition: { duration: 0.2 }
      }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '120px',
        padding: '20px 16px',
        margin: '0 12px',
        background: 'rgba(10, 12, 24, 0.7)',
        backdropFilter: 'blur(12px)',
        border: `1px solid ${skill.color}40`,
        borderRadius: '20px',
        boxShadow: `0 8px 20px rgba(0,0,0,0.2)`,
        transition: 'all 0.3s ease',
      }}
    >
      {/* Icon */}
      <div style={{
        width: '60px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '12px',
      }}>
        {skill.isEmoji ? (
          <span style={{ fontSize: '3rem' }}>{skill.icon}</span>
        ) : (
          <img 
            src={skill.icon} 
            alt={skill.name}
            style={{ 
              width: '50px', 
              height: '50px', 
              objectFit: 'contain',
              filter: skill.name === 'Express JS' ? 'invert(1)' : 'none'
            }}
          />
        )}
      </div>
      
      {/* Name */}
      <span style={{ 
        color: skill.color, 
        fontSize: '0.85rem', 
        fontWeight: 600,
        textAlign: 'center',
        letterSpacing: '0.02em'
      }}>
        {skill.name}
      </span>
    </motion.div>
  )
}

// ─── Main Section ────────────────────────────────────────────────────────────
const Skills = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const carouselRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  // Auto-scroll carousel
  useEffect(() => {
    if (isHovered) return
    
    const interval = setInterval(() => {
      setScrollPosition(prev => {
        if (carouselRef.current) {
          const maxScroll = carouselRef.current.scrollWidth - carouselRef.current.clientWidth
          if (prev >= maxScroll) {
            return 0
          }
          return prev + 1
        }
        return prev
      })
    }, 30)

    return () => clearInterval(interval)
  }, [isHovered])

  useEffect(() => {
    if (carouselRef.current && !isHovered) {
      carouselRef.current.scrollLeft = scrollPosition
    }
  }, [scrollPosition, isHovered])

  // Double the array for seamless infinite scroll
  const doubledSkills = [...skillsData, ...skillsData]

  return (
    <section id="skills" style={{
      minHeight: 'auto',
      padding: '80px 50px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      zIndex: 1,
      background: 'rgba(6, 10, 22, 0.72)',
      backdropFilter: 'blur(22px)',
      WebkitBackdropFilter: 'blur(22px)',
      borderTop: '1px solid rgba(0, 255, 255, 0.08)',
      borderBottom: '1px solid rgba(0, 255, 255, 0.08)',
    }}>

      {/* Top glow line */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(0,255,255,0.3) 30%, rgba(180,0,255,0.3) 70%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* Bottom glow line */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(0,255,255,0.2) 40%, rgba(180,0,255,0.2) 60%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: '50px' }}
      >
        <p style={{
          color: '#00ffff',
          letterSpacing: '0.35em',
          fontSize: '0.78rem',
          textTransform: 'uppercase',
          fontWeight: 600,
          marginBottom: '14px',
        }}>
          ✦ &nbsp; Technologies & Tools &nbsp; ✦
        </p>

        <h2 style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 900,
          background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '16px',
          lineHeight: 1.2,
        }}>
          My Tech Stack
        </h2>

        <p style={{
          color: '#888',
          fontSize: '0.95rem',
          maxWidth: '500px',
          margin: '0 auto',
          lineHeight: 1.7,
        }}>
          Modern technologies I work with to build amazing digital experiences
        </p>

        <div style={{
          width: '60px', height: '2px',
          background: 'linear-gradient(90deg, transparent, #00ffff, transparent)',
          margin: '24px auto 0',
          borderRadius: '2px',
        }} />
      </motion.div>

      {/* ── Infinite Carousel ── */}
      <div style={{
        width: '100%',
        maxWidth: '1200px',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Left gradient overlay */}
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '80px',
          background: 'linear-gradient(90deg, rgba(6,10,22,1), transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }} />
        
        {/* Right gradient overlay */}
        <div style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '80px',
          background: 'linear-gradient(270deg, rgba(6,10,22,1), transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }} />

        <div
          ref={carouselRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            display: 'flex',
            overflowX: 'auto',
            overflowY: 'hidden',
            scrollBehavior: 'smooth',
            padding: '20px 0',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            cursor: 'grab',
          }}
        >
          {doubledSkills.map((skill, idx) => (
            <CarouselItem key={idx} skill={skill} />
          ))}
        </div>
      </div>

      <style>{`
        #skills div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}

export default Skills