import { useState, useEffect } from 'react';
import { getProjects, createProject, updateProject, deleteProject } from '../../services/api';

const ProjectsManage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '', shortDesc: '', description: '', category: 'ai',
    tech: '', github: '', live: '', features: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('data', JSON.stringify({
      ...formData,
      tech: formData.tech.split(',').map(t => t.trim()),
      features: formData.features.split(',').map(f => f.trim())
    }));
    
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      if (editingProject) {
        await updateProject(editingProject._id, formDataToSend);
      } else {
        await createProject(formDataToSend);
      }
      fetchProjects();
      setShowForm(false);
      setEditingProject(null);
      setFormData({ title: '', shortDesc: '', description: '', category: 'ai', tech: '', github: '', live: '', features: '', image: null });
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await deleteProject(id);
      fetchProjects();
    }
  };

  if (loading) return <div style={{ color: '#fff' }}>Loading projects...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#fff' }}>Projects Management</h1>
        <button onClick={() => { setShowForm(true); setEditingProject(null); setFormData({ title: '', shortDesc: '', description: '', category: 'ai', tech: '', github: '', live: '', features: '', image: null }); }} style={buttonStyle}>+ Add New Project</button>
      </div>

      {showForm && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <h2 style={{ color: '#00ffff', marginBottom: '20px' }}>{editingProject ? 'Edit Project' : 'Add New Project'}</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Project Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} style={inputStyle} required />
              <input type="text" placeholder="Short Description" value={formData.shortDesc} onChange={(e) => setFormData({...formData, shortDesc: e.target.value})} style={inputStyle} required />
              <textarea placeholder="Full Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} style={inputStyle} rows="3" required />
              <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} style={inputStyle}>
                <option value="ai">AI / ML</option>
                <option value="ecommerce">E-Commerce</option>
                <option value="fullstack">Full Stack</option>
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
              </select>
              <input type="text" placeholder="Tech Stack (comma separated, e.g., React, Node.js, MongoDB)" value={formData.tech} onChange={(e) => setFormData({...formData, tech: e.target.value})} style={inputStyle} />
              <input type="text" placeholder="Features (comma separated)" value={formData.features} onChange={(e) => setFormData({...formData, features: e.target.value})} style={inputStyle} />
              <input type="text" placeholder="GitHub URL" value={formData.github} onChange={(e) => setFormData({...formData, github: e.target.value})} style={inputStyle} />
              <input type="text" placeholder="Live Demo URL" value={formData.live} onChange={(e) => setFormData({...formData, live: e.target.value})} style={inputStyle} />
              <input type="file" accept="image/*" onChange={(e) => setFormData({...formData, image: e.target.files[0]})} style={inputStyle} />
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" style={buttonStyle}>Save Project</button>
                <button type="button" onClick={() => { setShowForm(false); setEditingProject(null); }} style={{ ...buttonStyle, background: '#555' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gap: '15px' }}>
        {projects.length === 0 ? (
          <div style={{ color: '#888', textAlign: 'center', padding: '40px' }}>No projects yet. Click "Add New Project" to create one.</div>
        ) : (
          projects.map(project => (
            <div key={project._id} style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
              <div>
                <h3 style={{ color: '#00ffff' }}>{project.title}</h3>
                <p style={{ color: '#aaa', fontSize: '0.9rem' }}>{project.shortDesc}</p>
                <small style={{ color: '#666' }}>Category: {project.category}</small>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button onClick={() => { setEditingProject(project); setFormData({ ...project, tech: project.tech.join(', '), features: project.features.join(', ') }); setShowForm(true); }} style={{ ...buttonStyle, background: '#ffaa00', padding: '8px 16px' }}>Edit</button>
                <button onClick={() => handleDelete(project._id)} style={{ background: '#ff0000', border: 'none', padding: '8px 16px', borderRadius: '8px', color: '#fff', cursor: 'pointer' }}>Delete</button>
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
  maxWidth: '600px',
  maxHeight: '80vh',
  overflow: 'auto'
};

export default ProjectsManage;