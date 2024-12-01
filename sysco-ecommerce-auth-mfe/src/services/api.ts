import axios, { AxiosError } from 'axios';
import eventBus from '../screens/shared-events';

const API_BASE_URL = 'http://localhost:3001/api'; 

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept requests to add the token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Emit a logout event or handle session expiration
      eventBus.emit('userLoggedOut');
      localStorage.removeItem('token'); // Clear token
    }
    return Promise.reject(error);
  }   
);

interface UserData {
  name: string;
  email: string;
}

export const saveUser = async (userData: UserData) => {
  try {
    const response = await api.post('/users', userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error('Error saving user:', axiosError.response?.data || axiosError.message);
    } else {
      console.error('Error saving user:', error);
    }
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post('/login', { email, password });
    const { token } = response.data;
    localStorage.setItem('token', token);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error('Login error:', axiosError.response?.data || axiosError.message);
    } else {
      console.error('Login error:', error);
    }
    throw error;
  }
};

export default api;