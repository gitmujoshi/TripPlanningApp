const API_CONFIG = {
  BASE_URL: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5001/api'
    : `${window.location.origin}/api`,
  TIMEOUT: 5000,
  HEADERS: {
    'Content-Type': 'application/json',
  },
};

console.log('API Config:', {
  environment: process.env.NODE_ENV,
  baseUrl: API_CONFIG.BASE_URL,
});

export default API_CONFIG; 