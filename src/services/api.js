// client/src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Add token to requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
    req.headers['x-auth-token'] = token;
  }
  return req;
});

// Admin Auth
export const adminLogin = (email, password) => API.post('/admin/login', { email, password });

// Projects
export const getProjects = () => API.get('/projects');
export const createProject = (formData) => API.post('/projects', formData);
export const updateProject = (id, formData) => API.put(`/projects/${id}`, formData);
export const deleteProject = (id) => API.delete(`/projects/${id}`);

// Blogs
export const getBlogs = () => API.get('/blogs');
export const createBlog = (formData) => API.post('/blogs', formData);
export const updateBlog = (id, formData) => API.put(`/blogs/${id}`, formData);
export const deleteBlog = (id) => API.delete(`/blogs/${id}`);
// Get single blog by ID
export const getBlogById = (id) => API.get(`/blogs/${id}`);

// Certificates
export const getCertificates = () => API.get('/certificates');
export const createCertificate = (formData) => API.post('/certificates', formData);
export const updateCertificate = (id, formData) => API.put(`/certificates/${id}`, formData);
export const deleteCertificate = (id) => API.delete(`/certificates/${id}`);

// Contact Messages
// Contact Messages
export const sendContactMessage = (data) => API.post('/contact', data);
export const getMessages = () => API.get('/contact');
export const markAsRead = (id) => API.put(`/contact/${id}/read`);
export const deleteMessage = (id) => API.delete(`/contact/${id}`);
// Projects
// Reviews
export const getReviews = () => API.get('/reviews');
export const submitReview = (data) => API.post('/reviews', data);
export const getAllReviews = () => API.get('/reviews/all');
export const approveReview = (id) => API.put(`/reviews/${id}/approve`);
export const deleteReview = (id) => API.delete(`/reviews/${id}`);

export default API;
