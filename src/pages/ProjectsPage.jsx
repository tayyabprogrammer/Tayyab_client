// src/pages/ProjectsPage.jsx
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { getProjects } from '../services/api'

const ProjectsPage = () => {
  const [filter, setFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const { data } = await getProjects()
      setProjects(data)
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const filters = [
    { id: 'all', label: 'All Projects', icon: '✨' },
    { id: 'ecommerce', label: 'E-Commerce', icon: '🛒' },
    { id: 'ai', label: 'AI / ML', icon: '🧠' }
  ]

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter)

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '100px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🚀</div>
          <p style={{ color: '#00ffff' }}>Loading projects...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: '100px' }}>
      
      {/* Hero Section */}
      <section style={{ padding: isMobile ? '0 20px 40px' : '0 50px 60px', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            maxWidth: '900px',
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
            transition={{ duration: 2, repeat: Infinity }}
            style={{ fontSize: isMobile ? '3rem' : '4rem', marginBottom: '20px' }}
          >
            🚀
          </motion.div>
          <h1 style={{ 
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #00ffff, #ff00ff, #00ffff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            My Creative Works
          </h1>
          <p style={{ color: '#aaa', fontSize: isMobile ? '1rem' : '1.2rem', marginBottom: '40px' }}>
            Building the future with AI, E-Commerce, and cutting-edge technology
          </p>

          <div style={{ 
            display: 'flex', 
            gap: isMobile ? '10px' : '15px', 
            justifyContent: 'center', 
            flexWrap: 'wrap' 
          }}>
            {filters.map((f) => (
              <motion.button
                key={f.id}
                onClick={() => setFilter(f.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: isMobile ? '8px 20px' : '12px 32px',
                  background: filter === f.id 
                    ? 'linear-gradient(135deg, #00ffff, #0080ff)' 
                    : 'rgba(255,255,255,0.03)',
                  border: filter === f.id ? 'none' : '1px solid rgba(0,255,255,0.3)',
                  borderRadius: '50px',
                  color: filter === f.id ? '#0a0a0a' : '#00ffff',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: isMobile ? '0.85rem' : '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>{f.icon}</span> {f.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Projects Grid */}
      <section style={{ padding: isMobile ? '0 20px 60px' : '0 50px 80px', maxWidth: '1400px', margin: '0 auto' }}>
        {filteredProjects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#888' }}>
            No projects found in this category.
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: isMobile ? '25px' : '40px'
          }}>
            {filteredProjects.map((project) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedProject(project)}
                style={{
                  background: 'rgba(6, 10, 22, 0.72)',
                  backdropFilter: 'blur(22px)',
                  borderRadius: '24px',
                  border: `1px solid ${project.color || '#00ffff'}30`,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {/* Project Image - Full Width Top */}
                <div style={{
                  width: '100%',
                  height: '220px',
                  overflow: 'hidden',
                  background: `linear-gradient(135deg, ${project.color || '#00ffff'}20, #000)`
                }}>
                  {project.image && (project.image.startsWith('http') || project.image.startsWith('/uploads')) ? (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '5rem'
                    }}>
                      {project.icon || '📁'}
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div style={{ padding: '24px' }}>
                  {/* Category Badge */}
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{
                      padding: '4px 12px',
                      background: `${project.color || '#00ffff'}20`,
                      borderRadius: '20px',
                      color: project.color || '#00ffff',
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase'
                    }}>
                      {project.category === 'ecommerce' ? 'E-Commerce' : project.category === 'ai' ? 'AI / ML' : project.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 style={{ 
                    fontSize: '1.5rem', 
                    color: '#fff',
                    marginBottom: '10px',
                    fontWeight: 700
                  }}>
                    {project.title}
                  </h3>

                  {/* Short Description */}
                  <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '16px', lineHeight: 1.6 }}>
                    {project.shortDesc}
                  </p>

                  {/* Tech Stack */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                    {(project.tech || []).slice(0, 3).map((tech) => (
                      <span key={tech} style={{
                        padding: '4px 12px',
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: '20px',
                        color: '#888',
                        fontSize: '0.7rem'
                      }}>
                        {tech}
                      </span>
                    ))}
                    {(project.tech || []).length > 3 && (
                      <span style={{ color: '#666', fontSize: '0.7rem' }}>
                        +{(project.tech || []).length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  <div style={{
                    display: 'flex',
                    gap: '20px',
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(255,255,255,0.08)'
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: project.color || '#00ffff' }}>
                        {(project.features || []).length}
                      </div>
                      <div style={{ fontSize: '0.65rem', color: '#666' }}>Features</div>
                    </div>
                    <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }} />
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: project.color || '#00ffff' }}>
                        {project.createdAt ? new Date(project.createdAt).getFullYear() : '2024'}
                      </div>
                      <div style={{ fontSize: '0.65rem', color: '#666' }}>Year</div>
                    </div>
                    <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }} />
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: project.color || '#00ffff' }}>
                        Click
                      </div>
                      <div style={{ fontSize: '0.65rem', color: '#666' }}>to explore</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.9)',
              backdropFilter: 'blur(15px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: isMobile ? '15px' : '20px'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '700px',
                width: '100%',
                maxHeight: '85vh',
                overflow: 'auto',
                background: 'rgba(6, 10, 22, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '28px',
                border: `2px solid ${selectedProject.color || '#00ffff'}`,
                position: 'relative'
              }}
            >
              <button
                onClick={() => setSelectedProject(null)}
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.5)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff',
                  fontSize: '1.2rem',
                  cursor: 'pointer',
                  zIndex: 10
                }}
              >
                ✕
              </button>

              {/* Modal Image */}
              <div style={{
                width: '100%',
                height: '280px',
                overflow: 'hidden',
                background: `linear-gradient(135deg, ${selectedProject.color || '#00ffff'}30, #000)`
              }}>
                {selectedProject.image && (selectedProject.image.startsWith('http') || selectedProject.image.startsWith('/uploads')) ? (
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '6rem'
                  }}>
                    {selectedProject.icon || '📁'}
                  </div>
                )}
              </div>

              {/* Modal Content */}
              <div style={{ padding: '30px' }}>
                <h2 style={{ 
                  fontSize: isMobile ? '1.6rem' : '2rem', 
                  color: selectedProject.color || '#00ffff', 
                  marginBottom: '15px' 
                }}>
                  {selectedProject.title}
                </h2>
                
                <p style={{ color: '#ccc', lineHeight: 1.8, marginBottom: '25px', fontSize: isMobile ? '0.9rem' : '1rem' }}>
                  {selectedProject.description}
                </p>
                
                <h4 style={{ color: '#fff', marginBottom: '12px' }}>✨ Key Features</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '25px' }}>
                  {(selectedProject.features || []).map((feature, i) => (
                    <span key={i} style={{
                      padding: '6px 14px',
                      background: `${selectedProject.color || '#00ffff'}15`,
                      border: `1px solid ${selectedProject.color || '#00ffff'}40`,
                      borderRadius: '25px',
                      color: selectedProject.color || '#00ffff',
                      fontSize: '0.8rem'
                    }}>
                      {feature}
                    </span>
                  ))}
                </div>

                <h4 style={{ color: '#fff', marginBottom: '12px' }}>🛠️ Tech Stack</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '30px' }}>
                  {(selectedProject.tech || []).map((tech, i) => (
                    <span key={i} style={{
                      padding: '5px 12px',
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: '20px',
                      color: '#aaa',
                      fontSize: '0.75rem'
                    }}>
                      {tech}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '15px', flexDirection: isMobile ? 'column' : 'row' }}>
                  <motion.a
                    href={selectedProject.github || '#'}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.02 }}
                    style={{
                      flex: 1,
                      padding: '14px',
                      textAlign: 'center',
                      background: 'transparent',
                      border: `2px solid ${selectedProject.color || '#00ffff'}`,
                      borderRadius: '12px',
                      color: selectedProject.color || '#00ffff',
                      textDecoration: 'none',
                      fontWeight: 'bold'
                    }}
                  >
                    📂 GitHub
                  </motion.a>
                  <motion.a
                    href={selectedProject.live || '#'}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.02 }}
                    style={{
                      flex: 1,
                      padding: '14px',
                      textAlign: 'center',
                      background: `linear-gradient(135deg, ${selectedProject.color || '#00ffff'}, ${selectedProject.color || '#00ffff'}cc)`,
                      borderRadius: '12px',
                      color: '#0a0a0a',
                      textDecoration: 'none',
                      fontWeight: 'bold'
                    }}
                  >
                    🚀 Live Demo
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section style={{ padding: isMobile ? '0 20px 80px' : '0 50px 100px', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            background: 'linear-gradient(135deg, rgba(0,255,255,0.05), rgba(255,0,255,0.05))',
            borderRadius: isMobile ? '30px' : '40px',
            padding: isMobile ? '40px 20px' : '60px 40px',
            maxWidth: '800px',
            margin: '0 auto',
            border: '1px solid rgba(0,255,255,0.2)'
          }}
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ fontSize: isMobile ? '2.5rem' : '3rem', marginBottom: '20px' }}
          >
            💡
          </motion.div>
          <h2 style={{ fontSize: isMobile ? '1.5rem' : '2rem', marginBottom: '15px', color: '#fff' }}>
            Have a Project in Mind?
          </h2>
          <p style={{ color: '#aaa', marginBottom: '30px', fontSize: isMobile ? '0.9rem' : '1rem' }}>
            Let's bring your ideas to life with cutting-edge technology
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,255,255,0.3)' }}
            style={{
              padding: isMobile ? '12px 35px' : '15px 45px',
              background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
              borderRadius: '50px',
              color: '#0a0a0a',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: isMobile ? '0.9rem' : '1rem',
              display: 'inline-block'
            }}
          >
            Let's Talk 🚀
          </motion.a>
        </motion.div>
      </section>
    </div>
  )
}

export default ProjectsPage