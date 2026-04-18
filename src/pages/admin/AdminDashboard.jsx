// src/pages/admin/AdminDashboard.jsx
import { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import ProjectsManage from './ProjectsManage';
import BlogsManage from './BlogsManage';
import CertificatesManage from './CertificatesManage';
import MessagesManage from './MessagesManage';

const AdminDashboard = () => {
  const { admin, logout } = useAdmin();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('projects');
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const checkScreen = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const menuItems = [
    { id: 'projects', label: '📁 Projects', path: '/admin/dashboard' },
    { id: 'blogs', label: '📝 Blogs', path: '/admin/dashboard/blogs' },
    { id: 'certificates', label: '🎓 Certificates', path: '/admin/dashboard/certificates' },
    { id: 'messages', label: '✉️ Messages', path: '/admin/dashboard/messages' },
  ];

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      background: '#0a0a0a',
      position: 'relative',
    }}>
      
      {/* Mobile Menu Toggle */}
      {isMobile && !sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          style={{
            position: 'fixed',
            top: '15px',
            left: '15px',
            zIndex: 1001,
            background: '#00ffff',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 15px',
            cursor: 'pointer',
            fontSize: '1.2rem',
            fontWeight: 'bold',
          }}
        >
          ☰ Menu
        </button>
      )}

      {/* Sidebar */}
      <div style={{
        width: isMobile ? (sidebarOpen ? '280px' : '0px') : '280px',
        background: 'rgba(6, 10, 22, 0.98)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(0,255,255,0.15)',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        height: '100vh',
        overflowY: 'auto',
        transition: 'width 0.3s ease',
        zIndex: 1000,
        boxShadow: '2px 0 20px rgba(0,0,0,0.3)',
      }}>
        {sidebarOpen && (
          <div style={{ padding: '30px 20px' }}>
            {/* Close button for mobile */}
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(false)}
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  background: 'transparent',
                  border: 'none',
                  color: '#00ffff',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>
            )}

            <h2 style={{ color: '#00ffff', marginBottom: '30px', fontSize: '1.4rem' }}>
              Portfolio Admin
            </h2>
            
            <div style={{ 
              marginBottom: '30px', 
              padding: '12px', 
              background: 'rgba(0,255,255,0.08)', 
              borderRadius: '12px',
              border: '1px solid rgba(0,255,255,0.15)',
            }}>
              <p style={{ color: '#888', fontSize: '0.75rem', marginBottom: '5px' }}>Logged in as</p>
              <p style={{ color: '#00ffff', fontWeight: 'bold', fontSize: '0.9rem' }}>{admin?.email}</p>
            </div>
            
            <nav>
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => {
                    setActiveMenu(item.id);
                    if (isMobile) setSidebarOpen(false);
                  }}
                  style={{
                    display: 'block',
                    padding: '12px 15px',
                    marginBottom: '8px',
                    color: activeMenu === item.id ? '#00ffff' : '#ddd',
                    background: activeMenu === item.id ? 'rgba(0,255,255,0.15)' : 'transparent',
                    borderRadius: '10px',
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                    borderLeft: activeMenu === item.id ? `3px solid #00ffff` : '3px solid transparent',
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            
            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                padding: '12px',
                marginTop: '40px',
                background: 'rgba(255,0,0,0.15)',
                border: '1px solid rgba(255,0,0,0.3)',
                borderRadius: '10px',
                color: '#ff8888',
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,0,0,0.25)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,0,0,0.15)'}
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div style={{ 
        marginLeft: isMobile ? '0px' : '280px',
        width: isMobile ? '100%' : 'calc(100% - 280px)',
        minHeight: '100vh',
        padding: isMobile ? '70px 15px 30px' : '25px 30px',
        transition: 'all 0.3s ease',
        boxSizing: 'border-box',
      }}>
        <Routes>
          <Route path="/" element={<ProjectsManage />} />
          <Route path="/blogs" element={<BlogsManage />} />
          <Route path="/certificates" element={<CertificatesManage />} />
          <Route path="/messages" element={<MessagesManage />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;