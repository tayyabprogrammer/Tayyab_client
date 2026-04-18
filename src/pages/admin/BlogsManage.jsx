// client/src/pages/admin/BlogsManage.jsx
import { useState, useEffect } from 'react';
import { getBlogs, createBlog, updateBlog, deleteBlog } from '../../services/api';

const BlogsManage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: '', excerpt: '', content: '', category: 'tech',
    tags: '', readTime: '', featured: false
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data } = await getBlogs();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('data', JSON.stringify({
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()),
      readTime: formData.readTime || '5 min read'
    }));
    
    if (imageFile) {
      formDataToSend.append('image', imageFile);
    }

    try {
      if (editingBlog) {
        await updateBlog(editingBlog._id, formDataToSend);
      } else {
        await createBlog(formDataToSend);
      }
      fetchBlogs();
      setShowForm(false);
      setEditingBlog(null);
      resetForm();
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Error saving blog. Check console.');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '', excerpt: '', content: '', category: 'tech',
      tags: '', readTime: '', featured: false
    });
    setImageFile(null);
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      category: blog.category,
      tags: blog.tags.join(', '),
      readTime: blog.readTime,
      featured: blog.featured || false
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      await deleteBlog(id);
      fetchBlogs();
    }
  };

  if (loading) return <div style={{ color: '#fff' }}>Loading blogs...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#fff' }}>Blogs Management</h1>
        <button onClick={() => { setShowForm(true); setEditingBlog(null); resetForm(); }} style={buttonStyle}>+ Add New Blog</button>
      </div>

      {showForm && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <h2 style={{ color: '#00ffff', marginBottom: '20px' }}>{editingBlog ? 'Edit Blog' : 'Add New Blog'}</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Blog Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} style={inputStyle} required />
              <input type="text" placeholder="Excerpt (Short description)" value={formData.excerpt} onChange={(e) => setFormData({...formData, excerpt: e.target.value})} style={inputStyle} required />
              <textarea placeholder="Full Content (HTML supported)" value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} style={{...inputStyle, minHeight: '150px'}} rows="5" required />
              
              <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} style={inputStyle}>
                <option value="tech">Tech</option>
                <option value="tutorial">Tutorial</option>
                <option value="career">Career</option>
              </select>
              
              <input type="text" placeholder="Tags (comma separated, e.g., React, JavaScript, AI)" value={formData.tags} onChange={(e) => setFormData({...formData, tags: e.target.value})} style={inputStyle} />
              <input type="text" placeholder="Read Time (e.g., 5 min read)" value={formData.readTime} onChange={(e) => setFormData({...formData, readTime: e.target.value})} style={inputStyle} />
              
              <label style={{ color: '#aaa', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({...formData, featured: e.target.checked})} />
                Featured Post
              </label>
              
              <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} style={inputStyle} />
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" style={buttonStyle}>{editingBlog ? 'Update' : 'Create'} Blog</button>
                <button type="button" onClick={() => { setShowForm(false); setEditingBlog(null); }} style={{ ...buttonStyle, background: '#555' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gap: '15px' }}>
        {blogs.length === 0 ? (
          <div style={{ color: '#888', textAlign: 'center', padding: '40px' }}>No blogs yet. Click "Add New Blog" to create one.</div>
        ) : (
          blogs.map(blog => (
            <div key={blog._id} style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <h3 style={{ color: '#00ffff' }}>{blog.title}</h3>
                    {blog.featured && <span style={{ background: '#ffaa00', color: '#0a0a0a', padding: '2px 10px', borderRadius: '20px', fontSize: '0.7rem' }}>Featured</span>}
                    <span style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 10px', borderRadius: '20px', fontSize: '0.7rem' }}>{blog.category}</span>
                  </div>
                  <p style={{ color: '#aaa', fontSize: '0.85rem', marginTop: '8px' }}>{blog.excerpt}</p>
                  <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                    <small style={{ color: '#666' }}>📅 {new Date(blog.createdAt).toLocaleDateString()}</small>
                    <small style={{ color: '#666' }}>⏱️ {blog.readTime}</small>
                    <small style={{ color: '#666' }}>🏷️ {blog.tags?.join(', ')}</small>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button onClick={() => handleEdit(blog)} style={{ ...buttonStyle, background: '#ffaa00', padding: '8px 16px' }}>Edit</button>
                  <button onClick={() => handleDelete(blog._id)} style={{ background: '#ff0000', border: 'none', padding: '8px 16px', borderRadius: '8px', color: '#fff', cursor: 'pointer' }}>Delete</button>
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
  maxWidth: '650px',
  maxHeight: '85vh',
  overflow: 'auto'
};

export default BlogsManage;