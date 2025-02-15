import axios from 'axios';
import API_CONFIG from '../config/api';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: API_CONFIG.HEADERS,
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', {
      method: config.method,
      url: config.url,
      data: config.data,
    });
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', {
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error('API Response Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    return Promise.reject(error);
  }
);

// Trip API calls
export const tripApi = {
  getTrips: () => api.get('/trips'),
  getTrip: (id: string) => api.get(`/trips/${id}`),
  createTrip: (tripData: any) => api.post('/trips', tripData),
  updateTrip: (id: string, tripData: any) => api.put(`/trips/${id}`, tripData),
  deleteTrip: (id: string) => api.delete(`/trips/${id}`),
};

// Auth API calls
export const authApi = {
  login: (credentials: { email: string; password: string }) => 
    api.post('/auth/login', credentials),
  register: (userData: { name: string; email: string; password: string }) => 
    api.post('/auth/register', userData),
  getCurrentUser: () => api.get('/auth/me'),
};

// Interceptor for adding auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor for handling auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api; 