import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth
export const login = (email, password) =>
  api.post('/api/auth/login', { email, password });

export const getMe = () => api.get('/api/auth/me');

export const changePassword = (currentPassword, newPassword) =>
  api.put('/api/auth/password', { currentPassword, newPassword });

// Categories
export const getCategories = () => api.get('/api/categories');
export const getCategory = (id) => api.get(`/api/categories/${id}`);
export const createCategory = (data) => api.post('/api/categories', data);
export const updateCategory = (id, data) => api.put(`/api/categories/${id}`, data);
export const deleteCategory = (id) => api.delete(`/api/categories/${id}`);

// Plans
export const getPlans = (params) => api.get('/api/plans', { params });
export const getPlan = (id) => api.get(`/api/plans/${id}`);
export const createPlan = (data) => api.post('/api/plans', data);
export const updatePlan = (id, data) => api.put(`/api/plans/${id}`, data);
export const deletePlan = (id) => api.delete(`/api/plans/${id}`);
export const duplicatePlan = (id) => api.post(`/api/plans/duplicate/${id}`);

// Config
export const getConfig = () => api.get('/api/config');
export const updateConfig = (key, value, type) =>
  api.put(`/api/config/${key}`, { value, type });

export default api;
