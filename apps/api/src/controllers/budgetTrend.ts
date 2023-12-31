import { Request, Response } from 'express';
import BudgetEntry from '../models/budgetEntry';
import catchAsyncAwait from '../utils/catchAsyncAwait';

export const getBudgetTrends = catchAsyncAwait(
  async (req: Request, res: Response) => {
    const userId = req.user._id;

    // Calculate the total budget entries for the last month
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const lastMonthTotal = await BudgetEntry.aggregate([
      {
        $match: {
          userId: userId,
          createdAt: { $gte: lastMonth },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$cost' },
        },
      },
    ]);

    // Calculate the total budget entries for the last 6 months
    const last6Months = new Date();
    last6Months.setMonth(last6Months.getMonth() - 6);
    const last6MonthsTotal = await BudgetEntry.aggregate([
      {
        $match: {
          userId: userId,
          createdAt: { $gte: last6Months },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$cost' },
        },
      },
    ]);

    // Calculate the total budget entries for the last 12 months
    const last12Months = new Date();
    last12Months.setMonth(last12Months.getMonth() - 12);
    const last12MonthsTotal = await BudgetEntry.aggregate([
      {
        $match: {
          userId: userId,
          createdAt: { $gte: last12Months },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$cost' },
        },
      },
    ]);

    const userBudgetLimit = req.user.budgetLimit;
    const response = {
      lastMonthTotal: lastMonthTotal[0] ? lastMonthTotal[0].total : 0,
      last6MonthsTotal: last6MonthsTotal[0] ? last6MonthsTotal[0].total : 0,
      last12MonthsTotal: last12MonthsTotal[0] ? last12MonthsTotal[0].total : 0,
      userBudgetLimit,
    };
    res.send(response);
  }
);
