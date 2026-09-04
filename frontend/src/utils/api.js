import axios from 'axios';
import { stats as mockStats, mockIssues, mockNotifications } from '../data/mockData';

const API_URL = import.meta.env.VITE_API_URL || 'https://civiceye-h7ee.onrender.com';

let rawApiUrl = API_URL.trim().replace(/\/+$/, '');
if (!rawApiUrl.endsWith('/api')) {
  rawApiUrl = `${rawApiUrl}/api`;
}
const BASE_URL = rawApiUrl;

let rawAiUrl = import.meta.env.VITE_AI_SERVICE_URL || 'https://civiceye-ai-service.onrender.com';
const AI_BASE_URL = rawAiUrl.trim().replace(/\/+$/, '');

export const getApiUrl = (path) => `${BASE_URL}${path}`;
export const getFileUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  // If it's a relative path, resolve to our servers
  if (path.startsWith('/uploads') || path.startsWith('/results')) {
    return `${AI_BASE_URL}${path}`;
  }
  return path;
};

// Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
});

export const apiService = {
  // Dashboard Stats
  getStats: async (city) => {
    try {
      const response = await api.get('/dashboard/stats', { params: { city } });
      return response.data;
    } catch (error) {
      console.warn('API error fetching stats, using mock data:', error.message);
      return mockStats;
    }
  },

  // Issues
  getIssues: async (filters = {}) => {
    try {
      const response = await api.get('/issues', { params: filters });
      return response.data;
    } catch (error) {
      console.warn('API error fetching issues, using mock data:', error.message);
      // Filter mock data locally
      let data = [...mockIssues];
      if (filters.status) data = data.filter(i => i.status === filters.status);
      if (filters.severity) data = data.filter(i => i.severity === filters.severity);
      if (filters.type) data = data.filter(i => i.issueType.toLowerCase() === filters.type.toLowerCase());
      if (filters.department) data = data.filter(i => i.department === filters.department);
      return data;
    }
  },

  getIssueById: async (id) => {
    try {
      const response = await api.get(`/issues/${id}`);
      return response.data;
    } catch (error) {
      console.warn(`API error fetching issue ${id}, using mock data:`, error.message);
      return mockIssues.find(i => i.issueId === id);
    }
  },

  createIssue: async (issueData) => {
    try {
      const response = await api.post('/issues', issueData);
      return response.data;
    } catch (error) {
      console.error('API error creating issue:', error);
      throw error;
    }
  },

  updateIssueStatus: async (id, status, message = '', user = 'Operator') => {
    try {
      const response = await api.patch(`/issues/${id}/status`, { status, message, user });
      return response.data;
    } catch (error) {
      console.error(`API error updating status for ${id}:`, error);
      throw error;
    }
  },

  // AI Detection
  detectGarbage: async (imageFile, confidence = 0.15) => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('confidence', confidence);
      
      const response = await api.post('/detect', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('API error running AI detection:', error);
      throw error;
    }
  },

  // AI Verification (Closure)
  verifyClosure: async (id, imageFile, confidence = 0.15) => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('confidence', confidence);
      
      const response = await api.post(`/issues/${id}/verify`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`API error verifying closure for ${id}:`, error);
      throw error;
    }
  },

  // Alerts / Notifications
  getAlerts: async () => {
    try {
      const response = await api.get('/alerts');
      return response.data;
    } catch (error) {
      console.warn('API error fetching alerts, using mock data:', error.message);
      return mockNotifications;
    }
  },

  markAlertAsRead: async (id) => {
    try {
      const response = await api.patch(`/alerts/${id}/read`);
      return response.data;
    } catch (error) {
      console.error(`API error marking alert ${id} as read:`, error);
    }
  }
};
