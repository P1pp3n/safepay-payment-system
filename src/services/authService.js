import { STORAGE_KEYS } from '../utils/constants';
import { isValidEmail, isValidPhone } from '../utils/helpers';

export const authService = {
  login: (credentials) => {
    const { email, password } = credentials;
    
    if (!email || !password) {
      return { success: false, error: 'Email and password are required' };
    }

    // Demo: Accept any credentials
    const user = {
      id: Date.now(),
      name: 'Stacy Nyaguthii',
      email: email,
      phone: '+254712345678',
      createdAt: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return { success: true, user };
  },

  register: (userData) => {
    const { name, email, phone, password } = userData;

    if (!name || !email || !password) {
      return { success: false, error: 'All fields are required' };
    }

    if (!isValidEmail(email)) {
      return { success: false, error: 'Invalid email format' };
    }

    if (phone && !isValidPhone(phone)) {
      return { success: false, error: 'Invalid phone number format' };
    }

    const user = {
      id: Date.now(),
      name,
      email,
      phone: phone || '',
      createdAt: new Date().toISOString()
    };

    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return { success: true, user };
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
    return { success: true };
  },

  getCurrentUser: () => {
    try {
      const user = localStorage.getItem(STORAGE_KEYS.USER);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  isAuthenticated: () => {
    return !!authService.getCurrentUser();
  }
};