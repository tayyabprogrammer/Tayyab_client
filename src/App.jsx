import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import { AdminProvider, useAdmin } from './context/AdminContext'
import HeroBackground from './Components/3D/HeroBackground'
import Navbar from './Components/ui/Navbar'
import Footer from './Components/Sections/Footer'
import WhatsAppButton from './Components/ui/WhatsAppButton'
import Loader from './Components/ui/Loader'

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const Blogs = lazy(() => import('./pages/Blogs'))
const BlogDetail = lazy(() => import('./pages/BlogDetail'))

// Lazy load admin pages
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))

// Fallback component for loading states
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-black">
    <Loader />
  </div>
)

// ScrollToTop Component
const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAdmin()
  if (loading) return <PageLoader />
  if (!admin) return <Navigate to="/admin/login" replace />
  return children
}

// Layout wrapper
const AppLayout = ({ children }) => {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')
  
  if (isAdminRoute) {
    return <>{children}</>
  }
  
  return (
    <>
      <HeroBackground />
      <Navbar />
      {children}
      <Footer />
      <WhatsAppButton />
    </>
  )
}

function App() {
  return (
    <Router>
      <AdminProvider>
        <ScrollToTop />
        <AppLayout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard/*" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              
              {/* Catch-all 404 */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </AppLayout>
      </AdminProvider>
    </Router>
  )
}

export default App