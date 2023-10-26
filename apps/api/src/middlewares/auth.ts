import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import AppError from '../utils/AppError';

// Augment the Request type to include a 'user' property
declare module 'express' {
  interface Request {
    user: User | null; // Modify this type according to your User model
  }
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return next(new AppError('Please authenticate.', 401));
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET) as any;
    const user = await User.findOne({ _id: decoded.id, email: decoded.email });

    if (!user) {
      return next(new AppError('Please authenticate.', 401));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new AppError('Please authenticate.', 401));
  }
};

export default auth;
