// src/Components/sections/Reviews.jsx
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getReviews, submitReview } from '../../services/api'

// ─── Star Rating Component ────────────────────────────────────────────────────
const Stars = ({ rating, interactive = false, onRate }) => (
  <div style={{ display: 'flex', gap: '4px' }}>
    {[1, 2, 3, 4, 5].map(star => (
      <span
        key={star}
        onClick={() => interactive && onRate(star)}
        style={{
          fontSize: interactive ? '1.4rem' : '1rem',
          cursor: interactive ? 'pointer' : 'default',
          color: star <= rating ? '#FFD700' : 'rgba(255,255,255,0.15)',
          transition: 'color 0.2s, transform 0.2s',
          display: 'inline-block',
          transform: interactive && star <= rating ? 'scale(1.15)' : 'scale(1)',
        }}
      >
        ★
      </span>
    ))}
  </div>
)

// ─── Main Section ─────────────────────────────────────────────────────────────
const Reviews = () => {
  const [reviews, setReviews] = useState([])
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', role: '', text: '', rating: 5 })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const autoRef = useRef(null)

  // Fetch reviews from backend
  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      const { data } = await getReviews()
      setReviews(data)
    } catch (error) {
      console.error('Error fetching reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  // Auto-slide
  useEffect(() => {
    if (reviews.length === 0) return
    autoRef.current = setInterval(() => {
      setDirection(1)
      setCurrent(c => (c + 1) % reviews.length)
    }, 4500)
    return () => clearInterval(autoRef.current)
  }, [reviews.length])

  const goTo = (idx) => {
    clearInterval(autoRef.current)
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
  }

  const prev = () => {
    clearInterval(autoRef.current)
    setDirection(-1)
    setCurrent(c => (c - 1 + reviews.length) % reviews.length)
  }

  const next = () => {
    clearInterval(autoRef.current)
    setDirection(1)
    setCurrent(c => (c + 1) % reviews.length)
  }

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.text.trim()) {
      setError('Please fill in name and review')
      setTimeout(() => setError(''), 3000)
      return
    }
    
    setLoading(true)
    setError('')
    
    try {
      await submitReview(form)
      setSubmitted(true)
      setForm({ name: '', role: '', text: '', rating: 5 })
      await fetchReviews() // Refresh reviews
      setTimeout(() => {
        setSubmitted(false)
        setShowForm(false)
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review')
      setTimeout(() => setError(''), 3000)
    } finally {
      setLoading(false)
    }
  }

  const variants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 80 : -80 }),
    center: { opacity: 1, x: 0 },
    exit: (d) => ({ opacity: 0, x: d > 0 ? -80 : 80 }),
  }

  const review = reviews[current]

  if (loading && reviews.length === 0) {
    return (
      <section id="reviews" style={{
        minHeight: '100vh',
        padding: '100px 50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{ textAlign: 'center', color: '#00ffff' }}>Loading reviews...</div>
      </section>
    )
  }

  return (
    <section id="reviews" style={{
      minHeight: '100vh',
      padding: '100px 50px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      zIndex: 1,
    }}>

      {/* ── Heading ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: '60px' }}
      >
        <p style={{
          color: '#00ffff',
          letterSpacing: '0.35em',
          fontSize: '0.78rem',
          textTransform: 'uppercase',
          fontWeight: 600,
          marginBottom: '14px',
        }}>
          ✦ &nbsp; Client Feedback &nbsp; ✦
        </p>
        <h2 style={{
          fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
          fontWeight: 900,
          background: 'linear-gradient(135deg, #00ffff, #ff00ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '14px',
          lineHeight: 1.1,
        }}>
          What People Say
        </h2>
        <div style={{
          width: '60px', height: '2px',
          background: 'linear-gradient(90deg, transparent, #00ffff, transparent)',
          margin: '0 auto',
          borderRadius: '2px',
        }} />
      </motion.div>

      {/* ── Carousel ── */}
      {reviews.length > 0 ? (
        <div style={{
          width: '100%',
          maxWidth: '720px',
          position: 'relative',
          marginBottom: '40px',
        }}>

          {/* Prev button */}
          <button
            onClick={prev}
            style={{
              position: 'absolute',
              left: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: '42px', height: '42px',
              borderRadius: '50%',
              background: 'rgba(0,255,255,0.07)',
              border: '1px solid rgba(0,255,255,0.25)',
              color: '#00ffff',
              fontSize: '1.1rem',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,255,255,0.15)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,255,255,0.07)'}
          >
            ‹
          </button>

          {/* Next button */}
          <button
            onClick={next}
            style={{
              position: 'absolute',
              right: '-20px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: '42px', height: '42px',
              borderRadius: '50%',
              background: 'rgba(0,255,255,0.07)',
              border: '1px solid rgba(0,255,255,0.25)',
              color: '#00ffff',
              fontSize: '1.1rem',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,255,255,0.15)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,255,255,0.07)'}
          >
            ›
          </button>

          {/* Glass review card */}
          <div style={{ overflow: 'hidden', borderRadius: '24px' }}>
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={review._id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                style={{
                  padding: '44px 48px',
                  borderRadius: '24px',
                  background: 'rgba(8, 12, 28, 0.65)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  border: '1px solid rgba(0,255,255,0.15)',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.4), inset 0 0 40px rgba(0,200,255,0.03)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* top glow line */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0,
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(0,255,255,0.4), rgba(180,0,255,0.3), transparent)',
                }} />

                {/* Quote mark */}
                <div style={{
                  position: 'absolute',
                  top: '20px', right: '32px',
                  fontSize: '6rem',
                  color: 'rgba(0,255,255,0.06)',
                  fontFamily: 'Georgia, serif',
                  lineHeight: 1,
                  userSelect: 'none',
                }}>
                  "
                </div>

                {/* Stars */}
                <div style={{ marginBottom: '20px' }}>
                  <Stars rating={review.rating} />
                </div>

                {/* Review text */}
                <p style={{
                  color: '#ccc',
                  fontSize: '1.05rem',
                  lineHeight: 1.85,
                  marginBottom: '32px',
                  fontStyle: 'italic',
                }}>
                  "{review.text}"
                </p>

                {/* Author */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '48px', height: '48px',
                    borderRadius: '50%',
                    background: 'rgba(0,255,255,0.08)',
                    border: '1.5px solid rgba(0,255,255,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.5rem',
                    flexShrink: 0,
                  }}>
                    {review.avatar || '🙂'}
                  </div>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>
                      {review.name}
                    </div>
                    <div style={{ color: '#00ffff', fontSize: '0.82rem', letterSpacing: '0.05em' }}>
                      {review.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
          No reviews yet. Be the first to write one!
        </div>
      )}

      {/* ── Dots ── */}
      {reviews.length > 0 && (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '48px' }}>
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === current ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: i === current ? '#00ffff' : 'rgba(255,255,255,0.2)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
            />
          ))}
        </div>
      )}

      {/* ── Error Message ── */}
      {error && (
        <div style={{
          background: 'rgba(255,0,0,0.1)',
          border: '1px solid #ff0000',
          color: '#ff0000',
          padding: '10px 20px',
          borderRadius: '10px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}

      {/* ── Write a Review button ── */}
      {!showForm && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onClick={() => setShowForm(true)}
          style={{
            padding: '13px 34px',
            background: 'transparent',
            border: '1.5px solid rgba(0,255,255,0.45)',
            borderRadius: '50px',
            color: '#00ffff',
            fontSize: '0.92rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            cursor: 'pointer',
            transition: 'background 0.25s, transform 0.25s, box-shadow 0.25s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(0,255,255,0.07)'
            e.currentTarget.style.transform = 'translateY(-3px)'
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,255,255,0.12)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          ✍️ &nbsp; Write a Review
        </motion.button>
      )}

      {/* ── Review Form ── */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.4 }}
            style={{
              width: '100%',
              maxWidth: '560px',
              padding: '40px 44px',
              borderRadius: '24px',
              background: 'rgba(8, 12, 28, 0.75)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(0,255,255,0.18)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* top glow line */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(0,255,255,0.4), rgba(180,0,255,0.3), transparent)',
            }} />

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🎉</div>
                <h3 style={{ color: '#00ffff', fontSize: '1.3rem', margin: 0 }}>
                  Review Submitted!
                </h3>
              </div>
            ) : (
              <>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '28px',
                }}>
                  <h3 style={{ color: '#fff', fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>
                    Leave a Review
                  </h3>
                  <button
                    onClick={() => setShowForm(false)}
                    style={{
                      background: 'none', border: 'none',
                      color: '#555', fontSize: '1.3rem',
                      cursor: 'pointer', lineHeight: 1,
                    }}
                  >
                    ✕
                  </button>
                </div>

                {/* Name */}
                <input
                  type="text"
                  placeholder="Your Name *"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  style={inputStyle}
                />

                {/* Role */}
                <input
                  type="text"
                  placeholder="Your Role (e.g. CEO, Client)"
                  value={form.role}
                  onChange={e => setForm({ ...form, role: e.target.value })}
                  style={inputStyle}
                />

                {/* Rating */}
                <div style={{ marginBottom: '16px' }}>
                  <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '8px', letterSpacing: '0.05em' }}>
                    YOUR RATING
                  </p>
                  <Stars rating={form.rating} interactive onRate={r => setForm({ ...form, rating: r })} />
                </div>

                {/* Message */}
                <textarea
                  placeholder="Your review *"
                  rows={4}
                  value={form.text}
                  onChange={e => setForm({ ...form, text: e.target.value })}
                  style={{ ...inputStyle, resize: 'none', marginBottom: '24px' }}
                />

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: 'linear-gradient(135deg, #00ffff, #0080ff)',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#0a0a0a',
                    fontSize: '1rem',
                    fontWeight: 700,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'opacity 0.2s, transform 0.2s',
                    opacity: loading ? 0.7 : 1,
                  }}
                  onMouseEnter={e => {
                    if (!loading) {
                      e.currentTarget.style.opacity = '0.88'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                    }
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.opacity = '1'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  {loading ? 'Submitting...' : 'Submit Review 🚀'}
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

// ─── Shared input style ───────────────────────────────────────────────────────
const inputStyle = {
  width: '100%',
  padding: '13px 16px',
  marginBottom: '14px',
  background: 'rgba(0,0,0,0.35)',
  border: '1px solid rgba(0,255,255,0.2)',
  borderRadius: '10px',
  color: '#fff',
  fontSize: '0.95rem',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  transition: 'border-color 0.2s',
}

export default Reviews