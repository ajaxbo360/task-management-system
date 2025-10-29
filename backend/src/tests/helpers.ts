import request from 'supertest';
import { Application } from 'express';
import User from '../models/User';

// Helper to create a test user
export const createTestUser = async (userData: any = {}) => {
  const defaultUser = {
    name: 'Test User',
    email: 'test@test.com',
    password: 'password123',
    ...userData,
  };

  const user = await User.create(defaultUser);
  return user;
};

// Helper to get auth token
export const getAuthToken = async (app: Application, credentials?: any) => {
  const defaultCredentials = {
    email: 'test@test.com',
    password: 'password123',
  };

  // Create user first
  await createTestUser({ email: defaultCredentials.email });

  // Login to get token
  const response = await request(app)
    .post('/api/auth/login')
    .send(credentials || defaultCredentials);

  return response.body.token;
};

// Helper to make authenticated request
export const authenticatedRequest = (
  app: Application,
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  token: string
) => {
  return request(app)[method](url).set('Authorization', `Bearer ${token}`);
};
