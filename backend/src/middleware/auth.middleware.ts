import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import User from "../models/User";



// extend Express request type include user 

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                name: string;
                email: string;
            }
        }
    }
};

export const protect = async (req: Request,
  res: Response,
  next: NextFunction): Promise<void> => {
    try {
        let token: string | undefined;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
                  token = req.headers.authorization.split(' ')[1];

        }
         if (!token) {
      res.status(401).json({
        success: false,
        message: 'Not authorized, no token provided'
      });
      return;
         }
        
        const decoded = verifyToken(token);
        const user = await User.findById(decoded?.userId).select("-password");
        if (!user) {
      res.status(401).json({
        success: false,
        message: 'Not authorized, user not found'
      });
      return;
        }
        
        req.user = {
      id: String(user._id),
      name: user.name,
      email: user.email
    };

        next();
    } catch (error:any) {
        console.error('Auth middleware error:', error);
    res.status(401).json({
      success: false,
      message: 'Not authorized, token invalid or expired'
    });
  }
}

