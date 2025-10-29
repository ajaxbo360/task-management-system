import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import { generateToken } from '../utils/jwt';

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    // validate input
    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: 'Please provide name, email and password',
      });

      return;
    }

    // cheeck if useer alrreaddy exist

    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400).json({
        success: false,
        message: 'User already exist',
      });
      return;
    }

    // create the user

    const user: IUser = await User.create({
      name,
      email,
      password,
    });

    // generate jwt token

    const token = generateToken(String(user._id));

    // send succeess res

    res.status(201).json({
      success: true,
      message: 'User registered succesfully',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        },
        token,
      },
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: error.message,
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    // 1. validate input

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });

      return;
    }

    // find user by email includ password

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      res.status(400).json({
        success: false,
        message: 'Invalid email or password',
      });
      return;
    }

    // 3. Compare passwords
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
      return;
    }

    // generate jwt token

    const token = generateToken(String(user._id));
    // send response

    res.status(200).json({
      success: true,
      message: 'Login succesfull',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message,
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private (requires token)
export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    // req.user is attached by protect middleware
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Not authorized',
      });
      return;
    }

    // Get full user details from database
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      },
    });
  } catch (error: any) {
    console.error('Get me error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};
