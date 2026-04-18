// src/Components/sections/Projects.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaShoppingCart, FaRobot, FaWordpress } from 'react-icons/fa'
import { 
  SiReact, 
  SiNodedotjs, 
  SiMongodb, 
  SiStripe, 
  SiPython, 
  SiPhp, 
  SiElementor,
  SiOpenai,
  SiJavascript
} from 'react-icons/si'

// ─── Static Projects Data ─────────────────────────────────────────────────────
const projects = [
  {
    id: 1,
    title: 'E-Commerce Websites',
    desc: 'Full-featured online stores with cart, payments, admin dashboard, and product management.',
    icon: <FaShoppingCart size={50} />,
    tech: [
      { name: 'React', icon: <SiReact size={14} />, color: '#61DAFB' },
      { name: 'Node.js', icon: <SiNodedotjs size={14} />, color: '#339933' },
      { name: 'MongoDB', icon: <SiMongodb size={14} />, color: '#47A248' },
      { name: 'Stripe', icon: <SiStripe size={14} />, color: '#008CDD' },
    ],
    color: '#00ffff',
  },
  {
    id: 2,
    title: 'AI Integration',
    desc: 'Intelligent AI solutions including chatbots, RAG systems, LLM integration, and NLP processing.',
    icon: <FaRobot size={50} />,
    tech: [
      { name: 'OpenAI', icon: <SiOpenai size={14} />, color: '#00ffff' },
      { name: 'RAG', icon: <SiJavascript size={14} />, color: '#ff00ff' },
      { name: 'LLM', icon: <SiPython size={14} />, color: '#ffff00' },
      { name: 'Python', icon: <SiPython size={14} />, color: '#3776AB' },
    ],
    color: '#ff00ff',
  },
  {
    id: 3,
    title: 'WordPress',
    desc: 'Custom WordPress themes, plugins, and complete website solutions with Elementor and WooCommerce.',
    icon: <FaWordpress size={50} />,
    tech: [
      { name: 'WordPress', icon: <FaWordpress size={14} />, color: '#21759B' },
      { name: 'PHP', icon: <SiPhp size={14} />, color: '#777BB4' },
      { name: 'Elementor', icon: <SiElementor size={14} />, color: '#92003B' },
      { name: 'WooCommerce', icon: <FaShoppingCart size={14} />, color: '#96588A' },
    ],
    color: '#ffe066',
  },
]

// ─── Project Card ────────────────────────────────────────────────────────────
const ProjectCard = ({ project, index }) => {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      onClick={() => setFlipped(!flipped)}
      style={{
        width: '280px',
        height: '340px',
        position: 'relative',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.6s',
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        cursor: 'pointer',
      }}
    >
      {/* Front Side */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backfaceVisibility: 'hidden',
        background: 'rgba(26, 26, 46, 0.9)',
        border: `1px solid ${project.color}`,
        borderRadius: '20px',
        padding: '30px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        backdropFilter: 'blur(10px)',
      }}>
        <div style={{ color: project.color, marginBottom: '20px' }}>{project.icon}</div>
        <h3 style={{ color: project.color, fontSize: '1.3rem', fontWeight: 700, marginBottom: '15px' }}>
          {project.title}
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
          {project.tech.map((t, i) => (
            <span key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 12px',
              background: `${project.color}20`,
              border: `1px solid ${project.color}`,
              borderRadius: '20px',
              color: project.color,
              fontSize: '0.7rem',
            }}>
              {t.icon && <span style={{ color: t.color }}>{t.icon}</span>}
              {t.name}
            </span>
          ))}
        </div>
        <p style={{ color: '#666', fontSize: '0.7rem', marginTop: 'auto' }}>Tap to flip →</p>
      </div>

      {/* Back Side */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backfaceVisibility: 'hidden',
        transform: 'rotateY(180deg)',
        background: 'rgba(26, 26, 46, 0.95)',
        border: `1px solid ${project.color}`,
        borderRadius: '20px',
        padding: '30px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        backdropFilter: 'blur(10px)',
      }}>
        <h3 style={{ color: project.color, fontSize: '1.2rem', fontWeight: 700, marginBottom: '15px' }}>
          {project.title}
        </h3>
        <p style={{ color: '#aaa', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '20px' }}>
          {project.desc}
        </p>
        <p style={{ color: '#555', fontSize: '0.7rem', marginTop: 'auto' }}>← Tap to flip back</p>
      </div>
    </motion.div>
  )
}

// ─── Main Section ────────────────────────────────────────────────────────────
const Projects = () => {
  return (
    <section id="projects" style={{
      minHeight: 'auto',
      padding: '100px 50px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: 'rgba(6, 10, 22, 0.72)',
      backdropFilter: 'blur(22px)',
      borderTop: '1px solid rgba(0, 255, 255, 0.08)',
      borderBottom: '1px solid rgba(0, 255, 255, 0.08)',
    }}>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: '60px' }}
      >
        <p style={{ color: '#00ffff', letterSpacing: '3px', fontSize: '0.8rem', marginBottom: '10px' }}>
          ✦ WHAT I'VE BUILT ✦
        </p>
        <h2 style={{
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '15px',
        }}>
          Featured Projects
        </h2>
        <div style={{ width: '60px', height: '2px', background: '#00ffff', margin: '0 auto' }} />
      </motion.div>

      {/* Cards */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '30px',
        maxWidth: '1000px',
        margin: '0 auto',
      }}>
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* View All Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        style={{ marginTop: '60px' }}
      >
        <Link to="/projects">
          <button style={{
            padding: '14px 40px',
            background: 'linear-gradient(135deg, #00ffff, #0080ff)',
            border: 'none',
            borderRadius: '50px',
            color: '#0a0a0a',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'transform 0.3s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            View All Projects →
          </button>
        </Link>
      </motion.div>
    </section>
  )
}

export default Projects