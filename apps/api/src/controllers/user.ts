import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/AppError';
import catchAsyncAwait from '../utils/catchAsyncAwait';
import User from '../models/user';
import BudgetEntry from '../models/budgetEntry';

export const getBudgetLimit = catchAsyncAwait(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.user._id);
    if (!user) return next(new AppError('User not found', 404));
    res.status(200).json({
      success: true,
      data: { budgetLimit: user.budgetLimit },
    });
  }
);

export const calculateBudgetStats = catchAsyncAwait(
  async (req: Request, res: Response) => {
    const userId = req.user._id;
    // Aggregate to calculate total spent
    const spentResult = await BudgetEntry.aggregate([
      {
        $match: { userId: userId }, // Filter budget entries by user
      },
      {
        $group: {
          _id: null,
          totalSpent: { $sum: '$cost' },
        },
      },
    ]);

    // Get the total spent or default to 0
    const totalSpent = spentResult.length > 0 ? spentResult[0].totalSpent : 0;

    // Find the user's budget limit
    const user = await User.findById(userId);
    const budgetLimit = user.budgetLimit;

    // Calculate remaining budget
    const remainingBudget = budgetLimit - totalSpent;

    res.send({
      success: true,
      data: {
        totalSpent,
        remainingBudget,
      },
    });
  }
);

export const editBudgetLimit = catchAsyncAwait(
  async (req: Request, res: Response, next: NextFunction) => {
    const { budgetLimit } = req.body;
    if (!budgetLimit)
      return next(new AppError('Budget limit is required', 400));
    if (parseInt(budgetLimit) < 0)
      return next(new AppError('Budget limit cannot be negative', 400));
    if (parseInt(budgetLimit) > 1000000)
      return next(
        new AppError('Budget limit cannot be greater than 1,000,000', 400)
      );
    if (budgetLimit) {
      const user = await User.findByIdAndUpdate(
        req.user._id,
        { budgetLimit },
        { runValidators: true }
      );
      if (!user) return next(new AppError('User not found', 404));
    }
    res.status(200).json({
      success: true,
      message: 'Budget limit updated successfully',
    });
  }
);
