// src/Components/ui/Navbar.jsx
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Navbar = () => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/blogs', label: 'Blogs' },
    { path: '/contact', label: 'Contact' }
  ]

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: isMobile ? '16px 20px' : '22px 60px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(8, 12, 24, 0.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(0, 255, 255, 0.08)',
        zIndex: 1000,
        boxShadow: '0 2px 20px rgba(0,0,0,0.2)'
      }}>
        {/* Logo */}
        <Link to="/" style={{
          fontSize: isMobile ? '1.3rem' : '1.6rem',
          fontWeight: 600,
          background: 'linear-gradient(135deg, #ffffff, #00ffff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textDecoration: 'none',
          letterSpacing: '-0.5px'
        }}>
          MT.
        </Link>

        {/* Desktop Nav Links */}
        {!isMobile && (
          <div style={{ 
            display: 'flex', 
            gap: '40px',
            background: 'rgba(255,255,255,0.02)',
            padding: '6px 20px',
            borderRadius: '50px',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  color: location.pathname === item.path ? '#00ffff' : '#ddd',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  fontWeight: location.pathname === item.path ? 500 : 400,
                  transition: 'all 0.2s ease',
                  padding: '8px 0',
                  letterSpacing: '0.3px'
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}

        {/* Hire Me Button - Desktop */}
        {!isMobile && (
          <Link to="/contact" style={{
            padding: '10px 28px',
            background: 'linear-gradient(135deg, #00ffff, #0099ff)',
            borderRadius: '40px',
            color: '#0a0a0a',
            textDecoration: 'none',
            fontWeight: 500,
            fontSize: '0.85rem',
            letterSpacing: '0.5px',
            transition: 'opacity 0.2s',
            boxShadow: '0 2px 8px rgba(0,255,255,0.2)'
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Hire Me
          </Link>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: 'rgba(0,255,255,0.1)',
              border: '1px solid rgba(0,255,255,0.3)',
              borderRadius: '10px',
              padding: '10px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px'
            }}
          >
            <span style={{
              width: '25px',
              height: '2px',
              background: '#00ffff',
              transition: 'all 0.3s',
              transform: isMobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'rotate(0)'
            }} />
            <span style={{
              width: '25px',
              height: '2px',
              background: '#00ffff',
              transition: 'all 0.3s',
              opacity: isMobileMenuOpen ? 0 : 1
            }} />
            <span style={{
              width: '25px',
              height: '2px',
              background: '#00ffff',
              transition: 'all 0.3s',
              transform: isMobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'rotate(0)'
            }} />
          </button>
        )}
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobile && isMobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '70px',
          left: 0,
          right: 0,
          background: 'rgba(8, 12, 24, 0.98)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0, 255, 255, 0.15)',
          zIndex: 999,
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px'
        }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                color: location.pathname === item.path ? '#00ffff' : '#ddd',
                textDecoration: 'none',
                fontSize: '1.1rem',
                fontWeight: location.pathname === item.path ? 500 : 400,
                padding: '12px 20px',
                borderRadius: '12px',
                background: location.pathname === item.path ? 'rgba(0,255,255,0.1)' : 'transparent',
                textAlign: 'center',
                transition: 'all 0.2s'
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/contact" style={{
            padding: '12px 20px',
            background: 'linear-gradient(135deg, #00ffff, #0099ff)',
            borderRadius: '12px',
            color: '#0a0a0a',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '1rem',
            textAlign: 'center',
            marginTop: '10px'
          }}>
            Hire Me 🚀
          </Link>
        </div>
      )}
    </>
  )
}

export default Navbar