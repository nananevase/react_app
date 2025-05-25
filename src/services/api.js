import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

// Add request interceptor to handle errors
api.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('API Error:', error.response.data);
      if (error.response.status === 302) {
        // Handle redirect
        const redirectUrl = error.response.headers.location;
        if (redirectUrl) {
          window.location.href = redirectUrl;
        }
      }
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
      return Promise.reject(new Error('No response received from server'));
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request setup error:', error.message);
      return Promise.reject(error);
    }
  }
);

export const productService = {
  getAllProducts: () => api.get('/products').then(res => res.data),
  getProductById: (id) => api.get(`/products/${id}`).then(res => res.data),
  getProductsByCategory: (category) => api.get(`/products/category/${category}`).then(res => res.data),
  searchProducts: (query) => api.get(`/products/search?query=${query}`).then(res => res.data),
  getFeaturedProducts: () => api.get('/products/featured').then(res => res.data),
  getTrendingProducts: () => api.get('/products/trending').then(res => res.data)
};

export const cartService = {
  getCart: () => api.get('/cart').then(res => res.data),
  addToCart: (productId, quantity) => api.post('/cart/items', { productId, quantity }).then(res => res.data),
  updateCartItem: (productId, quantity) => api.put(`/cart/items/${productId}`, { quantity }).then(res => res.data),
  removeFromCart: (productId) => api.delete(`/cart/items/${productId}`).then(res => res.data),
  clearCart: () => api.delete('/cart').then(res => res.data)
};

export const orderService = {
  createOrder: (userId, shippingAddress) => 
    api.post('/orders', null, { params: { userId, shippingAddress } }).then(res => res.data),
  getOrderById: (id) => api.get(`/orders/${id}`).then(res => res.data),
  getOrdersByUserId: (userId) => api.get(`/orders/user/${userId}`).then(res => res.data),
  updateOrderStatus: (id, status) => 
    api.put(`/orders/${id}/status`, null, { params: { status } }).then(res => res.data)
};

export const userService = {
  login: (credentials) => api.post('/auth/login', credentials).then(res => res.data),
  register: (userData) => api.post('/auth/register', userData).then(res => res.data),
  getProfile: () => api.get('/users/profile').then(res => res.data),
  updateProfile: (userData) => api.put('/users/profile', userData).then(res => res.data)
};

export default api; 