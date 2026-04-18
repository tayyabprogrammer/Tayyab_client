import { useState, useEffect } from 'react';
import { getCertificates, createCertificate, updateCertificate, deleteCertificate } from '../../services/api';

const CertificatesManage = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [formData, setFormData] = useState({
    name: '', org: '', year: '', icon: '🎓', color: '#00ffff', link: ''
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const { data } = await getCertificates();
      setCertificates(data);
    } catch (error) {
      console.error('Error fetching certificates:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('data', JSON.stringify(formData));
    
    if (imageFile) {
      formDataToSend.append('image', imageFile);
    }

    try {
      if (editingCert) {
        await updateCertificate(editingCert._id, formDataToSend);
      } else {
        await createCertificate(formDataToSend);
      }
      fetchCertificates();
      setShowForm(false);
      setEditingCert(null);
      resetForm();
    } catch (error) {
      console.error('Error saving certificate:', error);
      alert('Error saving certificate');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '', org: '', year: '', icon: '🎓', color: '#00ffff', link: ''
    });
    setImageFile(null);
  };

  const handleEdit = (cert) => {
    setEditingCert(cert);
    setFormData({
      name: cert.name,
      org: cert.org,
      year: cert.year,
      icon: cert.icon || '🎓',
      color: cert.color || '#00ffff',
      link: cert.link || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      await deleteCertificate(id);
      fetchCertificates();
    }
  };

  if (loading) return <div style={{ color: '#fff' }}>Loading certificates...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#fff' }}>Certificates Management</h1>
        <button onClick={() => { setShowForm(true); setEditingCert(null); resetForm(); }} style={buttonStyle}>+ Add New Certificate</button>
      </div>

      {showForm && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <h2 style={{ color: '#00ffff', marginBottom: '20px' }}>{editingCert ? 'Edit Certificate' : 'Add New Certificate'}</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Certificate Name (e.g., AWS Certified Developer)" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={inputStyle} required />
              <input type="text" placeholder="Organization (e.g., Amazon Web Services)" value={formData.org} onChange={(e) => setFormData({...formData, org: e.target.value})} style={inputStyle} required />
              <input type="text" placeholder="Year (e.g., 2023)" value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})} style={inputStyle} required />
              <input type="text" placeholder="Icon (emoji, e.g., ☁️, 🎓, ⚛️)" value={formData.icon} onChange={(e) => setFormData({...formData, icon: e.target.value})} style={inputStyle} />
              <input type="text" placeholder="Color (e.g., #FF9900 for AWS)" value={formData.color} onChange={(e) => setFormData({...formData, color: e.target.value})} style={inputStyle} />
              <input type="text" placeholder="Verification Link (optional)" value={formData.link} onChange={(e) => setFormData({...formData, link: e.target.value})} style={inputStyle} />
              <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} style={inputStyle} />
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" style={buttonStyle}>{editingCert ? 'Update' : 'Create'} Certificate</button>
                <button type="button" onClick={() => { setShowForm(false); setEditingCert(null); }} style={{ ...buttonStyle, background: '#555' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gap: '15px' }}>
        {certificates.length === 0 ? (
          <div style={{ color: '#888', textAlign: 'center', padding: '40px' }}>No certificates yet. Click "Add New Certificate" to create one.</div>
        ) : (
          certificates.map(cert => (
            <div key={cert._id} style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{ fontSize: '2rem' }}>{cert.icon}</div>
                  <div>
                    <h3 style={{ color: cert.color || '#00ffff' }}>{cert.name}</h3>
                    <p style={{ color: '#aaa' }}>{cert.org} • {cert.year}</p>
                    {cert.link && <a href={cert.link} target="_blank" rel="noreferrer" style={{ color: '#888', fontSize: '0.8rem' }}>Verify →</a>}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button onClick={() => handleEdit(cert)} style={{ ...buttonStyle, background: '#ffaa00', padding: '8px 16px' }}>Edit</button>
                  <button onClick={() => handleDelete(cert._id)} style={{ background: '#ff0000', border: 'none', padding: '8px 16px', borderRadius: '8px', color: '#fff', cursor: 'pointer' }}>Delete</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  marginBottom: '15px',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(0,255,255,0.2)',
  borderRadius: '8px',
  color: '#fff',
  outline: 'none'
};

const buttonStyle = {
  background: 'linear-gradient(135deg, #00ffff, #0080ff)',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '8px',
  color: '#0a0a0a',
  fontWeight: 'bold',
  cursor: 'pointer'
};

const modalOverlay = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  background: 'rgba(0,0,0,0.8)',
  backdropFilter: 'blur(10px)',
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const modalContent = {
  background: '#1a1a2e',
  padding: '30px',
  borderRadius: '20px',
  width: '90%',
  maxWidth: '550px',
  maxHeight: '85vh',
  overflow: 'auto'
};

export default CertificatesManage;