import { type User } from '../types';

export const storage = {
  // Get token
  getToken: (): string | null => {
    const token = localStorage.getItem('token');
    if (token && token !== 'undefined' && token !== 'null') {
      return token;
    }
    return null;
  },

  // Set token
  setToken: (token: string): void => {
    if (token) {
      localStorage.setItem('token', token);
    }
  },

  // Remove token
  removeToken: (): void => {
    localStorage.removeItem('token');
  },

  // Get user
  getUser: (): User | null => {
    const userString = localStorage.getItem('user');
    if (userString && userString !== 'undefined' && userString !== 'null') {
      try {
        return JSON.parse(userString);
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        localStorage.removeItem('user');
        return null;
      }
    }
    return null;
  },

  // Set user
  setUser: (user: User): void => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  },

  // Remove user
  removeUser: (): void => {
    localStorage.removeItem('user');
  },

  // Clear all
  clear: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};