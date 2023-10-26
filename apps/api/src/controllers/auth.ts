import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import AppError from '../utils/AppError';
import catchAsyncAwait from '../utils/catchAsyncAwait';

export const signUp = catchAsyncAwait(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, budgetLimit } = req.body;
    if (!name || !email || !password || !budgetLimit)
      return next(
        new AppError(
          'Please provide name, email, password, and budget limit',
          400
        )
      );

    // find user by email
    const userExists = await User.findOne({ email });

    // check if user with this email already exists in the database
    if (userExists)
      return next(
        new AppError(
          'The email address you have entered is already associated with another account.',
          400
        )
      );

    // create a new user in the database
    await User.create(req.body);
    res.sendStatus(201);
  }
);

export const login = catchAsyncAwait(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1) check if email and password are entered
    if (!req.body.email || !req.body.password)
      return next(new AppError('Please provide email and password', 400));

    // 2) check if user exists and password is correct
    try {
      const user = await User.findByCredentials(
        req.body.email,
        req.body.password
      );
      const token = await user.generateAuthToken();
      res.send({
        token,
        data: user,
      });
    } catch (error) {
      return next(new AppError(error.message, 500));
    }
  }
);
