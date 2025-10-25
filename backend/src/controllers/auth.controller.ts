import { Request, Response } from "express"
import User, { IUser } from "../models/User";
import { generateToken } from "../utils/jwt";

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public

export const register = async (req:Request, res:Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;
        // validate input
        if (!name || !email || !password) {
            res.status(400).json({
                success: false,
                message: "Please provide name, email and password"
            });

            return;
        }

        // cheeck if useer alrreaddy exist 

        const userExist = await User.findOne({ email });
        if (userExist) {
            res.status(400).json({
                success: false,
                message: "User already exist"
            });
            return;
        }

        // create the user 

        const user:IUser = await User.create({
            name,
            email,
            password
        });

        // generate jwt token 

        const token = generateToken(String(user._id));

        // send succeess res
        
        res.status(201).json({
            success: true,
            message: "User registered succesfully",
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt
                },
                token
            }
        });
    } catch (error:any) {
       console.error('Registration error:', error);
       res.status(500).json({ 
      success: false,
      message: 'Server error during registration',
      error: error.message 
    }); 
    }
}