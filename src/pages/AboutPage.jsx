// src/pages/AboutPage.jsx
import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import img from '../assets/img2.png'
import About from '../Components/Sections/About'
import { getCertificates } from '../services/api'

const AboutPage = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)
  const [certificates, setCertificates] = useState([])
  const [loadingCerts, setLoadingCerts] = useState(true)
  const frameRef = useRef(null)

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  // Fetch certificates from backend
  useEffect(() => {
    fetchCertificates()
  }, [])

  const fetchCertificates = async () => {
    try {
      const { data } = await getCertificates()
      setCertificates(data)
    } catch (error) {
      console.error('Error fetching certificates:', error)
    } finally {
      setLoadingCerts(false)
    }
  }

  const handleMouseMove = (e) => {
    if (!frameRef.current || isMobile) return
    const rect = frameRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setTilt({ x: -y / 20, y: x / 20 })
  }

  const education = [
    {
      degree: 'BS Computer Science',
      uni: 'PMAS ARID AGRICULTURAL UNIVERSITY, RAWALPINDI',
      year: '2022 – 2026',
      icon: '🎓',
      detail: 'IN LAST SEMESTER ABOUT TO GRADUATE SOON',
    }
  ]

  // Reusable glow-line component
  const GlowLine = ({ position = 'top', colorA = 'rgba(0,255,255,0.3)', colorB = 'rgba(180,0,255,0.3)' }) => (
    <div style={{
      position: 'absolute',
      [position]: 0, left: 0, right: 0,
      height: '1px',
      background: `linear-gradient(90deg, transparent 0%, ${colorA} 30%, ${colorB} 70%, transparent 100%)`,
      pointerEvents: 'none',
    }} />
  )

  // Glass section wrapper style
  const glassSectionStyle = {
    position: 'relative',
    zIndex: 1,
    background: 'rgba(6, 10, 22, 0.72)',
    backdropFilter: 'blur(22px)',
    WebkitBackdropFilter: 'blur(22px)',
    borderTop: '1px solid rgba(0, 255, 255, 0.08)',
    borderBottom: '1px solid rgba(0, 255, 255, 0.08)',
    boxShadow: 'inset 0 0 120px rgba(0, 200, 255, 0.03)',
  }

  // Section heading block
  const SectionHeading = ({ tag, title, sub }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{ textAlign: 'center', marginBottom: isMobile ? '40px' : '60px' }}
    >
      <p style={{
        color: '#00ffff',
        letterSpacing: '0.35em',
        fontSize: isMobile ? '0.7rem' : '0.78rem',
        textTransform: 'uppercase',
        fontWeight: 600,
        marginBottom: '14px',
      }}>
        ✦ &nbsp; {tag} &nbsp; ✦
      </p>
      <h2 style={{
        fontSize: 'clamp(1.8rem, 5vw, 3rem)',
        fontWeight: 900,
        background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '14px',
        lineHeight: 1.1,
      }}>
        {title}
      </h2>
      {sub && (
        <p style={{ color: '#666', fontSize: isMobile ? '0.85rem' : '1rem', maxWidth: '420px', margin: '0 auto', lineHeight: 1.7 }}>
          {sub}
        </p>
      )}
      <div style={{
        width: '60px', height: '2px',
        background: 'linear-gradient(90deg, transparent, #00ffff, transparent)',
        margin: '20px auto 0',
        borderRadius: '2px',
      }} />
    </motion.div>
  )

  return (
    <div style={{ minHeight: '100vh', paddingTop: isMobile ? '60px' : '80px' }}>

      {/* SECTION 1 — Hero Intro (About component) */}
      <About />
      
      {/* SECTION 2 — Education */}
      <section style={{
        padding: isMobile ? '60px 20px' : '100px 50px',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <SectionHeading
            tag="Where I Studied"
            title="Education"
            sub="The foundation of my technical journey."
          />

          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                padding: isMobile ? '30px 25px' : '44px 48px',
                background: 'rgba(8, 12, 28, 0.60)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(0,255,255,0.15)',
                borderRadius: isMobile ? '20px' : '24px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.4), inset 0 0 40px rgba(0,200,255,0.03)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? '25px' : '36px',
                alignItems: isMobile ? 'center' : 'flex-start',
                textAlign: isMobile ? 'center' : 'left',
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(0,255,255,0.4), rgba(180,0,255,0.3), transparent)',
              }} />

              <div style={{
                width: isMobile ? '70px' : '80px',
                height: isMobile ? '70px' : '80px',
                borderRadius: '20px',
                background: 'rgba(0,255,255,0.06)',
                border: '1.5px solid rgba(0,255,255,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: isMobile ? '2rem' : '2.4rem',
                flexShrink: 0,
              }}>
                {edu.icon}
              </div>

              <div>
                <h3 style={{ color: '#fff', fontSize: isMobile ? '1.3rem' : '1.5rem', fontWeight: 700, marginBottom: '8px' }}>
                  {edu.degree}
                </h3>
                <p style={{ color: '#00ffff', fontWeight: 600, marginBottom: '8px', fontSize: isMobile ? '0.9rem' : '1rem' }}>
                  {edu.uni}
                </p>
                <span style={{
                  display: 'inline-block',
                  padding: '4px 14px',
                  background: 'rgba(0,255,255,0.08)',
                  border: '1px solid rgba(0,255,255,0.2)',
                  borderRadius: '20px',
                  color: '#888',
                  fontSize: isMobile ? '0.75rem' : '0.82rem',
                  marginBottom: '16px',
                }}>
                  {edu.year}
                </span>
                <p style={{ color: '#aaa', lineHeight: 1.75, fontSize: isMobile ? '0.85rem' : '0.95rem' }}>
                  {edu.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 3 — Certifications (from backend) */}
     {/* SECTION 3 — Certifications (Glass bg) - Fully Responsive */}
{/* SECTION 3 — Certifications (Glass bg) - Professional Design */}
<section style={{ ...glassSectionStyle, padding: isMobile ? '60px 20px' : '100px 50px' }}>
  <GlowLine position="top" />
  <GlowLine position="bottom" colorA="rgba(0,255,255,0.2)" colorB="rgba(180,0,255,0.2)" />

  <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
    <SectionHeading
      tag="What I've Earned"
      title="Certifications"
      sub="Industry-recognized credentials that validate my expertise."
    />

    {loadingCerts ? (
      <div style={{ textAlign: 'center', padding: '40px', color: '#00ffff' }}>
        Loading certifications...
      </div>
    ) : certificates.length === 0 ? (
      <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
        No certifications added yet.
      </div>
    ) : (
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        gap: '25px',
      }}>
        {certificates.map((cert, i) => (
          <motion.div
            key={cert._id || i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={!isMobile ? { y: -8, transition: { duration: 0.2 } } : {}}
            style={{
              background: 'rgba(8, 12, 28, 0.75)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: `1px solid ${cert.color || '#00ffff'}30`,
              borderRadius: '20px',
              overflow: 'hidden',
              cursor: 'default',
              transition: 'all 0.3s ease',
            }}
          >
            {/* Certificate Image */}
            <div style={{
              width: '100%',
              height: '180px',
              overflow: 'hidden',
              background: `linear-gradient(135deg, ${cert.color || '#00ffff'}20, #000)`,
              position: 'relative',
            }}>
              {cert.image && (cert.image.startsWith('http') || cert.image.startsWith('/uploads')) ? (
                <img 
                  src={cert.image} 
                  alt={cert.name} 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease',
                  }}
                  onMouseEnter={(e) => !isMobile && (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              ) : (
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4rem',
                  background: `linear-gradient(135deg, ${cert.color || '#00ffff'}30, transparent)`,
                }}>
                  {cert.icon || '📜'}
                </div>
              )}
              
              {/* Overlay gradient */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '60px',
                background: 'linear-gradient(to top, rgba(8,12,28,0.9), transparent)',
              }} />
            </div>

            {/* Certificate Info */}
            <div style={{ padding: '20px' }}>
              <h3 style={{ 
                color: '#fff', 
                fontSize: isMobile ? '1rem' : '1.1rem', 
                fontWeight: 700, 
                marginBottom: '6px',
                lineHeight: 1.3,
              }}>
                {cert.name}
              </h3>
              
              <p style={{ 
                color: cert.color || '#00ffff', 
                fontSize: '0.75rem', 
                fontWeight: 500, 
                marginBottom: '12px',
              }}>
                {cert.org}
              </p>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '10px',
                marginTop: '8px',
              }}>
                <span style={{
                  display: 'inline-block',
                  padding: '3px 10px',
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: '20px',
                  color: '#aaa',
                  fontSize: '0.7rem',
                }}>
                  {cert.year}
                </span>
                
                {cert.link && (
                  <a 
                    href={cert.link} 
                    target="_blank" 
                    rel="noreferrer"
                    style={{ 
                      color: cert.color || '#00ffff', 
                      fontSize: '0.7rem',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    Verify Certificate →
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    )}
  </div>
</section>
    </div>
  )
}

export default AboutPage