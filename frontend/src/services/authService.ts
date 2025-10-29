import api from './api';

import type { LoginCredentials, RegisterData, AuthResponse, ApiResponse, User } from '../types';

// Register new user

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await api.post<ApiResponse<User>>('auth/register', data);

  return {
    user: response.data.data!,
    token: response.data.token!,
  };
};
export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await api.post<ApiResponse<User>>('auth/login', credentials);
  console.log(response.data);

  return {
    user: response.data.data!,
    token: response.data.token!,
  };
};
export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get<ApiResponse<{ user: User }>>('auth/me');

  return response.data.data!.user;
};
export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
