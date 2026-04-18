import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getBlogById } from '../services/api'

const BlogDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  useEffect(() => {
    fetchBlog()
    window.scrollTo(0, 0)
  }, [id])

  const fetchBlog = async () => {
    try {
      const { data } = await getBlogById(id)
      setBlog(data)
    } catch (error) {
      console.error('Error fetching blog:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        background: '#0a0a0a'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📝</div>
          <p style={{ color: '#00ffff' }}>Loading blog...</p>
        </div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        background: '#0a0a0a'
      }}>
        <p style={{ color: '#ff0000' }}>Blog not found</p>
        <button onClick={() => navigate('/blogs')} style={backButtonStyle}>← Back to Blogs</button>
      </div>
    )
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#0a0a0a',
      position: 'relative',
    }}>
      
      {/* Hero Section with Background Image */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: isMobile ? '50vh' : '60vh',
        overflow: 'hidden',
      }}>
        {/* Background Image with Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: blog.image && (blog.image.startsWith('http') || blog.image.startsWith('/uploads')) 
            ? `url(${blog.image})` 
            : 'linear-gradient(135deg, #1a1a2e, #16213e)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          {/* Dark Overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.9))',
          }} />
        </div>

        {/* Category Badge - Floating */}
        <div style={{
          position: 'absolute',
          top: isMobile ? '100px' : '120px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
        }}>
          <span style={{
            display: 'inline-block',
            padding: '6px 20px',
            background: blog.color || '#00ffff',
            borderRadius: '30px',
            color: '#0a0a0a',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}>
            {blog.category}
          </span>
        </div>

        {/* Title Container */}
        <div style={{
          position: 'absolute',
          bottom: isMobile ? '40px' : '60px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '900px',
          padding: isMobile ? '0 20px' : '0 30px',
          textAlign: 'center',
          zIndex: 2,
        }}>
          <h1 style={{
            fontSize: isMobile ? '1.8rem' : '3rem',
            fontWeight: 800,
            color: '#fff',
            marginBottom: '20px',
            lineHeight: 1.3,
            textShadow: '0 2px 10px rgba(0,0,0,0.3)',
          }}>
            {blog.title}
          </h1>

          {/* Meta Info */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: isMobile ? '15px' : '30px',
            flexWrap: 'wrap',
          }}>
            <span style={{ color: '#ccc', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
              📅 {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span style={{ color: '#ccc', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
              ⏱️ {blog.readTime}
            </span>
            <span style={{ color: '#ccc', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
              👁️ {blog.views || 0} views
            </span>
          </div>
        </div>
      </div>

      {/* Glass Card Content */}
      <div style={{
        maxWidth: '900px',
        margin: isMobile ? '-30px auto 0' : '-50px auto 0',
        padding: isMobile ? '0 15px 60px' : '0 20px 80px',
        position: 'relative',
        zIndex: 3,
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            background: 'rgba(10, 15, 30, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '28px',
            border: `1px solid ${blog.color || '#00ffff'}30`,
            boxShadow: '0 20px 50px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
            overflow: 'hidden',
          }}
        >
          {/* Back Button */}
          <div style={{ padding: isMobile ? '25px 25px 0' : '35px 40px 0' }}>
            <button 
              onClick={() => navigate('/blogs')}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '30px',
                padding: '8px 20px',
                color: '#ccc',
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                e.currentTarget.style.color = '#00ffff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                e.currentTarget.style.color = '#ccc'
              }}
            >
              ← Back to Blogs
            </button>
          </div>

          {/* Blog Content */}
          <div style={{ 
            padding: isMobile ? '25px 25px 35px' : '35px 45px 50px',
          }}>
            {/* Excerpt / Introduction */}
            <div style={{
              fontSize: isMobile ? '1rem' : '1.1rem',
              lineHeight: 1.7,
              color: '#ddd',
              marginBottom: '30px',
              paddingBottom: '20px',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              fontStyle: 'italic',
            }}>
              {blog.excerpt}
            </div>

            {/* Full Content */}
            <div style={{
              color: '#bbb',
              lineHeight: 1.85,
              fontSize: isMobile ? '0.95rem' : '1.05rem',
            }}>
              <p style={{ marginBottom: '20px' }}>{blog.content}</p>
            </div>

            {/* Tags Section */}
            {(blog.tags || []).length > 0 && (
              <div style={{
                marginTop: '45px',
                paddingTop: '30px',
                borderTop: '1px solid rgba(255,255,255,0.08)',
              }}>
                <h4 style={{ 
                  color: '#fff', 
                  marginBottom: '18px', 
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <span>🏷️</span> Tags
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {blog.tags.map(tag => (
                    <span key={tag} style={{
                      padding: '6px 16px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '25px',
                      color: '#aaa',
                      fontSize: '0.8rem',
                      transition: 'all 0.3s ease',
                    }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share Section */}
            <div style={{
              marginTop: '40px',
              paddingTop: '25px',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '15px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: '#666', fontSize: '0.8rem' }}>Share this article:</span>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button style={shareButton}>📘</button>
                  <button style={shareButton}>🐦</button>
                  <button style={shareButton}>💼</button>
                </div>
              </div>
              
              {/* Next/Prev Navigation Placeholder */}
              <button 
                onClick={() => navigate('/blogs')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: blog.color || '#00ffff',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                More Articles →
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

const backButtonStyle = {
  marginTop: '20px',
  padding: '10px 25px',
  background: 'transparent',
  border: '1px solid #00ffff',
  borderRadius: '30px',
  color: '#00ffff',
  cursor: 'pointer',
}

const shareButton = {
  width: '34px',
  height: '34px',
  borderRadius: '50%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  cursor: 'pointer',
  fontSize: '1rem',
  transition: 'all 0.3s ease',
}

export default BlogDetail