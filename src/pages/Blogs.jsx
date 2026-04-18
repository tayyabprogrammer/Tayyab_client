import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getBlogs } from '../services/api'

const Blogs = () => {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('all')
  const [isMobile, setIsMobile] = useState(false)
  const [blogs, setBlogs] = useState([])
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
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      const { data } = await getBlogs()
      setBlogs(data)
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    { id: 'all', name: 'All Posts', icon: '📝' },
    { id: 'tech', name: 'Tech', icon: '💻' },
    { id: 'tutorial', name: 'Tutorials', icon: '🎓' },
    { id: 'career', name: 'Career', icon: '🚀' }
  ]

  const filteredBlogs = activeCategory === 'all' 
    ? blogs 
    : blogs.filter(blog => blog.category === activeCategory)

  const featuredBlog = blogs.find(b => b.featured)

  const handleReadMore = (blogId) => {
    navigate(`/blog/${blogId}`)
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '100px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📝</div>
          <p style={{ color: '#00ffff' }}>Loading blogs...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: '100px' }}>
      
      {/* Header */}
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
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ fontSize: isMobile ? '2.8rem' : '3.5rem', marginBottom: '20px' }}
          >
            ✍️
          </motion.div>
          <h1 style={{ 
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            marginBottom: '20px',
            background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            My Blog
          </h1>
          <p style={{ color: '#aaa', fontSize: isMobile ? '0.95rem' : '1.1rem', marginBottom: '40px' }}>
            Thoughts, tutorials, and insights from my coding journey
          </p>

          <div style={{ 
            display: 'flex', 
            gap: isMobile ? '10px' : '15px', 
            justifyContent: 'center', 
            flexWrap: 'wrap' 
          }}>
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: isMobile ? '8px 18px' : '12px 28px',
                  background: activeCategory === cat.id 
                    ? 'linear-gradient(135deg, #00ffff, #0080ff)' 
                    : 'rgba(255,255,255,0.03)',
                  border: activeCategory === cat.id ? 'none' : '1px solid rgba(0,255,255,0.3)',
                  borderRadius: '50px',
                  color: activeCategory === cat.id ? '#0a0a0a' : '#00ffff',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: isMobile ? '0.8rem' : '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>{cat.icon}</span> {cat.name}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Featured Post */}
      {activeCategory === 'all' && featuredBlog && (
        <section style={{ padding: isMobile ? '0 20px 40px' : '0 50px 60px', maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            onClick={() => handleReadMore(featuredBlog._id)}
            style={{
              background: 'rgba(6, 10, 22, 0.72)',
              backdropFilter: 'blur(22px)',
              borderRadius: isMobile ? '24px' : '32px',
              border: `2px solid ${featuredBlog.color || '#00ffff'}`,
              padding: isMobile ? '30px 20px' : '50px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{
              position: 'absolute',
              top: isMobile ? '12px' : '20px',
              right: isMobile ? '12px' : '20px',
              padding: isMobile ? '5px 12px' : '8px 20px',
              background: featuredBlog.color || '#00ffff',
              borderRadius: '30px',
              color: '#0a0a0a',
              fontWeight: 'bold',
              fontSize: isMobile ? '0.7rem' : '0.8rem'
            }}>
              ⭐ FEATURED
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'auto 1fr',
              gap: isMobile ? '25px' : '40px',
              alignItems: 'center'
            }}>
              <div style={{
                width: isMobile ? '100%' : '200px',
                height: isMobile ? '150px' : '200px',
                borderRadius: '16px',
                overflow: 'hidden',
                background: `linear-gradient(135deg, ${featuredBlog.color || '#00ffff'}30, #000)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {featuredBlog.image && (featuredBlog.image.startsWith('http') || featuredBlog.image.startsWith('/uploads')) ? (
                  <img src={featuredBlog.image} alt={featuredBlog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '4rem' }}>{featuredBlog.icon || '📝'}</span>
                )}
              </div>
              
              <div>
                <h2 style={{ fontSize: isMobile ? '1.5rem' : '2rem', color: featuredBlog.color || '#00ffff', marginBottom: '15px' }}>
                  {featuredBlog.title}
                </h2>
                <p style={{ color: '#ccc', lineHeight: 1.7, marginBottom: '20px', fontSize: isMobile ? '0.85rem' : '1rem' }}>
                  {featuredBlog.excerpt}
                </p>
                <div style={{ display: 'flex', gap: '20px', color: '#888', fontSize: isMobile ? '0.75rem' : '0.85rem', marginBottom: '20px' }}>
                  <span>📅 {new Date(featuredBlog.createdAt).toLocaleDateString()}</span>
                  <span>⏱️ {featuredBlog.readTime}</span>
                </div>
                <button style={readMoreButton}>Read Full Article →</button>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* Blog Grid */}
      <section style={{ padding: isMobile ? '0 20px 60px' : '0 50px 80px', maxWidth: '1400px', margin: '0 auto' }}>
        {filteredBlogs.filter(b => !b.featured).length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#888' }}>
            No blogs found in this category.
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: isMobile ? '25px' : '35px'
          }}>
            {filteredBlogs.filter(b => !b.featured).map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={!isMobile ? { y: -8 } : {}}
                style={{
                  background: 'rgba(6, 10, 22, 0.72)',
                  backdropFilter: 'blur(22px)',
                  borderRadius: isMobile ? '20px' : '24px',
                  border: `1px solid ${blog.color || '#00ffff'}30`,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{
                  width: '100%',
                  height: '200px',
                  overflow: 'hidden',
                  background: `linear-gradient(135deg, ${blog.color || '#00ffff'}20, #000)`
                }}>
                  {blog.image && (blog.image.startsWith('http') || blog.image.startsWith('/uploads')) ? (
                    <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>
                      {blog.icon || '📝'}
                    </div>
                  )}
                </div>

                <div style={{ padding: '24px' }}>
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{
                      padding: '4px 12px',
                      background: `${blog.color || '#00ffff'}20`,
                      borderRadius: '20px',
                      color: blog.color || '#00ffff',
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase'
                    }}>
                      {blog.category}
                    </span>
                  </div>

                  <h3 style={{ color: '#fff', fontSize: isMobile ? '1.2rem' : '1.4rem', marginBottom: '12px', lineHeight: 1.3 }}>
                    {blog.title}
                  </h3>

                  <p style={{ color: '#aaa', lineHeight: 1.6, marginBottom: '20px', fontSize: isMobile ? '0.85rem' : '0.9rem' }}>
                    {blog.excerpt}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ color: '#666', fontSize: isMobile ? '0.7rem' : '0.8rem' }}>
                      📅 {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                    <button 
                      onClick={() => handleReadMore(blog._id)}
                      style={{
                        padding: '8px 20px',
                        background: 'transparent',
                        border: `1px solid ${blog.color || '#00ffff'}`,
                        borderRadius: '25px',
                        color: blog.color || '#00ffff',
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = `${blog.color || '#00ffff'}20`
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent'
                      }}
                    >
                      Read More →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
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
            maxWidth: '700px',
            margin: '0 auto',
            border: '1px solid rgba(0,255,255,0.2)'
          }}
        >
          <div style={{ fontSize: isMobile ? '2rem' : '2.5rem', marginBottom: '15px' }}>📧</div>
          <h2 style={{ fontSize: isMobile ? '1.5rem' : '1.8rem', marginBottom: '15px', color: '#fff' }}>
            Never Miss a Post
          </h2>
          <p style={{ color: '#aaa', marginBottom: '25px', fontSize: isMobile ? '0.85rem' : '1rem' }}>
            Subscribe to get notified when I publish new articles
          </p>
          <div style={{ display: 'flex', gap: '10px', flexDirection: isMobile ? 'column' : 'row', maxWidth: '450px', margin: '0 auto' }}>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                flex: 1,
                padding: isMobile ? '12px 16px' : '14px 20px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(0,255,255,0.3)',
                borderRadius: '50px',
                color: '#fff',
                outline: 'none',
                fontSize: isMobile ? '0.85rem' : '1rem'
              }}
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              style={{
                padding: isMobile ? '12px 20px' : '14px 28px',
                background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
                border: 'none',
                borderRadius: '50px',
                color: '#0a0a0a',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: isMobile ? '0.85rem' : '1rem'
              }}
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

const readMoreButton = {
  padding: '10px 24px',
  background: 'transparent',
  border: '1px solid #00ffff',
  borderRadius: '30px',
  color: '#00ffff',
  fontSize: '0.8rem',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
}

export default Blogs