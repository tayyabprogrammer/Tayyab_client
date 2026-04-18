// src/pages/ContactPage.jsx
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { sendContactMessage } from '../services/api'
import { FaGithub, FaLinkedin,  FaTiktok, FaYoutube } from 'react-icons/fa';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const { data } = await sendContactMessage(formData)
      console.log('Form submitted:', data)
      setSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setSubmitted(false), 3000)
    } catch (err) {
      console.error('Error:', err)
      setError(err.response?.data?.message || 'Something went wrong. Please try again.')
      setTimeout(() => setError(''), 3000)
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    { icon: '📧', label: 'Email', value: 'tayyabmughal7272@gmail.com', detail: 'Send me an email anytime', color: '#00ffff' },
    { icon: '📱', label: 'Phone', value: '+92 3408566694', detail: 'Mon-Sun, 9AM to 6PM', color: '#ff00ff' },
    { icon: '📍', label: 'Location', value: 'Islamabad, Pakistan', detail: 'Available for remote work', color: '#ffff00' }
  ]

const socialLinks = [
  { 
    name: 'GitHub', 
    icon: <FaGithub size={24} />, 
    url: 'https://github.com/tayyabprogrammer', 
    color: '#ffffff' 
  },
  { 
    name: 'LinkedIn', 
    icon: <FaLinkedin size={24} />, 
    url: 'https://www.linkedin.com/in/m-tayyab-tahir/', 
    color: '#0077b5' 
  },
  { 
    name: 'Tiktok', 
    icon: <FaTiktok size={24} />, 
    url: 'https://www.tiktok.com/@codesman0', 
    color: '#1da1f2' 
  },
  { 
    name: 'YouTube', 
    icon: <FaYoutube size={24} />, 
    url: 'https://www.youtube.com/@codesman0', 
    color: '#e4405f' 
  }
];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: '100px' }}>
      
      {/* Header with Glass Effect - Responsive */}
      <section style={{ padding: isMobile ? '0 20px 40px' : '0 50px 60px', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: isMobile ? '40px 20px' : '60px 40px',
            background: 'rgba(6, 10, 22, 0.6)',
            backdropFilter: 'blur(20px)',
            borderRadius: isMobile ? '30px' : '40px',
            border: '1px solid rgba(0, 255, 255, 0.15)'
          }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ fontSize: isMobile ? '2.8rem' : '3.5rem', marginBottom: '20px' }}
          >
            📬
          </motion.div>
          <h1 style={{ 
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Get In Touch
          </h1>
          <p style={{ color: '#aaa', fontSize: isMobile ? '0.95rem' : '1.1rem', marginBottom: 0 }}>
            Have a project in mind? Let's create something amazing together!
          </p>
        </motion.div>
      </section>

      {/* Main Content - Responsive Grid */}
      <section style={{ 
        padding: isMobile ? '0 20px 60px' : '0 50px 80px', 
        maxWidth: '1200px', 
        margin: '0 auto'
      }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gap: isMobile ? '40px' : '60px',
            alignItems: 'start'
          }}
        >
          
          {/* LEFT - Contact Info - Responsive */}
          <motion.div variants={itemVariants}>
            <div style={{
              background: 'rgba(6, 10, 22, 0.6)',
              backdropFilter: 'blur(20px)',
              borderRadius: isMobile ? '24px' : '32px',
              border: '1px solid rgba(0, 255, 255, 0.12)',
              padding: isMobile ? '30px 25px' : '45px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Top Glow */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #00ffff, #ff00ff, transparent)'
              }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '25px' }}>
                <span style={{ fontSize: isMobile ? '1.8rem' : '2rem' }}>👋</span>
                <h2 style={{ fontSize: isMobile ? '1.4rem' : '1.6rem', color: '#fff', margin: 0 }}>Let's Talk</h2>
              </div>

              <p style={{ color: '#aaa', lineHeight: 1.8, marginBottom: '40px', fontSize: isMobile ? '0.9rem' : '1rem' }}>
                I'm always interested in hearing about new projects and opportunities. 
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>

              {/* Contact Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '50px' }}>
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    variants={itemVariants}
                    whileHover={!isMobile ? { x: 8, scale: 1.01 } : {}}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: isMobile ? '15px' : '18px',
                      padding: isMobile ? '15px' : '20px',
                      background: 'rgba(255,255,255,0.03)',
                      border: `1px solid ${info.color}30`,
                      borderRadius: '20px',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{
                      width: isMobile ? '45px' : '55px',
                      height: isMobile ? '45px' : '55px',
                      background: `linear-gradient(135deg, ${info.color}30, ${info.color}10)`,
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: isMobile ? '1.3rem' : '1.6rem',
                      border: `1px solid ${info.color}40`
                    }}>
                      {info.icon}
                    </div>
                    <div>
                      <p style={{ color: info.color, fontSize: isMobile ? '0.7rem' : '0.75rem', marginBottom: '4px', letterSpacing: '1px' }}>
                        {info.label}
                      </p>
                      <p style={{ color: '#fff', fontWeight: 'bold', marginBottom: '4px', fontSize: isMobile ? '0.85rem' : '1rem' }}>
                        {info.value}
                      </p>
                      <p style={{ color: '#666', fontSize: isMobile ? '0.65rem' : '0.7rem' }}>
                        {info.detail}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links - Responsive */}
              <div>
                <h3 style={{ color: '#fff', marginBottom: '20px', fontSize: isMobile ? '0.9rem' : '1rem', letterSpacing: '1px' }}>
                  FOLLOW ME
                </h3>
                <div style={{ display: 'flex', gap: isMobile ? '12px' : '15px', flexWrap: 'wrap' }}>
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={!isMobile ? { y: -8, scale: 1.1 } : {}}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        width: isMobile ? '42px' : '48px',
                        height: isMobile ? '42px' : '48px',
                        background: 'rgba(255,255,255,0.03)',
                        border: `1px solid ${social.color}50`,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: isMobile ? '1.1rem' : '1.3rem',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT - Contact Form - Responsive */}
          <motion.div variants={itemVariants}>
            <div style={{
              background: 'rgba(6, 10, 22, 0.6)',
              backdropFilter: 'blur(20px)',
              borderRadius: isMobile ? '24px' : '32px',
              border: '1px solid rgba(0, 255, 255, 0.12)',
              padding: isMobile ? '30px 25px' : '45px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Top Glow */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #ff00ff, #00ffff, transparent)'
              }} />

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    background: 'rgba(255,0,0,0.1)',
                    border: '1px solid #ff0000',
                    color: '#ff0000',
                    padding: '12px',
                    borderRadius: '10px',
                    marginBottom: '20px',
                    textAlign: 'center'
                  }}
                >
                  {error}
                </motion.div>
              )}

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    style={{ textAlign: 'center', padding: isMobile ? '20px 0' : '40px 0' }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      style={{
                        width: isMobile ? '70px' : '90px',
                        height: isMobile ? '70px' : '90px',
                        background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: isMobile ? '2rem' : '2.8rem',
                        margin: '0 auto 25px'
                      }}
                    >
                      ✓
                    </motion.div>
                    <h3 style={{ color: '#00ffff', fontSize: isMobile ? '1.3rem' : '1.6rem', marginBottom: '12px' }}>
                      Message Sent!
                    </h3>
                    <p style={{ color: '#aaa', fontSize: isMobile ? '0.85rem' : '0.95rem' }}>
                      Thanks for reaching out. I'll get back to you soon!
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                  >
                    <h2 style={{ 
                      color: '#fff', 
                      marginBottom: '30px',
                      fontSize: isMobile ? '1.4rem' : '1.6rem',
                      textAlign: 'center'
                    }}>
                      Send a Message
                    </h2>

                    {/* Name Input */}
                    <div style={{ marginBottom: '22px' }}>
                      <label style={{ 
                        display: 'block', 
                        color: focused === 'name' ? '#00ffff' : '#888', 
                        marginBottom: '8px',
                        fontSize: isMobile ? '0.7rem' : '0.8rem',
                        letterSpacing: '1px',
                        transition: 'color 0.3s ease'
                      }}>
                        YOUR NAME
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused(null)}
                        style={{
                          width: '100%',
                          padding: isMobile ? '14px' : '16px',
                          background: 'rgba(0,0,0,0.3)',
                          border: `2px solid ${focused === 'name' ? '#00ffff' : 'rgba(0,255,255,0.15)'}`,
                          borderRadius: '14px',
                          color: '#fff',
                          fontSize: isMobile ? '0.9rem' : '1rem',
                          outline: 'none',
                          transition: 'all 0.3s ease'
                        }}
                        required
                      />
                    </div>

                    {/* Email Input */}
                    <div style={{ marginBottom: '22px' }}>
                      <label style={{ 
                        display: 'block', 
                        color: focused === 'email' ? '#00ffff' : '#888', 
                        marginBottom: '8px',
                        fontSize: isMobile ? '0.7rem' : '0.8rem',
                        letterSpacing: '1px',
                        transition: 'color 0.3s ease'
                      }}>
                        YOUR EMAIL
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused(null)}
                        style={{
                          width: '100%',
                          padding: isMobile ? '14px' : '16px',
                          background: 'rgba(0,0,0,0.3)',
                          border: `2px solid ${focused === 'email' ? '#00ffff' : 'rgba(0,255,255,0.15)'}`,
                          borderRadius: '14px',
                          color: '#fff',
                          fontSize: isMobile ? '0.9rem' : '1rem',
                          outline: 'none',
                          transition: 'all 0.3s ease'
                        }}
                        required
                      />
                    </div>

                    {/* Message Input */}
                    <div style={{ marginBottom: '30px' }}>
                      <label style={{ 
                        display: 'block', 
                        color: focused === 'message' ? '#00ffff' : '#888', 
                        marginBottom: '8px',
                        fontSize: isMobile ? '0.7rem' : '0.8rem',
                        letterSpacing: '1px',
                        transition: 'color 0.3s ease'
                      }}>
                        YOUR MESSAGE
                      </label>
                      <textarea
                        rows={isMobile ? 4 : 5}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        onFocus={() => setFocused('message')}
                        onBlur={() => setFocused(null)}
                        style={{
                          width: '100%',
                          padding: isMobile ? '14px' : '16px',
                          background: 'rgba(0,0,0,0.3)',
                          border: `2px solid ${focused === 'message' ? '#00ffff' : 'rgba(0,255,255,0.15)'}`,
                          borderRadius: '14px',
                          color: '#fff',
                          fontSize: isMobile ? '0.9rem' : '1rem',
                          outline: 'none',
                          resize: 'vertical',
                          minHeight: isMobile ? '100px' : '120px',
                          transition: 'all 0.3s ease'
                        }}
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={!isMobile && !loading ? { scale: 1.02, y: -2 } : {}}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        width: '100%',
                        padding: isMobile ? '14px' : '18px',
                        background: 'linear-gradient(135deg, #00ffff, #0080ff)',
                        border: 'none',
                        borderRadius: '14px',
                        color: '#0a0a0a',
                        fontSize: isMobile ? '1rem' : '1.1rem',
                        fontWeight: 'bold',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        transition: 'all 0.3s ease',
                        opacity: loading ? 0.7 : 1
                      }}
                    >
                      {loading ? 'Sending...' : 'Send Message'} <span>{!loading && '🚀'}</span>
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Availability Section - Responsive */}
      <section style={{ padding: isMobile ? '0 20px 60px' : '0 50px 100px', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            background: 'linear-gradient(135deg, rgba(0,255,255,0.03), rgba(255,0,255,0.03))',
            borderRadius: isMobile ? '24px' : '32px',
            padding: isMobile ? '35px 20px' : '50px 40px',
            maxWidth: '800px',
            margin: '0 auto',
            border: '1px solid rgba(0,255,255,0.1)'
          }}
        >
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: isMobile ? '25px' : '50px', 
            flexWrap: 'wrap',
            flexDirection: isMobile ? 'column' : 'row'
          }}>
            <div>
              <div style={{ fontSize: isMobile ? '1.8rem' : '2rem', marginBottom: '10px' }}>⏰</div>
              <h3 style={{ color: '#00ffff', marginBottom: '5px', fontSize: isMobile ? '1rem' : '1.2rem' }}>Quick Response</h3>
              <p style={{ color: '#888', fontSize: isMobile ? '0.75rem' : '0.85rem' }}>Within 24 hours</p>
            </div>
            <div>
              <div style={{ fontSize: isMobile ? '1.8rem' : '2rem', marginBottom: '10px' }}>🌍</div>
              <h3 style={{ color: '#ff00ff', marginBottom: '5px', fontSize: isMobile ? '1rem' : '1.2rem' }}>Worldwide</h3>
              <p style={{ color: '#888', fontSize: isMobile ? '0.75rem' : '0.85rem' }}>Available for remote work</p>
            </div>
            <div>
              <div style={{ fontSize: isMobile ? '1.8rem' : '2rem', marginBottom: '10px' }}>💡</div>
              <h3 style={{ color: '#ffff00', marginBottom: '5px', fontSize: isMobile ? '1rem' : '1.2rem' }}>Free Consultation</h3>
              <p style={{ color: '#888', fontSize: isMobile ? '0.75rem' : '0.85rem' }}>30 min initial call</p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default ContactPage
