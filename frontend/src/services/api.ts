import axios from 'axios';

// Get API configuration from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'http://localhost:5001';
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '10000');
const IS_DEBUG = import.meta.env.VITE_ENABLE_DEBUG === 'true';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:5001',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // Set to false for CORS
  timeout: API_TIMEOUT,
});

// Add request interceptor for error handling
api.interceptors.request.use(
  (config) => {
    if (IS_DEBUG) {
      console.log('Making request to:', config.baseURL + config.url);
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    if (IS_DEBUG) {
      console.log('Response received:', response.status, response.statusText);
    }
    return response;
  },
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response error:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        headers: error.response.headers
      });
    } else if (error.request) {
      // The request was made but no response received
      console.error('Request error - no response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api; 