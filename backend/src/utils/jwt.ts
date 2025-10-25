import jwt, { SignOptions } from 'jsonwebtoken';

// Generate JWT token
export const generateToken = (userId: string | unknown): string => {
  const secret = process.env.JWT_SECRET;
  
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  
  const options: SignOptions = {
      expiresIn:  process.env.JWT_EXPIRE || '7d' as string
  };
  
  return jwt.sign({ userId }, secret, options);
};

// Verify JWT token
export const verifyToken = (token: string): any => {
  const secret = process.env.JWT_SECRET;
  
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error('Invalid token');
  }
};