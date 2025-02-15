import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// Store the development user ID so it remains consistent
const DEV_USER_ID = new mongoose.Types.ObjectId();

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // For development purposes, bypass authentication
  // TODO: Remove this in production
  console.log('Development Mode - Using development user ID:', DEV_USER_ID.toString());
  req.user = { _id: DEV_USER_ID };
  return next();

  // Uncomment this when implementing real authentication
  /*
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No authentication token, access denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-super-secret-jwt-key');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is invalid' });
  }
  */
}; 